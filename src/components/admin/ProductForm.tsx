"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { saveProduct, type ActionState } from "@/app/admin/actions";
import type { Product } from "@/lib/types";

const field =
  "w-full rounded-xl border border-white/15 bg-night-900/60 px-4 py-2.5 text-mist-100 placeholder:text-mist-500 focus:border-gold-400 focus:outline-none";
const label = "mb-2 block text-sm text-mist-200";

export function ProductForm({ product }: { product?: Product }) {
  const action = saveProduct.bind(null, product?.id ?? null);
  const [state, formAction] = useActionState<ActionState, FormData>(action, {});

  return (
    <form action={formAction} className="max-w-3xl space-y-5">
      <div>
        <label className={label} htmlFor="name">
          Name
        </label>
        <input id="name" name="name" defaultValue={product?.name} required className={field} />
      </div>

      <div>
        <label className={label} htmlFor="slug">
          Slug <span className="text-mist-500">(leave empty to generate from the name)</span>
        </label>
        <input id="slug" name="slug" defaultValue={product?.slug} className={field} />
      </div>

      <div>
        <label className={label} htmlFor="summary">
          Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          rows={2}
          defaultValue={product?.summary ?? ""}
          className={field}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className={label} htmlFor="price">
            Price <span className="text-mist-500">(e.g. 165.00)</span>
          </label>
          <input
            id="price"
            name="price"
            inputMode="decimal"
            defaultValue={product ? (product.price_cents / 100).toFixed(2) : "0.00"}
            required
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="currency">
            Currency
          </label>
          <input
            id="currency"
            name="currency"
            maxLength={3}
            defaultValue={product?.currency ?? "eur"}
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="kind">
            Type
          </label>
          <select id="kind" name="kind" defaultValue={product?.kind ?? "service"} className={field}>
            <option value="service">Service</option>
            <option value="digital">Digital</option>
            <option value="physical">Physical</option>
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="stock">
            Stock <span className="text-mist-500">(leave empty for unlimited)</span>
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min={0}
            defaultValue={product?.stock ?? ""}
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="sort_order">
            Sort order
          </label>
          <input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={product?.sort_order ?? 0}
            className={field}
          />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="image_url">
          Image URL
        </label>
        <input
          id="image_url"
          name="image_url"
          defaultValue={product?.image_url ?? ""}
          className={field}
        />
      </div>

      <div>
        <label className={label} htmlFor="description">
          Description <span className="text-mist-500">(markdown)</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={14}
          defaultValue={product?.description ?? ""}
          className={`${field} font-mono text-sm`}
        />
      </div>

      <label className="flex items-center gap-3 text-sm text-mist-200">
        <input
          type="checkbox"
          name="active"
          defaultChecked={product?.active ?? true}
          className="h-4 w-4 accent-gold-400"
        />
        Visible in the shop
      </label>

      {state.error && (
        <p className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-4 pt-2">
        <SaveButton />
        <Link href="/admin/products" className="text-sm text-mist-500 hover:text-mist-200">
          Cancel
        </Link>
      </div>
    </form>
  );
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-gold-400 px-6 py-2.5 text-sm font-semibold text-night-950 hover:bg-gold-300 disabled:opacity-60"
    >
      {pending ? "Saving…" : "Save product"}
    </button>
  );
}
