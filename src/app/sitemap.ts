import type { MetadataRoute } from "next";

const BASE_URL = "https://anagram.club";

const workSlugs = [
  "allo",
  "amo",
  "arcads",
  "bee",
  "everyday",
  "fortuneo",
  "founders-future",
  "henoo",
  "inbolt",
  "pennylane",
  "perma",
  "planity",
  "politico",
  "semplice",
  "tilt",
  "twin",
  "vizzia",
  "wastetide",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/works`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/lab`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const workRoutes: MetadataRoute.Sitemap = workSlugs.map((slug) => ({
    url: `${BASE_URL}/works/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...workRoutes];
}
