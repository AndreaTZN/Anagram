import type { CaseNavData } from "@/contexts/CaseNavContext";
import {
  ORGANIZATION_ID,
  SITE_URL,
  WEBSITE_ID,
  serializeJsonLd,
} from "@/lib/structured-data";

type Props = {
  slug: string;
  data: Pick<CaseNavData, "title" | "description" | "liveUrl">;
  image: string;
};

export default function CaseStudyJsonLd({ slug, data, image }: Props) {
  const url = `${SITE_URL}/works/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#creative-work`,
    name: `${data.title} — Anagram case study`,
    description: data.description,
    url,
    image: new URL(image, SITE_URL).href,
    inLanguage: "en",
    genre: "Case study",
    creator: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: url,
    about: {
      "@type": "Thing",
      name: data.title,
      ...(data.liveUrl ? { url: data.liveUrl } : {}),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
    />
  );
}
