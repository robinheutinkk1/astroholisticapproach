import type { Metadata } from "next";
import { Btn, CenteredCtas, CtaBlock, InfoBox, PageHeader, PriceLines, Section } from "@/components/Layout";
import { prices } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Crystals & Stones Advice",
  description: "Advice to identify which crystals and stones match you, and how to use them.",
};

export default function CrystalsPage() {
  return (
    <>
      <PageHeader
        trail={[{ label: "Crystals &amp; Jewelry", href: "/healing" }, { label: "Crystals &amp; Stones" }]}
        eyebrow="Crystals &amp; Stones"
        title='Which Crystals &amp; Stones, <span class="accent">and why</span>'
        intro="Advice to identify which crystals and stones are matching for you, and which may help you cultivate protection, grounding, emotional harmony, or spiritual connection."
      />
      <Section>
        <div className="grid-2 reveal">
          <InfoBox
            title="Who this is for"
            items={[
              "You want to work with energy and deepen your spiritual practice",
              "You want to feel more grounded and protected by wearing crystals and stones",
              "You want to bring greater balance into your daily life",
            ]}
          />
          <InfoBox
            title="What you get"
            items={[
              "Advice on which crystals and stones are matching for you",
              "An explanation of their meaning and how to use them",
            ]}
          >
            <PriceLines
              rows={[
                { label: "Advice on one specific crystal or stone", sub: "30-minute Zoom session", price: prices.crystals.single },
                { label: "Advice on crystals &amp; stones", sub: "60-minute Zoom session", price: prices.crystals.hour },
                { label: "Additional hour", sub: "After the first hour", price: prices.crystals.extraHour },
              ]}
            />
          </InfoBox>
        </div>

        <CenteredCtas>
          <Btn href="/contact?i=crystals" arrow>
            Request advice
          </Btn>
          <Btn href="/healing/jewelry" variant="secondary">
            See the jewelry
          </Btn>
        </CenteredCtas>
      </Section>
      <CtaBlock
        title="Not sure which stones fit?"
        body="Describe what you are working with in a short message and Milan will suggest where to start."
        links={[{ href: "/contact?i=crystals", label: "Send a message" }]}
      />
    </>
  );
}
