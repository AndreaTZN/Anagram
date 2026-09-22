"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Badge from "./Badge";
import { useVimeoPlayer } from "@/hooks/useVimeoPlayer";

gsap.registerPlugin(useGSAP);

// Grid is 1 col, 3 cols from md, 4 cols from 90rem — keeps Next from serving
// a full-width source for what renders as a quarter-width thumbnail.
const CARD_SIZES = "(min-width: 90rem) 25vw, (min-width: 768px) 33vw, 100vw";

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
      "Incard turns banking into a tangible experience through distinctive cards and collectible trophies, transforming everyday transactions and milestones into visible symbols of identity, status and engagement.",
    href: "https://www.incard.co/",
    badge: "Coming soon",
    image: "/thumb-work/incard-home.webp",
    aspect: "aspect-[387/300]",
  },
  {
    name: "Wastetide",
    description:
      "Build a brand and digital experience capable of reframing industrial waste as a source of value, translating Wastetide's AI-driven shift in perspective into a clear, credible identity.",
    href: "/works/wastetide",
    image: "/thumb-work/wastetide.webp",
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
    poster: "/thumb-work/fortuneo-vimeo-frame.webp",
    aspect: "aspect-[387/300]",
  },
  {
    name: "Planity",
    description:
      "Simplify the booking experience by reducing friction and improving conversion, while evolving the product beyond a purely functional interface.",
    href: "/works/planity",
    type: "video",
    dataSrc: "1183437059",
    dataRatio: "2764/1528",
    poster: "/thumb-work/planity-vimeo-frame.webp",
    aspect: "aspect-[387/300]",
  },
  {
    name: "Amo",
    description:
      "Produce keys graphics elements required for the app while remaining fully aligned with the visual direction defined by the amo team.",
    href: "/works/amo",
    image: "/thumb-work/amo.avif",
    aspect: "aspect-[387/200]",
  },
  {
    name: "Founders Future",
    description:
      "Discover how we reimagined the identity of Arcads, the AI platform that turns text into high-quality video ads with virtual actors. A full rebrand blending technology, emotion, and performance.",
    href: "/works/founders-future",
    image: "/thumb-work/founders-future.avif",
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
    poster: "/thumb-work/pennylane-vimeo-frame.webp",
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
    poster: "/thumb-work/everyday-vimeo-frame.webp",
    aspect: "aspect-[387/300]",
  },
  {
    name: "Arcads",
    description:
      "Discover how we reimagined the identity of Arcads, the AI platform that turns text into high-quality video ads with virtual actors. A full rebrand blending technology, emotion, and performance.",
    href: "/works/arcads",
    type: "video",
    dataSrc: "1172577350",
    dataRatio: "816/908",
    poster: "/thumb-work/arcads-vimeo-frame.webp",
    aspect: "aspect-[387/250]",
  },
  {
    name: "Semplice",
    description:
      "Present a mature product with one clear message: complete creative control, no code required.",
    href: "/works/semplice",
    image: "/thumb-work/semplice.avif",
    aspect: "aspect-[387/200]",
  },
  {
    name: "Perma",
    description:
      "Municipal teams face daily, concrete problems, illegal dumping, nuisances, and incivility, but traditional public safety and surveillance solutions often feel heavy, costly, and disconnected from the realities of small and mid-sized towns.",
    href: "/works/perma",
    type: "video",
    dataSrc: "1172151189",
    dataRatio: "1094/1254",
    poster: "/thumb-work/perma-vimeo-frame.webp",
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
    poster: "/thumb-work/vizzia.avif",
    aspect: "aspect-[387/250]",
  },
  {
    name: "Omnia",
    description:
      "Omnia helps brands understand, monitor and shape how they appear in AI search. Inspired by Ariadne's thread, its identity turns complex data into clear direction, focusing on outcomes, clarity and control.",
    href: "https://www.useomnia.com/",
    badge: "Coming soon",
    image: "/thumb-work/omnia.avif",
    aspect: "aspect-[387/250]",
  },
  {
    name: "Bee",
    description:
      "Bee reimagines personal computing through ambient AI, capturing conversations and context to create insights, summaries and reminders. Its minimal identity makes invisible technology feel useful and trustworthy.",
    href: "/works/bee",
    image: "/thumb-work/bee.avif",
    aspect: "aspect-[387/300]",
  },
  {
    name: "Inbolt",
    description:
      "Inbolt redefines industrial automation with real-time vision-guided robotics, enabling robots to see, think and adapt. Its brand makes advanced technology clear, accessible and built for flexible factory use.",
    href: "/works/inbolt",
    type: "video",
    dataSrc: "1172493608",
    dataRatio: "1920/1080",
    poster: "/thumb-work/inbolt-vimeo-frame.avif",
    aspect: "aspect-[387/200]",
  },
  {
    name: "Rauva",
    description:
      "Rauva simplifies business by bringing banking, invoicing and accounting into one platform. Built around clarity and control, it replaces complexity with a unified system for modern entrepreneurs.",
    href: "https://rauva.com/",
    badge: "Coming soon",
    image: "/thumb-work/rauva.avif",
    aspect: "aspect-[387/300]",
  },
  {
    name: "Feedly",
    description:
      "Feedly turns information into actionable intelligence, bringing clarity to complex data. Its clear, confident identity helps teams anticipate change, stay ahead and act with greater confidence.",
    href: "https://feedly.com/",
    badge: "Coming soon",
    image: "/thumb-work/feedly.avif",
    aspect: "aspect-[387/300]",
  },
  {
    name: "Vybe",
    description:
      "Internal tools become fast, flexible and accessible, letting teams build secure, production-ready apps with AI and their own data while giving operators and engineers greater autonomy and control.",
    href: "https://www.vybe.build/",
    image: "/thumb-work/vybe.avif",
    aspect: "aspect-[387/250]",
  },
  {
    name: "Typebot",
    description:
      "Static forms become fluid conversations, helping teams capture data, qualify users and drive engagement without code. The identity reflects a clear, modular and intuitive approach to real-time interaction.",
    href: "https://www.typebot.com/",
    type: "video",
    dataSrc: "1183437079",
    dataRatio: "1340/1212",
    poster: "/thumb-work/typebot-vimeo-frame.webp",
    aspect: "aspect-[387/300]",
  },
  {
    name: "Allo",
    description:
      "Conversations become structured business data, with calls recorded, summarized and synced directly to CRM. A clear, product-driven identity turns phone communication into reliable, automated insight.",
    href: "/works/allo",
    image: "/thumb-work/allo.avif",
    aspect: "aspect-[387/250]",
  },
  {
    name: "Alpha Star",
    description:
      "Long-term investment becomes a partnership built on conviction, patience and strategic involvement, supporting visionary founders from the earliest stages while aligning capital with lasting impact.",
    href: "https://alphastar.capital/",
    type: "video",
    dataSrc: "1184728014",
    dataRatio: "1340/1616",
    poster: "/thumb-work/alphastar-vimeo-frame.png",
    aspect: "aspect-[387/300]",
  },
  {
    name: "Bonsai",
    description:
      "Freelance operations come together in one seamless system, from proposals and projects to payments and reporting. A premium, structured identity helps reduce friction and support scalable growth.",
    href: "https://www.hellobonsai.com/",
    image: "/thumb-work/bonsai.avif",
    aspect: "aspect-[387/250]",
  },
];

export const archiveWorks: Work[] = [
  {
    name: "Tilt Energy",
    description:
      "Energy becomes a responsive system, with consumption adapting in real time to available supply. Built around flow and balance, the identity makes complex optimization clear, tangible and future-focused.",
    href: "/works/tilt",
    type: "video",
    dataSrc: "1172158224",
    dataRatio: "1920/1080",
    poster: "/thumb-work/tilt-vimeo-frame.avif",
    aspect: "aspect-[387/300]",
  },
  {
    name: "Politico",
    description:
      "Politico unified its US and European platforms into a faster, scalable system. A lean, mobile-first design streamlines editorial workflows while delivering a consistent brand and real-time news experience.",
    href: "/works/politico",
    image: "/thumb-work/politico.avif",
    aspect: "aspect-[387/250]",
  },
  {
    name: "Twin",
    description:
      "Twin is the wearable AI built to understand its user, an invisible and highly technical system that needed to become immediately legible. We partnered with Twin to create a brand identity and website capable of expressing that system: a logo conceived as an evolving pattern of points and blocks, evoking an interconnected network.",
    href: "/works/twin",
    image: "/thumb-work/twin.avif",
    aspect: "aspect-[387/300]",
  },
];

function WorkCard({ work, priority }: { work: Work; priority: boolean }) {
  const isExternal = work.href?.startsWith("http");
  const CardWrapper = work.href
    ? ({ children }: { children: React.ReactNode }) => (
        <Link
          href={work.href!}
          aria-label={work.name}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
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
              {work.poster && (
                <Image
                  src={work.poster}
                  alt={work.name}
                  fill
                  sizes={CARD_SIZES}
                  priority={priority}
                  className="object-cover"
                />
              )}
            </div>
          ) : (
            work.image && (
              <Image
                src={work.image}
                alt={work.name}
                fill
                sizes={CARD_SIZES}
                priority={priority}
                className="object-cover"
              />
            )
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
      className={`grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8 ${maxThreeColumns ? "" : "min-[90rem]:grid-cols-4"}`}
    >
      {works.map((work, i) => (
        <WorkCard key={work.name} work={work} priority={i < 4} />
      ))}
    </div>
  );
}
