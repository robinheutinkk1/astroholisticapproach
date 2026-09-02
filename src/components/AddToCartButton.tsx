"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import type { Product } from "@/lib/types";

export function AddToCartButton({
  product,
  disabled = false,
  className = "",
}: {
  product: Product;
  disabled?: boolean;
  className?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      priceCents: product.price_cents,
      currency: product.currency,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-night-950 transition-colors hover:bg-gold-300 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-mist-500 ${className}`}
    >
      {disabled ? "Unavailable" : added ? "Added ✓" : "Add to cart"}
    </button>
  );
}
