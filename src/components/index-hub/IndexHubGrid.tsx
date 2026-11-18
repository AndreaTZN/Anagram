"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnalogClock from "@/components/AnalogClock";

gsap.registerPlugin(useGSAP);

type HubPage = {
  slug: string;
  title: string;
  description?: string;
};

// Placement, rotation and vertical flip are taken as-is from the Figma card.
// The wrapper is 48.26% wide because AnalogClock's dial fills 97.5% of its
// SVG, which puts the dial at Figma's 137px on a 292px card.
const SERVICES_CLOCKS = [
  {
    id: "paris",
    timezone: "Europe/Paris",
    color: "#8B7759",
    className: "left-[32.62%] top-[30.55%] rotate-[-92.06deg]",
  },
  {
    id: "new-york",
    timezone: "America/New_York",
    color: "#F981FE",
    className: "left-[67.38%] top-[70.26%] rotate-[166.51deg]",
  },
];

// Cards are half of the 37.5rem column on desktop and full width below 767px.
const CARD_SIZES = "(max-width: 766px) 100vw, 20vw";
const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0c0c0c]";

const identityPage: HubPage = {
  slug: "brand-identity-consulting",
  title: "Brand identity consulting",
  description:
    "Every identity system begins with positioning, messaging, and audience understanding before any aesthetic direction is explored.",
};

const positioningPage: HubPage = {
  slug: "brand-positioning-agency",
  title: "Brand positioning agency",
  description:
    "Positioning is not a tagline. It's a strategic claim about what the brand is for, who it's for, and why it wins.",
};

const featuredPage: HubPage = {
  slug: "brand-design-agency",
  title: "Brand design agency",
};

const servicesPage: HubPage = {
  slug: "branding-agency-services",
  title: "Branding agency services",
  description:
    "We believe branding services should never function as isolated deliverables.",
};

const strategyPage: HubPage = {
  slug: "brand-strategy-consulting",
  title: "Brand strategy consulting",
  description:
    "Anagram offers brand strategy consulting that defines how your market sees you: positioning, messaging, and brand architecture built for growth.",
};

const listPages: HubPage[] = [
  { slug: "branding-and-creative-agency", title: "Branding and creative agency" },
  { slug: "branding-marketing-agency", title: "Branding marketing agency" },
  { slug: "business-branding-agency", title: "Business branding agency" },
  { slug: "creative-agency-for-startups", title: "Creative agency for startups" },
  { slug: "product-branding-services", title: "Product branding services" },
  {
    slug: "financial-services-branding-agency",
    title: "Financial services branding agency",
  },
  { slug: "fintech-branding-agency", title: "Fintech branding agency" },
  { slug: "rebranding-agency", title: "Rebranding agency" },
  { slug: "startup-branding-agency", title: "Startup branding agency" },
];

// Muted arrows are the solid black SVG at 25% (same render as the Figma asset,
// whose opacity sits on its group) so hover can tween them to full black.
const ARROW_REST_OPACITY = 0.25;
const LIST_DIMMED_OPACITY = 0.3;

function useHoverTweens(darkenArrow = false) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const { contextSafe } = useGSAP();

  const animate = contextSafe((hovered: boolean) => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = reduceMotion ? 0 : 0.3;
    const ease = hovered ? "power2.out" : "power2.in";

    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: hovered ? 0.08 : 0,
        duration,
        ease,
        overwrite: true,
      });
    }
    gsap.to(arrowRef.current, {
      x: hovered && !reduceMotion ? "0.25rem" : 0,
      ...(darkenArrow ? { opacity: hovered ? 1 : ARROW_REST_OPACITY } : {}),
      duration,
      ease,
      overwrite: true,
    });
  });

  return {
    overlayRef,
    arrowRef,
    hoverHandlers: {
      onMouseEnter: () => animate(true),
      onMouseLeave: () => animate(false),
    },
  };
}

const ARROW_SRC = {
  white: "/icons/index-arrow-white.svg",
  black: "/icons/index-arrow-black.svg",
};

function Arrow({
  arrowRef,
  tone,
  className = "",
}: {
  arrowRef?: RefObject<HTMLSpanElement | null>;
  tone: keyof typeof ARROW_SRC;
  className?: string;
}) {
  return (
    <span
      ref={arrowRef}
      data-hub-arrow
      className={`inline-flex shrink-0 ${className}`}
    >
      <Image
        src={ARROW_SRC[tone]}
        alt=""
        width={9}
        height={8}
        className="block w-[0.5442rem] h-[0.4942rem] -scale-x-100"
      />
    </span>
  );
}

function HubCard({
  page,
  mediaClassName,
  children,
}: {
  page: HubPage;
  mediaClassName: string;
  children?: ReactNode;
}) {
  const { overlayRef, arrowRef, hoverHandlers } = useHoverTweens(true);

  return (
    <Link
      href={`/page/${page.slug}`}
      {...hoverHandlers}
      className={`flex flex-col gap-4 ${FOCUS_RING}`}
    >
      <div
        className={`relative w-full overflow-hidden ${mediaClassName}`}
      >
        {children}
        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 bg-[#0c0c0c] opacity-0"
        />
      </div>
      <div className="flex items-start gap-2.5 text-sm">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <span className="font-medium leading-[0.9] text-[#0c0c0c]">
            {page.title}
          </span>
          {page.description && (
            <span className="leading-[1.3] text-[#8b8b8b]">
              {page.description}
            </span>
          )}
        </div>
        <Arrow arrowRef={arrowRef} tone="black" className="opacity-25" />
      </div>
    </Link>
  );
}

function FeaturedCard({ page }: { page: HubPage }) {
  const { overlayRef, arrowRef, hoverHandlers } = useHoverTweens();

  return (
    <Link
      href={`/page/${page.slug}`}
      {...hoverHandlers}
      className={`relative block aspect-[3/2] w-full overflow-hidden bg-[#0c0c0c] ${FOCUS_RING}`}
    >
      <Image
        src="/seo/hub/brand-design-agency.webp"
        alt=""
        fill
        sizes="(max-width: 766px) 100vw, 42vw"
        className="object-cover"
      />
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 bg-[#0c0c0c] opacity-0"
      />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-4 p-8 max-[766px]:p-4">
        <span className="text-sm font-medium leading-[0.9] text-white">
          {page.title}
        </span>
        <Arrow arrowRef={arrowRef} tone="white" />
      </div>
    </Link>
  );
}

function HubList({ pages }: { pages: HubPage[] }) {
  const listRef = useRef<HTMLElement>(null);
  const { contextSafe } = useGSAP({ scope: listRef });

  // null restores every row; a slug dims the other rows and darkens its arrow.
  const highlight = contextSafe((activeSlug: string | null) => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = reduceMotion ? 0 : 0.3;

    gsap.utils
      .toArray<HTMLElement>("[data-hub-row]", listRef.current)
      .forEach((row) => {
        const active = row.dataset.hubRow === activeSlug;
        gsap.to(row, {
          opacity: activeSlug === null || active ? 1 : LIST_DIMMED_OPACITY,
          duration,
          ease: "power2.out",
          overwrite: true,
        });
        gsap.to(row.querySelector("[data-hub-arrow]"), {
          opacity: active ? 1 : ARROW_REST_OPACITY,
          x: active && !reduceMotion ? "0.25rem" : 0,
          duration,
          ease: "power2.out",
          overwrite: true,
        });
      });
  });

  return (
    <nav
      ref={listRef}
      aria-label="More agency services"
      className="-my-2 flex flex-col"
      onMouseLeave={() => highlight(null)}
    >
      {pages.map((page) => (
        <Link
          key={page.slug}
          href={`/page/${page.slug}`}
          data-hub-row={page.slug}
          onMouseEnter={() => highlight(page.slug)}
          className={`flex items-center justify-between gap-4 py-2 text-sm font-medium leading-[0.9] text-[#0c0c0c] ${FOCUS_RING}`}
        >
          <span>{page.title}</span>
          <Arrow tone="black" className="opacity-25" />
        </Link>
      ))}
    </nav>
  );
}

export default function IndexHubGrid() {
  return (
    <div
      className="flex w-150 min-w-0 flex-col gap-8 max-[766px]:w-full"
    >
      <div
        className="grid grid-cols-2 items-start gap-4 max-[766px]:grid-cols-1 max-[766px]:gap-8"
      >
        <HubCard
          page={identityPage}
          mediaClassName="aspect-[290/300] bg-[#e5e5e5]"
        >
          <Image
            src="/seo/hub/brand-identity-consulting.webp"
            alt=""
            fill
            sizes={CARD_SIZES}
            className="object-cover"
          />
        </HubCard>
        <HubCard page={positioningPage} mediaClassName="aspect-[290/300]">
          <Image
            src="/seo/hub/brand-positioning-agency.webp"
            alt=""
            fill
            sizes={CARD_SIZES}
            className="object-cover"
          />
        </HubCard>
      </div>

      <FeaturedCard page={featuredPage} />

      <div
        className="grid grid-cols-2 items-start gap-4 max-[766px]:grid-cols-1 max-[766px]:gap-8"
      >
        <HubCard page={servicesPage} mediaClassName="aspect-[4/5] bg-[#e5e5e5]">
          {SERVICES_CLOCKS.map((clock) => (
            <div
              key={clock.id}
              aria-hidden="true"
              className={`absolute flex aspect-square w-[48.26%] -translate-x-1/2 -translate-y-1/2 -scale-y-100 items-center justify-center ${clock.className}`}
            >
              <AnalogClock timezone={clock.timezone} color={clock.color} />
            </div>
          ))}
        </HubCard>
        <HubCard
          page={strategyPage}
          mediaClassName="flex aspect-[4/5] items-center justify-center bg-black"
        >
          <Image
            src="/seo/hub/brand-strategy-consulting.webp"
            alt=""
            width={1200}
            height={668}
            sizes="(max-width: 766px) 90vw, 18vw"
            className="h-auto w-[90.8%]"
          />
        </HubCard>
      </div>

      <div className="h-[0.5px] w-full bg-[#0c0c0c]/15" />

      <HubList pages={listPages} />
    </div>
  );
}
