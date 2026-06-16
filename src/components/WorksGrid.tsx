"use client";

import { useState } from "react";
import Link from "next/link";
import Badge from "./Badge";
import MerchCard from "./MerchCard";
import ToolCard from "./ToolCard";

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
    aspect: string;
    bg?: string;
  };
};

const works: Work[] = [
  {
    name: "Matis",
    tag: "All",
    description:
      "The art market is shaped by networks, timing, and a body of implicit knowledge. It remains largely accessible to those who know how to navigate its subtleties and grasp the mechanisms that drive value. Matis operates within this reality, not aiming to disrupt it, but rather to integrate seamlessly into it.",
    media: {
      type: "image",
      src: "/works/matis/1.jpg",
      aspect: "aspect-[1/1.1]",
    },
  },
  {
    name: "Incard",
    tag: "All",
    description:
      "Wastetide reframes waste as untapped value.\nBuilt on the belief that nothing is truly discarded,",
    media: {
      type: "image",
      src: "/works/incard/1.jpg",
      aspect: "aspect-[1581/1799]",
    },
  },
  {
    name: "Wastetide",
    href: "/works/wastetide",
    tag: "Coming project",
    description:
      "Wastetide reframes waste as untapped value. Built on the belief that nothing is truly discarded, the brand positions industrial waste as a resource. A hidden asset waiting to be captured, optimized, and monetized.",
    media: {
      type: "image",
      src: "/works/Wastetide/1.webp",
      aspect: "aspect-[582/351]",
    },
  },
  {
    name: "Symbl",
    tag: "Tools",
    description:
      "Test your logo before the world does.\nDesigners are already using it",
    externalLink: "https://www.symbl.space/",
    media: {
      type: "image",
      src: "/works/symbl/1.jpg",
      aspect: "aspect-[432/324]",
      bg: "#f5f5f5",
    },
  },
  {
    name: "Casquette Anagram",
    tag: "Merch",
    price: "$30.00",
    media: {
      type: "image",
      src: "/works/anagram/casquette.jpg",
      aspect: "aspect-[1/1.45]",
      bg: "#f5f5f5",
    },
  },
  {
    name: "Omnia",
    tag: "All",
    description:
      "Position Arcads as a new standard for AI-powered advertising. The challenge was to clarify a complex and emerging offering, helping brands understand they can create high-performing ads using AI-generated talent.",
    media: { type: "image", src: "/works/Omnia/1.jpg", aspect: "aspect-video" },
  },
  {
    name: "Bitstack",
    tag: "All",
    description:
      "Redefine industrial automation through real-time vision-guided robotics. Inbolt enables robots to see.",
    media: {
      type: "image",
      src: "/works/bitstack/1.jpg",
      aspect: "aspect-[3/4]",
    },
  },
  {
    name: "Arcads",
    tag: "All",
    description:
      "They help brands quickly turn text into high-quality video ads using AI actors and automation.",
    media: {
      type: "image",
      src: "/works/Arcads/2.webp",
      aspect: "aspect-[16/9]",
    },
  },
];

const FILTERS = ["All", "Merch", "News", "Coming project", "Tools"];

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

  return (
    <div className="flex flex-col gap-3">
      <MediaWrapper>
        <div
          className={`relative ${work.media.aspect} overflow-hidden w-full`}
          style={{ backgroundColor: work.media.bg }}
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
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={work.media.src} />
            </video>
          )}
          {work.badge && <Badge label={work.badge} />}
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

export default function WorksGrid() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? works
      : works.filter((w) => w.tag === activeFilter);

  return (
    <div className="flex flex-col gap-4">
      {/* Filters — pills on desktop, dropdown on tablet/mobile */}
      <div className="flex items-center gap-4">
        <span className="text-[#7e7e7e] text-base leading-[0.8]">Filters</span>

        {/* Desktop pills */}
        <div className="hidden md:flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-4 rounded-full text-sm leading-[0.8] cursor-pointer transition-colors ${
                activeFilter === filter
                  ? "bg-[#0c0c0c] text-white"
                  : "bg-[#f5f5f5] text-[#7C7C7C]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Tablet/mobile dropdown */}
        <select
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
          className="md:hidden px-4 py-3 rounded-full text-sm bg-[#f5f5f5] text-[#0c0c0c] cursor-pointer border-none outline-none appearance-none pr-8"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%230c0c0c' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.75rem center",
          }}
        >
          {FILTERS.map((filter) => (
            <option key={filter} value={filter}>
              {filter}
            </option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-start">
        {filtered.slice(0, 4).map((work) => (
          <WorkCard key={work.name} work={work} />
        ))}
        {filtered.length > 4 && (
          <div className="col-span-1 md:col-span-4 overflow-hidden aspect-video my-8">
            <video
              loop
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            >
              <source src="/home/videos/wastetide.mp4" />
            </video>
          </div>
        )}
        {filtered.slice(4).map((work) => (
          <WorkCard key={work.name} work={work} />
        ))}
      </div>
    </div>
  );
}
