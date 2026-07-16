import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aaishasharma.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
  const staticRoutes = ["", "/about", "/portfolio", "/blog", "/services", "/contact"];
  const works = Array.isArray(content.portfolio)
    ? content.portfolio.filter((w) => w.is_published)
    : [];
  const posts = Array.isArray(content.blog) ? content.blog : [];

  const entries: MetadataRoute.Sitemap = [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...works.map((w) => ({
      url: `${SITE_URL}/portfolio/${w.slug}`,
      lastModified: new Date(w.published_date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.published_date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return entries;
}
