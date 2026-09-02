import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { ProductIcon } from "@/components/ProductIcon";
import { AddToCartButton } from "@/components/AddToCartButton";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.stock !== null && product.stock <= 0;

  return (
    <article className="product-card reveal" data-cat={product.category}>
      <div className="product-img">
        {product.badge && <span className="product-tag">{product.badge}</span>}
        {product.image_url ? (
          // Author-supplied URL, so a plain img keeps the remote-image
          // allowlist from having to cover every host Milan might use.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_url} alt="" />
        ) : (
          <ProductIcon name={product.icon} />
        )}
      </div>
      <div className="product-body">
        <h3>
          <Link href={`/shop/${product.slug}`}>{product.name}</Link>
        </h3>
        <p>{product.summary}</p>
        <div className="product-foot">
          <strong>{product.price_on_request ? "On request" : formatPrice(product.price_cents, product.currency)}</strong>
          {product.price_on_request || soldOut ? (
            <Link href={`/contact?i=shop`}>Inquire →</Link>
          ) : (
            <AddToCartButton product={product} />
          )}
        </div>
      </div>
    </article>
  );
}
