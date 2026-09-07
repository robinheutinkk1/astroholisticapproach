import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { formatDate, formatPrice } from "@/lib/format";
import { setOrderStatus } from "@/app/admin/actions";
import { ORDER_STATUSES, STATUS_LABELS } from "@/lib/orders";
import type { Order, OrderItem, OrderStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

type OrderRow = Order & { order_items: OrderItem[] };

/** New reservations first, then anything still open, then the finished ones. */
const RANK: Record<OrderStatus, number> = { requested: 0, confirmed: 1, pending: 2, paid: 2, fulfilled: 3, cancelled: 4 };

export default async function AdminOrdersPage() {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false })
    .limit(200);

  const orders = ((data ?? []) as OrderRow[]).sort((a, b) => RANK[a.status] - RANK[b.status]);
  const open = orders.filter((order) => order.status === "requested").length;

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem" }}>Reservations &amp; orders</h2>
      <p style={{ color: "var(--c-mute-2)", fontSize: "0.86rem", margin: "8px 0 0" }}>
        {open === 0 ? "Nothing waiting for you." : open === 1 ? "One reservation waiting for a reply." : `${open} reservations waiting for a reply.`}{" "}
        Set a reservation to <strong style={{ color: "var(--c-light)" }}>Confirmed</strong> once you have said yes (that holds the pieces), and to <strong style={{ color: "var(--c-light)" }}>Cancelled</strong> to release them again.
      </p>

      <div style={{ display: "grid", gap: 16, marginTop: 28 }}>
        {orders.map((order) => (
          <div className={`admin-card${order.status === "requested" ? " unread" : ""}`} key={order.id}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between" }}>
              <div style={{ minWidth: 0 }}>
                <span className={`order-pill status-${order.status}`}>{STATUS_LABELS[order.status].label}</span>
                <div style={{ marginTop: 10 }}>
                  <strong>{order.customer_name ?? "No name given"}</strong>
                </div>
                <div className="order-contact">
                  {order.email && <a href={mailto(order)}>{order.email}</a>}
                  {order.phone && <span>{order.phone}</span>}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--c-mute-2)", marginTop: 4 }}>{formatDate(order.created_at)}</div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <strong style={{ color: "var(--c-gold)", fontSize: "1.1rem" }}>
                  {formatPrice(order.amount_cents, order.currency)}
                </strong>
                <form action={setOrderStatus} className="admin-form" style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input type="hidden" name="id" value={order.id} />
                  <label className="sr-only" htmlFor={`status-${order.id}`}>
                    Status
                  </label>
                  <select id={`status-${order.id}`} name="status" defaultValue={order.status} style={{ width: "auto" }}>
                    {ORDER_STATUSES.filter((status) => status !== "pending" && status !== "paid" || status === order.status).map((status) => (
                      <option value={status} key={status} title={STATUS_LABELS[status].hint}>
                        {STATUS_LABELS[status].label}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="admin-ghost">
                    Update
                  </button>
                </form>
              </div>
            </div>

            <ul style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--c-line-soft)", color: "var(--c-mute)", fontSize: "0.9rem" }}>
              {order.order_items?.map((item) => (
                <li key={item.id}>
                  {item.quantity} × {item.name}, {formatPrice(item.unit_price_cents * item.quantity, order.currency)}
                </li>
              ))}
            </ul>

            {order.note && (
              <p className="order-note">
                <span>Their note</span>
                {order.note}
              </p>
            )}

            {order.email && order.status === "requested" && (
              <a className="admin-ghost" href={mailto(order)} style={{ display: "inline-block", marginTop: 14 }}>
                Reply to {order.customer_name?.split(" ")[0] ?? "the customer"} by e-mail
              </a>
            )}
          </div>
        ))}

        {orders.length === 0 && <div className="empty-state">No reservations yet.</div>}
      </div>
    </div>
  );
}

/** Opens Milan's own mail app with the address and a subject already filled in. */
function mailto(order: OrderRow): string {
  const pieces = order.order_items.map((item) => `${item.quantity} × ${item.name}`).join(", ");
  const subject = `Your reservation at Holistic Astro Approach: ${pieces}`;
  return `mailto:${order.email}?subject=${encodeURIComponent(subject)}`;
}
