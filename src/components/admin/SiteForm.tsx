"use client";

import { SaveBar, useSectionSave } from "@/components/admin/settings-form";
import { ImageField } from "@/components/admin/ImageField";
import type { Settings } from "@/lib/settings";

const KEYS = ["brand", "contact", "business", "socials", "seo"] as const;

export function SiteForm({ settings }: { settings: Settings }) {
  const { save, reset, pending, message } = useSectionSave();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const f = new FormData(event.currentTarget);
    const text = (name: string) => String(f.get(name) ?? "").trim();

    save([
      { key: "brand", value: { tagline: text("tagline"), description: text("description") } },
      { key: "contact", value: { email: text("email") } },
      { key: "business", value: { kvk: text("kvk"), iban: text("iban") } },
      {
        key: "socials",
        value: {
          instagram: text("instagram"),
          youtube: text("youtube"),
          spotify: text("spotify"),
          facebook: text("facebook"),
        },
      },
      { key: "seo", value: { shareImage: text("shareImage") } },
    ]);
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <fieldset className="admin-fieldset">
        <h3>Contact</h3>
        <div>
          <label htmlFor="email">E-mail address</label>
          <input id="email" name="email" type="email" defaultValue={settings.contact.email} required />
          <p className="admin-hint">Shown on the contact page, in the footer and in the terms.</p>
        </div>
      </fieldset>

      <fieldset className="admin-fieldset">
        <h3>Social media</h3>
        <p className="admin-hint" style={{ marginTop: -10, marginBottom: 16 }}>
          Leave a field empty to hide that icon in the footer.
        </p>
        <div className="admin-row">
          <div>
            <label htmlFor="instagram">Instagram</label>
            <input id="instagram" name="instagram" type="url" defaultValue={settings.socials.instagram} placeholder="https://instagram.com/…" />
          </div>
          <div>
            <label htmlFor="youtube">YouTube</label>
            <input id="youtube" name="youtube" type="url" defaultValue={settings.socials.youtube} placeholder="https://youtube.com/…" />
          </div>
        </div>
        <div className="admin-row">
          <div>
            <label htmlFor="spotify">Spotify</label>
            <input id="spotify" name="spotify" type="url" defaultValue={settings.socials.spotify} placeholder="https://open.spotify.com/…" />
          </div>
          <div>
            <label htmlFor="facebook">Facebook</label>
            <input id="facebook" name="facebook" type="url" defaultValue={settings.socials.facebook} placeholder="https://facebook.com/…" />
          </div>
        </div>
      </fieldset>

      <fieldset className="admin-fieldset">
        <h3>Business details</h3>
        <div className="admin-row">
          <div>
            <label htmlFor="kvk">Chamber of Commerce number</label>
            <input id="kvk" name="kvk" type="text" defaultValue={settings.business.kvk} />
          </div>
          <div>
            <label htmlFor="iban">IBAN</label>
            <input id="iban" name="iban" type="text" defaultValue={settings.business.iban} />
          </div>
        </div>
        <p className="admin-hint">Both appear at the bottom of every page.</p>
      </fieldset>

      <fieldset className="admin-fieldset">
        <h3>How the site describes itself</h3>
        <div>
          <label htmlFor="tagline">Footer text</label>
          <textarea id="tagline" name="tagline" rows={3} defaultValue={settings.brand.tagline} required />
        </div>
        <div style={{ marginTop: 18 }}>
          <label htmlFor="description">Search engine description</label>
          <textarea id="description" name="description" rows={3} defaultValue={settings.brand.description} required />
          <p className="admin-hint">
            The sentence Google shows under the site name, and the text people see when a link is shared. Keep it under
            about 160 characters.
          </p>
        </div>
      </fieldset>

      <fieldset className="admin-fieldset">
        <h3>Share image</h3>
        <p className="admin-hint" style={{ marginTop: -10, marginBottom: 16 }}>
          Shown when a link to the site is shared on Instagram, WhatsApp, Facebook or LinkedIn. Articles with their own
          cover image use that instead. Best at 1200 × 630 pixels.
        </p>
        {/* ImageField renders the input named shareImage, so the form picks
            up whatever it uploads or has pasted in. */}
        <ImageField name="shareImage" label="Image" folder="site" defaultValue={settings.seo.shareImage} />
      </fieldset>

      <SaveBar pending={pending} message={message} onReset={() => reset([...KEYS])} />
    </form>
  );
}
