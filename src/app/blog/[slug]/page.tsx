import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "@/lib/queries";
import { renderMarkdown } from "@/lib/markdown";
import { formatDate } from "@/lib/format";
import { Section } from "@/components/ui";

export const revalidate = 300;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt ?? undefined,
      publishedTime: post.published_at ?? undefined,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <Section className="py-20">
      <article className="mx-auto max-w-2xl">
        <Link href="/blog" className="text-sm text-mist-500 hover:text-gold-300">
          ← Journal
        </Link>

        <p className="mt-8 text-xs tracking-wide text-mist-500 uppercase">
          {formatDate(post.published_at ?? post.created_at)}
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-mist-100 sm:text-5xl">
          {post.title}
        </h1>
        {post.excerpt && <p className="mt-5 text-lg leading-relaxed text-mist-300">{post.excerpt}</p>}

        {post.cover_image && (
          // Cover images are author-supplied URLs, so a plain img avoids
          // pinning the whole site's remote-image allowlist to one host.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_image}
            alt=""
            className="mt-10 w-full rounded-2xl border border-white/10"
          />
        )}

        <div
          className="prose-astro mt-10"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        {post.tags.length > 0 && (
          <ul className="mt-12 flex flex-wrap gap-2 border-t border-white/10 pt-6">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-mist-500"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </article>
    </Section>
  );
}
