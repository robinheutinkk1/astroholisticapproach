import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { InfoBox, PageHeader, PriceLines, Section } from "@/components/Layout";
import { RequestBlock } from "@/components/PageTemplates";

export const metadata: Metadata = {
  title: "Chakra Meditation",
  description: "A live guided 120-minute chakra meditation on Zoom, one-on-one or as a small group.",
};

export default async function ChakraPage() {
  const t = (await getSettings()).tariffs;

  return (
    <>
      <PageHeader
        trail={[{ label: "Reiki &amp; Chakra", href: "/energy-work" }, { label: "Chakra Meditation" }]}
        eyebrow="Chakra Meditation"
        title='Chakra Meditation, <span class="accent">Restore your Inner Hormonal Balance</span>'
      />
      <Section>
        <div className="intro-copy reveal" style={{ marginTop: 0 }}>
          <p>
            Chakra Meditation is a guided meditation that helps balance and activate your body&rsquo;s energy centers
            through breath, awareness and visualization. It encourages the free flow of energy, bringing greater harmony
            to your body, mind and spirit. It restores your hormonal imbalances.
          </p>
          <p>
            Chakras are seven main energy centers within the body that influence your physical, emotional, mental and
            spiritual well-being. When your chakras are balanced, energy flows freely, supporting harmony, vitality and
            inner peace.
          </p>
        </div>

        <div className="grid-2 reveal">
          <InfoBox
            title="Who this is for"
            items={[
              "You want to feel more grounded",
              "You want to restore your inner hormonal balance",
              "You want to release energetic blockages",
              "You want to deepen your connection with yourself",
            ]}
          />
          <InfoBox
            title="What you get"
            items={["A guided chakra meditation treatment by Zoom", "Can be booked one-on-one or as a small group"]}
          >
            <PriceLines
              rows={[{ label: "Chakra meditation treatment", sub: "120-minute Zoom session", price: t.chakra.session }]}
            />
          </InfoBox>
        </div>
      </Section>
      <RequestBlock price={t.chakra.session} priceNote="120 min · Zoom" interest="chakra" />
    </>
  );
}
