import { z } from "zod";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { site } from "@/lib/site";
import { prices } from "@/content/pricing";
import { faq as defaultFaq } from "@/content/faq";
import { groupSessions } from "@/content/sessions";

/**
 * Settings the CMS can change, each section validated on the way in and on the
 * way out. A section that is missing, empty or somehow invalid falls back to
 * the value compiled into the app, so a bad edit can dim a detail but never
 * take a page down.
 */

const amount = z.string().trim().min(1).max(20);

/**
 * z.url() accepts any scheme, javascript: included, and these values are
 * rendered straight into href and src attributes. Restrict them to what a
 * link on this site is ever meant to be.
 */
const webUrl = z
  .string()
  .trim()
  .max(500)
  .refine((v) => /^https:\/\//i.test(v) || /^http:\/\//i.test(v), "Must start with http:// or https://");

const linkTarget = z
  .string()
  .trim()
  .min(1)
  .max(300)
  .refine(
    (v) => v.startsWith("/") || /^https?:\/\//i.test(v) || v.startsWith("mailto:"),
    "Must be a path starting with /, an http(s) address, or a mailto: link",
  );

export const schemas = {
  brand: z.object({
    tagline: z.string().trim().min(10).max(400),
    description: z.string().trim().min(10).max(300),
  }),
  contact: z.object({
    email: z.email(),
  }),
  business: z.object({
    kvk: z.string().trim().max(40),
    iban: z.string().trim().max(40),
  }),
  socials: z.object({
    instagram: z.union([webUrl, z.literal("")]),
    youtube: z.union([webUrl, z.literal("")]),
    spotify: z.union([webUrl, z.literal("")]),
    facebook: z.union([webUrl, z.literal("")]),
  }),
  seo: z.object({
    shareImage: linkTarget,
  }),
  tariffs: z.object({
    astrology: z.object({
      reading: amount,
      extraHour: amount,
      loveFirstHour: amount,
      writtenVersion: amount,
    }),
    cards: z.object({
      firstHour: amount,
      extraHour: amount,
      specificQuestion: amount,
      singleCard: amount,
      writtenVersion: amount,
    }),
    psychologyCards: z.object({ intro: amount, followUp: amount }),
    packages: z.object({ family: amount, monthly: amount }),
    therapy: z.object({ intake: amount, session30: amount, session60: amount }),
    ayurveda: z.object({
      consult30: amount,
      consult60: amount,
      followUp: amount,
      cookingIntake: amount,
      cookingYear: amount,
    }),
    crystals: z.object({ single: amount, hour: amount, extraHour: amount }),
    reiki: z.object({ package: amount }),
    chakra: z.object({ session: amount }),
    fengShui: z.object({ start: amount, extraFloor: amount }),
    courses: z.object({ oneYear: amount }),
  }),
  faq: z
    .array(
      z.object({
        q: z.string().trim().min(3).max(300),
        a: z.string().trim().min(3).max(3000),
      }),
    )
    .max(30),
  sessions: z
    .array(
      z.object({
        key: z.enum(["oneOnOne", "liveWebinar", "privateWebinar"]),
        enabled: z.boolean(),
        title: z.string().trim().min(2).max(120),
        tagline: z.string().trim().max(200),
        description: z.string().trim().max(1200),
        duration: z.string().trim().max(60),
        format: z.string().trim().max(60),
        price: z.string().trim().max(40),
        highlights: z.array(z.string().trim().min(1).max(200)).max(8),
        ctaLabel: z.string().trim().min(2).max(60),
        ctaUrl: linkTarget,
      }),
    )
    .max(3),
} as const;

export type SettingsKey = keyof typeof schemas;
export type Settings = { [K in SettingsKey]: z.infer<(typeof schemas)[K]> };

/** What the site shows when nothing has been saved yet. */
export const defaults: Settings = {
  brand: { tagline: site.tagline, description: site.description },
  contact: { email: site.email },
  business: { kvk: site.business.kvk, iban: site.business.iban },
  socials: { ...site.socials },
  seo: { shareImage: "/share.png" },
  tariffs: JSON.parse(JSON.stringify(prices)) as Settings["tariffs"],
  faq: defaultFaq.map((item) => ({ q: item.q, a: item.a })),
  sessions: groupSessions.map((session) => ({
    key: session.key,
    enabled: session.enabled,
    title: session.title,
    tagline: session.tagline,
    description: session.description,
    duration: session.duration,
    format: session.format,
    price: session.price,
    highlights: [...session.highlights],
    ctaLabel: session.ctaLabel,
    ctaUrl: session.ctaUrl,
  })),
};

/**
 * Reads every section at once. Never throws and never returns a half-built
 * object: a section that fails validation is replaced by its default and the
 * reason is logged.
 */
export async function getSettings(): Promise<Settings> {
  const result: Settings = JSON.parse(JSON.stringify(defaults));

  try {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase.from("site_settings").select("key, value");
    if (error) {
      console.error("[settings] read failed", error.message);
      return result;
    }

    for (const row of data ?? []) {
      const key = row.key as SettingsKey;
      const schema = schemas[key];
      if (!schema) continue;

      const parsed = schema.safeParse(row.value);
      if (parsed.success) {
        // @ts-expect-error — key and value are matched by the lookup above.
        result[key] = parsed.data;
      } else {
        console.error(`[settings] "${key}" is invalid, using the default`, parsed.error.issues[0]?.message);
      }
    }
  } catch (cause) {
    console.error("[settings] read threw, using defaults", cause);
  }

  return result;
}
