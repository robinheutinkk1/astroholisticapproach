"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { useCart } from "@/components/CartProvider";

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="logo" aria-label="Holistic Astro Approach home" onClick={onClick}>
      <span className="logo-mark" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#D4AF37" strokeWidth="1" />
          <circle cx="12" cy="12" r="4" fill="#D4AF37" />
          <circle cx="12" cy="3" r="1.2" fill="#D4AF37" />
        </svg>
      </span>
      Holistic <em>Astro</em> Approach
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount, ready } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setOpenItem(null);
  }, [pathname]);

  const cartCount = ready ? itemCount : 0;

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
      <div className="container nav-inner">
        <Logo />

        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            if (!item.children) {
              return (
                <li className="nav-item" key={item.href}>
                  <Link href={item.href} className={`nav-link${active ? " active" : ""}`}>
                    {item.label}
                  </Link>
                </li>
              );
            }
            return (
              <li
                className={`nav-item${openItem === item.href ? " open" : ""}`}
                key={item.href}
                data-has-children=""
              >
                <div className="nav-link-wrap">
                  <Link href={item.href} className={`nav-link${active ? " active" : ""}`}>
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    className="nav-chev"
                    aria-label={`Toggle ${item.label} submenu`}
                    aria-expanded={openItem === item.href}
                    onClick={() => setOpenItem((current) => (current === item.href ? null : item.href))}
                  >
                    <svg viewBox="0 0 12 12">
                      <path
                        d="M3 4.5l3 3 3-3"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div className="nav-dropdown">
                  {item.children.map((child) => (
                    <Link href={child.href} key={child.href}>
                      <span>{child.label}</span>
                      <small>{child.sub}</small>
                    </Link>
                  ))}
                </div>
              </li>
            );
          })}
          <li className="nav-cta-mobile">
            <Link href="/contact" className="nav-cta">
              Book a session
            </Link>
          </li>
        </ul>

        <div className="nav-right">
          {cartCount > 0 && (
            <Link href="/cart" className="nav-link" aria-label={`Cart, ${cartCount} items`}>
              Cart ({cartCount})
            </Link>
          )}
          <Link href="/contact" className="nav-cta">
            Book a session
          </Link>
        </div>

        <button
          type="button"
          className={`nav-toggle${menuOpen ? " open" : ""}`}
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
