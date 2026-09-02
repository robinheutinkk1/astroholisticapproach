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

  // Rendered as 0 until hydration, so the server and client markup match.
  const cartCount = ready ? itemCount : 0;
  const cartLabel = cartCount > 0 ? `Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}` : "Cart, empty";

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

        {/* Outside .nav-right, which the stylesheet hides below 1400px — the
            cart has to stay reachable at every width, and reachable while it
            is still empty. */}
        <Link href="/cart" className="nav-cart" aria-label={cartLabel}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M4 5h2l1.6 9.2a2 2 0 002 1.8h6.9a2 2 0 002-1.6L20 8H7" />
            <circle cx="10" cy="19.5" r="1.2" fill="currentColor" stroke="none" />
            <circle cx="17" cy="19.5" r="1.2" fill="currentColor" stroke="none" />
          </svg>
          <span className="nav-cart-label">Cart</span>
          {cartCount > 0 && <span className="count">{cartCount}</span>}
        </Link>

        <div className="nav-right">
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
