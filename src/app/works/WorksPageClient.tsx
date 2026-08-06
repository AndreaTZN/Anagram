"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import WorksGrid, { allWorks, archiveWorks } from "@/components/WorksGrid";
import WorksArchiveList from "@/components/WorksArchiveList";

gsap.registerPlugin(useGSAP, Flip);

type Tab = "all" | "archives";

const TABS: { id: Tab; label: string; domId: string }[] = [
  { id: "all", label: "All works", domId: "works-hero-tab-all" },
  { id: "archives", label: "Archives", domId: "works-hero-tab-archives" },
];

export default function WorksPageClient() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const pillRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<Partial<Record<Tab, HTMLButtonElement | null>>>({});
  const gridRef = useRef<HTMLDivElement>(null);
  const isFirstFit = useRef(true);

  useGSAP(() => {
    gsap.fromTo(
      gridRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" },
    );
  }, [activeTab]);

  // Flip.fit() matches the pill to the active button's box. The first run
  // positions it with no animation, later ones slide it across.
  useLayoutEffect(() => {
    const pill = pillRef.current;
    const target = tabRefs.current[activeTab];
    if (!pill || !target) return;

    Flip.fit(pill, target, {
      duration: isFirstFit.current ? 0 : 0.4,
      ease: "power3.inOut",
    });

    if (isFirstFit.current) {
      // Revealed only once fitted, otherwise a zero-sized pill paints first.
      gsap.set(pill, { autoAlpha: 1 });
      isFirstFit.current = false;
    }
  }, [activeTab]);

  function handleTabClick(tab: Tab) {
    if (tab === activeTab) return;
    setActiveTab(tab);
  }

  return (
    <>
      <section
        id="works-hero"
        className="flex items-center justify-between gap-4 mb-8 max-[766px]:flex-col max-[766px]:items-start pt-32 pb-32 md:pt-52 md:pb-52"
      >
        <p className="text-[#0c0c0c] text-[1.25rem] leading-[1.1] tracking-[-0.1px] max-w-[38.3rem]">
          From strategy to execution, we design thoughtful identities and
          digital experiences that help businesses stand out, evolve, and grow.
        </p>
        <div className="relative flex items-center gap-2 shrink-0">
          {/* Single persistent node: Flip can only animate an element that
              survives the state change, so the pill lives outside the buttons. */}
          <span
            ref={pillRef}
            id="works-hero-tab-pill"
            className="absolute left-0 top-0 rounded-full bg-[#0c0c0c] pointer-events-none "
          />
          {TABS.map(({ id, label, domId }) => (
            <button
              key={id}
              id={domId}
              ref={(el) => {
                tabRefs.current[id] = el;
              }}
              onClick={() => handleTabClick(id)}
              aria-pressed={activeTab === id}
              className={`relative text-sm leading-[0.9] rounded-full px-4 py-3 cursor-pointer transition-colors duration-300 ${
                activeTab === id ? "text-white" : "text-[#7c7c7c]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>
      <section>
        <div ref={gridRef}>
          <WorksGrid
            works={activeTab === "all" ? allWorks : archiveWorks}
            maxThreeColumns={activeTab === "archives"}
          />
          {activeTab === "archives" && <WorksArchiveList />}
        </div>
      </section>
    </>
  );
}
