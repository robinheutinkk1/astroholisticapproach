import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/site";
import { getSettings } from "@/lib/settings";
import { Analytics } from "@vercel/analytics/next";
import { env } from "@/lib/env";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    metadataBase: new URL(env.siteUrl),
    title: {
      default: `${site.name} — Astrology, Cards, Positive Psychology & Ayurveda`,
      template: `%s | ${site.name}`,
    },
    description: settings.brand.description,
    openGraph: {
      type: "website",
      siteName: site.name,
      title: site.name,
      description: settings.brand.description,
      url: env.siteUrl,
      // Relative paths resolve against metadataBase, so a shared link shows a
      // picture instead of a bare headline.
      images: [{ url: settings.seo.shareImage, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>
        <Link className="skip-link" href="#app">
          Skip to content
        </Link>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <CartProvider>
          <SiteHeader />
          <main id="app" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </CartProvider>
        {/* Page views only, no cookies and no cross-site tracking, so this
            needs no consent banner. */}
        <Analytics />
      </body>
    </html>
  );
}
