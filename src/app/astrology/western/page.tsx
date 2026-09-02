import type { Metadata } from "next";
import { ReadingPage } from "@/components/PageTemplates";
import { readings } from "@/content/readings";

export const metadata: Metadata = {
  title: "Western Astrology Reading",
  description: "Western astrology focused on personality, potential and psychological growth. Includes 2 hours of chart analysis and a 1-hour Zoom session.",
};

export default function Page() {
  return <ReadingPage {...readings.western} />;
}
