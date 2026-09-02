import type { Metadata } from "next";
import { CtaBlock, PageHeader, Section } from "@/components/Layout";
import { AboutSplit } from "@/components/AboutSplit";
import { MethodSection } from "@/components/MethodSection";

export const metadata: Metadata = {
  title: "About, Milan Landkroon",
  description:
    "Milan Landkroon, 47, Amsterdam. Twenty five years of certified study across astrology, card readings, positive psychology and Ayurveda.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        trail={[{ label: "About" }]}
        eyebrow="About me"
        title='Milan Landkroon, <span class="accent">a 25-year practice</span>'
        intro="May I introduce myself."
      />
      <Section>
        <AboutSplit />
      </Section>
      <MethodSection />
      <CtaBlock
        title="Ready to start?"
        body="Send a short message describing what you are working with, and Milan will suggest the right starting point."
        links={[
          { href: "/contact", label: "Send a message" },
          { href: "/tariffs", label: "See tariffs" },
        ]}
      />
    </>
  );
}
