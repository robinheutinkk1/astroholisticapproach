import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import Link from "next/link";
import { Btn, CenteredCtas, InfoBox, PageHeader, PriceLines, Section } from "@/components/Layout";

export const metadata: Metadata = {
  title: "Positive Psychology Cards",
  description:
    "Practical, evidence-based cards to promote emotional well-being, reduce stress and strengthen resilience.",
};

export default async function PositivePsychologyCardsPage() {
  const t = (await getSettings()).tariffs;

  return (
    <>
      <PageHeader
        trail={[{ label: "Cards", href: "/cards" }, { label: "Positive Psychology Cards" }]}
        eyebrow="Positive Psychology Cards"
        title='Positive Psychology <span class="accent">Cards</span>'
      />
      <Section>
        <div className="intro-copy reveal" style={{ marginTop: 0 }}>
          <p>
            Positive Psychology Cards are practical, evidence-based tools designed to promote emotional well-being,
            reduce stress and strengthen resilience. Based on principles from modern psychology, each card offers simple
            exercises, reflective questions or positive techniques that help you better understand your thoughts and
            emotions.
          </p>
          <p>
            They can be used for daily inspiration, coaching, therapy, journaling, or simply as a gentle reminder to
            cultivate a more balanced and positive mindset.
          </p>
        </div>

        <div className="grid-2 reveal">
          <InfoBox
            title="Who this is for"
            items={[
              "You want to manage stress more effectively",
              "You want to build emotional resilience",
              "You want to improve emotional awareness and regulation",
              "You want to develop a more positive and balanced mindset",
            ]}
          />
          <InfoBox title="What you get">
            <ul>
              <li>An introduction to the Positive Psychology cards and how to work with them</li>
              <li>
                Personalised treatment plan, one-on-one: <Link href="/contact?i=cards">contact Milan</Link>
              </li>
            </ul>
            <PriceLines
              rows={[
                { label: "Introduction session", sub: "60-minute Zoom session", price: t.psychologyCards.intro },
                { label: "Follow-up session", sub: "Each following Zoom session", price: t.psychologyCards.followUp },
              ]}
            />
          </InfoBox>
        </div>

        <CenteredCtas>
          <Btn href="/contact?i=cards" arrow>
            Request a session
          </Btn>
          <Btn href="/cards" variant="secondary">
            Back to all cards
          </Btn>
        </CenteredCtas>
      </Section>
    </>
  );
}
