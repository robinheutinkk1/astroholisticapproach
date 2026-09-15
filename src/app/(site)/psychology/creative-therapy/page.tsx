import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { Btn, CenteredCtas, InfoBox, PageHeader, Section } from "@/components/Layout";
import { TreatmentSteps } from "@/components/TreatmentSteps";

export const metadata: Metadata = {
  title: "Creative Therapy",
  description:
    "Creative therapy using movement, dance, art and creative expression, based on Holism and Positive Psychology.",
};

export default async function CreativeTherapyPage() {
  const t = (await getSettings()).tariffs;

  return (
    <>
      <PageHeader
        trail={[{ label: "Positive Psychology", href: "/psychology" }, { label: "Creative Therapy" }]}
        eyebrow="Creative Therapy"
        title='When words <span class="accent">stop working</span>'
      />
      <Section>
        <div className="intro-copy reveal" style={{ marginTop: 0 }}>
          <p>
            Creative Therapy is an approach that uses movement, dance, art and creative expression to access the
            unconscious, process emotions and reconnect with your authentic self. It is based on Holism and Positive
            Psychology.
          </p>
        </div>

        <TreatmentSteps />

        <div className="grid-2 reveal" style={{ marginTop: 20 }}>
          <InfoBox
            title="Who this is for"
            items={[
              "You want to express what words cannot",
              "You want to heal through creativity",
              "You want to reconnect with your inner wisdom",
              "You want to embrace all parts of yourself",
            ]}
          />
          <InfoBox
            title="Tariffs"
            items={[
              "An intake Zoom interview and a personalised treatment plan",
              "Therapy sessions, personalised and one-on-one",
              `Intake interview and treatment plan: <strong>${t.therapy.intake}</strong>`,
              `Therapy Zoom session, 30 minutes: <strong>${t.therapy.session30}</strong>`,
              `Therapy Zoom session, 60 minutes: <strong>${t.therapy.session60}</strong>`,
            ]}
          />
        </div>

        <CenteredCtas>
          <Btn href="/contact?i=creative" arrow>
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
