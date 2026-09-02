import type { Metadata } from "next";
import { CategoryHub } from "@/components/PageTemplates";

export const metadata: Metadata = {
  title: "Ayurveda, Diet Advice & Cooking Course",
  description:
    "Ayurveda as an ancient wisdom for modern healing: personalised diet advice and a one-year Ayurvedic cooking and lifestyle course.",
};

export default function AyurvedaPage() {
  return (
    <CategoryHub
      crumb="Ayurveda"
      eyebrow="Ayurveda"
      title='Ayurveda, a practical solution to <span class="accent">get you back in balance</span>'
      intro="Ayurveda is an ancient wisdom for modern healing, the science of life. An Ayurvedic lifestyle is an ancient, holistic health philosophy from India for the mind and the soul. It helps optimise your health and prevent ailments by aligning your lifestyle, nature and your unique constitution."
      items={[
        {
          title: "Ayurvedic Diet Advice",
          desc: "Personalised nutritional guidance based on your unique mind-body constitution, to restore balance, support vitality and nourish your whole being.",
          href: "/ayurveda/diet-advice",
        },
        {
          title: "Ayurveda Cooking &amp; Lifestyle Course (1 year)",
          desc: "A hands-on journey into the wisdom of Ayurvedic nutrition, where you learn to prepare nourishing biological meals that support balance, vitality and holistic well-being.",
          href: "/ayurveda/cooking",
        },
      ]}
    />
  );
}
