import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Ask a question about a reading, or say what is going on and get an honest answer.",
};

export default function ContactPage() {
  return (
    <Section className="py-20">
      <PageHeader
        eyebrow="Contact"
        title="Say what is going on"
        intro="Questions about which reading fits, availability, or anything else. Replies usually go out within two working days."
      />

      <div className="mx-auto mt-12 max-w-xl">
        <ContactForm />
      </div>
    </Section>
  );
}
