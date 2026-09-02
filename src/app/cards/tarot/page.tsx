import type { Metadata } from "next";
import Link from "next/link";
import { Btn, CenteredCtas, InfoBox, PageHeader, PriceLines, Section } from "@/components/Layout";
import { CardGrid } from "@/components/PageTemplates";
import { prices } from "@/content/pricing";
import { cardPriceRows } from "@/content/readings";

export const metadata: Metadata = {
  title: "Tarot Cards, Traditional, Astrology & Angel Tarot",
  description: "Traditional Tarot, Astrology Tarot and Angel Tarot readings for clarity during times of change.",
};

const kinds = [
  {
    title: "Traditional Tarot",
    desc: "Uses the classic 78-card structure, the Major and Minor Arcana, to provide insight, guidance and self-reflection on life&#39;s questions and experiences.",
  },
  {
    title: "Astrology Tarot",
    desc: "Combines the symbolism of Tarot with astrological wisdom, connecting the cards to planets, zodiac signs and cosmic influences for deeper spiritual insight.",
  },
  {
    title: "Angel Tarot",
    desc: "Offers gentle, uplifting guidance through angelic messages and positive imagery, which makes it especially popular with those seeking encouragement, clarity and spiritual support.",
  },
];

export default function TarotPage() {
  return (
    <>
      <PageHeader
        trail={[{ label: "Cards", href: "/cards" }, { label: "Tarot Cards" }]}
        eyebrow="Tarot Cards"
        title='Three ways to <span class="accent">read the cards</span>'
      />
      <Section>
        <div className="intro-copy reveal" style={{ marginTop: 0 }}>
          <p>
            There are many different types of card readings. The most popular include Traditional Tarot, Astrology Tarot
            and Angel Tarot.
          </p>
        </div>

        <CardGrid columns={3} items={kinds} />

        <div className="grid-2 reveal" style={{ marginTop: 20 }}>
          <InfoBox
            title="Who this is for"
            items={[
              "You want clarity during times of change or uncertainty",
              "You are interested in spirituality, intuition and personal development",
              "You are seeking guidance through Tarot, angelic wisdom or Celtic traditions",
            ]}
          />
          <InfoBox title="What you get">
            <ul>
              <li>A Zoom session in which the cards are laid and explained</li>
              <li>Advice on the question or situation you bring</li>
              <li>
                Optionally a one-year course or webinar on how to use the cards, see{" "}
                <Link href="/courses">Courses &amp; Webinar Programs</Link>
              </li>
            </ul>
            <PriceLines
              rows={[
                ...cardPriceRows,
                { label: "Course or webinar", sub: "How to use the cards, one full year", price: prices.courses.oneYear },
              ]}
            />
          </InfoBox>
        </div>

        <CenteredCtas>
          <Btn href="/contact?i=cards" arrow>
            Request a tarot reading
          </Btn>
          <Btn href="/cards" variant="secondary">
            Back to all cards
          </Btn>
        </CenteredCtas>
      </Section>
    </>
  );
}
