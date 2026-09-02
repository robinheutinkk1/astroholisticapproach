import type { Metadata } from "next";
import Link from "next/link";
import { InfoBox, PageHeader, PriceLines, Section } from "@/components/Layout";
import { Btn } from "@/components/Layout";
import { prices } from "@/content/pricing";
import { scarcityLabel } from "@/lib/site";

export const metadata: Metadata = {
  title: "Feng Shui Home Consult",
  description:
    "A personal Feng Shui home consult: map the energy zones of your home and find out what you can change.",
};

export default function FengShuiPage() {
  return (
    <>
      <PageHeader
        trail={[{ label: "Feng Shui" }]}
        eyebrow="Feng Shui"
        title='Your space, <span class="accent">working for you</span>'
      />
      <Section>
        <div className="intro-copy reveal" style={{ marginTop: 0 }}>
          <p>
            Feng Shui literally means &lsquo;wind and water&rsquo;. It is an ancient Chinese philosophy and teaching that
            states that your living environment influences your happiness, health and state of mind.
          </p>
          <p>
            By balancing your environment, it supports greater well-being, clarity, abundance and inner peace. The goal
            is to create harmony and balance, so that positive life energy (Chi) can flow optimally through your home.
          </p>
        </div>

        <div className="grid-2 reveal">
          <InfoBox
            title="Who this is for"
            items={[
              "You want to create a home that feels balanced and supportive",
              "You want to invite more positive energy into your life",
              "You just moved, or are about to",
              "You have problems with sleeping in a specific room",
            ]}
          />
          <InfoBox
            title="What you get"
            items={[
              "An individual approach, personalised and one-on-one",
              "A home tour by Zoom, the analysis, and the actions in order of priority",
            ]}
          >
            <PriceLines
              rows={[
                { label: "Start tariff", sub: "Your home, first floor included", price: prices.fengShui.start },
                { label: "Each additional floor", sub: "Added to the start tariff", price: prices.fengShui.extraFloor },
              ]}
            />
            <p className="side-note">
              The price depends on the complexity of your home, for instance the number of floors and terraces.
            </p>
          </InfoBox>
        </div>
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <InfoBox title="Home Feng Shui consult, before we start" style={{ maxWidth: 820, margin: "0 auto" }}>
          <p style={{ marginBottom: 16 }}>
            Send a message beforehand via the <Link href="/contact?i=fengshui">contact page</Link> with as much
            information about your home as you can:
          </p>
          <ul>
            <li>A site plan of your home, preferably</li>
            <li>The orientation of the location and the front door</li>
            <li>The toilets and the rooms involved</li>
            <li>The number of floors</li>
            <li>The placement of beds and sitting areas</li>
            <li>The date of birth of you and your family members</li>
            <li>And of course the questions you have</li>
          </ul>
          <p className="side-note">
            Once we have all the information, we walk through your home together, map the energy zones, identify what is
            working for you or against you, and discuss what you can change.
          </p>
        </InfoBox>
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <div className="cta-block reveal">
          <span className="trust-row" style={{ marginBottom: 18 }}>
            <span className="dot" />
            {scarcityLabel("service")}
          </span>
          <h2>
            From {prices.fengShui.start}{" "}
            <span style={{ fontSize: "0.5em", color: "var(--c-mute)", fontStyle: "normal" }}>
              · each additional floor {prices.fengShui.extraFloor}
            </span>
          </h2>
          <p>
            Send a request and Milan replies personally within 24 hours with available time slots and payment details.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn href="/contact?i=fengshui" arrow>
              Request a consult
            </Btn>
          </div>
        </div>
      </Section>
    </>
  );
}
