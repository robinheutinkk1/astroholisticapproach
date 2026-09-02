import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { InfoBox, PageHeader, Section, SectionHead } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { Faq } from "@/components/Faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send a message to Milan Landkroon. Replies within 24 hours on weekdays.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        trail={[{ label: "Contact" }]}
        eyebrow="Contact"
        title='Send a <span class="accent">message</span>'
        intro="Milan reads every email personally, usually within 24 hours on weekdays. If you are not sure which session fits, describe your situation and he will suggest something."
      />

      <Section>
        <div className="split">
          <div className="reveal">
            <h2>Direct contact</h2>
            <p style={{ color: "var(--c-mute)", margin: "16px 0 28px" }}>
              Everything runs by e-mail. Use the form for session requests, there is a bit more space to describe what
              you are working with.
            </p>
            <InfoBox title="E-mail" style={{ marginBottom: 14 }}>
              <p style={{ fontSize: "1rem" }}>
                <a href={`mailto:${site.email}`} style={{ color: "var(--c-gold)" }}>
                  {site.email}
                </a>
              </p>
            </InfoBox>
            <InfoBox title="Studio" style={{ marginBottom: 14 }}>
              <p>Online worldwide via Zoom · Based in Amsterdam, NL · Sessions in English</p>
            </InfoBox>
            <InfoBox title="Tariffs">
              <p>
                All rates are listed on the{" "}
                <Link href="/tariffs" style={{ color: "var(--c-gold)" }}>
                  tariff page
                </Link>
                .
              </p>
            </InfoBox>
          </div>

          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="FAQ" plain title='Common <span class="accent">questions</span>' />
        <Faq />
      </Section>
    </>
  );
}
