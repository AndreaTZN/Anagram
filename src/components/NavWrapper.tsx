"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Navigation from "./Navigation";
import CaseNavigation from "./CaseNavigation";
import { useCaseNav } from "@/contexts/CaseNavContext";

export default function NavWrapper() {
  const { data } = useCaseNav();
  const showCaseNav = data !== null;

  const navRef = useRef<HTMLDivElement>(null);
  const prevShowCaseNav = useRef(showCaseNav);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    if (prevShowCaseNav.current === showCaseNav) return;
    prevShowCaseNav.current = showCaseNav;
    gsap.fromTo(nav, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.inOut" });
  }, [showCaseNav]);

  return (
    <div id="nav-wrapper" className="relative h-full w-62.5">
      <div
        ref={navRef}
        id={showCaseNav ? "nav-cases" : "nav-main"}
        className="absolute inset-0"
      >
        {showCaseNav ? <CaseNavigation /> : <Navigation />}
      </div>
    </div>
  );
}
