import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { ReadingPage } from "@/components/PageTemplates";
import { buildReadings } from "@/content/readings";

export const metadata: Metadata = {
  title: "Vedic Astrology Reading",
  description: "Vedic astrology focused on your soul journey, karma and life path. Includes 2 hours of chart analysis and a 1-hour Zoom session.",
};

export default async function Page() {
  const t = (await getSettings()).tariffs;

  return <ReadingPage {...buildReadings(t).vedic} />;
}
