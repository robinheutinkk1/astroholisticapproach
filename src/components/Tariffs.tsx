import Link from "next/link";
import { prices } from "@/content/pricing";
import { Btn, Section, SectionHead } from "@/components/Layout";

type Row = { label: string; sub?: string; price: string; unit?: string };

function TariffRow({ row }: { row: Row }) {
  return (
    <div className="tariff-row">
      <span className="label">
        {row.label}
        {row.sub && <small>{row.sub}</small>}
      </span>
      <span className="dots" />
      <span className="price">
        {row.price}
        {row.unit && <em> {row.unit}</em>}
      </span>
    </div>
  );
}

const consultations: Row[] = [
  { label: "Natal chart reading", sub: "Includes 2 hours analysis chart + 1-hour Zoom session", price: prices.astrology.reading },
  { label: "Astrology charts, Western or Vedic", sub: "Includes 2 hours analysis chart + 1-hour Zoom session", price: prices.astrology.reading },
  {
    label: "Love and relation charts",
    sub: "Includes 2 analysis charts, a third combined chart + 1-hour Zoom session",
    price: prices.astrology.loveFirstHour,
  },
  { label: "Additional hour on any reading", sub: "After the first hour", price: prices.astrology.extraHour },
];

const cardReadings: Row[] = [
  { label: "Full cards explanation", sub: "One-hour Zoom session, most chosen", price: prices.cards.firstHour, unit: "per hour" },
  { label: "Additional hour on a card reading", sub: "After the first hour", price: prices.cards.extraHour },
  { label: "One specific question", sub: "30-minute Zoom session", price: prices.cards.specificQuestion },
  { label: "One card interpretation", sub: "15-minute Zoom session", price: prices.cards.singleCard },
];

const packages: Row[] = [
  { label: "3 or more sessions", sub: "Receive a discounted package rate", price: "On request" },
  { label: "Family package", sub: "Groups of 4 or more", price: prices.packages.family, unit: "per person" },
  {
    label: "Monthly guidance",
    sub: "One personalized card and interpretation each week, for one month",
    price: prices.packages.monthly,
  },
];

export function TariffSection() {
  return (
    <Section id="tariff-block">
      <SectionHead
        eyebrow="Tariffs"
        title='For consultations &amp; <span class="accent">readings</span><span class="head-suffix">· Tariffs</span>'
      />
      <div className="tariff-panel reveal">
        <div className="tariff-group">
          <h3>Consultations &amp; Readings</h3>
          <p className="tariff-intro">Choose the Zoom session that best suits your needs.</p>
          <div className="tariff-list">
            {consultations.map((row) => (
              <TariffRow key={row.label + row.price} row={row} />
            ))}
          </div>
          <p className="tariff-remark">
            Depending on complexity and your questions, expect approximately 2 to 3 hours to complete a reading. An
            additional written version by e-mail is possible: {prices.astrology.writtenVersion}.
          </p>
        </div>

        <div className="tariff-group">
          <h3>Card Readings</h3>
          <div className="tariff-list">
            {cardReadings.map((row) => (
              <TariffRow key={row.label + row.price} row={row} />
            ))}
          </div>
          <p className="tariff-remark">
            An additional written version by e-mail is possible: {prices.cards.writtenVersion}.
          </p>
        </div>

        <div className="tariff-group">
          <h3>Reading Packages</h3>
          <div className="tariff-list">
            {packages.map((row) => (
              <TariffRow key={row.label + row.price} row={row} />
            ))}
          </div>
        </div>
      </div>
      <p className="tariff-foot reveal">
        For information about Ayurveda, Reiki, Crystal Jewellery or any of our educational programs, see the navigation
        bar or send a message via the <Link href="/contact">contact page</Link>. We will be happy to help you find the
        option that best suits your needs.
      </p>
    </Section>
  );
}

export function CourseTariffSection() {
  return (
    <Section>
      <SectionHead
        eyebrow="Tariffs"
        title='For courses &amp; <span class="accent">webinar programs</span><span class="head-suffix">· Tariffs</span>'
      />
      <div className="tariff-panel reveal">
        <div className="tariff-group">
          <h3>One-Year Courses / Webinar Programs</h3>
          <div className="course-body">
            <p>
              Master the fundamentals of <strong>Astrology, Ayurveda, Positive Psychology, Card Reading</strong> or{" "}
              <strong>Reiki &amp; Crystal Therapy</strong> in one year.
            </p>
            <p>
              With <strong>two classes per week</strong> and personal guidance, you will build a strong foundation in
              your chosen field.
            </p>
            <div className="fee-row">
              <span className="fee-label">Program fee</span>
              <span className="fee-amount">{prices.courses.oneYear}</span>
            </div>
            <p>
              After successfully completing the first year and passing all examinations, you receive a{" "}
              <strong>Certificate</strong> confirming you have completed the course, qualifying you to continue to the
              second year of the program if you wish.
            </p>
            <p>
              Classes are available <strong>individually or in small groups</strong>, depending on your learning pace and
              preferences.
            </p>
            <p>
              For more information, please read the <Link href="/courses">detailed explanation</Link>.
            </p>
            <div className="course-cta">
              <Btn href="/contact?i=course" arrow>
                Go to contact
              </Btn>
              <Btn href="/courses" variant="secondary">
                Course details
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
