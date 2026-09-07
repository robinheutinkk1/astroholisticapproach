"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { MAX_PER_LINE, useCart } from "@/components/CartProvider";
import { submitReservation, type ReserveState } from "@/app/actions/reserve";
import { formatPrice } from "@/lib/format";

const initialState: ReserveState = { status: "idle" };

export function CartView() {
  const { lines, subtotalCents, setQuantity, remove, clear, ready } = useCart();
  const [state, formAction] = useActionState(submitReservation, initialState);

  // Once the reservation is stored, the cart has done its job.
  useEffect(() => {
    if (state.status === "success") clear();
  }, [state.status, clear]);

  if (state.status === "success") {
    return (
      <div className="form-success is-visible" role="status" aria-live="polite">
        <span className="check" aria-hidden="true">
          ✓
        </span>
        <span className="msg">
          Thank you — your reservation has reached Milan. He looks at every request personally and will e-mail
          you within 24 hours to confirm and arrange payment. Nothing has been charged.
        </span>
      </div>
    );
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

      <form action={formAction} className="form reserve-form">
        <div className="form-head">
          <h3>Reserve these pieces</h3>
          <p>
            Nothing is paid here. Milan checks every reservation himself and e-mails you to confirm and arrange
            payment.
          </p>
        </div>

        {/* The cart travels as product ids and quantities only; the server
            re-reads prices and stock. */}
        <input
          type="hidden"
          name="items"
          value={JSON.stringify(lines.map((line) => ({ productId: line.productId, quantity: line.quantity })))}
          readOnly
        />

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Your name</label>
            <input type="text" id="name" name="name" autoComplete="name" required minLength={2} placeholder="First and last name" />
            <FieldError message={state.fieldErrors?.name} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" autoComplete="email" inputMode="email" required placeholder="you@example.com" />
            <FieldError message={state.fieldErrors?.email} />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone — optional</label>
          <input type="tel" id="phone" name="phone" autoComplete="tel" inputMode="tel" placeholder="If you would rather be called" />
          <FieldError message={state.fieldErrors?.phone} />
        </div>

        <div className="form-group">
          <label htmlFor="note">Anything Milan should know — optional</label>
          <textarea id="note" name="note" rows={3} placeholder="A question, a wish for a particular stone, a delivery address…" />
          <FieldError message={state.fieldErrors?.note} />
        </div>

        {/* Honeypot — hidden from people, tempting to bots. */}
        <div aria-hidden="true" style={{ position: "absolute", left: -9999 }}>
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        {state.status === "error" && state.message && <p className="form-error is-visible">{state.message}</p>}

        <ReserveButton />

        <p className="cart-note">You will hear from Milan personally. No payment details are asked for on this site.</p>
      </form>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <span className="form-error is-visible">{message}</span>;
}

function ReserveButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending} style={{ width: "100%", justifyContent: "center" }}>
      {pending ? "Sending…" : "Send reservation"}
      <span className="arrow">→</span>
    </button>
  );
}
