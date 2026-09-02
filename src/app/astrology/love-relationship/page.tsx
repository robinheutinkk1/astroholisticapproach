import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { ReadingPage } from "@/components/PageTemplates";
import { buildReadings } from "@/content/readings";

export const metadata: Metadata = {
  title: "Love & Relationship Chart Reading",
  description: "Two natal charts and a third combined chart, revealing relationship dynamics, strengths and challenges.",
};

export default async function Page() {
  const t = (await getSettings()).tariffs;

  return <ReadingPage {...buildReadings(t).love} />;
}
