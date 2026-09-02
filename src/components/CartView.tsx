"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
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
          items: lines.map((line) => ({
            productId: line.productId,
            quantity: line.quantity,
          })),
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
    return <p className="text-center text-mist-500">Loading your cart…</p>;
  }

  if (lines.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 px-6 py-14 text-center">
        <p className="text-mist-200">Your cart is empty.</p>
        <Link href="/shop" className="mt-4 inline-block text-sm font-semibold text-gold-300">
          Browse the readings →
        </Link>
      </div>
    );
  }

  const currency = lines[0].currency;

  return (
    <div>
      <ul className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-night-900/50">
        {lines.map((line) => (
          <li key={line.productId} className="flex flex-wrap items-center gap-4 p-5">
            <div className="min-w-0 flex-1">
              <Link
                href={`/shop/${line.slug}`}
                className="font-display text-lg text-mist-100 hover:text-gold-300"
              >
                {line.name}
              </Link>
              <p className="mt-1 text-sm text-mist-500">
                {formatPrice(line.priceCents, line.currency)} each
              </p>
            </div>

            <label className="sr-only" htmlFor={`qty-${line.productId}`}>
              Quantity for {line.name}
            </label>
            <input
              id={`qty-${line.productId}`}
              type="number"
              min={1}
              max={20}
              value={line.quantity}
              onChange={(event) => setQuantity(line.productId, Number(event.target.value))}
              className="w-20 rounded-lg border border-white/15 bg-night-950 px-3 py-2 text-center text-mist-100 focus:border-gold-400 focus:outline-none"
            />

            <p className="w-24 text-right font-semibold text-mist-100">
              {formatPrice(line.priceCents * line.quantity, line.currency)}
            </p>

            <button
              type="button"
              onClick={() => remove(line.productId)}
              className="text-sm text-mist-500 hover:text-red-300"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6">
        <p className="text-mist-300">Subtotal</p>
        <p className="font-display text-2xl text-gold-300">
          {formatPrice(subtotalCents, currency)}
        </p>
      </div>

      {error && (
        <p className="mt-5 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleCheckout}
        disabled={pending}
        className="mt-6 w-full rounded-full bg-gold-400 px-7 py-3.5 text-sm font-semibold text-night-950 transition-colors hover:bg-gold-300 disabled:opacity-60"
      >
        {pending ? "Redirecting to payment…" : "Checkout securely"}
      </button>

      <p className="mt-4 text-center text-xs text-mist-500">
        Payment is handled by Stripe. Card details never touch this site.
      </p>
    </div>
  );
}
