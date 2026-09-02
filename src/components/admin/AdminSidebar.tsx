"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const groups = [
  {
    label: "Content",
    items: [
      { href: "/admin/posts", label: "Blog" },
      { href: "/admin/products", label: "Shop" },
      { href: "/admin/tariffs", label: "Tariffs" },
      { href: "/admin/faq", label: "FAQ" },
      { href: "/admin/sessions", label: "Sessions" },
    ],
  },
  {
    label: "Inbox",
    items: [
      { href: "/admin/orders", label: "Orders" },
      { href: "/admin/messages", label: "Messages" },
    ],
  },
  {
    label: "Site",
    items: [{ href: "/admin/site", label: "Details & socials" }],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="admin-side" aria-label="Admin sections">
      <Link href="/admin" className={`admin-side-link${pathname === "/admin" ? " active" : ""}`}>
        Overview
      </Link>

      {groups.map((group) => (
        <div className="admin-side-group" key={group.label}>
          <p className="admin-side-label">{group.label}</p>
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-side-link${pathname.startsWith(item.href) ? " active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
