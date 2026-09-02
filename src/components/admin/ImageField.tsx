"use client";

import { useRef, useState } from "react";
import { uploadImage } from "@/app/admin/actions";

/**
 * An image picker for the CMS: choose a file, it uploads and fills in the URL
 * itself. The URL stays visible and editable, so an image hosted elsewhere can
 * still be pasted in.
 */
export function ImageField({
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
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setBusy(true);
    setError(null);

    const formData = new FormData();
    formData.set("file", file);
    formData.set("folder", folder);

    const result = await uploadImage(formData);
    if ("error" in result) {
      setError(result.error);
    } else {
      setUrl(result.url);
    }

    setBusy(false);
    // Let the same file be picked again after a failure.
    if (fileInput.current) fileInput.current.value = "";
  }

  return (
    <div>
      <label htmlFor={name}>{label}</label>

      {url && (
        <div className="image-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="" />
          <button type="button" className="admin-danger" onClick={() => setUrl("")}>
            Remove
          </button>
        </div>
      )}

      <div className="image-actions">
        <button
          type="button"
          className="admin-ghost"
          disabled={busy}
          onClick={() => fileInput.current?.click()}
        >
          {busy ? "Uploading…" : url ? "Replace image" : "Choose an image"}
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

      {/* The value actually saved. Editable, so an external URL still works. */}
      <input
        id={name}
        name={name}
        type="text"
        className="mono"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="No image yet — choose one above, or paste a URL"
        style={{ marginTop: 10 }}
      />

      {error && (
        <p className="admin-alert" style={{ marginTop: 10 }}>
          {error}
        </p>
      )}
    </div>
  );
}
