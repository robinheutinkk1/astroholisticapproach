import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { z } from "zod";
import { getStripe } from "@/lib/stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { env } from "@/lib/env";
import type { Product } from "@/lib/types";

export const runtime = "nodejs";

/**
 * Where physical orders can be posted directly. Anywhere else is arranged by
 * e-mail after the order, because overseas shipping is quoted separately.
 */
const SHIPPING_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] = [
  "NL", "BE", "DE", "FR", "LU", "AT", "DK", "SE", "FI", "IE", "IT", "ES", "PT", "PL", "CZ", "GB",
];

const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.uuid(),
        quantity: z.number().int().min(1).max(20),
      }),
    )
    .min(1)
    .max(20),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid cart contents." }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();

  // Prices and availability are re-read from the database. The browser only
  // ever tells us which product and how many — never what it costs.
  const ids = parsed.data.items.map((item) => item.productId);
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .in("id", ids)
    .eq("active", true);

  if (error) {
    console.error("[checkout] product lookup failed", error.message);
    return NextResponse.json({ error: "Could not start checkout." }, { status: 500 });
  }

  const products = (data ?? []) as Product[];
  const byId = new Map(products.map((product) => [product.id, product]));

  const lines: { product: Product; quantity: number }[] = [];
  for (const item of parsed.data.items) {
    const product = byId.get(item.productId);
    if (!product) {
      return NextResponse.json(
        { error: "One of the items is no longer available. Please refresh your cart." },
        { status: 409 },
      );
    }
    if (product.stock !== null && product.stock < item.quantity) {
      return NextResponse.json(
        { error: `Only ${product.stock} × ${product.name} left.` },
        { status: 409 },
      );
    }
    lines.push({ product, quantity: item.quantity });
  }

  const currency = lines[0].product.currency;
  if (lines.some((line) => line.product.currency !== currency)) {
    return NextResponse.json(
      { error: "Items in the cart use different currencies." },
      { status: 409 },
    );
  }

  // Anything physical has to be posted, so Stripe collects an address for it.
  // Shipping outside this list is quoted separately by e-mail, per the terms.
  const needsShipping = lines.some(({ product }) => product.kind === "physical");

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lines.map(({ product, quantity }) => ({
      quantity,
      price_data: {
        currency: product.currency,
        unit_amount: product.price_cents,
        product_data: {
          name: product.name,
          description: product.summary ?? undefined,
        },
      },
    })),
    success_url: `${env.siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.siteUrl}/cart`,
    automatic_tax: { enabled: false },
    billing_address_collection: "auto",
    ...(needsShipping ? { shipping_address_collection: { allowed_countries: SHIPPING_COUNTRIES } } : {}),
  });

  const amountCents = lines.reduce(
    (total, line) => total + line.product.price_cents * line.quantity,
    0,
  );

  // Recorded as pending now so a completed payment always has a row to
  // attach to, even if the shopper closes the tab before returning.
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      stripe_session_id: session.id,
      status: "pending",
      amount_cents: amountCents,
      currency,
    })
    .select("id")
    .single();

  if (orderError || !order) {
    console.error("[checkout] order insert failed", orderError?.message);
    return NextResponse.json({ error: "Could not start checkout." }, { status: 500 });
  }

  const { error: itemsError } = await supabase.from("order_items").insert(
    lines.map(({ product, quantity }) => ({
      order_id: order.id,
      product_id: product.id,
      name: product.name,
      unit_price_cents: product.price_cents,
      quantity,
    })),
  );

  if (itemsError) {
    console.error("[checkout] order items insert failed", itemsError.message);
  }

  return NextResponse.json({ url: session.url });
}
