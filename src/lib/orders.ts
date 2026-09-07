import type { OrderStatus } from "@/lib/types";

/** Every status the admin may set, in the order a reservation moves through them. */
export const ORDER_STATUSES: OrderStatus[] = ["requested", "confirmed", "fulfilled", "cancelled", "pending", "paid"];

/** How each status reads to Milan, and what it does to stock. */
export const STATUS_LABELS: Record<OrderStatus, { label: string; hint: string }> = {
  requested: { label: "Requested", hint: "New, not looked at yet" },
  confirmed: { label: "Confirmed", hint: "You said yes; the pieces are held for this customer" },
  fulfilled: { label: "Fulfilled", hint: "Paid and delivered" },
  cancelled: { label: "Cancelled", hint: "Declined or dropped. The pieces are released again" },
  pending: { label: "Pending payment", hint: "Started an online payment (not in use)" },
  paid: { label: "Paid online", hint: "Paid through the site (not in use)" },
};
