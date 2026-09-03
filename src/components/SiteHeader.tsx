"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { useCart } from "@/components/CartProvider";

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 5h2l1.6 9.2a2 2 0 002 1.8h6.9a2 2 0 002-1.6L20 8H7" />
      <circle cx="10" cy="19.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="17" cy="19.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
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

  // Close on route change.
  useEffect(() => {
    setMenuOpen(false);
    setOpenItem(null);
  }, [pathname]);

  // While the panel covers the screen, Escape closes it and the page behind
  // it stays put instead of scrolling away underneath.
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  // Rendered as 0 until hydration, so the server and client markup match.
  const cartCount = ready ? itemCount : 0;
  const cartLabel = cartCount > 0 ? `Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}` : "Cart, empty";

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}${menuOpen ? " menu-open" : ""}`} id="nav">
      <div className="container nav-inner">
        <Link href="/" className="logo" aria-label="Holistic Astro Approach home">
          <span className="logo-mark" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#D4AF37" strokeWidth="1" />
              <circle cx="12" cy="12" r="4" fill="#D4AF37" />
              <circle cx="12" cy="3" r="1.2" fill="#D4AF37" />
            </svg>
          </span>
          Holistic <em>Astro</em> Approach
        </Link>

        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          <li className="nav-panel-head">
            <Link href="/cart" className="nav-cart-inline" aria-label={cartLabel}>
              <CartIcon />
              Cart
              {cartCount > 0 && <span className="count">{cartCount}</span>}
            </Link>
            <button type="button" className="nav-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </li>

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

        <Link href="/cart" className="nav-cart" aria-label={cartLabel}>
          <CartIcon />
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
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
