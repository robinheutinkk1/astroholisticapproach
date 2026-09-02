import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Cart",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <Section className="py-20">
      <PageHeader title="Your cart" />
      <div className="mx-auto mt-12 max-w-2xl">
        <CartView />
      </div>
    </Section>
  );
}
