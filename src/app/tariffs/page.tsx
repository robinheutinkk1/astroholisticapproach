import type { Metadata } from "next";
import { CtaBlock, PageHeader } from "@/components/Layout";
import { CourseTariffSection, TariffSection } from "@/components/Tariffs";

export const metadata: Metadata = {
  title: "Method of Working & Tariff Structure",
  description: "Tariffs for consultations, readings and one-year courses. All sessions take place on Zoom.",
};

export default function TariffsPage() {
  return (
    <>
      <PageHeader
        trail={[{ label: "Tariffs" }]}
        eyebrow="The method"
        title='Method of working &amp; <span class="accent">tariff structure</span>'
        intro="Everything Milan offers, and what it costs. All sessions take place on Zoom."
      />
      <TariffSection />
      <CourseTariffSection />
      <CtaBlock
        title="Questions about a tariff?"
        body="Send a short message and Milan replies personally within 24 hours."
        links={[{ href: "/contact", label: "Send a message" }]}
      />
    </>
  );
}
