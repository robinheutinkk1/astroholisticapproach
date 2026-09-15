import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

/** What is waiting for Milan, shown as counts beside the menu items. */
async function getOpenCounts() {
  const supabase = createSupabaseAdminClient();
  const [reservations, messages] = await Promise.all([
    supabase.from("orders").select("id", { count: "exact", head: true }).eq("status", "requested"),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("handled", false),
  ]);
  return { reservations: reservations.count ?? 0, messages: messages.count ?? 0 };
}

/**
 * The admin's own frame: a full-height sidebar in the site's colours and a
 * white working area. It lives outside the (site) route group on purpose,
 * so the public menu bar and footer are not part of it.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getAdminUser();
  if (!admin) redirect("/login");

  const counts = await getOpenCounts();

  return (
    <div className="admin-shell">
      <AdminSidebar email={admin.email} counts={counts} />
      <div className="admin-main">{children}</div>
    </div>
  );
}
