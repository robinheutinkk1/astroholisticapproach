import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/Layout";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Cart",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <>
      <PageHeader trail={[{ label: "Shop", href: "/shop" }, { label: "Cart" }]} eyebrow="Shop" title="Your cart" />
      <Section>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <CartView />
        </div>
      </Section>
    </>
  );
}
