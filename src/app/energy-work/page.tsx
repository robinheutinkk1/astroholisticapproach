import type { Metadata } from "next";
import { CategoryHub } from "@/components/PageTemplates";

export const metadata: Metadata = {
  title: "Reiki & Chakra Meditation",
  description: "Reiki distance healing and live chakra meditation, on Zoom or remote, worldwide.",
};

export default function EnergyWorkPage() {
  return (
    <CategoryHub
      crumb="Reiki &amp; Chakra"
      eyebrow="Reiki & Chakra"
      title='Reiki &amp; Chakra Meditation for <span class="accent">Reconnecting, Realigning and Renewing</span>'
      intro="Energy work with Reiki or Chakra Meditation restores the natural flow of energy and creates harmony between your body, mind and spirit. These practices support deep relaxation, energetic alignment, and a stronger connection to your inner self."
      items={[
        {
          title: "Long Distance Reiki",
          desc: "A package of 5 x 20-minute remote energy Zoom sessions, wherever you are.",
          href: "/energy-work/reiki-distance",
        },
        {
          title: "Chakra Meditation",
          desc: "Live guided 120-minute remote meditation Zoom session. Can be booked one-on-one or as a small group.",
          href: "/energy-work/chakra",
        },
      ]}
    />
  );
}
