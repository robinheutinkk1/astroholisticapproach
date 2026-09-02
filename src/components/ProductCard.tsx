import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { AddToCartButton } from "@/components/AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.stock !== null && product.stock <= 0;

  return (
    <article className="flex flex-col rounded-2xl border border-white/10 bg-night-900/50 p-6 transition-colors hover:border-gold-500/40">
      <p className="text-xs tracking-[0.15em] text-gold-400 uppercase">{product.kind}</p>
      <h3 className="mt-2 font-display text-xl text-mist-100">
        <Link href={`/shop/${product.slug}`}>{product.name}</Link>
      </h3>
      {product.summary && (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-mist-300">{product.summary}</p>
      )}
      <p className="mt-5 font-display text-2xl text-gold-300">
        {formatPrice(product.price_cents, product.currency)}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <AddToCartButton product={product} disabled={soldOut} />
        <Link href={`/shop/${product.slug}`} className="text-sm text-mist-300 hover:text-gold-300">
          Details
        </Link>
      </div>
      {soldOut && <p className="mt-3 text-xs text-mist-500">Currently unavailable.</p>}
    </article>
  );
}
