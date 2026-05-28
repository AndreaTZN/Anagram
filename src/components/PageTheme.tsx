"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { useCaseNav } from "@/contexts/CaseNavContext";

export default function PageTheme({ children }: { children: React.ReactNode }) {
  const { activeTab } = useCaseNav();
  const ref = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const dark = activeTab === "backstage";

    if (isFirst.current) {
      gsap.set(el, { backgroundColor: dark ? "#0c0c0c" : "#ffffff" });
      isFirst.current = false;
      return;
    }

    gsap.to(el, { backgroundColor: dark ? "#0c0c0c" : "#ffffff", duration: 0.5, ease: "power2.inOut" });
  }, [activeTab]);

  return (
    <div id="page-theme" ref={ref} className="flex flex-1 overflow-hidden h-screen bg-white">
      {children}
    </div>
  );
}
