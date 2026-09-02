"use client";

import { useState } from "react";
import { faq } from "@/content/faq";

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="faq-wrap reveal">
      {faq.map((item, index) => (
        <div className={`faq-item${open === index ? " open" : ""}`} key={item.q}>
          <button
            type="button"
            className="faq-q"
            aria-expanded={open === index}
            onClick={() => setOpen((current) => (current === index ? null : index))}
          >
            {item.q}
            <span className="faq-icon" aria-hidden="true" />
          </button>
          <div className="faq-a">
            <p dangerouslySetInnerHTML={{ __html: item.a }} />
          </div>
        </div>
      ))}
    </div>
  );
}
