import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { Post } from "@/lib/types";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-night-900/50 p-6 transition-colors hover:border-gold-500/40">
      <p className="text-xs tracking-wide text-mist-500 uppercase">
        {formatDate(post.published_at ?? post.created_at)}
      </p>
      <h3 className="mt-2 font-display text-xl leading-snug text-mist-100">
        <Link href={`/blog/${post.slug}`} className="transition-colors group-hover:text-gold-300">
          {post.title}
        </Link>
      </h3>
      {post.excerpt && (
        <p className="mt-3 text-sm leading-relaxed text-mist-300">{post.excerpt}</p>
      )}
      {post.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-mist-500"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
      <Link
        href={`/blog/${post.slug}`}
        className="mt-5 inline-block text-sm font-semibold text-gold-300"
      >
        Read →
      </Link>
    </article>
  );
}
