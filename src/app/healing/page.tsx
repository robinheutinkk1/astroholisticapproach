import type { Metadata } from "next";
import { CategoryHub } from "@/components/PageTemplates";

export const metadata: Metadata = {
  title: "Crystals & Jewelry",
  description: "Crystal advice, healing stones and personalised jewelry selected for your chart.",
};

export default function HealingPage() {
  return (
    <CategoryHub
      crumb="Crystals &amp; Jewelry"
      eyebrow="Crystals & Jewelry"
      title='Stones with <span class="accent">a purpose</span>'
      intro="Crystals, Healing Stones and Jewelry have been used in holistic traditions for centuries as tools to support balance, intention, and well-being. Each crystal and stone carries its own unique energy and frequency, which may help you cultivate protection, grounding, emotional harmony, or spiritual connection."
      items={[
        {
          title: "Crystals &amp; Stones",
          desc: "Personalised crystals and stones advice: which crystals and stones for what you are working with, and how to use them.",
          href: "/healing/crystals",
        },
        {
          title: "Bracelets, Pendants &amp; Jewelry &mdash; the Shop",
          desc: "Available ready-made in the shop, or personalised after advice and custom made. Most of the items shown are designed and created by Milan himself.",
          href: "/healing/jewelry",
        },
      ]}
    />
  );
}
