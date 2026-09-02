import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import { signOut } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const adminNav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/posts", label: "Blog" },
  { href: "/admin/products", label: "Shop" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/messages", label: "Messages" },
];

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

      <nav className="admin-nav">
        {adminNav.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div style={{ marginTop: 40 }}>{children}</div>
    </div>
  );
}
