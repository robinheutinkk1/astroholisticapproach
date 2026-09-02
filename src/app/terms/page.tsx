import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/Layout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms, conditions and privacy policy for Holistic Astro Approach.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        trail={[{ label: "Terms" }]}
        eyebrow="Legal"
        title='Terms &amp; <span class="accent">conditions</span>'
        intro="Creation date: 01-07-2026 &middot; Latest update: 01-07-2026 &middot; Version 001"
      />
      <Section>
        <div className="detail-panel terms-clean reveal">
          <p>Welcome to the website of www.holisticastroapproach.com</p>
          <p>
            Holistic Astro Approach is registered with the Chamber of Commerce and fulfills its statutory tax
            obligations. Our Chamber of Commerce number and contact details can be found on the website.
          </p>
          <p>
            These Terms and Conditions govern your access to and use of the Holistic Astro Approach website, services,
            educational content, and all related products. By accessing, browsing, or using this website, you acknowledge
            that you have read, understood, and agree to be bound by these Terms.
          </p>
          <p>
            Please read these Terms carefully before purchasing or using any online course, webinar, reading, lessons,
            consultation or any other service offered by Holistic Astro Approach.
          </p>

          <h3>1. Purpose of the Services</h3>
          <p>
            1.1 Holistic Astro Approach gives educational and informative services in the field of Astrology, Positive
            Psychology, Ayurveda, Energy works, Reiki, Feng Shui and personal development. These services include online
            courses, webinars, readings, lessons, consultations and other educational materials.
          </p>
          <p>
            1.2 All content, services, and information provided by Holistic Astro Approach are intended solely for
            educational, self-development, self-reflection, and entertainment purposes. They are not intended to replace
            professional advice, diagnosis or treatment of any kind.
          </p>
          <p>
            1.3 Holistic Astro Approach does not provide medical, psychological, psychiatric, legal, financial or other
            licensed professional advice.
          </p>
          <p>1.4 Holistic Astro Approach services are time-based, not outcome-based.</p>

          <h3>2. Health, Medical, and Mental Health Disclaimer</h3>
          <p>
            2.1 The services, content, and materials provided by Holistic Astro Approach are not intended to diagnose,
            treat, prevent, or cure any physical, mental, emotional, or medical condition. Users should always consult a
            qualified healthcare professional or other licensed practitioner regarding any medical, mental health, or
            psychological concerns.
          </p>
          <p>
            2.2 By using this website and its services, you acknowledge and agree that you are solely responsible for
            your own health, well-being, decisions, and actions.
          </p>
          <p>
            2.3 Holistic Astro Approach accepts no responsibility or liability for any decisions, actions, or outcomes
            arising from the use of its services, educational materials, or interpretations. Users remain solely
            responsible for how they interpret and apply any information provided.
          </p>

          <h3>3. Payments</h3>
          <p>
            3.1 All payments are processed securely through trusted third-party payment providers via account debit,
            iDEAL/Wero, PayPal, or a subsequent invoice. Access to courses, readings, lessons, webinars and other
            services will be granted only after payment has been successfully authorized and confirmed.
          </p>
          <p>
            3.2 After your payment, you will receive a written confirmation by email stating the product purchased and
            its price.
          </p>
          <p>
            3.3 Unless otherwise stated, all prices are displayed in the applicable currency and are exclusive of any
            taxes, duties, or fees that may apply under the laws of your country or jurisdiction. You are responsible for
            any such additional charges where applicable.
          </p>
          <p>
            3.4 Holistic Astro Approach reserves the right to modify its pricing at any time. Any price changes will not
            affect purchases that have already been completed.
          </p>

          <h3>4. Cancellation and Refund Policy</h3>
          <p>
            4.1 Due to the personalized nature of our services, all sales are generally considered final and not
            refundable.
          </p>
          <p>
            4.2 If Holistic Astro Approach cancels a live webinar, event, or scheduled service and no suitable
            alternative or rescheduled session can be offered, you will be entitled to a full refund of the amount paid
            for that service.
          </p>
          <p>
            4.3 Holistic Astro Approach encourages all customers to review the description, scope, and suitability of a
            service before completing a purchase. If you have any questions prior to booking or purchasing, we are happy
            to provide clarification.
          </p>

          <h3>5. Right to Refuse or Terminate Services</h3>
          <p>
            5.1 Holistic Astro Approach is committed to providing a respectful, supportive, and safe learning environment
            for all participants.
          </p>
          <p>
            5.2 Holistic Astro Approach reserves the right, at our sole discretion, to refuse, suspend, or terminate
            access to our website, readings, lessons, courses, consultations, webinars, or any other services if a user:
          </p>
          <ul className="disc-list">
            <li>
              Engages in abusive, threatening, discriminatory, or disrespectful behaviour toward Holistic Astro Approach
              or other participants
            </li>
            <li>Uses harassment, intimidation, offensive language, or any form of inappropriate communication</li>
            <li>Violates these Terms and Conditions or any applicable laws</li>
          </ul>
          <p>
            5.3 Where access is suspended or terminated due to a breach of these Terms, Holistic Astro Approach may do so
            without notice and without any obligation to issue a refund.
          </p>

          <h3>6. User Responsibilities</h3>
          <p>
            6.1 By using the website and its services, you agree to use Holistic Astro Approach responsibly and in
            accordance with these Terms and Conditions.
          </p>
          <p>
            6.2 As a client, you agree to provide accurate, complete, and up-to-date information when creating an account
            or purchasing a service. As a client, you also agree that you:
          </p>
          <ul className="disc-list">
            <li>Use all services, courses, lessons, readings, and educational materials solely for your personal, non-commercial use</li>
            <li>Keep your account credentials confidential and do not share, transfer, or permit others to access your account</li>
            <li>
              Refrain from copying, reproducing, distributing, selling, or otherwise making available any content without
              prior written permission from Holistic Astro Approach
            </li>
          </ul>
          <p>
            6.3 As a client, you are obliged to appear at the agreed time. Cancellation of a scheduled session at the
            last moment is not refundable. Cancellation before 24 hours prior to the scheduled session will be
            rescheduled.
          </p>

          <h3>7. Privacy Policy</h3>
          <p>
            7.1 Holistic Astro Approach is committed to handling your personal data responsibly and in accordance with
            the General Data Protection Regulation (GDPR).
          </p>
          <p>7.2 Holistic Astro Approach may collect the following personal information:</p>
          <ul className="disc-list">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number (if provided)</li>
            <li>
              Information you voluntarily share during inquiries, bookings, or sessions, such as date of birth, place of
              birth and time of birth
            </li>
          </ul>
          <p>7.3 Holistic Astro Approach uses your personal data only to:</p>
          <ul className="disc-list">
            <li>Provide our services</li>
            <li>Respond to your inquiries</li>
            <li>Schedule and manage appointments</li>
            <li>Send service-related communications</li>
          </ul>
          <p>
            7.4 Holistic Astro Approach complies with all legal obligations and will never sell or share your personal
            information with third parties for marketing purposes.
          </p>
          <p>
            7.5 Data storage. Your personal information is stored securely and retained only for as long as necessary to
            provide our services or meet legal requirements.
          </p>
          <p>7.6 Under the GDPR, you have the right to:</p>
          <ul className="disc-list">
            <li>Access your personal data</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Withdraw your consent where applicable</li>
            <li>Request restriction or transfer of your data</li>
          </ul>
          <p>To exercise these rights, please contact Holistic Astro Approach using the details below.</p>
          <p>
            7.7 Cookies. Our website may use essential cookies to ensure proper functionality. If additional cookies are
            used, you will be informed and asked for your consent where required.
          </p>

          <h3>8. Limitation of Liability</h3>
          <p>
            8.1 To the fullest extent permitted by applicable law, Holistic Astro Approach shall not be liable for any
            direct, indirect, incidental, consequential, or special damages arising from or related to the use of its
            website, services, or educational content. By using the Holistic Astro Approach services, you acknowledge
            that you remain solely responsible for your own decisions, actions and their consequences.
          </p>
          <p>
            8.2 Holistic Astro Approach makes no guarantees regarding specific outcomes or results from the use of its
            services or educational materials.
          </p>

          <h3>9. Complaints and Dispute Resolution</h3>
          <p>
            9.1 Holistic Astro Approach values open communication and strives to provide a positive experience for every
            customer. If you have a question, concern, or complaint regarding the services, Holistic Astro Approach
            encourages you to make contact as soon as possible by email at {site.email}.
          </p>
          <p>
            9.2 Holistic Astro Approach is committed to reviewing all concerns carefully and will make every reasonable
            effort to resolve any dispute promptly, fairly, and in good faith through constructive communication before
            pursuing any formal legal process.
          </p>

          <h3 style={{ borderTop: "1px solid var(--c-line-soft)", paddingTop: 30 }}>
            Additional terms and conditions for the purchase of books, crystals, stones and jewelry
          </h3>

          <h3>10. Delivery</h3>
          <p>
            10.1 Holistic Astro Approach is obligated to send your product within 10 working days with a Track &amp;
            Trace code. If unforeseen circumstances prevent this, Holistic Astro Approach will notify you in writing.
          </p>
          <p>
            10.2 International overseas deliveries may take longer than deliveries within Europe. Additional shipping
            costs for international orders will be sent to you by a separate email at the time of purchase.
          </p>

          <h3>11. Pricing</h3>
          <p>
            11.1 Unless otherwise stated, all prices are displayed in the applicable currency and are exclusive of any
            taxes, duties, or fees that may apply under the laws of your country or jurisdiction. You are responsible for
            any such additional charges where applicable.
          </p>
          <p>
            11.2 The price displayed for a product cannot change during your purchase. You pay the amount shown at the
            time of purchase, which is also confirmed when you electronically agree to complete the transaction.
          </p>

          <h3>12. Complaints</h3>
          <p>
            12.1 Any complaints about a product must be submitted to Holistic Astro Approach in writing, with as much
            detail as possible. Holistic Astro Approach will do its best to resolve the issue.
          </p>
        </div>
      </Section>
    </>
  );
}
