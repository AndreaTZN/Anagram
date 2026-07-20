"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Badge from "./Badge";
import MerchCard from "./MerchCard";
import ToolCard from "./ToolCard";

gsap.registerPlugin(useGSAP);

type Work = {
  name: string;
  description?: string;
  price?: string;
  badge?: string;
  externalLink?: string;
  href?: string;
  tag?: string;
  media: {
    type: "image" | "video";
    src: string;
    poster?: string;
    aspect: string;
    bg?: string;
  };
};

const works: Work[] = [
  {
    name: "Wastetide",
    href: "/works/wastetide",
    tag: "Works",
    description:
      "Build a brand and digital experience capable of reframing industrial waste as a source of value, translating Wastetide's AI-driven shift in perspective into a clear, credible identity.",
    media: {
      type: "image",
      src: "/works/Wastetide/1.webp",
      aspect: "aspect-[279/300]",
    },
  },
  {
    name: "Incard",
    tag: "Coming project",
    description:
      "Design a trophy system that transforms key milestones into meaningful, shareable rewards, turning business growth into something Incard's community can proudly earn and display.",
    media: {
      type: "image",
      src: "/works/incard/thumbnail-incard.webp",
      aspect: "aspect-[279/200]",
    },
  },
  {
    name: "Symbl",
    tag: "Tools",
    description: "Stress-test your logo before the world does.",
    externalLink: "https://www.symbl.space/",
    media: {
      type: "image",
      src: "/works/symbl/1.jpg",
      aspect: "aspect-[280/250]",
      bg: "#f5f5f5",
    },
  },
  {
    name: "Fortuneo",
    href: "/works/fortuneo",
    tag: "Works",
    description:
      "Transform Fortuneo into a more desirable, premium brand while preserving what makes it unique: France's most affordable, always-free online bank that stays competitive yet human.",
    media: {
      type: "video",
      src: "/works/Fortuneo/Fortuneo-grid.mp4",
      poster: "/works/Fortuneo/fortuneo-grid-poster.webp",
      aspect: "aspect-[280/300]",
    },
  },
  {
    name: "Founders Future",
    href: "/works/founders-future",
    tag: "Works",
    description:
      "Clarify the brand’s positioning in a competitive global investment landscape, strengthen credibility with founders and stakeholders, and build a visual and narrative system capable of supporting international growth.",
    media: {
      type: "image",
      src: "/works/FoundersFuture/thumbnail-ff.webp",
      aspect: "aspect-[280/250]",
    },
  },
  {
    name: "Planity",
    href: "/works/planity",
    tag: "Works",
    description:
      "Simplify the booking experience by reducing friction and improving conversion, while evolving the product beyond a purely functional interface.",
    media: {
      type: "video",
      src: "/works/Planity/Planity-grid.mp4",
      poster: "/works/Planity/planity-grid-poster.webp",
      aspect: "aspect-[280/300]",
    },
  },
  {
    name: "Amo",
    href: "/works/amo",
    tag: "Works",
    description:
      "Produce keys graphics elements required for the app while remaining fully aligned with the visual direction defined by the amo team.",
    media: {
      type: "image",
      src: "/works/Amo/thumbnail-amo.webp",
      aspect: "aspect-[280/200]",
    },
  },
];

const FILTERS = ["All", "Works", "Merch", "News", "Coming project", "Tools"];

function WorkCard({ work }: { work: Work }) {
  if (work.tag === "Merch" && work.price) {
    return (
      <MerchCard name={work.name} price={work.price} src={work.media.src} />
    );
  }

  if (work.tag === "Tools") {
    return (
      <ToolCard
        name={work.name}
        description={work.description}
        src={work.media.src}
        href={work.externalLink}
        aspect={work.media.aspect}
      />
    );
  }

  const MediaWrapper = work.href
    ? ({ children }: { children: React.ReactNode }) => (
        <Link href={work.href!}>{children}</Link>
      )
    : ({ children }: { children: React.ReactNode }) => <>{children}</>;

  const badgeLabel =
    work.badge ?? (work.tag === "Coming project" ? "Coming soon" : undefined);

  const isClickable = Boolean(work.href) || Boolean(work.externalLink);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(overlayRef.current, { opacity: 0 });
  }, []);

  function handleEnter() {
    if (!isClickable) return;
    gsap.to(overlayRef.current, {
      opacity: 0.08,
      duration: 0.3,
      ease: "power2.out",
    });
  }

  function handleLeave() {
    if (!isClickable) return;
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <MediaWrapper>
        <div
          className={`relative ${work.media.aspect} overflow-hidden w-full`}
          style={{ backgroundColor: work.media.bg }}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {work.media.type === "image" ? (
            <img
              src={work.media.src}
              alt={work.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <video
              autoPlay
              loop
              playsInline
              muted
              poster={work.media.poster}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={work.media.src} />
            </video>
          )}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-[#0c0c0c] opacity-0 pointer-events-none"
          />
          {badgeLabel && <Badge label={badgeLabel} />}
        </div>
      </MediaWrapper>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between w-full">
          <span className="text-[#0c0c0c] font-medium leading-[0.9] text-sm">
            {work.name}
          </span>
          {work.price && (
            <span className="text-[#7e7e7e] leading-[1.3] text-sm">
              {work.price}
            </span>
          )}
          {work.externalLink && (
            <a
              href={work.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0c0c0c] leading-[0.9] text-sm"
            >
              Try now ↗
            </a>
          )}
        </div>
        {work.description && (
          <p className="text-[#7e7e7e] leading-[1.3] text-sm">
            {work.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function HomeContain() {
  const [activeFilter, setActiveFilter] = useState("All");
  const labelRef = useRef<HTMLSpanElement>(null);
  const labelWidth = useRef(0);
  const labelHidden = useRef(false);

  function handlePillsScroll(e: React.UIEvent<HTMLDivElement>) {
    const label = labelRef.current;
    if (!label) return;
    const shouldHide = e.currentTarget.scrollLeft > 4;
    if (shouldHide === labelHidden.current) return;
    labelHidden.current = shouldHide;
    if (shouldHide && !labelWidth.current) {
      labelWidth.current = label.offsetWidth;
    }
    gsap.to(label, {
      width: shouldHide ? 0 : labelWidth.current,
      marginRight: shouldHide ? 0 : "1rem",
      opacity: shouldHide ? 0 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }

  const filtered =
    activeFilter === "All"
      ? works
      : works.filter((w) => w.tag === activeFilter);

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex items-center min-w-0">
        <span
          ref={labelRef}
          className="text-[#7e7e7e] text-base leading-[0.8] shrink-0 mr-4 overflow-hidden whitespace-nowrap"
        >
          Filters
        </span>

        <div
          onScroll={handlePillsScroll}
          className="flex gap-2 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden -mx-4 px-4 md:mx-0 md:px-0"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-4 rounded-full text-sm leading-[0.8] cursor-pointer transition-colors shrink-0 whitespace-nowrap ${
                activeFilter === filter
                  ? "bg-[#0c0c0c] text-white"
                  : "bg-[#f5f5f5] text-[#7C7C7C]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-start">
        {filtered.slice(0, 4).map((work) => (
          <WorkCard key={work.name} work={work} />
        ))}
        {filtered.length > 4 && (
          <div className="relative col-span-1 md:col-span-4 overflow-hidden aspect-video my-8">
            <video
              loop
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            >
              <source src="/home/videos/wastetide.mp4" />
            </video>
            <Link
              href="/works/wastetide"
              className="group absolute bottom-4 left-4 z-10 flex items-center gap-4 backdrop-blur-[17px] bg-[rgba(12,12,12,0.2)] px-4 py-3 rounded-full"
            >
              <span className="text-white text-sm font-medium leading-[0.9]">
                Wastetide
              </span>
              <span className="text-white/75 group-hover:text-white text-[0.8125rem] leading-[0.9]">
                See project
              </span>
            </Link>
          </div>
        )}
        {filtered.slice(4).map((work) => (
          <WorkCard key={work.name} work={work} />
        ))}
      </div>
    </div>
  );
}
