"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import type { Product } from "@/lib/types";

export function AddToCartButton({
  product,
  disabled = false,
  className = "add-to-cart",
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
    <button type="button" onClick={handleClick} disabled={disabled} className={className}>
      {disabled ? "Unavailable" : added ? "Added ✓" : "Add to cart →"}
    </button>
  );
}
