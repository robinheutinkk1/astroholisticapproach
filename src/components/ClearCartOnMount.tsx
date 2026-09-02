"use client";

import { useEffect } from "react";
import { useCart } from "@/components/CartProvider";

/**
 * Empties the cart once the shopper lands back from Stripe. The order itself
 * is recorded by the webhook, so this is purely cosmetic and safe to run even
 * if the visitor reloads the page.
 */
export function ClearCartOnMount() {
  const { clear, ready, itemCount } = useCart();

  useEffect(() => {
    if (ready && itemCount > 0) clear();
  }, [ready, itemCount, clear]);

  return null;
}
