import Link from "next/link";
import { footerNav, site } from "@/lib/site";

const socialIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
    </svg>
  ),
  spotify: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M7.5 10c3-1 6-.6 8.5.8M8 13c2.4-.8 4.8-.5 6.8.7M8.6 15.8c1.8-.6 3.6-.4 5.1.5" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M14 8h2V5h-2a3 3 0 00-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14v-2a1 1 0 011-1z" />
    </svg>
  ),
};

export function SiteFooter() {
  const socials = Object.entries(site.socials).filter(([, url]) => url);

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <span className="logo-mark" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#D4AF37" strokeWidth="1" />
                  <circle cx="12" cy="12" r="4" fill="#D4AF37" />
                </svg>
              </span>
              Holistic <em>Astro</em> Approach
            </Link>
            <p>{site.tagline}</p>
            {socials.length > 0 && (
              <div className="socials">
                {socials.map(([key, url]) => (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={key}>
                    {socialIcons[key]}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="footer-col">
            <h4>Practice</h4>
            <ul>
              {footerNav.practice.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Engage</h4>
            <ul>
              {footerNav.engage.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              {footerNav.contact.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-biz">
          <span>
            <strong>KvK</strong> {site.business.kvk}
          </span>
          <span>
            <strong>IBAN</strong> {site.business.iban}
          </span>
          <span>
            <strong>E-mail</strong> <a href={`mailto:${site.email}`}>{site.email}</a>
          </span>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name} · {site.owner} · All rights reserved.
          </span>
          <span>
            <Link href="/terms">Terms</Link> · <Link href="/terms">Privacy</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
