import type { Metadata } from "next";
import { CategoryHub } from "@/components/PageTemplates";

export const metadata: Metadata = {
  title: "Positive Psychology & Creative Therapy",
  description:
    "Positive Psychology and Creative Therapy as tools for daily life, through affirmation and meditation. Individual and personalised, one-on-one.",
};

export default function PsychologyPage() {
  return (
    <CategoryHub
      crumb="Positive Psychology"
      eyebrow="Positive Psychology & Therapy"
      title='Positive Psychology &amp; Creative Therapy, <span class="accent">tools for daily life</span>'
      intro="It is all about healing, awareness and mindfulness. These are tools for daily life, through affirmation and meditation."
      items={[
        {
          title: "Positive Psychology",
          desc: "The guiding principles are the Carl Jung and Dolores Cannon approach, but the approaches of Alan Watts and Bruce Lipton are followed too. Individual and personalised, one-on-one. Together we look at which therapy method suits you best, to truly get closer to yourself and so effectively address and resolve the problem you have described.",
          href: "/psychology/positive-psychology",
        },
        {
          title: "Creative Therapy",
          desc: "Creative therapy treatment, based on Holism and Positive Psychology, individual and personalised, one-on-one. Together we look at which expression therapy method, for instance dance or art therapy, suits you best to truly get closer to yourself and so effectively address and resolve the problem you have described.",
          href: "/psychology/creative-therapy",
        },
      ]}
    />
  );
}
