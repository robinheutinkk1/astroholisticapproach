import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-night-900/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <p className="font-display text-lg text-mist-100">
            Holistic Astro <span className="text-gold-300">Approach</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-mist-500">{site.tagline}</p>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide text-mist-200 uppercase">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-mist-500 transition-colors hover:text-gold-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide text-mist-200 uppercase">Legal</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/privacy" className="text-mist-500 transition-colors hover:text-gold-300">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-mist-500 transition-colors hover:text-gold-300">
                Terms &amp; refunds
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 px-5 py-5">
        <p className="mx-auto max-w-6xl text-xs text-mist-500">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
