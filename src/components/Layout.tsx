import Link from "next/link";
import { Rich } from "@/components/Rich";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`container ${className}`.trim()}>{children}</div>;
}

export function Section({
  children,
  className = "",
  style,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}) {
  return (
    <section className={`section ${className}`.trim()} style={style} id={id}>
      <Container>{children}</Container>
    </section>
  );
}

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ trail }: { trail: Crumb[] }) {
  return (
    <div className="breadcrumb">
      <Link href="/">Home</Link>
      {trail.map((crumb) => (
        <span key={crumb.label} style={{ display: "contents" }}>
          <span className="sep">/</span>
          {crumb.href ? (
            <Link href={crumb.href}>
              <Rich html={crumb.label} />
            </Link>
          ) : (
            <Rich html={crumb.label} />
          )}
        </span>
      ))}
    </div>
  );
}

export function PageHeader({
  trail,
  eyebrow,
  badge,
  title,
  intro,
}: {
  trail: Crumb[];
  eyebrow?: string;
  badge?: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="page-header">
      <Container>
        <Breadcrumb trail={trail} />
        {badge ? (
          <span className="badge">
            <span className="dot" />
            {badge}
          </span>
        ) : eyebrow ? (
          <Rich as="span" className="eyebrow" html={eyebrow} />
        ) : null}
        <Rich as="h1" html={title} />
        {intro && <Rich as="p" html={intro} />}
      </Container>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  plain = false,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  plain?: boolean;
}) {
  return (
    <div className={`section-head${plain ? " plain" : ""} reveal`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Rich as="h2" html={title} />
      {lead && <Rich as="p" className="lead" html={lead} />}
    </div>
  );
}

export function Btn({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "",
  style,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  arrow?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Link href={href} className={`btn btn-${variant} ${className}`.trim()} style={style}>
      {children}
      {arrow && <span className="arrow">→</span>}
    </Link>
  );
}

export function InfoBox({
  title,
  items,
  children,
  style,
}: {
  title: string;
  items?: string[];
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className="info-box" style={style}>
      <h4>{title}</h4>
      {items && (
        <ul>
          {items.map((item) => (
            <Rich as="li" key={item} html={item} />
          ))}
        </ul>
      )}
      {children}
    </div>
  );
}

export type PriceRow = { label: string; sub?: string; price: string; unit?: string };

/**
 * Label, dotted leader, right-aligned amount — the same row used on the tariff
 * page, so amounts line up instead of running on inside a bullet.
 */
export function PriceLines({ rows, head = "Tariff" }: { rows: PriceRow[]; head?: string | null }) {
  return (
    <div className="price-lines">
      {head && <span className="price-head">{head}</span>}
      {rows.map((row) => (
        <div className="price-row" key={row.label + row.price}>
          <span className="pr-label">
            <Rich html={row.label} />
            {row.sub && <small>{row.sub}</small>}
          </span>
          <span className="pr-dots" />
          <span className="pr-price">
            {row.price}
            {row.unit && <em> {row.unit}</em>}
          </span>
        </div>
      ))}
    </div>
  );
}

export function CtaBlock({
  title,
  body,
  links,
}: {
  title: string;
  body: string;
  links: { href: string; label: string }[];
}) {
  return (
    <Section>
      <div className="cta-block reveal">
        <Rich as="h2" html={title} />
        <p>{body}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {links.map((link, index) => (
            <Btn key={link.href + link.label} href={link.href} variant={index === 0 ? "primary" : "secondary"} arrow={index === 0}>
              {link.label}
            </Btn>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function CenteredCtas({ children }: { children: React.ReactNode }) {
  return (
    <div className="course-cta reveal" style={{ justifyContent: "center", marginTop: 34 }}>
      {children}
    </div>
  );
}
