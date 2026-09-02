"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/types";

const categories = [
  { id: "all", label: "All" },
  { id: "reports", label: "Reports & Guides" },
  { id: "jewelry", label: "Jewelry" },
  { id: "crystals", label: "Crystals" },
];

export function ShopGrid({ products }: { products: Product[] }) {
  const [active, setActive] = useState("all");
  const shown = active === "all" ? products : products.filter((product) => product.category === active);

  return (
    <>
      <div className="shop-cats">
        {categories.map((category) => (
          <button
            type="button"
            key={category.id}
            className={`shop-cat${active === category.id ? " active" : ""}`}
            onClick={() => setActive(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {shown.length > 0 ? (
        <div className="grid-3">
          {shown.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>Nothing in this category yet.</p>
        </div>
      )}
    </>
  );
}
