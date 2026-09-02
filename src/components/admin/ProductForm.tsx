"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { saveProduct, type ActionState } from "@/app/admin/actions";
import type { Product } from "@/lib/types";
import { ImageField } from "@/components/admin/ImageField";

const icons = ["chart", "star", "book", "circle", "heart", "beads", "gem", "triple", "leaf"];

export function ProductForm({ product }: { product?: Product }) {
  const action = saveProduct.bind(null, product?.id ?? null);
  const [state, formAction] = useActionState<ActionState, FormData>(action, {});

  return (
    <form action={formAction} className="admin-form">
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" defaultValue={product?.name} required />
      </div>

      <div className="admin-row">
        <div>
          <label htmlFor="slug">Slug — leave empty to generate from the name</label>
          <input id="slug" name="slug" type="text" defaultValue={product?.slug} />
        </div>
        <div>
          <label htmlFor="category">Shop category</label>
          <select id="category" name="category" defaultValue={product?.category ?? "reports"}>
            <option value="reports">Reports &amp; Guides</option>
            <option value="jewelry">Jewelry</option>
            <option value="crystals">Crystals</option>
          </select>
        </div>
        <div>
          <label htmlFor="badge">Badge — e.g. Bestseller</label>
          <input id="badge" name="badge" type="text" defaultValue={product?.badge ?? ""} />
        </div>
      </div>

      <div>
        <label htmlFor="summary">Summary — shown on the card</label>
        <textarea id="summary" name="summary" rows={2} defaultValue={product?.summary ?? ""} />
      </div>

      <div className="admin-row">
        <div>
          <label htmlFor="price">Price — e.g. 89.00</label>
          <input
            id="price"
            name="price"
            type="text"
            inputMode="decimal"
            defaultValue={product ? (product.price_cents / 100).toFixed(2) : "0.00"}
            required
          />
        </div>
        <div>
          <label htmlFor="currency">Currency</label>
          <input id="currency" name="currency" type="text" maxLength={3} defaultValue={product?.currency ?? "eur"} />
        </div>
        <div>
          <label htmlFor="kind">Type</label>
          <select id="kind" name="kind" defaultValue={product?.kind ?? "physical"}>
            <option value="service">Service</option>
            <option value="digital">Digital</option>
            <option value="physical">Physical</option>
          </select>
        </div>
      </div>

      <label className="admin-check">
        <input type="checkbox" name="price_on_request" defaultChecked={product?.price_on_request ?? false} />
        Price on request — shows an enquiry link instead of a buy button
      </label>

      <div className="admin-row">
        <div>
          <label htmlFor="stock">Stock — leave empty for unlimited</label>
          <input id="stock" name="stock" type="number" min={0} defaultValue={product?.stock ?? ""} />
        </div>
        <div>
          <label htmlFor="sort_order">Sort order</label>
          <input id="sort_order" name="sort_order" type="number" defaultValue={product?.sort_order ?? 0} />
        </div>
        <div>
          <label htmlFor="icon">Drawn mark — used when there is no image</label>
          <select id="icon" name="icon" defaultValue={product?.icon ?? "star"}>
            {icons.map((icon) => (
              <option value={icon} key={icon}>
                {icon}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ImageField
        name="image_url"
        label="Product photo — replaces the drawn mark"
        folder="products"
        defaultValue={product?.image_url ?? ""}
      />

      <div>
        <label htmlFor="description">Description — markdown</label>
        <textarea id="description" name="description" rows={14} className="mono" defaultValue={product?.description ?? ""} />
      </div>

      <label className="admin-check">
        <input type="checkbox" name="active" defaultChecked={product?.active ?? true} />
        Visible in the shop
      </label>

      {state.error && <p className="admin-alert">{state.error}</p>}

      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <SaveButton />
        <Link href="/admin/products" className="admin-danger">
          Cancel
        </Link>
      </div>
    </form>
  );
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Saving…" : "Save product"}
    </button>
  );
}
