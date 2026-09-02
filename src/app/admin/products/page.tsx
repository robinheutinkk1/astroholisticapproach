import Link from "next/link";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { formatPrice } from "@/lib/format";
import { deleteProduct } from "@/app/admin/actions";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });
  const products = (data ?? []) as Product[];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl text-mist-100">Shop</h1>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-night-950 hover:bg-gold-300"
        >
          New product
        </Link>
      </div>

      <ul className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10 bg-night-900/40">
        {products.map((product) => (
          <li key={product.id} className="flex flex-wrap items-center gap-4 p-5">
            <div className="min-w-0 flex-1">
              <Link
                href={`/admin/products/${product.id}`}
                className="font-medium text-mist-100 hover:text-gold-300"
              >
                {product.name}
              </Link>
              <p className="mt-1 text-sm text-mist-500">
                /{product.slug} · {product.kind} ·{" "}
                {product.stock === null ? "unlimited" : `${product.stock} in stock`}
              </p>
            </div>

            <p className="font-semibold text-gold-300">
              {formatPrice(product.price_cents, product.currency)}
            </p>

            <span
              className={`rounded-full px-3 py-1 text-xs ${
                product.active
                  ? "bg-gold-400/15 text-gold-300"
                  : "border border-white/15 text-mist-500"
              }`}
            >
              {product.active ? "Live" : "Hidden"}
            </span>

            <form action={deleteProduct}>
              <input type="hidden" name="id" value={product.id} />
              <button type="submit" className="text-sm text-mist-500 hover:text-red-300">
                Delete
              </button>
            </form>
          </li>
        ))}

        {products.length === 0 && (
          <li className="p-8 text-center text-mist-500">No products yet.</li>
        )}
      </ul>
    </div>
  );
}
