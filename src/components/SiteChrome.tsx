import Link from "next/link";
import { CartProvider } from "@/components/CartProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/site";
import { env } from "@/lib/env";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  founder: { "@type": "Person", name: site.owner },
  description: site.description,
  url: env.siteUrl,
  email: site.email,
  address: { "@type": "PostalAddress", addressLocality: "Amsterdam", addressCountry: "NL" },
  areaServed: "Worldwide",
  priceRange: "€€",
};

/**
 * The public site's frame: menu bar, footer, cart. Every visitor-facing page
 * sits inside it; the admin does not, which is why it lives here rather than
 * in the root layout.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link className="skip-link" href="#app">
        Skip to content
      </Link>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <CartProvider>
        <SiteHeader />
        <main id="app" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </CartProvider>
    </>
  );
}
