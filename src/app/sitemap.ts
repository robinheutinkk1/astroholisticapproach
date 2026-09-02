import type { MetadataRoute } from "next";
import { getActiveProducts, getPublishedPosts } from "@/lib/queries";
import { env } from "@/lib/env";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.siteUrl;
  const [posts, products] = await Promise.all([getPublishedPosts(), getActiveProducts()]);

  const staticRoutes = ["", "/about", "/shop", "/blog", "/contact", "/privacy", "/terms"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  return [
    ...staticRoutes,
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
