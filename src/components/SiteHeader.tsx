"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";
import { useCart } from "@/components/CartProvider";

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount, ready } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span aria-hidden className="text-lg text-gold-300">
            ✷
          </span>
          <span className="font-display text-lg leading-tight tracking-wide text-mist-100">
            Holistic Astro <span className="text-gold-300">Approach</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {site.nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  active ? "text-gold-300" : "text-mist-300 hover:text-mist-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <CartLink itemCount={ready ? itemCount : 0} />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <CartLink itemCount={ready ? itemCount : 0} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="rounded-md border border-white/15 px-2.5 py-1.5 text-mist-200"
          >
            <span aria-hidden>{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-5 py-3 md:hidden">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-mist-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function CartLink({ itemCount }: { itemCount: number }) {
  return (
    <Link
      href="/cart"
      className="relative rounded-full border border-gold-500/40 px-3.5 py-1.5 text-sm text-gold-300 transition-colors hover:border-gold-400 hover:text-gold-400"
    >
      Cart
      {itemCount > 0 && (
        <span className="ml-1.5 rounded-full bg-gold-400 px-1.5 py-0.5 text-xs font-semibold text-night-950">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
