"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Badge from "./Badge";
import MerchCard from "./MerchCard";
import ToolCard from "./ToolCard";
import Vimeo169 from "./cases-frame/Vimeo169";
import { useVimeoPlayer } from "@/hooks/useVimeoPlayer";

gsap.registerPlugin(useGSAP);

// Grid is 1 col, 4 cols from md, 5 from 2xl — keeps Next from serving a
// full-width source for what renders as a fifth-width thumbnail.
const CARD_SIZES = "(min-width: 96rem) 20vw, (min-width: 768px) 25vw, 100vw";

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
    src?: string;
    poster?: string;
    dataSrc?: string;
    dataRatio?: string;
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
      src: "/works/symbl/card.jpg",
      aspect: "aspect-[280/250]",
      bg: "#f5f5f5",
    },
  },
  {
    name: "Amazon acquires Bee",
    tag: "News",
    description:
      "Amazon has acquired Bee, the AI wearable startup behind a personal assistant designed to capture conversations and memories throughout the day. Read the full story on TechCrunch.",
    externalLink:
      "https://techcrunch.com/2025/07/22/amazon-acquires-bee-the-ai-wearable-that-records-everything-you-say/",
    media: {
      type: "image",
      src: "/news/bee-news.webp",
      aspect: "aspect-[280/250]",
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
      dataSrc: "1215461019",
      dataRatio: "932/1000",
      poster: "/works/Fortuneo/fortuneo-grid-poster.webp",
      aspect: "aspect-[280/300]",
    },
  },
  {
    name: "Planity takes over Germany",
    tag: "News",
    description:
      "Planity's latest campaign brings the photography created by Anagram to the streets of Germany. Rolled out across Cologne, Frankfurt, Hamburg, Munich and Nuremberg, the campaign brings the brand's photography into the public space.",
    externalLink: "https://www.instagram.com/p/DY2HO9noNYw/",
    media: {
      type: "image",
      src: "/news/planity-news.webp",
      aspect: "aspect-[280/200]",
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
      dataSrc: "1215461052",
      dataRatio: "932/1000",
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

function WorkCard({ work, priority }: { work: Work; priority: boolean }) {
  if (work.tag === "Merch" && work.price) {
    return (
      <MerchCard name={work.name} price={work.price} src={work.media.src!} />
    );
  }

  if (work.tag === "Tools") {
    return (
      <ToolCard
        name={work.name}
        description={work.description}
        src={work.media.src!}
        href={work.externalLink}
        aspect={work.media.aspect}
      />
    );
  }

  const MediaWrapper = work.href
    ? ({ children }: { children: React.ReactNode }) => (
        <Link href={work.href!} aria-label={work.name}>
          {children}
        </Link>
      )
    : work.externalLink
      ? ({ children }: { children: React.ReactNode }) => (
          <a
            href={work.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={work.name}
          >
            {children}
          </a>
        )
      : ({ children }: { children: React.ReactNode }) => <>{children}</>;

  const badgeLabel =
    work.badge ?? (work.tag === "Coming project" ? "Coming soon" : undefined);

  const isClickable = Boolean(work.href) || Boolean(work.externalLink);
  const overlayRef = useRef<HTMLDivElement>(null);
  const embedRef = useRef<HTMLDivElement>(null);

  useVimeoPlayer({
    embedRef,
    dataSrc: work.media.dataSrc ?? "",
    dataRatio: work.media.dataRatio,
    title: work.name,
  });

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
            work.media.src && (
              <Image
                src={work.media.src}
                alt={work.name}
                fill
                sizes={CARD_SIZES}
                priority={priority}
                className="object-cover"
              />
            )
          ) : (
            <div
              ref={embedRef}
              className="absolute inset-0 w-full h-full overflow-hidden"
            >
              {work.media.poster && (
                <Image
                  src={work.media.poster}
                  alt={work.name}
                  fill
                  sizes={CARD_SIZES}
                  priority={priority}
                  className="object-cover"
                />
              )}
            </div>
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
              ↗
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
  // `pendingFilter` is what the user clicked; `activeFilter` only swaps once the
  // grid has faded out, so the content never changes while it is visible.
  const [pendingFilter, setPendingFilter] = useState("All");
  // Stays false until the first filter click so the initial render is not animated.
  const hasFiltered = useRef(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridTweenRef = useRef<gsap.core.Tween | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const filterTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const labelWidth = useRef(0);
  const labelHidden = useRef(false);
  const [isWide, setIsWide] = useState(false);

  // Mirrors the 2xl breakpoint below so the row before the Wastetide video
  // always fills the grid instead of leaving a trailing empty column.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1536px)");
    const update = () => setIsWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  function animateFilters(instant = false) {
    const group = filtersRef.current;
    if (!group) return;

    const buttons = Array.from(group.querySelectorAll("button"));
    const selected = buttons.findIndex(
      (button) => button.getAttribute("aria-pressed") === "true",
    );
    if (selected < 0) return;

    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const widths = buttons.map((button) => button.offsetWidth / rem);
    const push = widths[selected] * 0.1 + 0.375;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const inFlight = filterTimelineRef.current?.isActive();
    filterTimelineRef.current?.kill();

    // Reserve room for the widest chip's swell inside the horizontal scroller.
    gsap.set(group, {
      paddingInline: `${Math.max(...widths) * 0.13 + 0.5}rem`,
    });

    const timeline = gsap.timeline();
    filterTimelineRef.current = timeline;

    buttons.forEach((button, index) => {
      const isSelected = index === selected;
      const distance = Math.abs(index - selected);
      const scale = isSelected ? 1.1 : 1;
      const x = `${Math.sign(index - selected) * push}rem`;
      const colors = {
        backgroundColor: isSelected ? "#0c0c0c" : "#f5f5f5",
        color: isSelected ? "#ffffff" : "#7c7c7c",
      };

      if (instant || reduceMotion) {
        gsap.set(button, { x, scaleX: scale, scaleY: scale, ...colors });
        return;
      }

      // An interrupted wave starts at its current position without a new delay.
      const delay = inFlight ? 0 : distance * 0.022;
      const duration = 0.55 + Math.min(distance, 3) * 0.04;
      timeline
        .to(button, { x, duration, ease: "back.out(1.2)" }, delay)
        .to(
          button,
          { scaleX: scale, duration, ease: "elastic.out(1, 0.5)" },
          delay,
        )
        .to(
          button,
          { scaleY: scale, duration, ease: "back.out(1.4)" },
          delay + 0.05,
        )
        .to(button, { ...colors, duration: 0.2, ease: "power1.out" }, 0);
    });
  }

  useGSAP(() => animateFilters(!hasFiltered.current), {
    dependencies: [pendingFilter],
    scope: filtersRef,
  });

  useGSAP(
    (_context, contextSafe) => {
      const group = filtersRef.current;
      if (!group || !contextSafe) return;

      const settle = contextSafe(() => animateFilters(true));
      const observer = new ResizeObserver(settle);
      group
        .querySelectorAll("button")
        .forEach((button) => observer.observe(button));
      const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
      motion.addEventListener("change", settle);

      return () => {
        observer.disconnect();
        motion.removeEventListener("change", settle);
      };
    },
    { scope: filtersRef },
  );

  // Fade the grid out on click, swap the filter, then fade the cards back in.
  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid || !hasFiltered.current) return;
      // A newer selection must cancel the previous filter's pending commit.
      gridTweenRef.current?.kill();
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (pendingFilter !== activeFilter) {
        gridTweenRef.current = gsap.to(grid, {
          opacity: 0,
          y: reduceMotion ? 0 : "0.5rem",
          duration: reduceMotion ? 0 : 0.25,
          ease: "power2.out",
          onComplete: () => setActiveFilter(pendingFilter),
        });
        return;
      }

      gsap.set(grid, { opacity: 1, y: 0 });
      gridTweenRef.current = gsap.fromTo(
        grid.children,
        { opacity: 0, y: reduceMotion ? 0 : "0.75rem" },
        {
          opacity: 1,
          y: 0,
          duration: reduceMotion ? 0 : 0.45,
          ease: "power2.out",
          stagger: reduceMotion ? 0 : 0.04,
          clearProps: "transform,opacity",
        },
      );
    },
    { dependencies: [pendingFilter, activeFilter] },
  );

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

  // Hide filters that no work is tagged with; "All" always stays.
  const visibleFilters = FILTERS.filter(
    (filter) => filter === "All" || works.some((w) => w.tag === filter),
  );

  const firstRowCount = isWide ? 5 : 4;

  return (
    <div id="home-content" className="flex flex-col gap-4">
      {/* Filters */}
      <div id="home-filters" className="flex items-center min-w-0">
        <span
          id="home-filters-label"
          ref={labelRef}
          className="text-[#7e7e7e] text-base leading-[0.8] shrink-0 mr-4 overflow-hidden whitespace-nowrap"
        >
          Filters
        </span>

        <div
          id="home-filters-scroll"
          onScroll={handlePillsScroll}
          className="min-w-0 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden -my-2 -mx-4 px-4 md:mx-0 md:px-0"
        >
          <div
            id="home-filters-options"
            ref={filtersRef}
            role="group"
            aria-labelledby="home-filters-label"
            className="flex w-max items-center gap-2 px-7 py-2"
          >
            {visibleFilters.map((filter) => (
              <button
                id={`home-filter-${filter.toLowerCase().replaceAll(" ", "-")}`}
                key={filter}
                type="button"
                aria-pressed={pendingFilter === filter}
                aria-controls="home-grid"
                onClick={() => {
                  hasFiltered.current = true;
                  setPendingFilter(filter);
                }}
                className={`min-w-16 px-4 py-3 rounded-full text-sm leading-[0.8] cursor-pointer shrink-0 whitespace-nowrap origin-center touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0c0c0c] ${
                  pendingFilter === filter
                    ? "bg-[#0c0c0c] text-white"
                    : "bg-[#f5f5f5] text-[#7C7C7C]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div
        id="home-grid"
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-5 gap-5 md:gap-4 items-start"
      >
        {filtered.slice(0, firstRowCount).map((work) => (
          <WorkCard key={work.name} work={work} priority />
        ))}
        {filtered.length > firstRowCount && (
          <div className="relative col-span-1 md:col-span-4 2xl:col-span-5 overflow-hidden aspect-video my-8">
            <Vimeo169
              dataSrc="1199785516"
              dataRatio="1920/1080"
              src="/works/Wastetide/2.webp"
              alt="Wastetide video"
            />
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
        {filtered.slice(firstRowCount).map((work) => (
          <WorkCard key={work.name} work={work} priority={false} />
        ))}
      </div>
    </div>
  );
}
