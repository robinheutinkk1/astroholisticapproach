import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { Btn, CenteredCtas, InfoBox, PageHeader, PriceLines, Section } from "@/components/Layout";
import { cardPriceRows } from "@/content/readings";

export const metadata: Metadata = {
  title: "Rune Cards",
  description:
    "Rune Cards for guidance, insight and a fresh perspective on the challenges and opportunities you may encounter.",
};

export default async function RunePage() {
  const t = (await getSettings()).tariffs;

  return (
    <>
      <PageHeader
        trail={[{ label: "Cards", href: "/cards" }, { label: "Rune Cards" }]}
        eyebrow="Rune Cards"
        title='The wisdom of the Present, <span class="accent">the possibilities in the Future</span>'
      />
      <Section>
        <div className="intro-copy reveal" style={{ marginTop: 0 }}>
          <p>
            Each rune carries a unique meaning and represents different aspects of life, personal growth and spiritual
            wisdom. Rather than predicting a fixed future, Rune Cards offer guidance, insight and a fresh perspective on
            the challenges and opportunities you may encounter.
          </p>
          <p>
            Working with Rune Cards encourages self-reflection, intuition and a deeper connection with your inner wisdom.
            They can help you gain clarity, navigate life&rsquo;s transitions, and make more conscious decisions aligned
            with your personal path.
          </p>
        </div>

        <div className="grid-2 reveal">
          <InfoBox
            title="Who this is for"
            items={[
              "You are interested in mythology, ancient wisdom and symbolism",
              "You seek spiritual guidance and self-discovery",
              "You are looking for clarity during times of change or uncertainty",
              "You wish to explore personal growth through timeless symbols and archetypes",
            ]}
          />
          <InfoBox
            title="What you get"
            items={[
              "A Zoom session in which the runes are cast and explained",
              "Advice on the question or situation you bring",
            ]}
          >
            <PriceLines rows={cardPriceRows(t)} />
          </InfoBox>
        </div>

        <CenteredCtas>
          <Btn href="/contact?i=cards" arrow>
            Request a rune reading
          </Btn>
          <Btn href="/cards" variant="secondary">
            Back to all cards
          </Btn>
        </CenteredCtas>
      </Section>
    </>
  );
}
