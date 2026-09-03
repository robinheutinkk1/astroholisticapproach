"use client";

import { useEffect, useRef, useState } from "react";
import { uploadImage } from "@/app/admin/actions";
import {
  ADDABLE,
  BLOCK_LABELS,
  emptyBlock,
  fromMarkdown,
  toMarkdown,
  type Block,
  type BlockType,
} from "@/lib/blocks";
import { makeLink, toggleWrap, type Edit } from "@/lib/text-selection";
import { renderMarkdown } from "@/lib/markdown";

/**
 * The article editor: one labelled box per piece of the article, in the order
 * they appear on the page. Markdown is still what gets saved — the hidden
 * field at the bottom carries it — but nobody has to write it.
 */
export function BlockEditor({
  name,
  label,
  folder,
  defaultValue = "",
}: {
  name: string;
  label: string;
  folder: string;
  defaultValue?: string;
}) {
  const [blocks, setBlocks] = useState<Block[]>(() => fromMarkdown(defaultValue));
  const [previewing, setPreviewing] = useState(false);
  const markdown = toMarkdown(blocks);

  function update(id: string, patch: Partial<Block>) {
    setBlocks((current) =>
      current.map((block) => (block.id === id ? ({ ...block, ...patch } as Block) : block)),
    );
  }

  function move(index: number, by: number) {
    setBlocks((current) => {
      const next = [...current];
      const target = index + by;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <div>
      <div className="block-bar">
        <label>{label}</label>
        <button type="button" className="admin-ghost" onClick={() => setPreviewing((on) => !on)}>
          {previewing ? "Back to editing" : "Preview"}
        </button>
      </div>

      {previewing ? (
        <div className="block-preview">
          {/* The same renderer the published page uses, so what is shown here
              is what the article will look like — embeds and all. */}
          <div className="article-body" dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }} />
          {!markdown.trim() && <p className="block-empty">Nothing to preview yet.</p>}
        </div>
      ) : (
        <>
      <p className="block-intro">
        Each box below is one piece of the article, top to bottom. Add what you need, drag nothing —
        use the arrows to move a box up or down.
      </p>

      <div className="block-list">
        {blocks.map((block, index) => (
          <div className="block" key={block.id}>
            <div className="block-head">
              <span className="block-kind">{BLOCK_LABELS[block.type]}</span>
              <div className="block-tools">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label={`Move this ${BLOCK_LABELS[block.type].toLowerCase()} up`}
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === blocks.length - 1}
                  aria-label={`Move this ${BLOCK_LABELS[block.type].toLowerCase()} down`}
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="block-remove"
                  onClick={() => setBlocks((current) => current.filter((item) => item.id !== block.id))}
                  aria-label={`Remove this ${BLOCK_LABELS[block.type].toLowerCase()}`}
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            </div>

            <BlockBody block={block} folder={folder} onChange={(patch) => update(block.id, patch)} />
          </div>
        ))}

        {blocks.length === 0 && (
          <p className="block-empty">Nothing here yet. Start with a piece of text or a heading.</p>
        )}
      </div>

      <div className="block-add">
        <span className="block-add-label">Add</span>
        {ADDABLE.map((type) => (
          <button
            key={type}
            type="button"
            className="admin-ghost"
            onClick={() => setBlocks((current) => [...current, emptyBlock(type)])}
          >
            {BLOCK_LABELS[type]}
          </button>
        ))}
      </div>

        </>
      )}

      {/* What actually gets saved. The database column is unchanged. */}
      <input type="hidden" name={name} value={markdown} readOnly />
    </div>
  );
}

// ---------------------------------------------------------------------------

function BlockBody({
  block,
  folder,
  onChange,
}: {
  block: Block;
  folder: string;
  onChange: (patch: Partial<Block>) => void;
}) {
  switch (block.type) {
    case "heading":
    case "subheading":
      return (
        <input
          type="text"
          value={block.text}
          onChange={(event) => onChange({ text: event.target.value })}
          placeholder={block.type === "heading" ? "The twelve houses" : "Aries rising"}
        />
      );

    case "text":
      return (
        <RichText
          value={block.text}
          rows={5}
          onChange={(text) => onChange({ text })}
          placeholder="Write as you would in an e-mail. One thought per box."
        />
      );

    case "quote":
      return (
        <RichText
          value={block.text}
          rows={3}
          onChange={(text) => onChange({ text })}
          placeholder="A map, not a verdict."
        />
      );

    case "bullets":
    case "numbers":
      return <ItemList items={block.items} numbered={block.type === "numbers"} onChange={(items) => onChange({ items })} />;

    case "image":
      return (
        <ImageBlock
          url={block.url}
          alt={block.alt}
          folder={folder}
          onChange={(patch) => onChange(patch)}
        />
      );

    case "video":
      return <VideoBlock url={block.url} onChange={(url) => onChange({ url })} />;

    case "markdown":
      return (
        <>
          <p className="block-note">
            This part was written by hand — a table, an embed or something similar. It is kept
            exactly as it is. Leave it alone unless you know what it does.
          </p>
          <textarea
            className="mono"
            rows={Math.min(12, block.text.split("\n").length + 1)}
            value={block.text}
            onChange={(event) => onChange({ text: event.target.value })}
          />
        </>
      );
  }
}

/** A textarea with the three bits of formatting that belong inside a sentence. */
function RichText({
  value,
  rows,
  placeholder,
  onChange,
}: {
  value: string;
  rows: number;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  const field = useRef<HTMLTextAreaElement>(null);

  function apply(edit: (value: string, start: number, end: number) => Edit) {
    const element = field.current;
    if (!element) return;

    const next = edit(element.value, element.selectionStart, element.selectionEnd);
    onChange(next.value);
    // The value arrives through React on the next render, so the selection has
    // to be restored after it lands.
    requestAnimationFrame(() => {
      element.focus();
      element.setSelectionRange(next.selectionStart, next.selectionEnd);
    });
  }

  return (
    <>
      <div className="block-format">
        <button type="button" onClick={() => apply((v, s, e) => toggleWrap(v, s, e, "**", "bold text"))} title="Bold">
          <strong>B</strong>
        </button>
        <button type="button" onClick={() => apply((v, s, e) => toggleWrap(v, s, e, "*", "italic text"))} title="Italic">
          <em>I</em>
        </button>
        <button type="button" onClick={() => apply(makeLink)} title="Link">
          Link
        </button>
      </div>
      <textarea
        ref={field}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </>
  );
}

function ItemList({
  items,
  numbered,
  onChange,
}: {
  items: string[];
  numbered: boolean;
  onChange: (items: string[]) => void;
}) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const focusWanted = useRef<number | null>(null);

  // Adding a point has to put the cursor in it; otherwise Enter looks like it
  // did nothing and the next keystroke lands back in the point above.
  useEffect(() => {
    if (focusWanted.current === null) return;
    inputs.current[focusWanted.current]?.focus();
    focusWanted.current = null;
  });

  function addAfter(index: number) {
    const next = [...items];
    next.splice(index + 1, 0, "");
    focusWanted.current = index + 1;
    onChange(next);
  }

  function removeAt(index: number) {
    // The last point stays, emptied — a list box with no rows has no way back.
    if (items.length === 1) return onChange([""]);
    focusWanted.current = Math.max(0, index - 1);
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div className="block-items">
      {items.map((item, index) => (
        <div className="block-item" key={index}>
          <span className="block-bullet">{numbered ? `${index + 1}.` : "•"}</span>
          <input
            ref={(element) => {
              inputs.current[index] = element;
            }}
            type="text"
            value={item}
            placeholder="One point"
            onChange={(event) =>
              onChange(items.map((current, i) => (i === index ? event.target.value : current)))
            }
            onKeyDown={(event) => {
              // Enter adds the next point, the way a list behaves everywhere else.
              if (event.key === "Enter") {
                event.preventDefault();
                addAfter(index);
              }
              // Backspace in an empty point removes it, again like any list.
              if (event.key === "Backspace" && item === "" && items.length > 1) {
                event.preventDefault();
                removeAt(index);
              }
            }}
          />
          <button
            type="button"
            className="block-remove"
            onClick={() => removeAt(index)}
            aria-label={`Remove point ${index + 1}`}
            title="Remove this point"
          >
            ✕
          </button>
        </div>
      ))}
      <button type="button" className="admin-ghost block-add-item" onClick={() => addAfter(items.length - 1)}>
        Add a point
      </button>
    </div>
  );
}

function ImageBlock({
  url,
  alt,
  folder,
  onChange,
}: {
  url: string;
  alt: string;
  folder: string;
  onChange: (patch: { url?: string; alt?: string }) => void;
}) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    else onChange({ url: result.url });

    setBusy(false);
    // Let the same file be picked again after a failure.
    if (fileInput.current) fileInput.current.value = "";
  }

  return (
    <div>
      {url && (
        <div className="image-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="" />
        </div>
      )}

      <div className="image-actions">
        <button type="button" className="admin-ghost" disabled={busy} onClick={() => fileInput.current?.click()}>
          {busy ? "Uploading…" : url ? "Replace this image" : "Choose an image"}
        </button>
        <span className="image-hint">JPG, PNG, WEBP, AVIF or GIF · up to 8 MB</span>
      </div>

      <input
        ref={fileInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        onChange={handleFile}
        hidden
      />

      {error && <p className="admin-alert" style={{ marginTop: 10 }}>{error}</p>}

      <label className="block-sub">Describe the picture — read aloud to blind visitors, and shown if it fails to load</label>
      <input
        type="text"
        value={alt}
        onChange={(event) => onChange({ alt: event.target.value })}
        placeholder="A birth chart drawn on paper"
      />
    </div>
  );
}

const RECOGNISED_VIDEO = /(youtube\.com|youtube-nocookie\.com|youtu\.be|vimeo\.com)/i;

function VideoBlock({ url, onChange }: { url: string; onChange: (url: string) => void }) {
  const trimmed = url.trim();
  const known = RECOGNISED_VIDEO.test(trimmed);

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(event) => onChange(event.target.value)}
        placeholder="https://www.youtube.com/watch?v=…"
      />
      <p className={trimmed && !known ? "block-warn" : "block-sub"}>
        {!trimmed
          ? "Paste the link straight from YouTube or Vimeo — the address bar or the Share button, either works."
          : known
            ? "Recognised. This becomes a player on the page."
            : "That is not a YouTube or Vimeo address. It will show up as a plain link, not a player."}
      </p>
    </div>
  );
}
