"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { savePost, type ActionState } from "@/app/admin/actions";
import type { Post } from "@/lib/types";

const field =
  "w-full rounded-xl border border-white/15 bg-night-900/60 px-4 py-2.5 text-mist-100 placeholder:text-mist-500 focus:border-gold-400 focus:outline-none";
const label = "mb-2 block text-sm text-mist-200";

export function PostForm({ post }: { post?: Post }) {
  const action = savePost.bind(null, post?.id ?? null);
  const [state, formAction] = useActionState<ActionState, FormData>(action, {});

  return (
    <form action={formAction} className="max-w-3xl space-y-5">
      <div>
        <label className={label} htmlFor="title">
          Title
        </label>
        <input id="title" name="title" defaultValue={post?.title} required className={field} />
      </div>

      <div>
        <label className={label} htmlFor="slug">
          Slug <span className="text-mist-500">(leave empty to generate from the title)</span>
        </label>
        <input id="slug" name="slug" defaultValue={post?.slug} className={field} />
      </div>

      <div>
        <label className={label} htmlFor="excerpt">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={post?.excerpt ?? ""}
          className={field}
        />
      </div>

      <div>
        <label className={label} htmlFor="cover_image">
          Cover image URL
        </label>
        <input
          id="cover_image"
          name="cover_image"
          defaultValue={post?.cover_image ?? ""}
          className={field}
        />
      </div>

      <div>
        <label className={label} htmlFor="tags">
          Tags <span className="text-mist-500">(comma separated)</span>
        </label>
        <input id="tags" name="tags" defaultValue={post?.tags.join(", ") ?? ""} className={field} />
      </div>

      <div>
        <label className={label} htmlFor="content">
          Content <span className="text-mist-500">(markdown)</span>
        </label>
        <textarea
          id="content"
          name="content"
          rows={20}
          defaultValue={post?.content ?? ""}
          className={`${field} font-mono text-sm`}
        />
      </div>

      <label className="flex items-center gap-3 text-sm text-mist-200">
        <input
          type="checkbox"
          name="published"
          defaultChecked={post?.published ?? false}
          className="h-4 w-4 accent-gold-400"
        />
        Published
      </label>

      {state.error && (
        <p className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-4 pt-2">
        <SaveButton label="Save post" />
        <Link href="/admin/posts" className="text-sm text-mist-500 hover:text-mist-200">
          Cancel
        </Link>
      </div>
    </form>
  );
}

function SaveButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-gold-400 px-6 py-2.5 text-sm font-semibold text-night-950 hover:bg-gold-300 disabled:opacity-60"
    >
      {pending ? "Saving…" : label}
    </button>
  );
}
