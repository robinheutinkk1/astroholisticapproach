"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { savePost, type ActionState } from "@/app/admin/actions";
import type { Post } from "@/lib/types";
import { ImageField } from "@/components/admin/ImageField";
import { BlockEditor } from "@/components/admin/BlockEditor";

export function PostForm({ post }: { post?: Post }) {
  const action = savePost.bind(null, post?.id ?? null);
  const [state, formAction] = useActionState<ActionState, FormData>(action, {});

  return (
    <form action={formAction} className="admin-form">
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" defaultValue={post?.title} required />
      </div>

      <div className="admin-row">
        <div>
          <label htmlFor="slug">Slug — leave empty to generate from the title</label>
          <input id="slug" name="slug" type="text" defaultValue={post?.slug} />
        </div>
        <div>
          <label htmlFor="category">Category — shown on the card</label>
          <input id="category" name="category" type="text" defaultValue={post?.category ?? ""} placeholder="Astrology" />
        </div>
        <div>
          <label htmlFor="read_minutes">Reading time in minutes</label>
          <input id="read_minutes" name="read_minutes" type="number" min={1} defaultValue={post?.read_minutes ?? ""} />
        </div>
      </div>

      <div>
        <label htmlFor="excerpt">Excerpt</label>
        <textarea id="excerpt" name="excerpt" rows={2} defaultValue={post?.excerpt ?? ""} />
      </div>

      <div className="admin-row">
        <ImageField
          name="cover_image"
          label="Cover image"
          folder="posts"
          defaultValue={post?.cover_image ?? ""}
        />
        <div>
          <label htmlFor="tags">Tags — comma separated</label>
          <input id="tags" name="tags" type="text" defaultValue={post?.tags.join(", ") ?? ""} />
        </div>
      </div>

      <BlockEditor name="content" label="Content" folder="posts" defaultValue={post?.content ?? ""} />

      <label className="admin-check">
        <input type="checkbox" name="published" defaultChecked={post?.published ?? false} />
        Published
      </label>

      {state.error && <p className="admin-alert">{state.error}</p>}

      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <SaveButton label="Save post" />
        <Link href="/admin/posts" className="admin-danger">
          Cancel
        </Link>
      </div>
    </form>
  );
}

function SaveButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Saving…" : label}
    </button>
  );
}
