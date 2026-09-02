import type { Metadata } from "next";
import Link from "next/link";
import { Btn, CenteredCtas, InfoBox, PageHeader, PriceLines, Section } from "@/components/Layout";
import { prices } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Ayurvedic Cooking Course & Webinar",
  description:
    "A one-year Ayurvedic cooking course and webinar: cook with the seasons, your dosha, herbs, spices and whole foods.",
};

export default function CookingCoursePage() {
  return (
    <>
      <PageHeader
        trail={[{ label: "Ayurveda", href: "/ayurveda" }, { label: "Cooking Course" }]}
        eyebrow="One-year course"
        title='Ayurvedic Cooking Course &amp; <span class="accent">Webinar</span>'
      />
      <Section>
        <div className="intro-copy reveal" style={{ marginTop: 0 }}>
          <p>
            Ayurvedic cooking is not a diet, but a lifestyle and a determination of aspirations towards a quality of
            life, returning to balance and harmony with nature.
          </p>
          <p>
            Throughout the year you will discover how to cook according to the seasons, your unique dosha, spices and
            whole foods, as well as which foods are anti-inflammatory and beneficial for your health. We learn the
            nutritional value as well as interesting scientific research about the spices and plants that improve our
            lives.
          </p>
          <p>
            Together we make a plan and a programme with a focus on your current situation and question. Use the{" "}
            <Link href="/contact?i=ayurveda">contact page</Link> and specify how exactly you would like to address your
            current situation.
          </p>
        </div>

        <div className="grid-2 reveal">
          <InfoBox
            title="Who this is for"
            items={[
              "You want to deepen your knowledge of Ayurveda and learn to cook with intention",
              "You want to bring more balance, health and mindfulness into everyday life",
              "You want to restore your inner balance and increase your energy",
              "You want to create a lifestyle that is aligned with your unique body and mind",
            ]}
          />
          <InfoBox
            title="What you get"
            items={["An intake Zoom interview and a personalised Ayurvedic plan", "52 weeks of Zoom sessions"]}
          >
            <PriceLines
              rows={[
                { label: "Intake interview and plan", sub: "Approximately 60 minutes", price: prices.ayurveda.cookingIntake },
                { label: "Course and webinar", sub: "52 weeks, one full year", price: prices.ayurveda.cookingYear },
              ]}
            />
          </InfoBox>
        </div>

        <CenteredCtas>
          <Btn href="/contact?i=ayurveda" arrow>
            Go to contact
          </Btn>
          <Btn href="/ayurveda" variant="secondary">
            Back to Ayurveda
          </Btn>
        </CenteredCtas>
      </Section>
    </>
  );
}
