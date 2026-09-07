"use client";

import { useRef, useState } from "react";
import { uploadImage } from "@/app/admin/actions";
import { MAX_PRODUCT_IMAGES } from "@/lib/product-images";

/**
 * Up to MAX_PRODUCT_IMAGES photos, in the order they will be shown. The first
 * one is the main photo — it is what the shop card and a shared link show —
 * so the arrows matter, not just the uploads. Each photo posts as its own
 * hidden input under the same name, which is what the save action reads.
 */
export function ImageListField({
  name,
  label,
  folder,
  defaultValue = [],
}: {
  name: string;
  label: string;
  folder: string;
  defaultValue?: string[];
}) {
  const [urls, setUrls] = useState<string[]>(defaultValue.slice(0, MAX_PRODUCT_IMAGES));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const full = urls.length >= MAX_PRODUCT_IMAGES;

  async function handleFiles(event: React.ChangeEvent<HTMLInputElement>) {
    // Several may be picked at once; take as many as there is room for.
    const files = Array.from(event.target.files ?? []).slice(0, MAX_PRODUCT_IMAGES - urls.length);
    if (!files.length) return;

    setBusy(true);
    setError(null);

    for (const file of files) {
      const formData = new FormData();
      formData.set("file", file);
      formData.set("folder", folder);

      const result = await uploadImage(formData);
      if ("error" in result) {
        setError(result.error);
        break;
      }
      setUrls((current) => [...current, result.url]);
    }

    setBusy(false);
    // Let the same file be picked again after a failure.
    if (fileInput.current) fileInput.current.value = "";
  }

  function move(index: number, by: number) {
    setUrls((current) => {
      const target = index + by;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <div>
      <label>{label}</label>
      <p className="image-hint" style={{ marginBottom: 10 }}>
        The first photo is the main one: it is what the shop shows. Use the arrows to change the
        order.
      </p>

      {urls.length > 0 && (
        <ol className="image-list">
          {urls.map((url, index) => (
            <li className="image-slot" key={url}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" />
              <span className="image-slot-label">{index === 0 ? "Main photo" : `Photo ${index + 1}`}</span>
              <div className="block-tools">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label={`Move photo ${index + 1} earlier`}
                  title="Move earlier"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === urls.length - 1}
                  aria-label={`Move photo ${index + 1} later`}
                  title="Move later"
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="block-remove"
                  onClick={() => setUrls((current) => current.filter((_, i) => i !== index))}
                  aria-label={`Remove photo ${index + 1}`}
                  title="Remove"
                >
                  ✕
                </button>
              </div>
              <input type="hidden" name={name} value={url} readOnly />
            </li>
          ))}
        </ol>
      )}

      <div className="image-actions">
        <button
          type="button"
          className="admin-ghost"
          disabled={busy || full}
          onClick={() => fileInput.current?.click()}
        >
          {busy ? "Uploading…" : full ? `That is the maximum of ${MAX_PRODUCT_IMAGES}` : urls.length ? "Add another photo" : "Choose a photo"}
        </button>
        <span className="image-hint">
          {urls.length} of {MAX_PRODUCT_IMAGES} · JPG, PNG, WEBP, AVIF or GIF · up to 8 MB each
        </span>
      </div>

      <input
        ref={fileInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        multiple
        onChange={handleFiles}
        hidden
      />

      {error && (
        <p className="admin-alert" style={{ marginTop: 10 }}>
          {error}
        </p>
      )}
    </div>
  );
}
