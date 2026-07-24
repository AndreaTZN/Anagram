"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import WorksGrid, { allWorks, archiveWorks } from "@/components/WorksGrid";

gsap.registerPlugin(useGSAP);

type Tab = "all" | "archives";

export default function WorksPageClient() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const tabAllRef = useRef<HTMLButtonElement>(null);
  const tabArchivesRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      gridRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  }, [activeTab]);

  function handleTabClick(tab: Tab) {
    if (tab === activeTab) return;
    setActiveTab(tab);

    gsap.to(tabAllRef.current, {
      backgroundColor: tab === "all" ? "#0c0c0c" : "transparent",
      color: tab === "all" ? "#ffffff" : "#7c7c7c",
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(tabArchivesRef.current, {
      backgroundColor: tab === "archives" ? "#0c0c0c" : "transparent",
      color: tab === "archives" ? "#ffffff" : "#7c7c7c",
      duration: 0.3,
      ease: "power2.out",
    });
  }

  return (
    <>
      <section
        id="works-hero"
        className="flex items-center justify-between gap-4 mb-8 max-[766px]:flex-col max-[766px]:items-start pt-32 pb-32 md:pt-52 md:pb-52"
      >
        <p className="text-[#0c0c0c] text-[1.25rem] leading-[1.1] tracking-[-0.1px] max-w-[38.3rem]">
          From strategy to execution, we design thoughtful identities and
          digital experiences that help businesses stand out, evolve, and
          grow.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            ref={tabAllRef}
            id="works-hero-tab-all"
            onClick={() => handleTabClick("all")}
            className="bg-[#0c0c0c] text-white text-sm leading-[0.9] rounded-full px-4 py-3 cursor-pointer"
          >
            All works
          </button>
          <button
            ref={tabArchivesRef}
            id="works-hero-tab-archives"
            onClick={() => handleTabClick("archives")}
            className="text-[#7c7c7c] text-sm leading-[0.9] rounded-full px-4 py-3 cursor-pointer"
          >
            Archives
          </button>
        </div>
      </section>
      <section>
        <div ref={gridRef}>
          <WorksGrid works={activeTab === "all" ? allWorks : archiveWorks} />
        </div>
      </section>
    </>
  );
}