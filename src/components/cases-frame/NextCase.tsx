"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useVimeoPlayer } from "@/hooks/useVimeoPlayer";
import { useCaseNav } from "@/contexts/CaseNavContext";
import ArrowWebGL, {
  type ArrowWebGLHandle,
} from "@/components/icons/ArrowWebGL";

gsap.registerPlugin(ScrollTrigger);

type MediaImage = { type: "image"; src: string; alt?: string };
type MediaVimeo = {
  type: "vimeo";
  dataSrc: string;
  dataRatio?: string;
  posterSrc: string;
  posterAlt?: string;
};
type Media = MediaImage | MediaVimeo;

type Props = {
  projectName: string;
  href: string;
  media: Media;
};

export default function NextCase({ projectName, href, media }: Props) {
  const { activeTab } = useCaseNav();
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef(null);
  const embedRef = useRef<HTMLDivElement>(null);

  const isFirst = useRef(true);
  const arrowRef = useRef<ArrowWebGLHandle>(null);

  useVimeoPlayer({
    embedRef,
    dataSrc: media.type === "vimeo" ? media.dataSrc : "",
    dataRatio: media.type === "vimeo" ? media.dataRatio : undefined,
    title: projectName,
  });

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const dark = activeTab === "backstage";
    const duration = isFirst.current ? 0 : 0.5;
    isFirst.current = false;

    const textColor = dark ? "#ffffff" : "#0c0c0c";
    const dotColor = dark ? "#ffffff" : "#0c0c0c";

    gsap.to(el.querySelectorAll(".nextcase_cta p"), {
      color: textColor,
      duration,
      ease: "power2.inOut",
    });

    gsap.to(el.querySelectorAll(".nextcase_dot"), {
      backgroundColor: dotColor,
      duration,
      ease: "power2.inOut",
    });

    gsap.to(el.querySelector(".nextcase_btn"), {
      color: textColor,
      duration,
      ease: "power2.inOut",
    });

    gsap.to(el.querySelectorAll(".nextcase_btn path"), {
      attr: { stroke: textColor },
      duration,
      ease: "power2.inOut",
    });
  }, [activeTab]);

  useLayoutEffect(() => {
    const pinEl = mediaRef.current;
    const root = containerRef.current;
    if (!pinEl || !root) return;

    // Lenis scrolls this wrapper, not window — ScrollTrigger never fires without it.
    const scroller = document.getElementById("smooth-scroll-container");

    // Scoped so selectors resolve inside this component and cleanup is automatic.
    const ctx = gsap.context(() => {
      // Reveal the media as it scrolls up: a bottom-to-top clip wipe plus a slow
      // Ken Burns zoom on the poster. No pin — ScrollTrigger pinning conflicts
      // with Lenis owning this scroller (would need a scrollerProxy).
      // Hidden until the scrubbed reveal finishes, then played on its own.
      gsap.set(".nextcase_badge", { yPercent: 60, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: pinEl,
          scroller: scroller ?? undefined,
          start: "top bottom",
          end: "bottom bottom",
        },
      });

      tl.fromTo(
        ".nextcase_media",
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
        0,
      ).fromTo(
        ".projet-card_embed-vimeo-contain",
        { scale: 1.15 },
        { scale: 1, duration: 1 },
        0,
      );

      tl.fromTo(
        ".nextcase_badge",
        { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        0.5,
      );
    }, root);

    return () => ctx.revert();
  }, []);

  function handleEnter() {
    arrowRef.current?.play();
  }

  const posterSrc = media.type === "image" ? media.src : media.posterSrc;
  const posterAlt =
    media.type === "image" ? (media.alt ?? "") : (media.posterAlt ?? "");

  return (
    <div
      ref={containerRef}
      className="nextcase_component flex flex-col gap-6 w-full"
    >
      <div className="nextcase_separator flex items-center justify-between w-full max-[992px]:[&>div:nth-child(n+61)]:hidden">
        {Array.from({ length: 140 }).map((_, i) => (
          <div
            key={i}
            className="nextcase_dot bg-[#0c0c0c] opacity-30 rounded-full shrink-0 size-[1.5px]"
          />
        ))}
      </div>

      <div className="nextcase_cta flex items-center justify-between w-full max-[992px]:flex-col max-[992px]:gap-6">
        <div className="flex flex-col gap-1 max-[992px]:items-center max-[992px]:text-center">
          <p className="text-[#0c0c0c] text-[1.25rem] leading-[1.1] tracking-[-0.1px]">
            Feel like working together?
          </p>
          <p className="text-[#0c0c0c] text-[1.25rem] leading-[1.1] tracking-[-0.1px]">
            So, let&apos;s shake the market! In real life
          </p>
        </div>
        <a
          href="mailto:hello@anagram.fr"
          className={`nextcase_btn flex items-center gap-2 rounded-full px-4 py-4 text-base leading-[0.9] tracking-[-0.08px] whitespace-nowrap transition-colors duration-300 ease-in-out ${
            activeTab === "backstage"
              ? "bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]"
              : "bg-[#f5f5f5] text-[#0c0c0c] hover:bg-[#0c0c0c]/10"
          }`}
          onMouseEnter={handleEnter}
        >
          Work with us
          <ArrowWebGL ref={arrowRef} className="block size-3.5 shrink-0" />
        </a>
      </div>

      <div className="w-full aspect-video" ref={mediaRef}>
        <Link
          href={href}
          className="nextcase_media block relative w-full h-full overflow-hidden"
        >
          <div
            ref={embedRef}
            className="projet-card_embed-vimeo-contain relative w-full h-full overflow-hidden"
          >
            <Image
              src={posterSrc}
              alt={posterAlt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="nextcase_badge absolute top-4 left-4 z-10 flex items-center gap-4 backdrop-blur-[17px] bg-[rgba(12,12,12,0.2)] px-4 py-3 rounded-full">
            <span className="text-white text-base font-medium leading-[0.9]">
              {projectName}
            </span>
            <span className="text-white/75 text-[0.875rem] leading-[0.9]">
              Next project
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
