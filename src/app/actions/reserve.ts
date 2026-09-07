"use server";

import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendNotification } from "@/lib/email";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

const reservationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.email("Please enter a valid email.").max(200),
  phone: z.string().trim().max(40).optional(),
  note: z.string().trim().max(2000).optional(),
  items: z
    .array(z.object({ productId: z.uuid(), quantity: z.number().int().min(1).max(20) }))
    .min(1, "Your cart is empty.")
    .max(20),
  // Honeypot: real people leave this hidden field empty.
  website: z.string().max(0).optional(),
});

export type ReserveState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/**
 * Turns the cart into a reservation for Milan to review. Nothing is charged:
 * the pieces he sells are made or chosen per person, so he confirms first and
 * arranges payment by e-mail. Prices and stock are re-read from the database —
 * the browser only says which product and how many, never what it costs.
 */
export async function submitReservation(_previous: ReserveState, formData: FormData): Promise<ReserveState> {
  let items: unknown = [];
  try {
    items = JSON.parse(String(formData.get("items") ?? "[]"));
  } catch {
    return { status: "error", message: "Your cart could not be read. Please refresh and try again." };
  }

  const parsed = reservationSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    note: formData.get("note") || undefined,
    items,
    website: formData.get("website") || undefined,
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    // A filled honeypot is a bot: answer as if it worked, store nothing.
    if (fieldErrors.website) return { status: "success" };
    // The cart itself is not something the shopper typed, so a complaint
    // about it gets a plain instruction rather than a validator's wording.
    if (fieldErrors.items) {
      return { status: "error", message: "Your cart could not be read. Please refresh the page and try again." };
    }
    return { status: "error", message: "Please check the form.", fieldErrors };
  }

  const { name, email, phone, note } = parsed.data;
  const supabase = createSupabaseAdminClient();

  const ids = parsed.data.items.map((item) => item.productId);
  const { data, error } = await supabase.from("products").select("*").in("id", ids).eq("active", true);
  if (error) {
    console.error("[reserve] product lookup failed", error.message);
    return { status: "error", message: "Something went wrong. Please try again in a moment." };
  }

  const byId = new Map(((data ?? []) as Product[]).map((product) => [product.id, product]));
  const lines: { product: Product; quantity: number }[] = [];
  for (const item of parsed.data.items) {
    const product = byId.get(item.productId);
    if (!product) {
      return { status: "error", message: "One of the items is no longer available. Please refresh your cart." };
    }
    if (product.stock !== null && product.stock < item.quantity) {
      return { status: "error", message: `Only ${product.stock} × ${product.name} left.` };
    }
    lines.push({ product, quantity: item.quantity });
  }

  const currency = lines[0].product.currency;
  const amountCents = lines.reduce((total, line) => total + line.product.price_cents * line.quantity, 0);

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({ status: "requested", customer_name: name, email, phone: phone ?? null, note: note ?? null, amount_cents: amountCents, currency })
    .select("id")
    .single();

  if (orderError || !order) {
    console.error("[reserve] order insert failed", orderError?.message);
    return { status: "error", message: "Something went wrong saving your reservation. Please try again." };
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
  if (itemsError) console.error("[reserve] order items insert failed", itemsError.message);

  // The reservation is already stored; a failed email must not fail the request.
  const rows = lines
    .map(
      ({ product, quantity }) =>
        `<li>${quantity} × ${escapeHtml(product.name)}, ${formatPrice(product.price_cents * quantity, currency)}</li>`,
    )
    .join("");
  await sendNotification({
    subject: `New reservation from ${name}: ${formatPrice(amountCents, currency)}`,
    replyTo: email,
    html: `
      <h2>New reservation</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
      <ul>${rows}</ul>
      <p><strong>Total:</strong> ${formatPrice(amountCents, currency)}</p>
      ${note ? `<p><strong>Note:</strong><br />${escapeHtml(note).replace(/\n/g, "<br />")}</p>` : ""}
      <p>Review it under Orders in the admin, then reply to this mail to reach the customer.</p>
    `,
  });

  return { status: "success" };
}
