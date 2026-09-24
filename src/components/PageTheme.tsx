"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCaseNav } from "@/contexts/CaseNavContext";

gsap.registerPlugin(useGSAP);

export default function PageTheme({ children }: { children: React.ReactNode }) {
  const { activeTab, isTabTransitioning } = useCaseNav();
  const ref = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const dark = activeTab === "backstage";

      if (isFirst.current) {
        gsap.set(el, { backgroundColor: dark ? "#0c0c0c" : "#ffffff" });
        isFirst.current = false;
        return;
      }

      gsap.to(el, {
        backgroundColor: dark ? "#0c0c0c" : "#ffffff",
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    },
    { scope: ref, dependencies: [activeTab] },
  );

  return (
    <div
      id="page-theme"
      ref={ref}
      inert={isTabTransitioning}
      aria-busy={isTabTransitioning}
      className="flex flex-1 overflow-hidden h-dvh bg-white"
    >
      {children}
    </div>
  );
}
