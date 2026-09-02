import { Rich } from "@/components/Rich";
import { Btn, Section, SectionHead } from "@/components/Layout";

const pillars = [
  {
    num: "01",
    title: "Read the Chart",
    sub: "Spiritual Guidance",
    list: ["Natal Chart Reading", "Western Astrology", "Vedic Astrology", "Love &amp; Relationship Charts"],
    note: "Insights to support awareness and personal growth.",
    href: "/astrology",
    label: "See astrology",
  },
  {
    num: "02",
    title: "Read the Cards",
    sub: "Spiritual Guidance",
    list: ["Tarot Cards", "Oracle Angel Cards &amp; Angel Therapy", "Positive Psychology Cards", "Rune Cards"],
    note: "Insight into past, present or future situations.",
    href: "/cards",
    label: "See cards",
  },
  {
    num: "03",
    title: "Work the Psyche",
    sub: "Individual Coaching &amp; Therapy",
    leadIn: "By the theories of",
    list: ["Carl Jung", "Dolores Cannon", "Alan Watts", "Bruce Lipton", "and many more"],
    note: "Translating insight into change you can work with.",
    href: "/psychology",
    label: "See positive psychology",
  },
  {
    num: "04",
    title: "Ground the Body",
    sub: "Ayurveda &amp; Holistic Lifestyle",
    list: ["Ayurvedic Diet Advice", "Ayurvedic Cooking Course"],
    note: "Personalized Ayurvedic nutrition and lifestyle advice to improve well-being.",
    href: "/ayurveda",
    label: "See ayurveda",
  },
];

export function MethodSection() {
  return (
    <Section>
      <SectionHead
        eyebrow="The method"
        title='Decoding the Soul by <span class="accent">Human Design</span>'
        lead="A whole union of alternative techniques, improving the quality of life from the soul search to faith and destiny."
      />
      <div className="grid-4">
        {pillars.map((pillar) => (
          <article className="card reveal is-linked" key={pillar.num}>
            <div className="method-num">{pillar.num}</div>
            <h3>{pillar.title}</h3>
            <Rich as="div" className="card-sub" html={pillar.sub} />
            <ul className="card-list">
              {pillar.leadIn && <li className="lead-in">{pillar.leadIn}</li>}
              {pillar.list.map((item) => (
                <Rich as="li" key={item} html={item} />
              ))}
            </ul>
            <p className="card-note">{pillar.note}</p>
            <Btn href={pillar.href} variant="secondary" arrow className="card-cta">
              {pillar.label}
            </Btn>
          </article>
        ))}
      </div>
    </Section>
  );
}
