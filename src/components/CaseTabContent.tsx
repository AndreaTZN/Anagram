"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { useCaseNav } from "@/contexts/CaseNavContext";
import { globalLenisRef } from "@/lib/lenis";

type Props = {
  release?: React.ReactNode;
  backstage?: React.ReactNode;
};

export default function CaseTabContent({ release, backstage }: Props) {
  const { activeTab } = useCaseNav();
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    globalLenisRef.current?.scrollTo(0, { immediate: true });
    gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.inOut" });
  }, [activeTab]);

  return (
    <div id="case-tab-content" ref={containerRef}>
      {activeTab === "release" ? release : backstage}
    </div>
  );
}
