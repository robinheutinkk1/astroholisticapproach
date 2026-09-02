import { prices } from "@/content/pricing";
import type { PriceRow } from "@/components/Layout";

const astrologyPriceRows: PriceRow[] = [
  { label: "Additional hour on any reading", sub: "After the first hour", price: prices.astrology.extraHour },
  { label: "Written version by e-mail", sub: "Optional", price: prices.astrology.writtenVersion },
];

export const cardPriceRows: PriceRow[] = [
  { label: "Full cards explanation", sub: "One-hour Zoom session, most chosen", price: prices.cards.firstHour, unit: "per hour" },
  { label: "Additional hour on a card reading", sub: "After the first hour", price: prices.cards.extraHour },
  { label: "One specific question", sub: "30-minute Zoom session", price: prices.cards.specificQuestion },
  { label: "One card interpretation", sub: "15-minute Zoom session", price: prices.cards.singleCard },
];

export const therapyPriceRows: PriceRow[] = [
  { label: "Intake interview and treatment plan", sub: "Approximately 60 minutes", price: prices.therapy.intake },
  { label: "Therapy Zoom session", sub: "30 minutes", price: prices.therapy.session30 },
  { label: "Therapy Zoom session", sub: "60 minutes", price: prices.therapy.session60 },
];

export const readings = {
  western: {
    trail: [{ label: "Astrology", href: "/astrology" }, { label: "Western" }],
    eyebrow: "Western Astrology",
    title: 'The <span class="accent">psychological map</span> of you',
    intro: [
      "Western Astrology focuses on your personality, potential and psychological growth &mdash; who you are becoming. In essence, <strong>Western Astrology explores the self</strong>. It is a tool for advancement, giving you personalized insights to support self-awareness and personal growth.",
      "It starts with the simple step of decoding your personal chart, called the natal chart, by analysing your date of birth, time of birth and place of birth. If you do not know your time of birth, there is the possibility of Intuitive Astrology.",
    ],
    forWhom: [
      "You are curious about self-discovery and your potential",
      "You want personal development and emotional insight",
      "You are gaining a deeper understanding of yourself",
    ],
    youGet: [
      "Analysis of your chart by Western Astrology",
      "A copy of your chart by e-mail",
      "2 hours of chart analysis and a 1-hour Zoom session",
    ],
    priceRows: [
      {
        label: "Western astrology chart",
        sub: "Includes 2 hours analysis chart + 1-hour Zoom session",
        price: prices.astrology.reading,
      },
      ...astrologyPriceRows,
    ],
    interest: "western",
  },

  vedic: {
    trail: [{ label: "Astrology", href: "/astrology" }, { label: "Vedic" }],
    eyebrow: "Vedic Astrology",
    title: 'Timing, <span class="accent">precisely</span>',
    intro: [
      "Vedic Astrology focuses on your soul&#39;s journey, karma and life path &mdash; why certain experiences come into your life, and how to align with your highest purpose. In essence: <strong>Western Astrology explores the self; Vedic Astrology illuminates the soul.</strong>",
      "Holistic Astro Approach offers two types of interpretation. The first follows the conventional method for mapping and interpreting a Vedic chart. The second uses a modern, multi-technique approach that integrates various methods &mdash; based on experience, this results in a more accurate, precise and comprehensive analysis.",
    ],
    forWhom: [
      "You want a serious read of your personality, soul and karma",
      "You are curious about your life path and experiences",
      "You want personal development and emotional insight",
      "You are gaining a deeper understanding of your soul",
    ],
    youGet: [
      "Analysis of your chart by Vedic Astrology",
      "A copy of your chart by e-mail",
      "2 hours of chart analysis and a 1-hour Zoom session",
    ],
    priceRows: [
      {
        label: "Vedic astrology chart",
        sub: "Includes 2 hours analysis chart + 1-hour Zoom session",
        price: prices.astrology.reading,
      },
      ...astrologyPriceRows,
    ],
    interest: "vedic",
  },

  natal: {
    trail: [{ label: "Astrology", href: "/astrology" }, { label: "Natal Chart Reading" }],
    eyebrow: "Natal Chart Reading",
    title: 'The <span class="accent">natal chart</span> reading',
    featured: true,
    intro: [
      "A Natal Chart Reading is a personalized interpretation of the sky at the exact moment you were born. It reveals your soul&#39;s blueprint, natural gifts, life lessons and the unique energies that guide your journey. It offers deeper insight into your purpose, your relationships and your personal evolution.",
      "<strong>Date of birth, time of birth and place of birth are essential to know.</strong> If you do not know your time of birth, there is the possibility of Intuitive Astrology.",
    ],
    forWhom: [
      "You want clarity about your purpose and to navigate life with more confidence",
      "You want to reconnect with your authentic self",
      "You want self-discovery, spiritual growth, life direction and emotional clarity",
      "You want a deeper connection with your authentic self",
    ],
    youGet: [
      "Analysis of your natal birth chart",
      "A copy of your chart by e-mail",
      "2 hours of chart analysis and a 1-hour Zoom session",
    ],
    priceRows: [
      {
        label: "Natal chart reading",
        sub: "Includes 2 hours analysis chart + 1-hour Zoom session",
        price: prices.astrology.reading,
      },
      ...astrologyPriceRows,
    ],
    interest: "natal",
  },

  love: {
    trail: [{ label: "Astrology", href: "/astrology" }, { label: "Love &amp; Relationship" }],
    eyebrow: "Synastry &amp; Composite",
    title: 'Why this <span class="accent">specific</span> relationship works (or doesn&#39;t)',
    intro: [
      "The most popular reading after the natal birth chart is the reading of partner and marital relationships: how they develop and how they function over the decades. Job changes, moving to another country or relocating &mdash; it all has an influence on a relationship.",
      "A love &amp; relationship reading improves your life and your relationships by learning what supports you on the way to success.",
    ],
    forWhom: [
      "You want to know more about a new relationship before deeper commitment",
      "You want an honest read of the strengths and friction points in a relationship",
      "You are considering living together, marriage or a business partnership",
      "You want help overcoming conflicts from the past, karma and present",
    ],
    youGet: [
      "Analysis of your individual charts and the third, combined chart",
      "A copy of your charts by e-mail",
      "A 1-hour Zoom session to walk through all three charts",
    ],
    priceRows: [
      {
        label: "Love and relation charts",
        sub: "Includes 2 analysis charts, a third combined chart + 1-hour Zoom session",
        price: prices.astrology.loveFirstHour,
      },
      ...astrologyPriceRows,
    ],
    interest: "love",
  },
};
