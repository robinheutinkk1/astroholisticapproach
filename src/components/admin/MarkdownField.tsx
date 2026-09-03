"use client";

import { useRef, useState } from "react";
import { uploadImage } from "@/app/admin/actions";
import { spliceSnippet } from "@/lib/insert-snippet";

/** `type` is literal syntax; `note` is an instruction, so it is not set in code type. */
const CHEATSHEET: { what: string; type?: string; note?: string }[] = [
  { what: "A heading above a section", type: "## The twelve houses" },
  { what: "A smaller heading", type: "### Aries rising" },
  { what: "Bold", type: "**the ascendant**" },
  { what: "A bullet list", type: "- first point\n- second point" },
  { what: "A numbered list", type: "1. first step\n2. second step" },
  { what: "A quote", type: "> The chart is a map, not a verdict." },
  { what: "A link to your own page", type: "[the tariffs](/tariffs)" },
  { what: "A link to another site", type: "[astro.com](https://www.astro.com/)" },
  { what: "An image", note: "Use the Add an image button above" },
  { what: "A video", note: "Paste the YouTube link on a line of its own" },
];

/**
 * The article editor. It is a plain markdown textarea — deliberately, because
 * a rich editor would let Milan produce markup the site has no styling for —
 * with the two things a plain textarea cannot do on its own: putting an
 * uploaded image where the cursor is, and remembering the syntax for him.
 */
export function MarkdownField({
  name,
  label,
  folder,
  defaultValue = "",
  rows = 22,
}: {
  name: string;
  label: string;
  folder: string;
  defaultValue?: string;
  rows?: number;
}) {
  const textarea = useRef<HTMLTextAreaElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Drops text in at the cursor, or at the end if the field was never focused. */
  function insertAtCursor(snippet: string) {
    const field = textarea.current;
    if (!field) return;

    const start = field.selectionStart ?? field.value.length;
    const next = spliceSnippet(field.value, start, field.selectionEnd ?? start, snippet);

    field.value = next.value;
    field.focus();
    field.setSelectionRange(next.caret, next.caret);
  }

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setBusy(true);
    setError(null);

    const formData = new FormData();
    formData.set("file", file);
    formData.set("folder", folder);

    const result = await uploadImage(formData);
    if ("error" in result) setError(result.error);
    else insertAtCursor(`![](${result.url})`);

    setBusy(false);
    // Let the same file be picked again after a failure.
    if (fileInput.current) fileInput.current.value = "";
  }

  return (
    <div>
      <label htmlFor={name}>{label}</label>

      <div className="image-actions" style={{ marginBottom: 10 }}>
        <button
          type="button"
          className="admin-ghost"
          disabled={busy}
          onClick={() => fileInput.current?.click()}
        >
          {busy ? "Uploading…" : "Add an image"}
        </button>
        <span className="image-hint">Lands where your cursor is · JPG, PNG, WEBP, AVIF or GIF · up to 8 MB</span>
      </div>

      <input
        ref={fileInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        onChange={handleFile}
        hidden
      />

      {error && (
        <p className="admin-alert" style={{ marginBottom: 10 }}>
          {error}
        </p>
      )}

      <textarea ref={textarea} id={name} name={name} rows={rows} className="mono" defaultValue={defaultValue} />

      <details className="admin-help">
        <summary>How do I write this? — headings, links, images, video</summary>
        <p>
          Type plain text and leave a blank line between paragraphs. Everything below is optional —
          use it only where you want it.
        </p>
        <dl className="admin-help-list">
          {CHEATSHEET.map((row) => (
            <div key={row.what}>
              <dt>{row.what}</dt>
              <dd className={row.note ? "note" : undefined}>{row.type ?? row.note}</dd>
            </div>
          ))}
        </dl>
        <p>
          A video needs nothing but the ordinary link. Copy it from YouTube&apos;s address bar or its
          Share button, paste it on an empty line, and it becomes a player. Vimeo works the same way.
          A link inside a sentence stays a link.
        </p>
      </details>
    </div>
  );
}
