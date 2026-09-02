import type { Metadata } from "next";
import { Btn, CenteredCtas, InfoBox, PageHeader, PriceLines, Section } from "@/components/Layout";
import { TreatmentSteps } from "@/components/TreatmentSteps";
import { therapyPriceRows } from "@/content/readings";

export const metadata: Metadata = {
  title: "Positive Psychology, Carl Jung & Dolores Cannon Therapy",
  description:
    "Carl Jung Therapy and Dolores Cannon Therapy (QHHT), individual and personalised, with an intake interview and a treatment plan.",
};

export default function PositivePsychologyPage() {
  return (
    <>
      <PageHeader
        trail={[{ label: "Positive Psychology", href: "/psychology" }, { label: "Positive Psychology" }]}
        eyebrow="Positive Psychology"
        title='Explore your unconscious mind, <span class="accent">integrate all parts of yourself</span>'
      />
      <Section>
        <div className="intro-copy reveal" style={{ marginTop: 0 }}>
          <p>
            Carl Jung Therapy helps you explore your unconscious mind, uncover hidden patterns and integrate all parts of
            yourself, for deeper healing and self-awareness.
          </p>
          <p>
            Dolores Cannon Therapy (QHHT) is a deep hypnosis technique that helps you access your subconscious mind, to
            gain insight into your soul&rsquo;s journey, past lives and higher wisdom.
          </p>
        </div>

        <TreatmentSteps />

        <div className="grid-2 reveal" style={{ marginTop: 20 }}>
          <InfoBox
            title="Who this is for"
            items={[
              "You want to understand yourself on a deeper level",
              "You want to heal emotional patterns and embrace your shadow",
              "You want to live more authentically",
              "You want to explore your soul&rsquo;s purpose and receive deeper guidance",
            ]}
          />
          <InfoBox
            title="What you get"
            items={[
              "An intake Zoom interview and a personalised treatment plan",
              "Therapy sessions, personalised and one-on-one",
            ]}
          >
            <PriceLines rows={therapyPriceRows} />
          </InfoBox>
        </div>

        <CenteredCtas>
          <Btn href="/contact?i=positive-psychology" arrow>
            Request an intake
          </Btn>
          <Btn href="/psychology" variant="secondary">
            Back to Positive Psychology
          </Btn>
        </CenteredCtas>
      </Section>
    </>
  );
}
