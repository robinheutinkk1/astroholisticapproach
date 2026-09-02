import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { formatDate, formatPrice } from "@/lib/format";
import { setOrderStatus } from "@/app/admin/actions";
import type { Order, OrderItem } from "@/lib/types";

export const dynamic = "force-dynamic";

const statuses = ["pending", "paid", "fulfilled", "cancelled"] as const;

export default async function AdminOrdersPage() {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false })
    .limit(100);

  const orders = (data ?? []) as (Order & { order_items: OrderItem[] })[];

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem" }}>Orders</h2>

      <div style={{ display: "grid", gap: 16, marginTop: 28 }}>
        {orders.map((order) => (
          <div className="admin-card" key={order.id}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between" }}>
              <div>
                <strong>{order.customer_name ?? "—"}</strong>{" "}
                <span style={{ color: "var(--c-mute-2)" }}>{order.email ?? ""}</span>
                <div className="sub" style={{ fontSize: "0.8rem", color: "var(--c-mute-2)", marginTop: 4 }}>
                  {formatDate(order.created_at)}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <strong style={{ color: "var(--c-gold)", fontSize: "1.1rem" }}>
                  {formatPrice(order.amount_cents, order.currency)}
                </strong>
                <form action={setOrderStatus} className="admin-form" style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input type="hidden" name="id" value={order.id} />
                  <label className="sr-only" htmlFor={`status-${order.id}`}>
                    Order status
                  </label>
                  <select id={`status-${order.id}`} name="status" defaultValue={order.status} style={{ width: "auto" }}>
                    {statuses.map((status) => (
                      <option value={status} key={status}>
                        {status}
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
                  {item.quantity} × {item.name} — {formatPrice(item.unit_price_cents * item.quantity, order.currency)}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {orders.length === 0 && <div className="empty-state">No orders yet.</div>}
      </div>
    </div>
  );
}
