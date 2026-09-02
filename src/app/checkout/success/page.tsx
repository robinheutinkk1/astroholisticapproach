import type { Metadata } from "next";
import { Btn, PageHeader, Section } from "@/components/Layout";
import { ClearCartOnMount } from "@/components/ClearCartOnMount";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false },
};

export default function CheckoutSuccessPage() {
  return (
    <>
      <ClearCartOnMount />
      <PageHeader
        trail={[{ label: "Shop", href: "/shop" }, { label: "Thank you" }]}
        eyebrow="Order received"
        title='Payment <span class="accent">received</span>'
        intro="Thank you. A confirmation is on its way to the email address you used at checkout, and Milan will be in touch about the next step."
      />
      <Section>
        <div className="cta-block reveal">
          <h2>What happens next</h2>
          <p>
            Written work and downloads are sent by e-mail. Pieces made to your chart start with a short message from
            Milan about the stones. Anything you would like to add, just reply to the confirmation.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn href="/shop" variant="secondary">
              Back to the shop
            </Btn>
            <Btn href="/" arrow>
              Back to the site
            </Btn>
          </div>
        </div>
      </Section>
    </>
  );
}
