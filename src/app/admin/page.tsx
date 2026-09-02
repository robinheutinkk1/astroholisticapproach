import Link from "next/link";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

async function getStats() {
  const supabase = createSupabaseAdminClient();

  const [posts, drafts, products, unhandled, paidOrders] = await Promise.all([
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("published", true),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("published", false),
    supabase.from("products").select("id", { count: "exact", head: true }).eq("active", true),
    supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .eq("handled", false),
    supabase.from("orders").select("amount_cents, currency").in("status", ["paid", "fulfilled"]),
  ]);

  const revenueCents = (paidOrders.data ?? []).reduce((total, order) => total + order.amount_cents, 0);
  const currency = paidOrders.data?.[0]?.currency ?? "eur";

  return {
    published: posts.count ?? 0,
    drafts: drafts.count ?? 0,
    products: products.count ?? 0,
    unhandled: unhandled.count ?? 0,
    orderCount: paidOrders.data?.length ?? 0,
    revenueCents,
    currency,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const tiles = [
    { label: "Published posts", value: String(stats.published), href: "/admin/posts" },
    { label: "Drafts", value: String(stats.drafts), href: "/admin/posts" },
    { label: "Active products", value: String(stats.products), href: "/admin/products" },
    { label: "Unread messages", value: String(stats.unhandled), href: "/admin/messages" },
    { label: "Paid orders", value: String(stats.orderCount), href: "/admin/orders" },
    {
      label: "Revenue",
      value: formatPrice(stats.revenueCents, stats.currency),
      href: "/admin/orders",
    },
  ];

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => (
          <Link
            key={tile.label}
            href={tile.href}
            className="rounded-2xl border border-white/10 bg-night-900/50 p-6 transition-colors hover:border-gold-500/40"
          >
            <p className="text-sm text-mist-500">{tile.label}</p>
            <p className="mt-2 font-display text-3xl text-gold-300">{tile.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/admin/posts/new"
          className="rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-night-950 hover:bg-gold-300"
        >
          New post
        </Link>
        <Link
          href="/admin/products/new"
          className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-mist-200 hover:border-gold-400 hover:text-gold-300"
        >
          New product
        </Link>
      </div>
    </div>
  );
}
