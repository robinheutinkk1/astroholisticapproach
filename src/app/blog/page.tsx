import type { Metadata } from "next";
import Link from "next/link";
import { CtaBlock, PageHeader, Section } from "@/components/Layout";
import { getPublishedPosts } from "@/lib/queries";
import { formatDate } from "@/lib/format";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical, long-form articles on astrology, card readings, positive psychology and Ayurveda by Milan Landkroon.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <PageHeader
        trail={[{ label: "Blog" }]}
        eyebrow="Blog"
        title='Notes on charts, cycles <span class="accent">and practice</span>'
        intro="Practical, long-form articles on astrology, card readings, positive psychology and Ayurveda."
      />
      <Section>
        {posts.length > 0 ? (
          <div className="grid-3">
            {posts.map((post) => (
              <article className="blog-card reveal" key={post.id}>
                <div className="blog-img">
                  <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
                    <circle cx="50" cy="50" r="30" stroke="#D4AF37" strokeWidth="0.6" />
                    <circle cx="50" cy="50" r="18" stroke="#D4AF37" strokeWidth="0.6" opacity="0.6" />
                    <circle cx="50" cy="50" r="6" fill="#D4AF37" opacity="0.5" />
                  </svg>
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
            ))}
          </div>
        ) : (
          <div className="empty-state reveal">
            <p>No articles have been published yet.</p>
            <p>Articles written and published in the admin area appear here.</p>
          </div>
        )}
      </Section>
      <CtaBlock
        title="A topic you would like covered?"
        body="Send a short message with the question you keep coming back to, and it may well become the next article."
        links={[{ href: "/contact", label: "Suggest a topic" }]}
      />
    </>
  );
}
