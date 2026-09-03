"use client";

import Link from "next/link";
import { useState } from "react";
import { MAX_PER_LINE, useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";

export function CartView() {
  const { lines, subtotalCents, setQuantity, remove, ready } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleCheckout() {
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((line) => ({ productId: line.productId, quantity: line.quantity })),
        }),
      });

      const payload = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !payload.url) {
        setError(payload.error ?? "Could not start checkout. Please try again.");
        setPending(false);
        return;
      }
      window.location.href = payload.url;
    } catch {
      setError("Could not reach the payment provider. Please try again.");
      setPending(false);
    }
  }

  if (!ready) {
    return <p className="empty-state">Loading your cart…</p>;
  }

  if (lines.length === 0) {
    return (
      <div className="empty-state">
        <p>Your cart is empty.</p>
        <p>
          <Link href="/shop" style={{ color: "var(--c-gold)" }}>
            Browse the shop →
          </Link>
        </p>
      </div>
    );
  }

  const currency = lines[0].currency;

  return (
    <div>
      <ul className="cart-list">
        {lines.map((line) => (
          <li className="cart-row" key={line.productId}>
            <div className="cart-name">
              <Link href={`/shop/${line.slug}`}>{line.name}</Link>
              <span className="cart-unit">{formatPrice(line.priceCents, line.currency)} each</span>
            </div>

            <div className="qty" role="group" aria-label={`Quantity for ${line.name}`}>
              <button
                type="button"
                onClick={() => setQuantity(line.productId, line.quantity - 1)}
                disabled={line.quantity <= 1}
                aria-label={`One fewer ${line.name}`}
              >
                −
              </button>
              <span className="qty-value" aria-live="polite">
                {line.quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(line.productId, line.quantity + 1)}
                disabled={line.quantity >= MAX_PER_LINE}
                aria-label={`One more ${line.name}`}
              >
                +
              </button>
            </div>

            <span className="cart-line-total">{formatPrice(line.priceCents * line.quantity, line.currency)}</span>

            <button type="button" className="cart-remove" onClick={() => remove(line.productId)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <span style={{ color: "var(--c-mute)" }}>Subtotal</span>
        <span className="amount">{formatPrice(subtotalCents, currency)}</span>
      </div>

      {error && (
        <p className="admin-alert" style={{ marginTop: 20 }}>
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleCheckout}
        disabled={pending}
        className="btn btn-primary"
        style={{ width: "100%", justifyContent: "center", marginTop: 24 }}
      >
        {pending ? "Redirecting to payment…" : "Checkout securely"}
        <span className="arrow">→</span>
      </button>

      <p className="cart-note">Payment is handled by Stripe. Card details never touch this site.</p>
    </div>
  );
}
