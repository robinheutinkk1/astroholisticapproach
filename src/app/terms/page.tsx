import type { Metadata } from "next";
import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms & refunds",
  description: "Booking, cancellation and refund terms for readings and downloadable material.",
};

export default function TermsPage() {
  return (
    <Section className="py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl text-mist-100">Terms &amp; refunds</h1>
        <div className="prose-astro mt-8">
          <p>
            Draft terms covering the usual cases. Adjust the periods and add the operator&rsquo;s
            registered details before launch.
          </p>

          <h2>Bookings</h2>
          <p>
            A session is confirmed once payment is received. You will be sent a link to choose a
            time. Accurate birth data — date, time and place — is needed at least 48 hours before
            the session so the chart can be prepared.
          </p>

          <h2>Rescheduling and cancellation</h2>
          <ul>
            <li>Reschedule free of charge up to 48 hours before the session.</li>
            <li>Cancel more than 7 days in advance for a full refund.</li>
            <li>Within 7 days, half the fee is refundable, as the chart work has been done.</li>
            <li>Missed sessions without notice are not refundable.</li>
          </ul>

          <h2>Downloadable material</h2>
          <p>
            Digital products are delivered immediately after purchase, and by completing the order
            you agree that the statutory right of withdrawal ends on delivery. If a file is faulty
            or does not arrive, get in touch and it will be fixed or refunded.
          </p>

          <h2>Scope of the work</h2>
          <p>
            Readings are reflective and interpretive. They are not medical, psychological, legal or
            financial advice, and are not a substitute for professional care. Sessions are offered
            to adults.
          </p>

          <h2>Recordings and confidentiality</h2>
          <p>
            Sessions are recorded for your use and shared only with you. Nothing discussed is passed
            on to anyone else.
          </p>
        </div>
      </div>
    </Section>
  );
}
