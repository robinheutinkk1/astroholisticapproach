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
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <h2 style={{ fontSize: "1.5rem" }}>Blog</h2>
        <Link href="/admin/posts/new" className="btn btn-primary">
          New article
        </Link>
      </div>

      <div className="admin-list" style={{ marginTop: 28 }}>
        {posts.map((post) => (
          <div className="admin-item" key={post.id}>
            <div className="grow">
              <Link href={`/admin/posts/${post.id}`}>{post.title}</Link>
              <div className="sub">
                /blog/{post.slug}
                {post.category ? ` · ${post.category}` : ""} · {formatDate(post.published_at ?? post.created_at)}
              </div>
            </div>
            <span className={`admin-pill${post.published ? " on" : ""}`}>{post.published ? "Published" : "Draft"}</span>
            <form action={deletePost}>
              <input type="hidden" name="id" value={post.id} />
              <button type="submit" className="admin-danger">
                Delete
              </button>
            </form>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="admin-item">
            <span style={{ color: "var(--c-mute-2)" }}>No articles yet.</span>
          </div>
        )}
      </div>
    </div>
  );
}
