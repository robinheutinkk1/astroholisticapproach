import Link from "next/link";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { formatDate } from "@/lib/format";
import { deletePost } from "@/app/admin/actions";
import type { Post } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
  const posts = (data ?? []) as Post[];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl text-mist-100">Journal</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-night-950 hover:bg-gold-300"
        >
          New post
        </Link>
      </div>

      <ul className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10 bg-night-900/40">
        {posts.map((post) => (
          <li key={post.id} className="flex flex-wrap items-center gap-4 p-5">
            <div className="min-w-0 flex-1">
              <Link
                href={`/admin/posts/${post.id}`}
                className="font-medium text-mist-100 hover:text-gold-300"
              >
                {post.title}
              </Link>
              <p className="mt-1 text-sm text-mist-500">
                /{post.slug} · {formatDate(post.published_at ?? post.created_at)}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs ${
                post.published
                  ? "bg-gold-400/15 text-gold-300"
                  : "border border-white/15 text-mist-500"
              }`}
            >
              {post.published ? "Published" : "Draft"}
            </span>

            <form action={deletePost}>
              <input type="hidden" name="id" value={post.id} />
              <button type="submit" className="text-sm text-mist-500 hover:text-red-300">
                Delete
              </button>
            </form>
          </li>
        ))}

        {posts.length === 0 && <li className="p-8 text-center text-mist-500">No posts yet.</li>}
      </ul>
    </div>
  );
}
