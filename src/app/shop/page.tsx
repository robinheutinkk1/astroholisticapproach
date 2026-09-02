import type { Metadata } from "next";
import { getActiveProducts } from "@/lib/queries";
import { EmptyState, PageHeader, Section } from "@/components/ui";
import { ProductCard } from "@/components/ProductCard";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Readings",
  description: "Natal chart readings, solar returns, synastry and downloadable material.",
};

export default async function ShopPage() {
  const products = await getActiveProducts();

  return (
    <Section className="py-20">
      <PageHeader
        eyebrow="Readings"
        title="Sessions and material"
        intro="Every session is prepared in advance and recorded. Booking details arrive by email once payment is confirmed."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="mt-14">
          <EmptyState
            title="Nothing listed yet."
            hint="Active products from the admin CMS appear here."
          />
        </div>
      )}
    </Section>
  );
}
