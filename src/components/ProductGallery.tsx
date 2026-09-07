"use client";

import { useState } from "react";

/**
 * The product's photos: one large, the rest as thumbnails that swap in. With
 * a single photo there are no thumbnails, so a product with one picture looks
 * exactly as it did before there could be more.
 */
export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0);
  const shown = images[current] ?? images[0];

  return (
    <div className="gallery">
      <div className="split-img gallery-main">
        {/* Author-uploaded URL; a plain img keeps the remote-image allowlist
            out of it. The key remounts on change so the browser does not
            show the previous photo while the next one loads. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={shown} src={shown} alt={name} />
      </div>

      {images.length > 1 && (
        <div className="gallery-thumbs" role="tablist" aria-label="Product photos">
          {images.map((url, index) => (
            <button
              key={url}
              type="button"
              role="tab"
              aria-selected={index === current}
              aria-label={`Photo ${index + 1} of ${images.length}`}
              className={`gallery-thumb${index === current ? " active" : ""}`}
              onClick={() => setCurrent(index)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
