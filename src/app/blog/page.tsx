import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/queries";
import { EmptyState, PageHeader, Section } from "@/components/ui";
import { PostCard } from "@/components/PostCard";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Journal",
  description: "Writing on transits, chart interpretation and holistic astrological practice.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <Section className="py-20">
      <PageHeader
        eyebrow="Journal"
        title="Notes on charts, cycles and practice"
        intro="Longer pieces on how to read a chart, what the current transits are doing, and how to keep an astrological practice grounded."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="mt-14">
          <EmptyState
            title="No posts published yet."
            hint="Published articles from the admin CMS appear here."
          />
        </div>
      )}
    </Section>
  );
}
