import Link from "next/link";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { formatPrice, timeAgo } from "@/lib/format";
import { interests } from "@/content/faq";

export const dynamic = "force-dynamic";

type Activity = {
  id: string;
  kind: "reservation" | "message";
  who: string;
  what: string;
  when: string;
  href: string;
  waiting: boolean;
};

/**
 * The overview answers two questions: what needs Milan today, and what came in
 * lately. Counts that need no reply (how many articles exist, how many drafts)
 * are not decisions, so they sit in one line at the bottom rather than taking
 * a tile each.
 */
async function getOverview() {
  const supabase = createSupabaseAdminClient();
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const [requested, unhandled, confirmed, soldOut, earned, posts, drafts, products, lastPost, recentOrders, recentMessages] =
    await Promise.all([
      supabase.from("orders").select("id", { count: "exact", head: true }).eq("status", "requested"),
      supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("handled", false),
      supabase.from("orders").select("amount_cents", { count: "exact" }).eq("status", "confirmed"),
      // Active, but nothing left: the shop shows these as sold out.
      supabase.from("products").select("id", { count: "exact", head: true }).eq("active", true).eq("stock", 0),
      supabase.from("orders").select("amount_cents, currency, created_at").in("status", ["paid", "fulfilled"]),
      supabase.from("posts").select("id", { count: "exact", head: true }).eq("published", true),
      supabase.from("posts").select("id", { count: "exact", head: true }).eq("published", false),
      supabase.from("products").select("id", { count: "exact", head: true }).eq("active", true),
      supabase.from("posts").select("published_at").eq("published", true).order("published_at", { ascending: false, nullsFirst: false }).limit(1).maybeSingle(),
      supabase.from("orders").select("id, customer_name, email, status, amount_cents, currency, created_at").order("created_at", { ascending: false }).limit(6),
      supabase.from("contact_messages").select("id, first_name, last_name, interest, handled, created_at").order("created_at", { ascending: false }).limit(6),
    ]);

  const paid = earned.data ?? [];
  const currency = paid[0]?.currency ?? "eur";
  const sum = (rows: { amount_cents: number }[]) => rows.reduce((total, row) => total + row.amount_cents, 0);

  const activity: Activity[] = [
    ...(recentOrders.data ?? []).map((order) => ({
      id: `o-${order.id}`,
      kind: "reservation" as const,
      who: order.customer_name ?? order.email ?? "Someone",
      what: `Reservation, ${formatPrice(order.amount_cents, order.currency)}`,
      when: order.created_at,
      href: "/admin/orders",
      waiting: order.status === "requested",
    })),
    ...(recentMessages.data ?? []).map((message) => ({
      id: `m-${message.id}`,
      kind: "message" as const,
      who: `${message.first_name} ${message.last_name}`.trim(),
      what: interests.find((option) => option.value === message.interest)?.label ?? "Message",
      when: message.created_at,
      href: "/admin/messages",
      waiting: !message.handled,
    })),
  ]
    .sort((a, b) => b.when.localeCompare(a.when))
    .slice(0, 6);

  return {
    requested: requested.count ?? 0,
    unhandled: unhandled.count ?? 0,
    confirmed: confirmed.count ?? 0,
    confirmedCents: sum(confirmed.data ?? []),
    soldOut: soldOut.count ?? 0,
    monthCents: sum(paid.filter((order) => new Date(order.created_at) >= monthStart)),
    totalCents: sum(paid),
    currency,
    posts: posts.count ?? 0,
    drafts: drafts.count ?? 0,
    products: products.count ?? 0,
    lastPost: lastPost.data?.published_at ?? null,
    activity,
  };
}

export default async function AdminDashboard() {
  const s = await getOverview();

  const tiles: { label: string; value: string; note?: string; href: string; open?: boolean }[] = [
    {
      label: "Reservations to answer",
      value: String(s.requested),
      note: s.requested ? "Waiting for your reply" : "Nothing waiting",
      href: "/admin/orders",
      open: s.requested > 0,
    },
    {
      label: "Messages to read",
      value: String(s.unhandled),
      note: s.unhandled ? "From the contact form" : "All read",
      href: "/admin/messages",
      open: s.unhandled > 0,
    },
    {
      label: "Confirmed, to deliver",
      value: String(s.confirmed),
      note: s.confirmed ? `${formatPrice(s.confirmedCents, s.currency)} held` : "Nothing in hand",
      href: "/admin/orders",
      open: s.confirmed > 0,
    },
    {
      label: "Sold out in the shop",
      value: String(s.soldOut),
      note: s.soldOut ? "Still listed, nothing left" : "Everything in stock",
      href: "/admin/products",
      open: s.soldOut > 0,
    },
    { label: "Earned this month", value: formatPrice(s.monthCents, s.currency), note: "Fulfilled reservations", href: "/admin/orders" },
    { label: "Earned in total", value: formatPrice(s.totalCents, s.currency), note: "Since the start", href: "/admin/orders" },
  ];

  return (
    <div>
      <h2>Overview</h2>
      <p className="admin-lede">What needs you today, and what came in lately.</p>

      <div className="admin-grid">
        {tiles.map((tile) => (
          <Link className="admin-tile" href={tile.href} key={tile.label}>
            <span className="label">{tile.label}</span>
            <div className={`value${tile.open ? " is-open" : ""}`}>{tile.value}</div>
            {tile.note && <span className="note">{tile.note}</span>}
          </Link>
        ))}
      </div>

      <h3 className="admin-section-head">Lately</h3>
      {s.activity.length > 0 ? (
        <ul className="admin-feed">
          {s.activity.map((item) => (
            <li key={item.id}>
              <Link href={item.href}>
                <span className={`admin-feed-dot${item.waiting ? " waiting" : ""}`} aria-hidden="true" />
                <span className="admin-feed-who">{item.who}</span>
                <span className="admin-feed-what">{item.what}</span>
                <span className="admin-feed-when">{timeAgo(item.when)}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="admin-lede">Nothing has come in yet. Reservations and messages appear here.</p>
      )}

      <div className="admin-quick">
        <Link href="/admin/posts/new" className="btn btn-primary">
          Write an article
        </Link>
        <Link href="/admin/products/new" className="btn btn-secondary">
          Add a product
        </Link>
      </div>

      <p className="admin-footnote">
        <Link href="/admin/posts">
          {s.posts} {s.posts === 1 ? "article" : "articles"} published
        </Link>
        {s.drafts > 0 && (
          <>
            {" · "}
            <Link href="/admin/posts">{s.drafts} in draft</Link>
          </>
        )}
        {" · "}
        <Link href="/admin/products">
          {s.products} {s.products === 1 ? "product" : "products"} in the shop
        </Link>
        {s.lastPost && <> · Last article {timeAgo(s.lastPost).toLowerCase()}</>}
      </p>
    </div>
  );
}
