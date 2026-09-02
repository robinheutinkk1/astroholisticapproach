"use client";

import { useState } from "react";
import { SaveBar, useSectionSave } from "@/components/admin/settings-form";
import type { Settings } from "@/lib/settings";

type Session = Settings["sessions"][number];

const NAMES: Record<Session["key"], string> = {
  oneOnOne: "1-on-1 coaching call",
  liveWebinar: "Live group webinar",
  privateWebinar: "Private group webinar",
};

export function SessionsForm({ sessions }: { sessions: Settings["sessions"] }) {
  const { save, reset, pending, message } = useSectionSave();
  const [items, setItems] = useState<Session[]>(sessions);

  function update(index: number, patch: Partial<Session>) {
    setItems((current) => current.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  return (
    <form
      className="admin-form"
      onSubmit={(event) => {
        event.preventDefault();
        save([{ key: "sessions", value: items }]);
      }}
    >
      {items.map((session, index) => (
        <fieldset className="admin-fieldset" key={session.key}>
          <h3>{NAMES[session.key]}</h3>

          <label className="admin-check" style={{ marginBottom: 18 }}>
            <input
              type="checkbox"
              checked={session.enabled}
              onChange={(e) => update(index, { enabled: e.target.checked })}
            />
            Show this one on the sessions page
          </label>

          <div>
            <label htmlFor={`title-${index}`}>Title</label>
            <input
              id={`title-${index}`}
              type="text"
              value={session.title}
              onChange={(e) => update(index, { title: e.target.value })}
            />
          </div>

          <div style={{ marginTop: 14 }}>
            <label htmlFor={`tagline-${index}`}>One-line summary</label>
            <input
              id={`tagline-${index}`}
              type="text"
              value={session.tagline}
              onChange={(e) => update(index, { tagline: e.target.value })}
            />
          </div>

          <div style={{ marginTop: 14 }}>
            <label htmlFor={`desc-${index}`}>Description</label>
            <textarea
              id={`desc-${index}`}
              rows={4}
              value={session.description}
              onChange={(e) => update(index, { description: e.target.value })}
            />
          </div>

          <div className="admin-row" style={{ marginTop: 14 }}>
            <div>
              <label htmlFor={`duration-${index}`}>Duration</label>
              <input
                id={`duration-${index}`}
                type="text"
                value={session.duration}
                onChange={(e) => update(index, { duration: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor={`format-${index}`}>Format</label>
              <input
                id={`format-${index}`}
                type="text"
                value={session.format}
                onChange={(e) => update(index, { format: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor={`price-${index}`}>Price</label>
              <input
                id={`price-${index}`}
                type="text"
                value={session.price}
                onChange={(e) => update(index, { price: e.target.value })}
              />
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <label htmlFor={`high-${index}`}>What is included — one per line</label>
            <textarea
              id={`high-${index}`}
              rows={4}
              value={session.highlights.join("\n")}
              onChange={(e) =>
                update(index, { highlights: e.target.value.split("\n").map((l) => l.trim()).filter(Boolean) })
              }
            />
          </div>

          <div className="admin-row" style={{ marginTop: 14 }}>
            <div>
              <label htmlFor={`ctaLabel-${index}`}>Button text</label>
              <input
                id={`ctaLabel-${index}`}
                type="text"
                value={session.ctaLabel}
                onChange={(e) => update(index, { ctaLabel: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor={`ctaUrl-${index}`}>Button link</label>
              <input
                id={`ctaUrl-${index}`}
                type="text"
                value={session.ctaUrl}
                onChange={(e) => update(index, { ctaUrl: e.target.value })}
              />
            </div>
          </div>
        </fieldset>
      ))}

      <SaveBar pending={pending} message={message} onReset={() => reset(["sessions"])} />
    </form>
  );
}
