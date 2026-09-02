import type { MetadataRoute } from "next";
import { getActiveProducts, getPublishedPosts } from "@/lib/queries";
import { env } from "@/lib/env";

export const revalidate = 3600;

const staticRoutes = [
  "",
  "/about",
  "/tariffs",
  "/astrology",
  "/astrology/western",
  "/astrology/vedic",
  "/astrology/natal-chart-reading",
  "/astrology/love-relationship",
  "/cards",
  "/cards/tarot",
  "/cards/oracle-angel",
  "/cards/positive-psychology",
  "/cards/rune",
  "/psychology",
  "/psychology/positive-psychology",
  "/psychology/creative-therapy",
  "/ayurveda",
  "/ayurveda/diet-advice",
  "/ayurveda/cooking",
  "/healing",
  "/healing/crystals",
  "/healing/jewelry",
  "/energy-work",
  "/energy-work/reiki-distance",
  "/energy-work/chakra",
  "/feng-shui",
  "/courses",
  "/webinars",
  "/shop",
  "/blog",
  "/contact",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.siteUrl;
  const [posts, products] = await Promise.all([getPublishedPosts(), getActiveProducts()]);

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...products.map((product) => ({
      url: `${base}/shop/${product.slug}`,
      lastModified: new Date(product.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
