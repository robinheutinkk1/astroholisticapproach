import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import Link from "next/link";
import { Btn, CenteredCtas, InfoBox, PageHeader, PriceLines, Section } from "@/components/Layout";
import { cardPriceRows } from "@/content/readings";

export const metadata: Metadata = {
  title: "Oracle Angel Cards & Angel Therapy",
  description:
    "Angel Therapy and Oracle Angel Cards for clarity, comfort and insight. Independent of any religious concept.",
};

export default async function OracleAngelPage() {
  const t = (await getSettings()).tariffs;

  return (
    <>
      <PageHeader
        trail={[{ label: "Cards", href: "/cards" }, { label: "Oracle Angel Cards" }]}
        eyebrow="Angel Therapy"
        title='Oracle Angel Cards &amp; <span class="accent">Angel Therapy</span>'
      />
      <Section>
        <div className="intro-copy reveal" style={{ marginTop: 0 }}>
          <p>
            Angel Therapy is a spiritual practice that focuses on connecting with the loving and supportive energy of
            angels. Through intuition, meditation and Oracle Angel Cards, it helps bring clarity, comfort, healing and
            insight into life&rsquo;s questions and challenges. It is independent of any religious concept.
          </p>
          <p>
            Rather than predicting the future, Angel Therapy encourages self-discovery, inner peace and trust in your own
            intuition, while inviting you to explore the possibilities that lie ahead.
          </p>
          <p>
            For Crystal Therapy, please use the <Link href="/contact?i=crystals">contact page</Link>.
          </p>
        </div>

        <div className="grid-2 reveal">
          <InfoBox
            title="Who this is for"
            items={[
              "You feel drawn to angels, intuition and spiritual growth",
              "You are seeking encouragement, inner peace and emotional support",
              "You enjoy meditation, mindfulness or other spiritual practices",
              "You are looking for positive guidance and a fresh perspective on life&rsquo;s challenges",
            ]}
          />
          <InfoBox title="What you get">
            <ul>
              <li>A Zoom session in which the cards are laid and explained</li>
              <li>Advice on the question or situation you bring</li>
              <li>
                Angel Therapy, one-on-one: tariffs based on a personalised treatment plan,{" "}
                <Link href="/contact?i=cards">contact Milan</Link>
              </li>
            </ul>
            <PriceLines
              rows={[
                ...cardPriceRows(t),
                { label: "Course or webinar", sub: "How to use the cards, one full year", price: t.courses.oneYear },
              ]}
            />
          </InfoBox>
        </div>

        <CenteredCtas>
          <Btn href="/contact?i=cards" arrow>
            Request a reading
          </Btn>
          <Btn href="/cards" variant="secondary">
            Back to all cards
          </Btn>
        </CenteredCtas>
      </Section>
    </>
  );
}
