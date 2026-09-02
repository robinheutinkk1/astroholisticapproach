import type { Metadata } from "next";
import { Section } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What data this site collects, why, and how to have it removed.",
};

export default function PrivacyPage() {
  return (
    <Section className="py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl text-mist-100">Privacy policy</h1>
        <div className="prose-astro mt-8">
          <p>
            This page describes what {site.name} collects and why. Fill in the operator details and
            have it reviewed before launch — the structure is complete, the specifics are yours.
          </p>

          <h2>What is collected</h2>
          <ul>
            <li>
              <strong>Contact form</strong> — name, email address and your message, stored so the
              enquiry can be answered.
            </li>
            <li>
              <strong>Orders</strong> — the items purchased, the amount, and the name and email
              address supplied at checkout.
            </li>
            <li>
              <strong>Birth data</strong> — date, time and place of birth, when you provide it for a
              reading. Kept only as long as needed to prepare and deliver the session.
            </li>
          </ul>

          <h2>Where it is stored</h2>
          <p>
            Content and enquiries are stored in a Supabase Postgres database. Payments are handled
            by Stripe, which receives your payment details directly — card numbers never reach this
            site or its database. The site itself is hosted on Vercel.
          </p>

          <h2>How long it is kept</h2>
          <p>
            Enquiries are kept while the conversation is open and deleted on request. Order records
            are kept for the period required by tax law.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask for a copy of your data, ask for it to be corrected, or ask for it to be
            deleted. Use the contact form and the request will be handled within one month.
          </p>

          <h2>Cookies</h2>
          <p>
            No tracking or advertising cookies are set. Your shopping cart is stored in your own
            browser, and a session cookie is used only when signing in to the site&rsquo;s admin
            area.
          </p>
        </div>
      </div>
    </Section>
  );
}
