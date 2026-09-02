import type { Metadata } from "next";
import { Button, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "The practice behind Holistic Astro Approach: how readings are prepared, what a session looks like, and what astrology is not used for here.",
};

export default function AboutPage() {
  return (
    <Section className="py-20">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-gold-400 uppercase">About</p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-mist-100 sm:text-5xl">
          A practice built on reading the whole picture
        </h1>

        <div className="prose-astro mt-10">
          <p>
            Holistic Astro Approach exists because most astrology stops at description. A list of
            placements is interesting for about ten minutes; what people actually want is a way to
            work with what they are holding.
          </p>

          <h2>How a reading is prepared</h2>
          <p>
            Every session starts with the chart calculated from your exact birth time and place.
            Before we speak, the chart is read on its own terms — elemental balance, chart shape,
            house emphasis, the aspects doing the heavy lifting — and the current transits are laid
            over it.
          </p>
          <p>
            What you bring to the session then shapes where the depth goes. The prepared reading is
            a foundation, not a script.
          </p>

          <h2>What a session looks like</h2>
          <ul>
            <li>Video call, recorded, so you are not taking notes while listening.</li>
            <li>Ninety minutes for a natal reading; shorter for focused work.</li>
            <li>A written summary afterwards with the key placements and what we covered.</li>
          </ul>

          <h2>What astrology is not used for here</h2>
          <p>
            No fixed predictions, no fate, no medical or financial advice. Astrology is used as a
            reflective tool. If something in your life needs a doctor, a therapist or a lawyer,
            that is what it needs — and you will be told so plainly.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Button href="/shop">See the readings</Button>
          <Button href="/contact" variant="ghost">
            Ask a question
          </Button>
        </div>
      </div>
    </Section>
  );
}
