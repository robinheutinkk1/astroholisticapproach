import { Rich } from "@/components/Rich";
import {
  Btn,
  CenteredCtas,
  CtaBlock,
  type Crumb,
  InfoBox,
  PageHeader,
  PriceLines,
  type PriceRow,
  Section,
} from "@/components/Layout";
import { scarcityLabel } from "@/lib/site";

/** Reading page: hourly tariffs, used by the four astrology readings. */
export function ReadingPage({
  trail,
  eyebrow,
  title,
  intro,
  forWhom,
  youGet,
  priceRows,
  interest,
  featured = false,
}: {
  trail: Crumb[];
  eyebrow: string;
  title: string;
  intro: string[];
  forWhom: string[];
  youGet: string[];
  priceRows?: PriceRow[];
  interest: string;
  featured?: boolean;
}) {
  return (
    <>
      <PageHeader trail={trail} eyebrow={eyebrow} badge={featured ? "Most chosen" : undefined} title={title} />
      <Section>
        <div className="intro-copy reveal" style={{ marginTop: 0 }}>
          {intro.map((paragraph) => (
            <Rich as="p" key={paragraph.slice(0, 40)} html={paragraph} />
          ))}
        </div>
        <div className="grid-2 reveal">
          <InfoBox title="Who this is for" items={forWhom} />
          <InfoBox title="What you get" items={youGet}>
            {priceRows && priceRows.length > 0 && <PriceLines rows={priceRows} />}
            <p className="side-note">
              Depending on complexity and your questions, expect approximately 2 to 3 hours to complete a reading.
            </p>
          </InfoBox>
        </div>
        <CenteredCtas>
          <Btn href={`/contact?i=${encodeURIComponent(interest)}`} arrow>
            Request this reading
          </Btn>
          <Btn href="/tariffs" variant="secondary">
            See all tariffs
          </Btn>
        </CenteredCtas>
      </Section>
    </>
  );
}

/** Service page: one fixed price, closed by a request block. */
export function ServicePage({
  trail,
  eyebrow,
  title,
  intro,
  forWhom,
  youGet,
  price,
  priceNote,
  interest,
}: {
  trail: Crumb[];
  eyebrow: string;
  title: string;
  intro: string;
  forWhom: string[];
  youGet: string[];
  price: string;
  priceNote: string;
  interest: string;
}) {
  return (
    <>
      <PageHeader trail={trail} eyebrow={eyebrow} title={title} intro={intro} />
      <Section>
        <div className="grid-2 reveal">
          <InfoBox title="Who this is for" items={forWhom} />
          <InfoBox title="What you get" items={youGet} />
        </div>
      </Section>
      <RequestBlock price={price} priceNote={priceNote} interest={interest} />
    </>
  );
}

export function RequestBlock({
  price,
  priceNote,
  interest,
  label = "Request this session",
}: {
  price: string;
  priceNote: string;
  interest: string;
  label?: string;
}) {
  return (
    <Section>
      <div className="cta-block reveal">
        <span className="trust-row" style={{ marginBottom: 18 }}>
          <span className="dot" />
          {scarcityLabel("service")}
        </span>
        <h2>
          {price}{" "}
          <span style={{ fontSize: "0.5em", color: "var(--c-mute)", fontStyle: "normal" }}>· {priceNote}</span>
        </h2>
        <p>Send a request and Milan replies personally within 24 hours with available time slots and payment details.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn href={`/contact?i=${encodeURIComponent(interest)}`} arrow>
            {label}
          </Btn>
        </div>
      </div>
    </Section>
  );
}

/** Category hub: an intro plus two or more cards linking to the detail pages. */
export function CategoryHub({
  crumb,
  eyebrow,
  title,
  intro,
  items,
}: {
  crumb: string;
  eyebrow: string;
  title: string;
  intro: string;
  items: { title: string; desc: string; href: string }[];
}) {
  return (
    <>
      <PageHeader trail={[{ label: crumb }]} eyebrow={eyebrow} title={title} intro={intro} />
      <Section>
        <div className="grid-2">
          {items.map((item) => (
            <article className="card reveal is-linked" key={item.href}>
              <Rich as="h3" html={item.title} />
              <Rich as="p" className="card-desc" html={item.desc} />
              <Btn href={item.href} variant="secondary" arrow className="card-cta">
                Read more
              </Btn>
            </article>
          ))}
        </div>
      </Section>
      <CtaBlock
        title="Not sure which one fits?"
        body="Send a short message describing what you are working with and Milan will suggest the right starting point."
        links={[{ href: "/contact", label: "Get in touch" }]}
      />
    </>
  );
}

/** Simple card grid used by the hub pages that are not a CategoryHub. */
export function CardGrid({
  columns = 2,
  items,
}: {
  columns?: 2 | 3;
  items: { title: string; desc: string; href?: string; badge?: string; cta?: string }[];
}) {
  return (
    <div className={`grid-${columns}`}>
      {items.map((item) => (
        <article
          className={`card reveal${item.badge ? " is-featured" : ""} ${item.href ? "is-linked" : "is-static"}`}
          key={item.title}
        >
          {item.badge && (
            <span className="badge">
              <span className="dot" />
              {item.badge}
            </span>
          )}
          <Rich as="h3" html={item.title} />
          <Rich as="p" className="card-desc" html={item.desc} />
          {item.href && (
            <Btn href={item.href} variant="secondary" arrow className="card-cta">
              {item.cta ?? "Read more"}
            </Btn>
          )}
        </article>
      ))}
    </div>
  );
}
