import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { Btn, CenteredCtas, InfoBox, PageHeader, PriceLines, Section } from "@/components/Layout";

export const metadata: Metadata = {
  title: "Ayurvedic Diet Advice",
  description: "Personalised Ayurvedic nutrition advice based on your mind-body constitution: Vata, Pitta or Kapha.",
};

export default async function DietAdvicePage() {
  const t = (await getSettings()).tariffs;

  return (
    <>
      <PageHeader
        trail={[{ label: "Ayurveda", href: "/ayurveda" }, { label: "Diet Advice" }]}
        eyebrow="Ayurvedic Diet Advice"
        title='Balance the Body, Mind &amp; Spirit with the <span class="accent">right Ayurveda diet advice</span>'
      />
      <Section>
        <div className="intro-copy reveal" style={{ marginTop: 0 }}>
          <p>
            Ayurvedic Diet Advice is personalised nutritional advice based on your unique mind-body constitution: Vata
            (air and ether), Pitta (fire and water) or Kapha (earth and water).
          </p>
          <p>
            It helps restore balance by choosing the right foods, spices, herbs and plants, and it includes daily habits
            that support energy, digestion and overall well-being.
          </p>
        </div>

        <div className="grid-2 reveal">
          <InfoBox
            title="Who this is for"
            items={[
              "You want to restore your inner balance and increase your energy",
              "You want to know more about Ayurvedic herbs and plants",
              "You want to create a lifestyle that is aligned with your unique body and mind",
              "You want to solve an indigestion problem",
            ]}
          />
          <InfoBox
            title="What you get"
            items={[
              "Personalised Ayurvedic diet advice for your constitution",
              "Advice on the foods, spices, herbs and daily habits that suit you",
            ]}
          >
            <PriceLines
              rows={[
                { label: "Advice on one specific question", sub: "30-minute Zoom session", price: t.ayurveda.consult30 },
                {
                  label: "Extensive advice on a submitted problem",
                  sub: "60-minute Zoom session, most chosen",
                  price: t.ayurveda.consult60,
                },
                { label: "Follow-up session", sub: "Each following Zoom session", price: t.ayurveda.followUp },
              ]}
            />
          </InfoBox>
        </div>

        <CenteredCtas>
          <Btn href="/contact?i=ayurveda" arrow>
            Request diet advice
          </Btn>
          <Btn href="/ayurveda" variant="secondary">
            Back to Ayurveda
          </Btn>
        </CenteredCtas>
      </Section>
    </>
  );
}
