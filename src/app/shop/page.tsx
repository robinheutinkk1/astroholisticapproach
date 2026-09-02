import type { Metadata } from "next";
import { CtaBlock, PageHeader, Section } from "@/components/Layout";
import { ShopGrid } from "@/components/ShopGrid";
import { getActiveProducts } from "@/lib/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Healing jewelry, crystals, personalised astrology reports and Ayurveda guides from Holistic Astro Approach.",
};

export default async function ShopPage() {
  const products = await getActiveProducts();

  return (
    <>
      <PageHeader
        trail={[{ label: "Shop" }]}
        eyebrow="Shop"
        title='Jewelry, crystals <span class="accent">and written work</span>'
        intro="Healing jewelry, crystals, personalised astrology reports and Ayurveda guides. Personalised pieces are made to your chart, so those are quoted on request."
      />
      <Section>
        {products.length > 0 ? (
          <ShopGrid products={products} />
        ) : (
          <div className="empty-state reveal">
            <p>Nothing is listed at the moment.</p>
            <p>Products added in the admin area appear here.</p>
          </div>
        )}
      </Section>
      <CtaBlock
        title="Looking for something personalised?"
        body="Send a short message and Milan will select the stones or write the report from your own chart."
        links={[{ href: "/contact?i=shop", label: "Send a message" }]}
      />
    </>
  );
}
