import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { ReadingPage } from "@/components/PageTemplates";
import { buildReadings } from "@/content/readings";

export const metadata: Metadata = {
  title: "Western Astrology Reading",
  description: "Western astrology focused on personality, potential and psychological growth. Includes 2 hours of chart analysis and a 1-hour Zoom session.",
};

export default async function Page() {
  const t = (await getSettings()).tariffs;

  return <ReadingPage {...buildReadings(t).western} />;
}
