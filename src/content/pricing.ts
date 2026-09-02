/**
 * Tariffs, grouped per subject exactly as they were on the original site, so
 * each page keeps its own amounts even where two happen to match today.
 * Amounts are display strings; only the shop sells through Stripe.
 */
export const prices = {
  astrology: {
    reading: "€200", // Western / Vedic / Natal: 2 hrs chart analysis + 1-hr Zoom
    extraHour: "€80", // each additional hour on any reading
    loveFirstHour: "€300", // Love & Relationship reading, 1st hour
    writtenVersion: "€200", // optional written report by e-mail
  },
  cards: {
    firstHour: "€100",
    extraHour: "€80",
    specificQuestion: "€60",
    singleCard: "€30",
    writtenVersion: "€200",
  },
  psychologyCards: {
    intro: "€80",
    followUp: "€50",
  },
  packages: {
    family: "€80", // per person, groups of 4+
    monthly: "€300", // one card + interpretation each week, one month
  },
  therapy: {
    intake: "€100",
    session30: "€40",
    session60: "€80",
  },
  ayurveda: {
    consult30: "€50",
    consult60: "€100",
    followUp: "€50",
    cookingIntake: "€100",
    cookingYear: "€2,000",
  },
  crystals: {
    single: "€60",
    hour: "€100",
    extraHour: "€80",
  },
  reiki: {
    package: "€100", // 5 x 20-min sessions
  },
  chakra: {
    session: "€200", // 120-min session
  },
  fengShui: {
    start: "€200",
    extraFloor: "€60",
  },
  courses: {
    oneYear: "€1,800", // one discipline, one year
  },
} as const;
