import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { env } from "@/lib/env";
import { sendNotification } from "@/lib/email";
import { formatPrice } from "@/lib/format";

export const runtime = "nodejs";
// The raw body is required for signature verification, so this route must
// never be cached or pre-rendered.
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(payload, signature, env.stripeWebhookSecret);
  } catch (error) {
    console.error("[stripe] signature verification failed", error);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    await handleCompletedSession(event.data.object);
  } else if (event.type === "checkout.session.expired") {
    await markCancelled(event.data.object.id);
  }

  return NextResponse.json({ received: true });
}

async function handleCompletedSession(session: Stripe.Checkout.Session) {
  const supabase = createSupabaseAdminClient();

  const { data: order, error } = await supabase
    .from("orders")
    .update({
      status: "paid",
      email: session.customer_details?.email ?? null,
      customer_name: session.customer_details?.name ?? null,
      stripe_payment_intent_id:
        typeof session.payment_intent === "string" ? session.payment_intent : null,
      amount_cents: session.amount_total ?? 0,
      currency: session.currency ?? "eur",
    })
    .eq("stripe_session_id", session.id)
    // Only a pending order flips to paid, so a webhook redelivery is a no-op
    // and never decrements stock twice.
    .eq("status", "pending")
    .select("id, amount_cents, currency, email, customer_name")
    .maybeSingle();

  if (error) {
    console.error("[stripe] failed to mark order paid", error.message);
    return;
  }
  if (!order) return; // Already processed, or no matching pending order.

  await decrementStock(order.id);

  const { data: items } = await supabase
    .from("order_items")
    .select("name, quantity, unit_price_cents")
    .eq("order_id", order.id);

  const rows = (items ?? [])
    .map((item) => `<li>${item.quantity} × ${item.name}</li>`)
    .join("");

  await sendNotification({
    subject: `New order — ${formatPrice(order.amount_cents, order.currency)}`,
    html: `
      <h2>New paid order</h2>
      <p><strong>Customer:</strong> ${order.customer_name ?? "—"} (${order.email ?? "—"})</p>
      <p><strong>Total:</strong> ${formatPrice(order.amount_cents, order.currency)}</p>
      <ul>${rows}</ul>
    `,
  });
}

/** Decrements stock for the tracked products in an order. */
async function decrementStock(orderId: string) {
  const supabase = createSupabaseAdminClient();

  const { data: items } = await supabase
    .from("order_items")
    .select("product_id, quantity")
    .eq("order_id", orderId);

  for (const item of items ?? []) {
    if (!item.product_id) continue;

    const { data: product } = await supabase
      .from("products")
      .select("stock")
      .eq("id", item.product_id)
      .maybeSingle();

    // stock === null means unlimited; leave it alone.
    if (!product || product.stock === null) continue;

    await supabase
      .from("products")
      .update({ stock: Math.max(0, product.stock - item.quantity) })
      .eq("id", item.product_id);
  }
}

async function markCancelled(sessionId: string) {
  const supabase = createSupabaseAdminClient();
  await supabase
    .from("orders")
    .update({ status: "cancelled" })
    .eq("stripe_session_id", sessionId)
    .eq("status", "pending");
}
