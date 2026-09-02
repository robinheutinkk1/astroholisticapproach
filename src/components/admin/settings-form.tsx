"use client";

import { useState, useTransition } from "react";
import { saveSettingsSection, resetSettingsSections } from "@/app/admin/actions";
import type { SettingsKey } from "@/lib/settings";

/**
 * Shared save handling for the settings forms: one call per section, the
 * server's validation message shown as-is, and a reset that puts the section
 * back to the values the site shipped with.
 */
export function useSectionSave() {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  function save(sections: { key: SettingsKey; value: unknown }[]) {
    setMessage(null);
    startTransition(async () => {
      for (const section of sections) {
        const result = await saveSettingsSection(section.key, section.value);
        if (result.status === "error") {
          setMessage({ ok: false, text: result.message ?? "Saving failed." });
          return;
        }
      }
      setMessage({ ok: true, text: "Saved. The site is updated." });
    });
  }

  function reset(keys: SettingsKey[]) {
    if (!window.confirm("Restore the original values for this section? Your changes here will be lost.")) return;
    setMessage(null);
    startTransition(async () => {
      const result = await resetSettingsSections(keys);
      setMessage(
        result.status === "error"
          ? { ok: false, text: result.message ?? "Restoring failed." }
          : { ok: true, text: "Restored. Reload the page to see the original values." },
      );
    });
  }

  return { save, reset, pending, message };
}

export function SaveBar({
  pending,
  message,
  onReset,
}: {
  pending: boolean;
  message: { ok: boolean; text: string } | null;
  onReset: () => void;
}) {
  return (
    <>
      {message && <p className={message.ok ? "admin-saved" : "admin-alert"}>{message.text}</p>}

      <div className="admin-actions">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Saving…" : "Save changes"}
        </button>

        {/* A plain button, not a nested form — forms cannot contain forms. */}
        <button type="button" className="admin-danger" onClick={onReset} disabled={pending}>
          Restore the original values
        </button>
      </div>
    </>
  );
}
