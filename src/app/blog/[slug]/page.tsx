import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Btn, PageHeader, Section } from "@/components/Layout";
import { getPostBySlug, getPublishedPosts } from "@/lib/queries";
import { renderMarkdown } from "@/lib/markdown";
import { formatDate } from "@/lib/format";

export const revalidate = 300;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };

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
    <>
      <PageHeader
        trail={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
        eyebrow={post.category ?? "Article"}
        title={post.title}
        intro={post.excerpt ?? undefined}
      />
      <Section>
        <article className="article-body reveal">
          <div className="article-meta">
            <span>{formatDate(post.published_at ?? post.created_at)}</span>
            {post.read_minutes && <span>{post.read_minutes} min read</span>}
          </div>

          {post.cover_image && (
            // Author-supplied URL, so a plain img avoids pinning the remote
            // image allowlist to one host.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.cover_image} alt="" style={{ marginTop: 28, borderRadius: "var(--radius)" }} />
          )}

          <div
            style={{ marginTop: 28 }}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />

          <div className="course-cta" style={{ marginTop: 40 }}>
            <Btn href="/blog" variant="secondary">
              Back to the blog
            </Btn>
            <Btn href="/contact" arrow>
              Book a session
            </Btn>
          </div>
        </article>
      </Section>
    </>
  );
}
