import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { Post } from "@/lib/types";

/**
 * The card is clickable as a whole: the title link stretches over it via an
 * ::after overlay. That keeps a single real link in the markup — good for
 * screen readers and for search engines — rather than a click handler that
 * the keyboard cannot reach.
 */
export function BlogCard({ post }: { post: Post }) {
  return (
    <article className="blog-card reveal">
      <div className="blog-img">
        {post.cover_image ? (
          // Author-supplied URL, so a plain img keeps the remote-image
          // allowlist from having to cover every host.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover_image} alt="" />
        ) : (
          <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
            <circle cx="50" cy="50" r="30" stroke="#D4AF37" strokeWidth="0.6" />
            <circle cx="50" cy="50" r="18" stroke="#D4AF37" strokeWidth="0.6" opacity="0.6" />
            <circle cx="50" cy="50" r="6" fill="#D4AF37" opacity="0.5" />
          </svg>
        )}
      </div>
      <div className="blog-body">
        {post.category && <span className="blog-cat">{post.category}</span>}
        <h3>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
        <div className="blog-meta">
          <span>{post.read_minutes ? `${post.read_minutes} min read` : "Article"}</span>
          <span>{formatDate(post.published_at ?? post.created_at)}</span>
        </div>
      </div>
    </article>
  );
}
