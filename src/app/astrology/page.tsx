import type { Metadata } from "next";
import { CtaBlock, PageHeader, Section } from "@/components/Layout";
import { CardGrid } from "@/components/PageTemplates";

export const metadata: Metadata = {
  title: "Astrology, Western, Vedic, Natal & Love Charts",
  description:
    "Western and Vedic astrology readings, natal charts and relationship charts. Sessions on Zoom from Amsterdam, worldwide.",
};

const items = [
  {
    title: "Western Astrology",
    desc: "Western Astrology is a system in which the position of the planets and stars at the moment of your birth is used to provide insight into your personality and life path, and gives you a deeper insight into yourself.",
    href: "/astrology/western",
  },
  {
    title: "Vedic Astrology",
    desc: "Vedic Astrology is an ancient Indian system that reveals your soul&#39;s journey through the positions of the planets at the moment you were born. It offers insight into your karma, life path, strengths, challenges, and the timing of important life events.",
    href: "/astrology/vedic",
  },
  {
    title: "Natal Chart Reading",
    desc: "A Natal Chart Reading is a personalized guide to your soul&#39;s blueprint, revealing your unique gifts, life path, and the energies that shape your journey.",
    href: "/astrology/natal-chart-reading",
    badge: "Most common starting point",
  },
  {
    title: "Love &amp; Relationship Reading",
    desc: "A Love &amp; Relationship Chart Reading compares two natal charts to reveal your soul connection, relationship dynamics, strengths, challenges, and the lessons you are here to learn together.",
    href: "/astrology/love-relationship",
  },
];

export default function AstrologyPage() {
  return (
    <>
      <PageHeader
        trail={[{ label: "Astrology" }]}
        eyebrow="Astrology"
        title='The chart as <span class="accent">a starting point</span>'
        intro="Astrology (natal) charts are tools that help us understand ourselves, others and our surroundings by reading the charts."
      />
      <Section>
        <CardGrid items={items} />
      </Section>
      <CtaBlock
        title="Not sure which one fits?"
        body="Send a short message describing what you are working with and Milan will suggest the right starting point."
        links={[{ href: "/contact", label: "Get in touch" }]}
      />
    </>
  );
}
