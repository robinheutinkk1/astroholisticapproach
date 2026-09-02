import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import Link from "next/link";
import { Btn, PageHeader, Section } from "@/components/Layout";

export const metadata: Metadata = {
  title: "One-Year Courses & Webinar Programs",
  description:
    "Master the fundamentals of astrology, Ayurveda, positive psychology, card reading or Reiki and crystal therapy in one year.",
};

export default async function CoursesPage() {
  const t = (await getSettings()).tariffs;

  return (
    <>
      <PageHeader
        trail={[{ label: "Courses" }]}
        eyebrow="Details"
        title='One-Year Courses &amp; <span class="accent">Webinar Program</span>'
        intro="Begin your journey of personal growth and professional development."
      />
      <Section>
        <div className="detail-panel reveal">
          <p>
            Discover the wisdom of Astrology, Ayurveda, Positive Psychology, Card Reading and Reiki &amp; Crystal Therapy
            through our comprehensive one-year Courses / Webinar Program.
          </p>
          <p>
            Whether you are seeking personal growth or preparing for a future career, this program provides a solid
            foundation with expert guidance every step of the way.
          </p>

          <h3>What you will learn</h3>
          <p>Choose one of the following disciplines:</p>
          <ul className="disc-list">
            <li>Astrology</li>
            <li>Ayurveda</li>
            <li>Positive Psychology</li>
            <li>Card Reading</li>
            <li>Reiki &amp; Crystal Therapy</li>
          </ul>
          <p>
            With two lessons per week you will gradually develop a deep understanding of the essential principles,
            practical techniques and theoretical knowledge within your chosen field.
          </p>

          <h3>Program investment</h3>
          <div className="fee-row">
            <span className="fee-label">One-year program</span>
            <span className="fee-amount">{t.courses.oneYear}</span>
          </div>
          <p>
            This includes structured lessons, personal guidance, study materials (where applicable) and examinations.
          </p>

          <h3>Certification</h3>
          <p>
            Upon successful completion of the program and all required examinations, you receive a Certificate confirming
            that you have:
          </p>
          <ul className="disc-list">
            <li>Successfully completed the first year of study</li>
            <li>Passed all examinations</li>
            <li>Mastered the fundamental knowledge and skills of your chosen discipline</li>
            <li>Qualified to continue with the second year of advanced training</li>
          </ul>
          <p>We believe that a strong foundation is the key to becoming a confident and knowledgeable practitioner.</p>

          <h3>Personal introduction</h3>
          <p>
            Before enrolling we invite you to a complimentary one-hour introductory consultation, to get acquainted,
            discuss your goals and determine which program best suits you.
          </p>
          <p>
            Classes are available <strong>individually or in small groups</strong>, depending on your learning pace and
            preferences.
          </p>

          <h3>A separate programme: Ayurvedic cooking</h3>
          <p>
            The <Link href="/ayurveda/cooking">Ayurvedic Cooking Course &amp; Webinar</Link> is a programme of its own,
            with 52 weekly Zoom sessions and its own fee of <strong>{t.ayurveda.cookingYear}</strong>, plus{" "}
            <strong>{t.ayurveda.cookingIntake}</strong> for the intake interview and treatment plan. It is not part
            of the five one-year discipline courses above.
          </p>

          <div className="course-cta">
            <Btn href="/contact?i=course" arrow>
              Go to contact
            </Btn>
            <Btn href="/tariffs" variant="secondary">
              Back to tariffs
            </Btn>
          </div>
        </div>
      </Section>
    </>
  );
}
