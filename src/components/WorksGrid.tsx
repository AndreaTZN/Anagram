"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Badge from "./Badge";
import { useVimeoPlayer } from "@/hooks/useVimeoPlayer";

gsap.registerPlugin(useGSAP);

export type Work = {
  name: string;
  description: string;
  href?: string;
  badge?: string;
  type?: "image" | "video";
  image?: string;
  poster?: string;
  dataSrc?: string;
  dataRatio?: string;
  aspect: string;
};

export const allWorks: Work[] = [
  {
    name: "Incard",
    description:
      "To celebrate the achievements of its community, Incard set out to create a trophy system that transforms key milestones into meaningful rewards turning business growth into something users can proudly earn and display.",
    badge: "Coming soon",
    image: "/works/incard/thumbnail-incard.webp",
    aspect: "aspect-[378/300]",
  },
  {
    name: "Wastetide",
    description:
      "Build a brand and digital experience capable of reframing industrial waste as a source of value, translating Wastetide's AI-driven shift in perspective into a clear, credible identity.",
    href: "/works/wastetide",
    image: "/works/Wastetide/1.webp",
    aspect: "aspect-[378/250]",
  },
  {
    name: "Fortuneo",
    description:
      "Transform Fortuneo into a more desirable, premium brand while preserving what makes it unique: France's most affordable, always-free online bank that stays competitive yet human.",
    href: "/works/fortuneo",
    type: "video",
    dataSrc: "1215461019",
    dataRatio: "932/1000",
    poster: "/works/Fortuneo/fortuneo-grid-poster.webp",
    aspect: "aspect-[387/300]",
  },
  {
    name: "Planity",
    description:
      "Simplify the booking experience by reducing friction and improving conversion, while evolving the product beyond a purely functional interface.",
    href: "/works/planity",
    type: "video",
    dataSrc: "1215461052",
    dataRatio: "932/1000",
    poster: "/works/Planity/planity-grid-poster.webp",
    aspect: "aspect-[387/300]",
  },
  {
    name: "Amo",
    description:
      "Produce keys graphics elements required for the app while remaining fully aligned with the visual direction defined by the amo team.",
    href: "/works/amo",
    image: "/works/Amo/1.avif",
    aspect: "aspect-[387/200]",
  },
  {
    name: "Founders Future",
    description:
      "Discover how we reimagined the identity of Arcads, the AI platform that turns text into high-quality video ads with virtual actors. A full rebrand blending technology, emotion, and performance.",
    href: "/works/founders-future",
    image: "/works/FoundersFuture/release/15.avif",
    aspect: "aspect-[387/250]",
  },
  {
    name: "Pennylane",
    description:
      "Pennylane, part of the French Tech 120 as one of the country's most promising startups, set out to position itself as a leading financial platform within a highly competitive ecosystem, where a complex all-in-one offering needed to feel simple and trustworthy at first glance.",
    href: "/works/pennylane",
    type: "video",
    dataSrc: "1215462528",
    dataRatio: "1890/1000",
    poster: "/works/Pennylane/pennylane-grid-poster.webp",
    aspect: "aspect-[387/200]",
  },
  {
    name: "Everyday",
    description:
      "Everyday is an AI-first entertainment company. They merge creativity and artificial intelligence to craft experiences people love, starting with mobile games and expanding toward the next generation of interactive entertainment.",
    href: "/works/everyday",
    type: "video",
    dataSrc: "1215462530",
    dataRatio: "1890/1500",
    poster: "/works/Everyday/everyday-grid-poster.webp",
    aspect: "aspect-[387/300]",
  },
  {
    name: "Arcads",
    description:
      "Discover how we reimagined the identity of Arcads, the AI platform that turns text into high-quality video ads with virtual actors. A full rebrand blending technology, emotion, and performance.",
    href: "/works/arcads",
    image: "/works/Arcads/9.webp",
    aspect: "aspect-[387/250]",
  },
  {
    name: "Perma",
    description:
      "Municipal teams face daily, concrete problems, illegal dumping, nuisances, and incivility, but traditional public safety and surveillance solutions often feel heavy, costly, and disconnected from the realities of small and mid-sized towns.",
    href: "/works/perma",
    image: "/works/Perma/perma-work.webp",
    aspect: "aspect-[387/300]",
  },
  {
    name: "Vizzia",
    description:
      "Municipal teams face daily, concrete problems, illegal dumping, nuisances, and incivility, but traditional public safety and surveillance solutions often feel heavy, costly, and disconnected from the realities of small and mid-sized towns.",
    href: "/works/vizzia",
    type: "video",
    dataSrc: "1172566718",
    dataRatio: "2000/1124",
    poster: "/works/Vizzia/1.avif",
    aspect: "aspect-[387/250]",
  },
  {
    name: "Semplice",
    description:
      "Present a mature product with one clear message: complete creative control, no code required.",
    href: "/works/semplice",
    image: "/works/Semplice/1.avif",
    aspect: "aspect-[387/200]",
  },
];

export const archiveWorks: Work[] = [
  {
    name: "Tilt",
    description:
      "Tilt is the startup orchestrating energy consumption to match available supply in real time, bringing balance and resilience to an increasingly complex grid. We partnered with Tilt to create a brand identity and website capable of expressing that system: a logo built as an evolving, interconnected network of energy flows.",
    href: "/works/tilt",
    image: "/works/Tilt/1.avif",
    aspect: "aspect-[387/300]",
  },
  {
    name: "Politico",
    description:
      "Politico is renowned for the accuracy and speed of its political and institutional coverage, and needed a unified experience to support the merger of Politico.com and Politico.eu. We partnered with Politico to build a mobile-first design system and UX capable of expressing that merger: one consistent, modular experience across international markets.",
    href: "/works/politico",
    image: "/works/Politico/1.avif",
    aspect: "aspect-[387/250]",
  },
  {
    name: "Twin",
    description:
      "Twin is the wearable AI built to understand its user, an invisible and highly technical system that needed to become immediately legible. We partnered with Twin to create a brand identity and website capable of expressing that system: a logo conceived as an evolving pattern of points and blocks, evoking an interconnected network.",
    href: "/works/twin",
    image: "/works/twin/1.avif",
    aspect: "aspect-[387/300]",
  },
];

function WorkCard({ work }: { work: Work }) {
  const CardWrapper = work.href
    ? ({ children }: { children: React.ReactNode }) => (
        <Link href={work.href!} aria-label={work.name}>
          {children}
        </Link>
      )
    : ({ children }: { children: React.ReactNode }) => <>{children}</>;

  const overlayRef = useRef<HTMLDivElement>(null);
  const embedRef = useRef<HTMLDivElement>(null);

  useVimeoPlayer({
    embedRef,
    dataSrc: work.dataSrc ?? "",
    dataRatio: work.dataRatio,
    title: work.name,
  });

  useGSAP(() => {
    gsap.set(overlayRef.current, { opacity: 0 });
  }, []);

  function handleEnter() {
    if (!work.href) return;
    gsap.to(overlayRef.current, {
      opacity: 0.08,
      duration: 0.3,
      ease: "power2.out",
    });
  }

  function handleLeave() {
    if (!work.href) return;
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <CardWrapper>
        <div
          className={`relative ${work.aspect} w-full overflow-hidden`}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {work.type === "video" ? (
            <div
              ref={embedRef}
              className="absolute inset-0 w-full h-full overflow-hidden"
            >
              <img
                src={work.poster}
                alt={work.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ) : (
            <img
              src={work.image}
              alt={work.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-[#0c0c0c] opacity-0 pointer-events-none"
          />
          {work.badge && <Badge label={work.badge} position="top-left" />}
        </div>
      </CardWrapper>
      <div className="flex flex-col gap-1">
        <span className="text-[#0c0c0c] font-medium leading-[0.9] text-sm">
          {work.name}
        </span>
        <p className="text-[#7c7c7c] leading-[1.2] text-sm">
          {work.description}
        </p>
      </div>
    </div>
  );
}

export default function WorksGrid({
  works,
  maxThreeColumns = false,
}: {
  works: Work[];
  maxThreeColumns?: boolean;
}) {
  return (
    <div
      id="works-grid"
      className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${maxThreeColumns ? "" : "min-[90rem]:grid-cols-4"}`}
    >
      {works.map((work) => (
        <WorkCard key={work.name} work={work} />
      ))}
    </div>
  );
}
