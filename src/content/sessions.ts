/** The three ways to work together, shown on /webinars. */
export type GroupSession = {
  key: "oneOnOne" | "liveWebinar" | "privateWebinar";
  enabled: boolean;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  format: string;
  price: string;
  highlights: string[];
  ctaLabel: string;
  ctaUrl: string;
};

export const groupSessions: GroupSession[] = [
  {
    key: "oneOnOne",
    enabled: true,
    title: "1-on-1 Coaching Call",
    tagline: "A focused 60-minute Zoom session",
    description:
      "Pick the topic, pick the time. We work through one specific question, career, relationship, a recurring pattern, using whichever lens fits: astrology, psychology, Ayurveda or all three.",
    duration: "60 min",
    format: "Zoom · 1-on-1",
    price: "€100",
    highlights: [
      "You choose the time slot in real-time",
      "No preparation required, bring what is alive for you",
      "Recording sent within 24 hours",
      "One follow-up email included",
    ],
    ctaLabel: "Book a call",
    ctaUrl: "/contact?i=webinar",
  },
  {
    key: "liveWebinar",
    enabled: true,
    title: "Live Group Webinar",
    tagline: "Topical sessions, announced when scheduled",
    description:
      "Small live circles on Zoom, capped at 25 participants. Topics rotate around lunar cycles, current transits, and seasonal Ayurvedic practice. Join the waitlist to be the first to hear when the next round opens.",
    duration: "75–90 min",
    format: "Zoom · group",
    price: "On request",
    highlights: [
      "Be notified the moment new dates drop",
      "Priority registration before public release",
      "Recording access for 30 days afterwards",
      "Maximum 25 seats per circle",
    ],
    ctaLabel: "Join the waitlist",
    ctaUrl: "/contact?i=webinar",
  },
  {
    key: "privateWebinar",
    enabled: true,
    title: "Private Group Webinar",
    tagline: "For your team, friends, or retreat group",
    description:
      "You have a group of 6 or more and a topic in mind. Together we shape a 90-minute custom session: corporate burnout, women's circle, friend-group reading, retreat opener. Quote on request.",
    duration: "90 min",
    format: "Zoom or in-person",
    price: "On request",
    highlights: [
      "You choose the topic and the participant list",
      "Custom prep based on your group",
      "Optional individual follow-up sessions at reduced rate",
      "Available worldwide via Zoom, in-person in NL only",
    ],
    ctaLabel: "Request a quote",
    ctaUrl: "/contact?i=webinar",
  },
];
