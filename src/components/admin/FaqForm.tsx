"use client";

import { useState } from "react";
import { SaveBar, useSectionSave } from "@/components/admin/settings-form";
import type { Settings } from "@/lib/settings";

type Item = Settings["faq"][number];

export function FaqForm({ faq }: { faq: Settings["faq"] }) {
  const { save, reset, pending, message } = useSectionSave();
  const [items, setItems] = useState<Item[]>(faq);

  function update(index: number, patch: Partial<Item>) {
    setItems((current) => current.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function move(index: number, by: number) {
    setItems((current) => {
      const next = [...current];
      const target = index + by;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <form
      className="admin-form"
      onSubmit={(event) => {
        event.preventDefault();
        save([{ key: "faq", value: items }]);
      }}
    >
      {items.map((item, index) => (
        <div className="admin-repeat" key={index}>
          <div className="admin-repeat-head">
            <strong>Question {index + 1}</strong>
            <span style={{ display: "flex", gap: 12 }}>
              <button type="button" className="admin-ghost" onClick={() => move(index, -1)} disabled={index === 0}>
                ↑
              </button>
              <button
                type="button"
                className="admin-ghost"
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
              >
                ↓
              </button>
              <button
                type="button"
                className="admin-danger"
                onClick={() => setItems((c) => c.filter((_, i) => i !== index))}
              >
                Remove
              </button>
            </span>
          </div>

          <div>
            <label htmlFor={`q-${index}`}>Question</label>
            <input id={`q-${index}`} type="text" value={item.q} onChange={(e) => update(index, { q: e.target.value })} />
          </div>
          <div>
            <label htmlFor={`a-${index}`}>Answer</label>
            <textarea id={`a-${index}`} rows={3} value={item.a} onChange={(e) => update(index, { a: e.target.value })} />
          </div>
        </div>
      ))}

      <button
        type="button"
        className="admin-ghost"
        onClick={() => setItems((c) => [...c, { q: "", a: "" }])}
        style={{ alignSelf: "flex-start" }}
      >
        Add a question
      </button>

      <SaveBar pending={pending} message={message} onReset={() => reset(["faq"])} />
    </form>
  );
}
