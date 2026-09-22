"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import WorksGrid, { allWorks, archiveWorks } from "@/components/WorksGrid";
import WorksArchiveList from "@/components/WorksArchiveList";

gsap.registerPlugin(useGSAP);

type Tab = "all" | "archives";

const TABS: { id: Tab; label: string; domId: string }[] = [
  { id: "all", label: "All works", domId: "works-hero-tab-all" },
  { id: "archives", label: "Archives", domId: "works-hero-tab-archives" },
];

export default function WorksPageClient() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  // Keep the displayed content until the outgoing grid has finished fading.
  const [pendingTab, setPendingTab] = useState<Tab>("all");
  const hasSwitchedTab = useRef(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridTweenRef = useRef<gsap.core.Tween | null>(null);

  function animateTabs(instant = false) {
    const group = tabsRef.current;
    if (!group) return;

    const buttons = Array.from(group.querySelectorAll("button"));
    const selected = buttons.findIndex(
      (button) => button.getAttribute("aria-pressed") === "true",
    );
    if (selected < 0) return;

    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const widths = buttons.map((button) => button.offsetWidth / rem);
    const push = widths[selected] * 0.1 + 0.175;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const inFlight = tabTimelineRef.current?.isActive();
    tabTimelineRef.current?.kill();

    // Reserve room for the same chip swell used by the home filters.
    gsap.set(group, {
      paddingInline: `${Math.max(...widths) * 0.13 + 0.5}rem`,
    });

    const timeline = gsap.timeline();
    tabTimelineRef.current = timeline;

    buttons.forEach((button, index) => {
      const text = button.querySelector<HTMLSpanElement>("[data-tab-label]");
      if (!text) return;

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
        gsap.set(text, { scale: 1 / scale });
        return;
      }

      // Continue an interrupted wave from its current position without delay.
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
        .to(button, { ...colors, duration: 0.2, ease: "power1.out" }, 0)
        // Let the label swell first, then restore its resting text size.
        .to(
          text,
          { scale: 1 / scale, duration: 0.4, ease: "power2.out" },
          delay + (isSelected ? 0.12 : 0),
        );
    });
  }

  useGSAP(() => animateTabs(!hasSwitchedTab.current), {
    dependencies: [pendingTab],
    scope: tabsRef,
  });

  useGSAP(
    (_context, contextSafe) => {
      const group = tabsRef.current;
      if (!group || !contextSafe) return;

      const settle = contextSafe(() => animateTabs(true));
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
    { scope: tabsRef },
  );

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid || !hasSwitchedTab.current) return;
      // A newer click must cancel the previous tab's pending content swap.
      gridTweenRef.current?.kill();
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (pendingTab !== activeTab) {
        gridTweenRef.current = gsap.to(grid, {
          opacity: 0,
          y: reduceMotion ? 0 : "0.5rem",
          duration: reduceMotion ? 0 : 0.25,
          ease: "power2.out",
          onComplete: () => setActiveTab(pendingTab),
        });
        return;
      }

      gsap.set(grid, { opacity: 1, y: 0 });
      gridTweenRef.current = gsap.fromTo(
        grid.querySelectorAll("#works-grid > *, #works-archive-list"),
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
    { dependencies: [pendingTab, activeTab], scope: gridRef },
  );

  function handleTabClick(tab: Tab) {
    if (tab === pendingTab) return;
    hasSwitchedTab.current = true;
    setPendingTab(tab);
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
        <div
          id="works-hero-tabs"
          ref={tabsRef}
          role="group"
          aria-label="Work filters"
          className="flex w-max items-center gap-2 shrink-0 px-7 py-2"
        >
          {TABS.map(({ id, label, domId }) => (
            <button
              key={id}
              id={domId}
              type="button"
              onClick={() => handleTabClick(id)}
              aria-pressed={pendingTab === id}
              aria-controls="works-results"
              className={`min-w-16 px-4 py-3 rounded-full text-sm leading-[0.8] cursor-pointer shrink-0 whitespace-nowrap origin-center touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0c0c0c] ${
                pendingTab === id
                  ? "bg-[#0c0c0c] text-white"
                  : "bg-[#f5f5f5] text-[#7c7c7c]"
              }`}
            >
              <span
                id={`${domId}-label`}
                data-tab-label
                className="inline-block origin-center"
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </section>
      <section id="works-content">
        <div id="works-results" ref={gridRef}>
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
