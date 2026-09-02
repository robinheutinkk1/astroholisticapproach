import type { Metadata } from "next";
import { ReadingPage } from "@/components/PageTemplates";
import { readings } from "@/content/readings";

export const metadata: Metadata = {
  title: "Love & Relationship Chart Reading",
  description: "Two natal charts and a third combined chart, revealing relationship dynamics, strengths and challenges.",
};

export default function Page() {
  return <ReadingPage {...readings.love} />;
}
