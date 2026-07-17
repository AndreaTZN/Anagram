"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useCaseNav } from "@/contexts/CaseNavContext";
import { globalLenisRef } from "@/lib/lenis";
import MobileCaseHeader from "./MobileCaseHeader";

type Props = {
  release?: React.ReactNode;
  backstage?: React.ReactNode;
};

type SectionSlots = {
  first: HTMLElement;
  rest: HTMLElement;
};

function MobileSection({
  label,
  description,
  dark,
}: {
  label: string;
  description: string;
  dark: boolean;
}) {
  return (
    <div className="mobilecase_section hidden max-[992px]:flex flex-col gap-2 py-4">
      <p
        className={`text-base font-medium leading-[1.1] ${dark ? "text-white" : "text-[#0c0c0c]"}`}
      >
        {label}
      </p>
      <p
        className={`text-sm max-[992px]:text-base leading-[1.3] whitespace-pre-line ${dark ? "text-[#7e7e7e]" : "text-[#7c7c7c]"}`}
      >
        {description}
      </p>
    </div>
  );
}

export default function CaseTabContent({ release, backstage }: Props) {
  const { data, activeTab } = useCaseNav();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentHostRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);
  const [slots, setSlots] = useState<SectionSlots | null>(null);

  const sections = data?.[activeTab]?.sections ?? [];
  const dark = activeTab === "backstage";

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    globalLenisRef.current?.scrollTo(0, { immediate: true });
    gsap.fromTo(
      el,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.inOut" },
    );
  }, [activeTab]);

  // The tab content arrives as an opaque server-rendered node, so its children
  // can't be inspected from props — sections are injected via DOM slots instead.
  useLayoutEffect(() => {
    const container = containerRef.current;
    const hasSections = (data?.[activeTab]?.sections?.length ?? 0) > 0;
    if (!container || !hasSections) {
      setSlots(null);
      return;
    }

    const wrapper = contentHostRef.current?.firstElementChild;
    if (!wrapper) {
      setSlots(null);
      return;
    }

    const slotClasses = "mobilecase_slot hidden max-[992px]:contents";
    const first = document.createElement("div");
    first.className = slotClasses;
    const rest = document.createElement("div");
    rest.className = slotClasses;

    wrapper.insertBefore(first, wrapper.children[1] ?? null);
    wrapper.insertBefore(rest, wrapper.children[3] ?? null);

    setSlots({ first, rest });

    return () => {
      first.remove();
      rest.remove();
      setSlots(null);
    };
  }, [data, activeTab]);

  return (
    <div id="case-tab-content" ref={containerRef}>
      <MobileCaseHeader />
      <div ref={contentHostRef} className="contents">
        {activeTab === "release" ? release : backstage}
      </div>
      {slots &&
        sections.length > 0 &&
        createPortal(
          <MobileSection
            label={sections[0].label}
            description={sections[0].description}
            dark={dark}
          />,
          slots.first,
          "case-mobile-section-first",
        )}
      {slots &&
        sections.length > 1 &&
        createPortal(
          <div className="hidden max-[992px]:flex flex-col gap-6">
            {sections.slice(1).map((section) => (
              <MobileSection
                key={section.id}
                label={section.label}
                description={section.description}
                dark={dark}
              />
            ))}
          </div>,
          slots.rest,
          "case-mobile-sections-rest",
        )}
    </div>
  );
}
