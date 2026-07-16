"use client";

import type { ReactNode } from "react";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { useCaseNav } from "@/contexts/CaseNavContext";

type Row = {
  role: string;
  names: string;
};

type Props = {
  rows: Row[];
  title?: string;
  projectTitle?: string;
  projectDescription?: ReactNode;
  faq?: ReactNode;
};

export default function TeamCredits({
  rows,
  title = "Team behind the project",
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
      className="teamcredits_component flex gap-4 items-start w-full max-[992px]:flex-col max-[992px]:gap-8"
    >
      <div className="teamcredits_team flex flex-1 flex-col gap-4 px-4 py-6 min-w-0 max-[992px]:p-0">
        <p className="tc-primary text-[#0c0c0c] text-[1.125rem] leading-[1.1] tracking-[-0.09px]">
          {title}
        </p>
        <div className="teamcredits_list flex flex-col gap-4">
          {rows.map((row, i) => (
            <div key={i} className="teamcredits_row flex flex-col gap-1">
              <p className="tc-muted text-[#7c7c7c] text-[0.875rem] leading-[0.9]">
                {row.role}
              </p>
              <p className="tc-primary text-[#0c0c0c] text-[0.875rem] leading-[1.3]">
                {row.names}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="teamcredits_project flex flex-1 flex-col gap-4 px-4 py-6 min-w-0 max-[992px]:p-0">
        <p className="tc-primary text-[#0c0c0c] text-[1.125rem] leading-[1.1] tracking-[-0.09px]">
          {projectTitle}
        </p>
        {projectDescription && (
          <div className="tc-muted text-[#7c7c7c] text-[0.875rem] leading-[1.3]">
            {projectDescription}
          </div>
        )}
        {faq && (
          <div className="teamcredits_divider flex items-center justify-between w-full mt-6">
            {Array.from({ length: 80 }).map((_, i) => (
              <div
                key={i}
                className="tc-dot bg-[#0c0c0c] opacity-30 rounded-full shrink-0 size-[1.5px]"
              />
            ))}
          </div>
        )}
        {faq && <div className="teamcredits_faq pt-8">{faq}</div>}
      </div>
    </div>
  );
}
