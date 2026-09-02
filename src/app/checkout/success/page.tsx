import type { Metadata } from "next";
import { Button, Section } from "@/components/ui";
import { ClearCartOnMount } from "@/components/ClearCartOnMount";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false },
};

export default function CheckoutSuccessPage() {
  return (
    <Section className="py-28">
      <ClearCartOnMount />
      <div className="mx-auto max-w-lg text-center">
        <p aria-hidden className="text-4xl text-gold-300">
          ✷
        </p>
        <h1 className="mt-6 font-display text-4xl text-mist-100">Payment received</h1>
        <p className="mt-5 leading-relaxed text-mist-300">
          Thank you. A confirmation is on its way to the email address you used at checkout, along
          with everything you need for the next step — a booking link for sessions, or a download
          link for written material.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/blog" variant="ghost">
            Read the journal
          </Button>
          <Button href="/">Back to the site</Button>
        </div>
      </div>
    </Section>
  );
}
