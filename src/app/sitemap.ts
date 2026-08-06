import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";

const BASE_URL = "https://anagram.club";

// Slugs derived from the filesystem so a new src/app/works/<slug>/page.tsx
// lands in the sitemap without editing this file.
function getWorkSlugs(): string[] {
  const worksDir = path.join(process.cwd(), "src", "app", "works");

  return fs
    .readdirSync(worksDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .filter((entry) =>
      fs.existsSync(path.join(worksDir, entry.name, "page.tsx"))
    )
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

  const workRoutes: MetadataRoute.Sitemap = getWorkSlugs().map((slug) => ({
    url: `${BASE_URL}/works/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...workRoutes];
}
