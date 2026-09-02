import type { Metadata } from "next";
import { CtaBlock, PageHeader, Section } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { getActiveProducts } from "@/lib/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Healing Jewelry, Bracelets & Pendants",
  description: "Healing bracelets and pendants with stones selected for your chart and current focus.",
};

export default async function JewelryPage() {
  const products = await getActiveProducts({ category: "jewelry" });

  return (
    <>
      <PageHeader
        trail={[{ label: "Crystals &amp; Jewelry", href: "/healing" }, { label: "Jewelry" }]}
        eyebrow="Jewelry"
        title='Wear what <span class="accent">supports you</span>'
        intro="Available ready-made in the shop, or personalised after advice and custom made. All crystals and healing stones are carefully selected and originate from all parts of the world."
      />
      <Section>
        {products.length > 0 ? (
          <div className="grid-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="lead" style={{ textAlign: "center", margin: "0 auto" }}>
            No pieces are listed at the moment. Send a message and Milan will make one to your chart.
          </p>
        )}
      </Section>
      <CtaBlock
        title="Want a personalised piece?"
        body="Send a short message and Milan will suggest stones based on your chart."
        links={[{ href: "/contact?i=crystals", label: "Inquire about a piece" }]}
      />
    </>
  );
}
