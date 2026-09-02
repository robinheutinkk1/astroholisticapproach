import Link from "next/link";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

async function getStats() {
  const supabase = createSupabaseAdminClient();

  const [published, drafts, products, unhandled, paidOrders] = await Promise.all([
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("published", true),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("published", false),
    supabase.from("products").select("id", { count: "exact", head: true }).eq("active", true),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("handled", false),
    supabase.from("orders").select("amount_cents, currency").in("status", ["paid", "fulfilled"]),
  ]);

  const orders = paidOrders.data ?? [];

  return {
    published: published.count ?? 0,
    drafts: drafts.count ?? 0,
    products: products.count ?? 0,
    unhandled: unhandled.count ?? 0,
    orderCount: orders.length,
    revenueCents: orders.reduce((total, order) => total + order.amount_cents, 0),
    currency: orders[0]?.currency ?? "eur",
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const tiles = [
    { label: "Published articles", value: String(stats.published), href: "/admin/posts" },
    { label: "Drafts", value: String(stats.drafts), href: "/admin/posts" },
    { label: "Active products", value: String(stats.products), href: "/admin/products" },
    { label: "Unread messages", value: String(stats.unhandled), href: "/admin/messages" },
    { label: "Paid orders", value: String(stats.orderCount), href: "/admin/orders" },
    { label: "Revenue", value: formatPrice(stats.revenueCents, stats.currency), href: "/admin/orders" },
  ];

  return (
    <div>
      <div className="admin-grid">
        {tiles.map((tile) => (
          <Link className="admin-tile" href={tile.href} key={tile.label}>
            <span className="label">{tile.label}</span>
            <div className="value">{tile.value}</div>
          </Link>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 34 }}>
        <Link href="/admin/posts/new" className="btn btn-primary">
          New article
        </Link>
        <Link href="/admin/products/new" className="btn btn-secondary">
          New product
        </Link>
      </div>
    </div>
  );
}
