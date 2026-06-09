import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";

const BASE_URL = "https://anagram.studio";

async function getWorkSlugs(): Promise<string[]> {
  try {
    const slugs = await client.fetch<{ slug: { current: string } }[]>(
      `*[_type == "work" && defined(slug.current)] { slug }`,
      {},
      { next: { revalidate: 3600 } },
    );
    return slugs.map((s) => s.slug.current);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/works`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/lab`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const workSlugs = await getWorkSlugs();
  const workRoutes: MetadataRoute.Sitemap = workSlugs.map((slug) => ({
    url: `${BASE_URL}/works/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...workRoutes];
}
