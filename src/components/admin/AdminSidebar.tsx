"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/admin/actions";

type Counts = { reservations: number; messages: number };

type Item = { href: string; label: string; icon: keyof typeof icons; count?: keyof Counts };

const groups: { label: string; items: Item[] }[] = [
  {
    label: "Content",
    items: [
      { href: "/admin/posts", label: "Blog", icon: "pen" },
      { href: "/admin/products", label: "Shop", icon: "bag" },
      { href: "/admin/tariffs", label: "Tariffs", icon: "tag" },
      { href: "/admin/faq", label: "FAQ", icon: "question" },
      { href: "/admin/sessions", label: "Sessions", icon: "calendar" },
    ],
  },
  {
    label: "Inbox",
    items: [
      { href: "/admin/orders", label: "Reservations", icon: "inbox", count: "reservations" },
      { href: "/admin/messages", label: "Messages", icon: "mail", count: "messages" },
    ],
  },
  {
    label: "Site",
    items: [
      { href: "/admin/site", label: "Details & socials", icon: "globe" },
      { href: "/admin/account", label: "Your account", icon: "user" },
    ],
  },
];

/** 20px line icons on a 24 grid, drawn inline so nothing has to load. */
const icons = {
  home: <path d="M3 11.5 12 4l9 7.5M5 10v10h5v-6h4v6h5V10" />,
  pen: <path d="M4 20h4l10.5-10.5a2 2 0 0 0 0-2.8l-1.2-1.2a2 2 0 0 0-2.8 0L4 16v4zM13 7l4 4" />,
  bag: <path d="M6 8h12l1 12H5L6 8zM9 8V6a3 3 0 0 1 6 0v2" />,
  tag: <path d="M3 12V4h8l9 9-8 8-9-9zM7.5 7.5h.01" />,
  question: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17h.01" />,
  calendar: <path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4" />,
  inbox: <path d="M4 4h16v16H4zM4 14h4l2 3h4l2-3h4" />,
  mail: <path d="M3 6h18v12H3zM3 7l9 6 9-6" />,
  globe: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />,
  user: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" />,
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6" />,
  lock: <path d="M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4" />,
};

function Icon({ name }: { name: keyof typeof icons }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

export function AdminSidebar({ email, counts }: { email: string; counts: Counts }) {
  const pathname = usePathname();

  return (
    <nav className="admin-side" aria-label="Admin sections">
      <Link href="/admin" className="admin-side-brand">
        <span className="logo-mark" aria-hidden="true">
          {/* The same mark as the site header, gold and with explicit width and
              height: an inline SVG with only a viewBox collapses inside a flex
              box in some browsers. */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#D4AF37" strokeWidth="1" />
            <circle cx="12" cy="12" r="4" fill="#D4AF37" />
            <circle cx="12" cy="3" r="1.2" fill="#D4AF37" />
          </svg>
        </span>
        <span className="admin-side-brand-text">
          {/* One span, one flex item: bare text beside an <em> would become
              three items stacked in the column. */}
          <span>
            Holistic <em>Astro</em> Approach
          </span>
          <small>Admin</small>
        </span>
      </Link>

      <div className="admin-side-scroll">
        <Link href="/admin" className={`admin-side-link${pathname === "/admin" ? " active" : ""}`}>
          <Icon name="home" />
          <span>Overview</span>
        </Link>

        {groups.map((group) => (
          <div className="admin-side-group" key={group.label}>
            <p className="admin-side-label">{group.label}</p>
            {group.items.map((item) => {
              const count = item.count ? counts[item.count] : 0;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-side-link${pathname.startsWith(item.href) ? " active" : ""}`}
                >
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                  {count > 0 && (
                    <span className="admin-side-count" aria-label={`${count} waiting`}>
                      {count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      <div className="admin-side-foot">
        <p className="admin-side-user">
          <strong>{email}</strong>
          <span>Admin</span>
        </p>
        <a href="/" className="admin-side-link" target="_blank" rel="noopener">
          <Icon name="external" />
          <span>View the website</span>
        </a>
        <form action={signOut}>
          <button type="submit" className="admin-side-link">
            <Icon name="lock" />
            <span>Sign out</span>
          </button>
        </form>
      </div>
    </nav>
  );
}
