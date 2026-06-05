"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { useVimeoPlayer } from "@/hooks/useVimeoPlayer";
import { useCaseNav } from "@/contexts/CaseNavContext";

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
  const embedRef = useRef<HTMLDivElement>(null);
  const arrow1Ref = useRef<SVGSVGElement>(null);
  const arrow2Ref = useRef<SVGSVGElement>(null);
  const isFirst = useRef(true);

  useVimeoPlayer({
    embedRef,
    dataSrc: media.type === "vimeo" ? media.dataSrc : "",
    dataRatio: media.type === "vimeo" ? media.dataRatio : undefined,
  });

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const dark = activeTab === "backstage";
    const duration = isFirst.current ? 0 : 0.5;
    isFirst.current = false;

    const textColor = dark ? "#ffffff" : "#0c0c0c";
    const dotColor = dark ? "#ffffff" : "#0c0c0c";
    const btnBg = dark ? "#1a1a1a" : "#f5f5f5";
    const btnText = dark ? "#ffffff" : "#0c0c0c";

    gsap.to(el.querySelectorAll(".nextcase_cta p"), { color: textColor, duration, ease: "power2.inOut" });
    gsap.to(el.querySelectorAll(".nextcase_dot"), { backgroundColor: dotColor, duration, ease: "power2.inOut" });
    gsap.to(el.querySelector(".nextcase_btn"), { backgroundColor: btnBg, color: btnText, duration, ease: "power2.inOut" });
    gsap.to(el.querySelectorAll(".nextcase_btn path"), { attr: { stroke: btnText }, duration, ease: "power2.inOut" });
  }, [activeTab]);

  const posterSrc = media.type === "image" ? media.src : media.posterSrc;
  const posterAlt = media.type === "image" ? (media.alt ?? "") : (media.posterAlt ?? "");

  return (
    <div ref={containerRef} className="nextcase_component flex flex-col gap-6 w-full">

      <div className="nextcase_separator flex items-center justify-between w-full">
        {Array.from({ length: 250 }).map((_, i) => (
          <div key={i} className="nextcase_dot bg-[#0c0c0c] opacity-30 rounded-full shrink-0 size-[1.5px]" />
        ))}
      </div>

      <div className="nextcase_cta flex items-center justify-between w-full">
        <div className="flex flex-col gap-1">
          <p className="text-[#0c0c0c] text-[1.25rem] leading-[1.1] tracking-[-0.1px]">Feel like working together?</p>
          <p className="text-[#0c0c0c] text-[1.25rem] leading-[1.1] tracking-[-0.1px]">So, let&apos;s shake the market! In real life</p>
        </div>
        <a
          href="mailto:hello@anagram.fr"
          className="nextcase_btn flex items-center gap-4 bg-[#f5f5f5] px-4 py-4 rounded-full text-[#0c0c0c] text-base leading-[0.9] tracking-[-0.08px] whitespace-nowrap"
          onMouseEnter={() => {
            gsap.to(arrow1Ref.current, { x: 10, y: -10, opacity: 0, duration: 0.25, ease: "power2.inOut" });
            gsap.to(arrow2Ref.current, { x: 0, y: 0, opacity: 1, duration: 0.25, ease: "power2.inOut" });
          }}
          onMouseLeave={() => {
            gsap.to(arrow1Ref.current, { x: 0, y: 0, opacity: 1, duration: 0.25, ease: "power2.inOut" });
            gsap.to(arrow2Ref.current, { x: -10, y: 10, opacity: 0, duration: 0.25, ease: "power2.inOut" });
          }}
        >
          Work with us
          <div className="relative size-3">
            <svg ref={arrow1Ref} className="absolute inset-0" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg ref={arrow2Ref} className="absolute inset-0" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0, transform: "translate(-10px, 10px)" }}>
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </a>
      </div>

      <Link href={href} className="nextcase_media relative w-full aspect-video overflow-hidden">
        <div
          ref={embedRef}
          className="projet-card_embed-vimeo-contain relative w-full h-full overflow-hidden"
        >
          <Image
            src={posterSrc}
            alt={posterAlt}
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute top-4 left-4 z-10 flex items-center gap-4 backdrop-blur-[17px] bg-[rgba(12,12,12,0.2)] px-4 py-3 rounded-full">
          <span className="text-white text-base font-medium leading-[0.9]">{projectName}</span>
          <span className="text-white/75 text-[0.875rem] leading-[0.9]">Next project</span>
        </div>
      </Link>

    </div>
  );
}
