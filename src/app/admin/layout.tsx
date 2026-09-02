import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import { signOut } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

const adminNav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/posts", label: "Journal" },
  { href: "/admin/products", label: "Shop" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/messages", label: "Messages" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getAdminUser();
  if (!admin) redirect("/login");

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <p className="font-display text-2xl text-mist-100">Admin</p>
          <p className="text-sm text-mist-500">Signed in as {admin.email}</p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-mist-300 hover:border-gold-400 hover:text-gold-300"
          >
            Sign out
          </button>
        </form>
      </div>

      <nav className="mt-6 flex flex-wrap gap-2">
        {adminNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-mist-300 transition-colors hover:border-gold-500/40 hover:text-gold-300"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-10">{children}</div>
    </div>
  );
}
