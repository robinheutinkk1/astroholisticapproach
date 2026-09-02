import Link from "next/link";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { formatPrice } from "@/lib/format";
import { deleteProduct } from "@/app/admin/actions";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase.from("products").select("*").order("sort_order", { ascending: true });
  const products = (data ?? []) as Product[];

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <h2 style={{ fontSize: "1.5rem" }}>Shop</h2>
        <Link href="/admin/products/new" className="btn btn-primary">
          New product
        </Link>
      </div>

      <div className="admin-list" style={{ marginTop: 28 }}>
        {products.map((product) => (
          <div className="admin-item" key={product.id}>
            <div className="grow">
              <Link href={`/admin/products/${product.id}`}>{product.name}</Link>
              <div className="sub">
                /shop/{product.slug} · {product.category} ·{" "}
                {product.stock === null ? "unlimited" : `${product.stock} in stock`}
              </div>
            </div>
            <strong style={{ color: "var(--c-gold)" }}>
              {product.price_on_request ? "On request" : formatPrice(product.price_cents, product.currency)}
            </strong>
            <span className={`admin-pill${product.active ? " on" : ""}`}>{product.active ? "Live" : "Hidden"}</span>
            <form action={deleteProduct}>
              <input type="hidden" name="id" value={product.id} />
              <button type="submit" className="admin-danger">
                Delete
              </button>
            </form>
          </div>
        ))}

        {products.length === 0 && (
          <div className="admin-item">
            <span style={{ color: "var(--c-mute-2)" }}>No products yet.</span>
          </div>
        )}
      </div>
    </div>
  );
}
