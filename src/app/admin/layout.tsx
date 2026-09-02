import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import { signOut } from "@/app/admin/actions";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getAdminUser();
  if (!admin) redirect("/login");

  return (
    <div className="admin-shell">
      <div className="admin-bar">
        <div>
          <h1 style={{ fontSize: "1.8rem" }}>Admin</h1>
          <p style={{ fontSize: "0.84rem", color: "var(--c-mute-2)" }}>Signed in as {admin.email}</p>
        </div>
        <form action={signOut}>
          <button type="submit" className="admin-ghost">
            Sign out
          </button>
        </form>
      </div>

      <div className="admin-layout">
        <AdminSidebar />
        <div className="admin-main">{children}</div>
      </div>
    </div>
  );
}
