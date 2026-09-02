import Link from "next/link";
import { Btn } from "@/components/Layout";

const tags = [
  { href: "/astrology", label: "Astrology chart readings" },
  { href: "/cards", label: "Cards readings" },
  { href: "/psychology", label: "Positive Psychology" },
  { href: "/ayurveda", label: "Ayurveda" },
  { href: "/healing/crystals", label: "Human Design" },
];

/** Milan's introduction, shown on both the home page and /about. */
export function AboutSplit() {
  return (
    <div className="split">
      <div className="split-img reveal">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/milan-landkroon.webp" alt="Milan Landkroon" loading="lazy" decoding="async" />
      </div>
      <div className="reveal">
        <h2>
          From the <span className="accent">stage</span> to the chart
        </h2>
        <div className="about-panel about-body">
          <p>I am Milan Landkroon, 47 years, living and working in Amsterdam, The Netherlands.</p>
          <p>
            I started as multi media performing artist, dancer, choreographer and conceptual artist. Already I started at
            a young age specializing in Astrology chart Readings, Cards Readings, Positive Psychology and Ayurveda.
          </p>
          <p>
            Twenty five years of study and certifications across each discipline, that is what makes it possible to
            combine all the holistic techniques.
          </p>
          <p>I offer a wide range of different techniques, all based on Holism and all by Human Design.</p>
          <p>
            In other words a <span className="accent">Holistic Astro Approach</span>.
          </p>
        </div>
        <div className="tags">
          {tags.map((tag) => (
            <Link className="tag" href={tag.href} key={tag.href}>
              {tag.label}
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Btn href="/contact" arrow>
            Contact me
          </Btn>
        </div>
      </div>
    </div>
  );
}
