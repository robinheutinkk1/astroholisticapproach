import { Btn, CtaBlock, Section, SectionHead } from "@/components/Layout";
import { HeroStars } from "@/components/HeroStars";
import { MethodSection } from "@/components/MethodSection";
import { CourseTariffSection, TariffSection } from "@/components/Tariffs";
import { AboutSplit } from "@/components/AboutSplit";
import { BlogCard } from "@/components/BlogCard";
import { getPublishedPosts } from "@/lib/queries";
import { scarcityLabel } from "@/lib/site";

export const revalidate = 300;

const mostBooked = [
  {
    title: "Natal Chart Reading",
    desc: "Personalized insights to support self-awareness and personal growth.",
    interest: "natal",
  },
  {
    title: "Tarot Card Reading",
    desc: "To provide insight, guidance and self-reflection on life&#39;s questions and experiences.",
    interest: "cards",
  },
  {
    title: "Ayurvedic Diet Advice",
    desc: "To provide insight and advice on your unique mind-body constitution, and self-reflection on life&#39;s questions and experiences.",
    interest: "ayurveda",
  },
];

export default async function HomePage() {
  // Three most recent articles. The block stays away until something is
  // published, so the page never shows an empty shelf.
  const posts = await getPublishedPosts(3);

  return (
    <>
      <section className="hero">
        <HeroStars />
        <div className="hero-glow" aria-hidden="true" />
        <div className="container hero-inner">
          <div>
            <span className="trust-row">
              <span className="dot" />
              {scarcityLabel("home")}
            </span>
            <h1>
              A Holistic Astro Approach
              <br />
              by <span className="accent">Human Design</span>
            </h1>
            <p className="hero-kicker">A unique opportunity to combine all holistic techniques &amp; disciplines.</p>
            <p className="hero-by">By Milan Landkroon</p>
            <p className="hero-sub">
              After 25+ years of studying Astrology, Positive Psychology, Ayurveda and energy work, Milan weaves them
              into one practice: concrete maps you can act on.
            </p>
            <div className="hero-ctas">
              <Btn href="/contact" arrow>
                Book a reading
              </Btn>
              <Btn href="/shop" variant="secondary">
                Visit the shop
              </Btn>
            </div>
          </div>
          <div className="hero-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="hero-wheel"
              src="/hero-wheel.png"
              alt="Zodiac wheel with the twelve astrological signs"
              width={740}
              height={740}
            />
          </div>
        </div>
      </section>

      <Section>
        <SectionHead
          eyebrow="About me"
          plain
          title='Milan Landkroon, <span class="accent">a 25-year practice</span>'
          lead="May I introduce myself."
        />
        <AboutSplit />
      </Section>

      <MethodSection />

      <Section>
        <SectionHead eyebrow="Most booked" plain title='Where to <span class="accent">start</span>' />
        <div className="grid-3">
          {mostBooked.map((item) => (
            <article className="card reveal" key={item.title}>
              <h3>{item.title}</h3>
              <p className="card-desc" dangerouslySetInnerHTML={{ __html: item.desc }} />
              <p className="card-ref">
                See <a href="/tariffs">Method of Working &amp; Tariff structure</a> below.
              </p>
              <Btn href={`/contact?i=${item.interest}`} variant="secondary" arrow className="card-cta">
                Send a request
              </Btn>
            </article>
          ))}
        </div>
      </Section>

      <TariffSection />
      <CourseTariffSection />

      {posts.length > 0 && (
        <Section>
          <SectionHead eyebrow="Journal" plain title='From <span class="accent">the journal</span>' />
          <div className="grid-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 34 }}>
            <Btn href="/blog" variant="secondary" arrow>
              Read the journal
            </Btn>
          </div>
        </Section>
      )}

      <CtaBlock
        title='Not sure where to <span class="accent">start</span>?'
        body="Send a short message describing what you are working with. Milan reads every email personally and replies within 24 hours with a recommendation."
        links={[{ href: "/contact", label: "Send a message" }]}
      />
    </>
  );
}
