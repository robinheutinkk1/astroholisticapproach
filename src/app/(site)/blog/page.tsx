import type { Metadata } from "next";
import { CtaBlock, PageHeader, Section } from "@/components/Layout";
import { getPublishedPosts } from "@/lib/queries";
import { BlogCard } from "@/components/BlogCard";

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
              <BlogCard key={post.id} post={post} />
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
