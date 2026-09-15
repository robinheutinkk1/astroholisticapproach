import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { ServicePage } from "@/components/PageTemplates";

export const metadata: Metadata = {
  title: "Long Distance Reiki",
  description: "Long Distance Reiki: five remote Zoom or audio sessions of 20 minutes, from anywhere worldwide.",
};

export default async function ReikiPage() {
  const t = (await getSettings()).tariffs;

  return (
    <ServicePage
      trail={[{ label: "Reiki &amp; Chakra", href: "/energy-work" }, { label: "Long Distance Reiki" }]}
      eyebrow="Long Distance Reiki"
      title='Reiki for returning to Balance, <span class="accent">returning to Yourself</span>'
      intro="Long Distance Reiki is an energy healing practice to support balance, relaxation and emotional well-being. It restores harmony in your body, mind and spirit, wherever you are. Experience Long Distance Reiki as deeply relaxing and emotionally supportive."
      forWhom={[
        "You want to relax deeply after a stress period",
        "You want to release emotional tension after a period of illness or grief",
        "You want to reconnect with your inner balance",
        "You want to support your healing energy from wherever you are",
      ]}
      youGet={[
        "5 x 20-minute Zoom or audio sessions, long distance treatment (most chosen)",
        "For all Reiki services the 5 treatments are scheduled in advance",
        "Send a request via the contact page and we will fix the times and dates together",
      ]}
      price={t.reiki.package}
      priceNote="5 x 20 min · Zoom or audio"
      interest="reiki"
    />
  );
}
