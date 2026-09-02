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
      <h1 className="font-display text-2xl text-mist-100">Orders</h1>

      <ul className="mt-8 space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="rounded-2xl border border-white/10 bg-night-900/40 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-medium text-mist-100">
                  {order.customer_name ?? "—"}{" "}
                  <span className="text-mist-500">{order.email ?? ""}</span>
                </p>
                <p className="mt-1 text-sm text-mist-500">{formatDate(order.created_at)}</p>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-display text-xl text-gold-300">
                  {formatPrice(order.amount_cents, order.currency)}
                </p>
                <form action={setOrderStatus} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={order.id} />
                  <label className="sr-only" htmlFor={`status-${order.id}`}>
                    Order status
                  </label>
                  <select
                    id={`status-${order.id}`}
                    name="status"
                    defaultValue={order.status}
                    className="rounded-lg border border-white/15 bg-night-950 px-3 py-1.5 text-sm text-mist-100"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-mist-300 hover:border-gold-400 hover:text-gold-300"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>

            <ul className="mt-4 border-t border-white/10 pt-4 text-sm text-mist-300">
              {order.order_items?.map((item) => (
                <li key={item.id}>
                  {item.quantity} × {item.name} —{" "}
                  {formatPrice(item.unit_price_cents * item.quantity, order.currency)}
                </li>
              ))}
            </ul>
          </li>
        ))}

        {orders.length === 0 && (
          <li className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-mist-500">
            No orders yet.
          </li>
        )}
      </ul>
    </div>
  );
}
