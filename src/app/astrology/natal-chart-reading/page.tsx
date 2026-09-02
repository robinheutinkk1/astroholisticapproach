import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { ReadingPage } from "@/components/PageTemplates";
import { buildReadings } from "@/content/readings";

export const metadata: Metadata = {
  title: "Natal Chart Reading",
  description: "A personalized interpretation of the sky at the exact moment you were born. The most common starting point.",
};

export default async function Page() {
  const t = (await getSettings()).tariffs;

  return <ReadingPage {...buildReadings(t).natal} />;
}
