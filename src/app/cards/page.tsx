import type { Metadata } from "next";
import Link from "next/link";
import { Btn, CenteredCtas, CtaBlock, InfoBox, PageHeader, PriceLines, Section } from "@/components/Layout";
import { CardGrid } from "@/components/PageTemplates";
import { prices } from "@/content/pricing";
import { cardPriceRows } from "@/content/readings";

export const metadata: Metadata = {
  title: "Card Readings, Tarot, Oracle, Positive Psychology & Rune",
  description:
    "Tarot cards, oracle angel cards and angel therapy, positive psychology cards and rune cards. Answers to the questions and situations on your mind.",
};

const decks = [
  {
    title: "Tarot Cards",
    desc: "For insight into the past, present or future, as well as offering advice for the current or future situations that are on your mind.",
    href: "/cards/tarot",
  },
  {
    title: "Oracle Angel Cards &amp; Angel Therapy",
    desc: "Gently connect and commune with the Angels and your spiritual allies, receiving their loving guidance as you walk your path through life.",
    href: "/cards/oracle-angel",
  },
  {
    title: "Positive Psychology Cards",
    desc: "Practical tools for managing stress, for emotional regulation and for building emotional resilience.",
    href: "/cards/positive-psychology",
  },
  {
    title: "Rune Cards",
    desc: "An ancient Celtic technique for connecting with the wisdom of the Present and the possibilities in the Future.",
    href: "/cards/rune",
  },
];

export default function CardsPage() {
  return (
    <>
      <PageHeader
        trail={[{ label: "Cards" }]}
        eyebrow="Card Readings"
        title='Insight into past, present <span class="accent">or future</span>'
      />
      <Section>
        <div className="intro-copy reveal" style={{ marginTop: 0 }}>
          <p>
            Cards are the tools and skills through which you get answers to the questions or situations that are on your
            mind. They are easy, fun and an interesting way of learning.
          </p>
          <p>
            Most popular and best known are the Tarot Cards, but in fact there are more than 300 different cards. The
            most important ones are described below.
          </p>
          <p>
            For Louise Hay Positive Affirmation Cards, please use the <Link href="/contact?i=cards">contact page</Link>.
          </p>
        </div>

        <CardGrid items={decks} />

        <InfoBox
          title="What you get"
          items={[
            "A Zoom session in which the cards are laid and explained",
            "Advice on the question or situation you bring",
          ]}
          style={{ maxWidth: 820, margin: "34px auto 0" }}
        >
          <PriceLines
            rows={[
              ...cardPriceRows,
              { label: "Written version by e-mail", sub: "Optional", price: prices.cards.writtenVersion },
            ]}
          />
          <p className="side-note">
            Depending on complexity and your questions, expect approximately 2 to 3 hours to complete a reading.
          </p>
        </InfoBox>

        <CenteredCtas>
          <Btn href="/contact?i=cards" arrow>
            Request a card reading
          </Btn>
          <Btn href="/tariffs" variant="secondary">
            See all tariffs
          </Btn>
        </CenteredCtas>
      </Section>
      <CtaBlock
        title="Not sure which deck fits?"
        body="Describe your question in a short message and Milan will suggest the right reading."
        links={[{ href: "/contact", label: "Send a message" }]}
      />
    </>
  );
}
