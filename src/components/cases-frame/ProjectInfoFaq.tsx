"use client";

import type { ReactNode } from "react";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { useCaseNav } from "@/contexts/CaseNavContext";

type Props = {
  projectTitle?: string;
  projectDescription: ReactNode;
  faq: ReactNode;
};

export default function ProjectInfoFaq({
  projectTitle = "Project Informations",
  projectDescription,
  faq,
}: Props) {
  const { activeTab } = useCaseNav();
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const dark = activeTab === "backstage";
    const duration = isFirst.current ? 0 : 0.5;
    isFirst.current = false;

    gsap.to(el.querySelectorAll(".tc-primary"), {
      color: dark ? "#ffffff" : "#0c0c0c",
      duration,
      ease: "power2.inOut",
    });
    gsap.to(el.querySelectorAll(".tc-muted"), {
      color: dark ? "#9e9e9e" : "#7c7c7c",
      duration,
      ease: "power2.inOut",
    });
    gsap.to(el.querySelectorAll(".tc-dot"), {
      backgroundColor: dark ? "#ffffff" : "#0c0c0c",
      duration,
      ease: "power2.inOut",
    });
  }, [activeTab]);

  return (
    <div
      ref={containerRef}
      className="projectinfofaq_component flex gap-4 items-stretch w-full max-[992px]:flex-col max-[992px]:gap-8 pt-8 pb-8"
    >
      <div className="projectinfofaq_info flex flex-1 flex-col gap-4 px-4 py-6 min-w-0 max-[992px]:p-0">
        <p className="tc-primary text-[#0c0c0c] text-[1.125rem] leading-[1.1] tracking-[-0.09px]">
          {projectTitle}
        </p>
        <div className="tc-muted text-[#7c7c7c] text-[0.875rem] leading-[1.3]">
          {projectDescription}
        </div>
      </div>

      <div className="projectinfofaq_divider-vertical flex flex-col items-center justify-between self-stretch shrink-0 max-[992px]:hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="tc-dot bg-[#0c0c0c] opacity-30 rounded-full shrink-0 size-[1.5px]"
          />
        ))}
      </div>

      <div className="projectinfofaq_divider-horizontal hidden max-[992px]:flex items-center justify-between w-full">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="tc-dot bg-[#0c0c0c] opacity-30 rounded-full shrink-0 size-[1.5px]"
          />
        ))}
      </div>

      <div className="projectinfofaq_faq flex flex-1 flex-col px-4 py-6 min-w-0 max-[992px]:p-0">
        {faq}
      </div>
    </div>
  );
}
