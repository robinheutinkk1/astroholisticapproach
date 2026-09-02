import Link from "next/link";
import { getActiveProducts, getPublishedPosts } from "@/lib/queries";
import { Button, Card, Section } from "@/components/ui";
import { ProductCard } from "@/components/ProductCard";
import { PostCard } from "@/components/PostCard";

export const revalidate = 300;

const pillars = [
  {
    title: "The chart",
    body: "Placements, houses and aspects read as one picture rather than a list of traits — the material you were given to work with.",
  },
  {
    title: "The body",
    body: "Where the chart shows up physically: energy, rhythm, the seasons in which you tend to thrive or contract.",
  },
  {
    title: "The timing",
    body: "Transits and progressions that describe what the current chapter is asking of you, and when the pressure eases.",
  },
];

export default async function HomePage() {
  const [products, posts] = await Promise.all([getActiveProducts(3), getPublishedPosts(3)]);

  return (
    <>
      <Section className="py-24 text-center sm:py-32">
        <p className="text-xs font-semibold tracking-[0.25em] text-gold-400 uppercase">
          Astrology · Reflection · Practice
        </p>
        <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl leading-[1.15] text-mist-100 sm:text-6xl">
          Your chart is not a verdict.
          <br />
          <span className="text-gold-300">It is the material you were given.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-mist-300">
          Holistic readings that put the birth chart next to the life you are actually living —
          and leave you with something you can use on a Tuesday morning.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/shop">Book a reading</Button>
          <Button href="/blog" variant="ghost">
            Read the journal
          </Button>
        </div>
      </Section>

      <Section className="pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <Card key={pillar.title}>
              <h2 className="font-display text-xl text-gold-300">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-mist-300">{pillar.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {products.length > 0 && (
        <Section className="pb-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl text-mist-100">Readings</h2>
            <Link href="/shop" className="text-sm text-gold-300 hover:text-gold-400">
              See everything →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Section>
      )}

      {posts.length > 0 && (
        <Section className="pb-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl text-mist-100">From the journal</h2>
            <Link href="/blog" className="text-sm text-gold-300 hover:text-gold-400">
              All writing →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </Section>
      )}

      <Section className="pb-28">
        <div className="rounded-3xl border border-gold-500/25 bg-night-900/60 px-8 py-14 text-center">
          <h2 className="font-display text-3xl text-mist-100">Not sure where to start?</h2>
          <p className="mx-auto mt-4 max-w-lg text-mist-300">
            Send a note describing what is going on. You will get an honest answer about whether a
            reading is the right thing right now.
          </p>
          <Button href="/contact" className="mt-8">
            Get in touch
          </Button>
        </div>
      </Section>
    </>
  );
}
