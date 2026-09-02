import type { Metadata } from "next";
import Link from "next/link";
import { CtaBlock, PageHeader, Section } from "@/components/Layout";
import { groupSessions, type GroupSession } from "@/content/sessions";

export const metadata: Metadata = {
  title: "Group Sessions & Private Webinars",
  description: "1-on-1 coaching calls, live group webinars and private webinars for your team or group.",
};

const icons: Record<GroupSession["key"], React.ReactNode> = {
  oneOnOne: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
    </svg>
  ),
  liveWebinar: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="9" />
      <circle cx="8" cy="11" r="2" />
      <circle cx="16" cy="11" r="2" />
      <circle cx="12" cy="16" r="2" />
    </svg>
  ),
  privateWebinar: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M8 21h8M12 18v3" />
    </svg>
  ),
};

export default function WebinarsPage() {
  const sessions = groupSessions.filter((session) => session.enabled);

  return (
    <>
      <PageHeader
        trail={[{ label: "Sessions" }]}
        eyebrow="Three ways to work together"
        title='Coaching, circles &amp; <span class="accent">custom sessions</span>'
        intro="Pick the format that fits where you are. One-on-one for focused work, group webinars for shared topics, private sessions for your own circle."
      />
      <Section>
        <div className="sessions-grid">
          {sessions.map((session) => (
            <article
              className={`session-card reveal${session.key === "oneOnOne" ? " featured" : ""}`}
              key={session.key}
            >
              <div className="session-icon" aria-hidden="true">
                {icons[session.key]}
              </div>
              <h3>{session.title}</h3>
              <div className="session-tagline">{session.tagline}</div>
              <p className="session-desc">{session.description}</p>
              <div className="session-meta">
                <span>
                  <strong>Duration:</strong> {session.duration}
                </span>
                <span>
                  <strong>Format:</strong> {session.format}
                </span>
              </div>
              <ul className="session-highlights">
                {session.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="session-price">
                <strong>{session.price}</strong>
                <span>per session</span>
              </div>
              <Link
                href={session.ctaUrl}
                className="btn btn-primary"
                style={{ justifyContent: "center", width: "100%" }}
              >
                {session.ctaLabel} <span className="arrow">→</span>
              </Link>
            </article>
          ))}
        </div>
      </Section>
      <CtaBlock
        title="Not sure which fits?"
        body="Send a short message describing what you are working with and Milan replies within 24 hours with a recommendation."
        links={[{ href: "/contact", label: "Get a recommendation" }]}
      />
    </>
  );
}
