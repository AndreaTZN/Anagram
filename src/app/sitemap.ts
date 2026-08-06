import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";

const BASE_URL = "https://anagram.club";

// Slugs derived from the filesystem so a new <segment>/<slug>/page.tsx
// lands in the sitemap without editing this file.
function getSlugs(segment: string): string[] {
  const dir = path.join(process.cwd(), "src", "app", segment);

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .filter((entry) => fs.existsSync(path.join(dir, entry.name, "page.tsx")))
    .map((entry) => entry.name)
    .sort();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/works`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/lab`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const workRoutes: MetadataRoute.Sitemap = getSlugs("works").map((slug) => ({
    url: `${BASE_URL}/works/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Acquisition landing pages — indexable, so they belong in the sitemap.
  // There is no /seo index route, only the leaf pages.
  const seoRoutes: MetadataRoute.Sitemap = getSlugs("seo").map((slug) => ({
    url: `${BASE_URL}/seo/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...workRoutes, ...seoRoutes];
}
