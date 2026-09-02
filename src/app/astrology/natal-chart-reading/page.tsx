import type { Metadata } from "next";
import { ReadingPage } from "@/components/PageTemplates";
import { readings } from "@/content/readings";

export const metadata: Metadata = {
  title: "Natal Chart Reading",
  description: "A personalized interpretation of the sky at the exact moment you were born. The most common starting point.",
};

export default function Page() {
  return <ReadingPage {...readings.natal} />;
}
