"use client";

import { SaveBar, useSectionSave } from "@/components/admin/settings-form";
import type { Settings } from "@/lib/settings";

type Tariffs = Settings["tariffs"];

/**
 * Every amount on the site, grouped the way the tariff page groups them. The
 * labels spell out where each one shows up, so it is clear what a change
 * touches before it is made.
 */
const GROUPS: { group: keyof Tariffs; title: string; note?: string; fields: { key: string; label: string }[] }[] = [
  {
    group: "astrology",
    title: "Astrology readings",
    note: "The reading price covers Western, Vedic and natal — they share one amount.",
    fields: [
      { key: "reading", label: "Western, Vedic or natal chart" },
      { key: "loveFirstHour", label: "Love & relationship reading" },
      { key: "extraHour", label: "Each additional hour" },
      { key: "writtenVersion", label: "Written version by e-mail" },
    ],
  },
  {
    group: "cards",
    title: "Card readings",
    fields: [
      { key: "firstHour", label: "Full reading, first hour" },
      { key: "extraHour", label: "Each following hour" },
      { key: "specificQuestion", label: "One specific question, 30 min" },
      { key: "singleCard", label: "One card, 15 min" },
      { key: "writtenVersion", label: "Written version by e-mail" },
    ],
  },
  {
    group: "psychologyCards",
    title: "Positive psychology cards",
    fields: [
      { key: "intro", label: "Introduction session" },
      { key: "followUp", label: "Follow-up session" },
    ],
  },
  {
    group: "packages",
    title: "Reading packages",
    fields: [
      { key: "family", label: "Family package, per person" },
      { key: "monthly", label: "Monthly guidance" },
    ],
  },
  {
    group: "therapy",
    title: "Therapy",
    fields: [
      { key: "intake", label: "Intake and treatment plan" },
      { key: "session30", label: "Session, 30 min" },
      { key: "session60", label: "Session, 60 min" },
    ],
  },
  {
    group: "ayurveda",
    title: "Ayurveda",
    fields: [
      { key: "consult30", label: "Consult, 30 min" },
      { key: "consult60", label: "Consult, 60 min" },
      { key: "followUp", label: "Follow-up session" },
      { key: "cookingIntake", label: "Cooking course, intake" },
      { key: "cookingYear", label: "Cooking course, full year" },
    ],
  },
  {
    group: "crystals",
    title: "Crystals & stones",
    fields: [
      { key: "single", label: "One crystal, 30 min" },
      { key: "hour", label: "Advice, 60 min" },
      { key: "extraHour", label: "Each additional hour" },
    ],
  },
  { group: "reiki", title: "Reiki", fields: [{ key: "package", label: "Package of 5 sessions" }] },
  { group: "chakra", title: "Chakra meditation", fields: [{ key: "session", label: "Session, 120 min" }] },
  {
    group: "fengShui",
    title: "Feng Shui",
    fields: [
      { key: "start", label: "Start tariff" },
      { key: "extraFloor", label: "Each additional floor" },
    ],
  },
  { group: "courses", title: "One-year courses", fields: [{ key: "oneYear", label: "Programme fee" }] },
];

export function TariffsForm({ tariffs }: { tariffs: Tariffs }) {
  const { save, reset, pending, message } = useSectionSave();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const f = new FormData(event.currentTarget);

    const value: Record<string, Record<string, string>> = {};
    for (const { group, fields } of GROUPS) {
      value[group] = {};
      for (const field of fields) {
        value[group][field.key] = String(f.get(`${group}.${field.key}`) ?? "").trim();
      }
    }

    save([{ key: "tariffs", value }]);
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      {GROUPS.map(({ group, title, note, fields }) => (
        <fieldset className="admin-fieldset" key={group}>
          <h3>{title}</h3>
          {note && <p className="admin-hint" style={{ marginTop: -10, marginBottom: 16 }}>{note}</p>}
          <div className="admin-row">
            {fields.map((field) => {
              const name = `${group}.${field.key}`;
              const current = (tariffs[group] as Record<string, string>)[field.key];
              return (
                <div key={name}>
                  <label htmlFor={name}>{field.label}</label>
                  <input id={name} name={name} type="text" defaultValue={current} required />
                </div>
              );
            })}
          </div>
        </fieldset>
      ))}

      <SaveBar pending={pending} message={message} onReset={() => reset(["tariffs"])} />
    </form>
  );
}
