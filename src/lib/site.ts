/**
 * Brand, navigation and business details, carried over from the original
 * site's `settings` block. Everything the old single-file build kept at the
 * top of the page now lives here.
 */

export const site = {
  name: "Holistic Astro Approach",
  owner: "Milan Landkroon",
  location: "Amsterdam, NL",
  email: "landkroonmilan@gmail.com",
  tagline:
    "A holistic energetic approach combining astrology, card readings, positive psychology and Ayurveda, all by Human Design. By Milan Landkroon, Amsterdam.",
  description:
    "Astrology readings, card readings, positive psychology, Ayurveda and energy work. Online sessions via Zoom, worldwide.",
  business: {
    iban: "NL09 RABO 0176 2434 61",
    kvk: "42088167",
  },
  socials: {
    instagram: "https://instagram.com/holisticastroapproach",
    youtube: "",
    spotify: "",
    facebook: "",
  },
};

export type NavChild = { href: string; label: string; sub: string };
export type NavItem = { href: string; label: string; children?: NavChild[] };

export const nav: NavItem[] = [
  {
    href: "/astrology",
    label: "Astrology",
    children: [
      { href: "/astrology/western", label: "Western Astrology", sub: "Personality, potential, growth" },
      { href: "/astrology/vedic", label: "Vedic Astrology", sub: "Soul, karma, life path" },
      { href: "/astrology/natal-chart-reading", label: "Natal Chart Reading", sub: "Most common starting point" },
      { href: "/astrology/love-relationship", label: "Love & Relationship Reading", sub: "Two charts, one analysis" },
    ],
  },
  {
    href: "/cards",
    label: "Cards",
    children: [
      { href: "/cards/tarot", label: "Tarot Cards", sub: "Traditional, Astrology and Angel Tarot" },
      { href: "/cards/oracle-angel", label: "Oracle Angel Cards", sub: "Angel Therapy" },
      { href: "/cards/positive-psychology", label: "Positive Psychology Cards", sub: "Practical tools for daily life" },
      { href: "/cards/rune", label: "Rune Cards", sub: "Ancient Celtic wisdom" },
    ],
  },
  {
    href: "/psychology",
    label: "Positive Psychology",
    children: [
      { href: "/psychology/positive-psychology", label: "Positive Psychology", sub: "Carl Jung and Dolores Cannon" },
      { href: "/psychology/creative-therapy", label: "Creative Therapy", sub: "Movement, art, expression" },
    ],
  },
  {
    href: "/ayurveda",
    label: "Ayurveda",
    children: [
      { href: "/ayurveda/diet-advice", label: "Ayurvedic Diet Advice", sub: "Tailored to your dosha" },
      { href: "/ayurveda/cooking", label: "Cooking & Lifestyle", sub: "One-year course and webinar" },
    ],
  },
  {
    href: "/healing",
    label: "Crystals & Jewelry",
    children: [
      { href: "/healing/crystals", label: "Crystals & Stones", sub: "Selected for purpose" },
      { href: "/healing/jewelry", label: "Jewelry", sub: "Bracelets & pendants" },
    ],
  },
  {
    href: "/energy-work",
    label: "Reiki & Chakra",
    children: [
      { href: "/energy-work/reiki-distance", label: "Long Distance Reiki", sub: "5 x 20-minute sessions" },
      { href: "/energy-work/chakra", label: "Chakra Meditation", sub: "Live guided on Zoom" },
    ],
  },
  { href: "/feng-shui", label: "Feng Shui" },
  { href: "/courses", label: "Courses" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
];

export const footerNav = {
  practice: [
    { href: "/astrology", label: "Astrology" },
    { href: "/cards", label: "Cards" },
    { href: "/psychology", label: "Positive Psychology" },
    { href: "/ayurveda", label: "Ayurveda" },
    { href: "/healing", label: "Crystals & Jewelry" },
    { href: "/energy-work", label: "Reiki & Chakra" },
    { href: "/feng-shui", label: "Feng Shui" },
  ],
  engage: [
    { href: "/courses", label: "Courses" },
    { href: "/webinars", label: "Sessions" },
    { href: "/shop", label: "Shop" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  contact: [
    { href: "/contact", label: "e-mail" },
    { href: "/about", label: "About Milan" },
    { href: "/terms", label: "Terms & Conditions" },
  ],
};

/**
 * Honest availability label — no fabricated countdowns. A solo practice
 * genuinely has limited monthly capacity; say that, nothing more.
 */
export function scarcityLabel(variant: "home" | "service" = "home"): string {
  return variant === "service"
    ? "Limited monthly availability · personal reply within 24 hours"
    : "Limited monthly availability · booking by request";
}
