import type { MetadataRoute } from "next";

const BASE_URL = "https://anagram.club";

// /studio is the Sanity admin UI, /aboutv2 is a work-in-progress duplicate —
// neither belongs in the sitemap or in any crawler's index.
const DISALLOW = ["/studio", "/studio/", "/aboutv2"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
