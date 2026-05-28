"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Navigation from "./Navigation";
import CaseNavigation from "./CaseNavigation";
import { useCaseNav } from "@/contexts/CaseNavContext";

export default function NavWrapper() {
  const { data } = useCaseNav();
  const showCaseNav = data !== null && (data.release !== undefined || data.backstage !== undefined);

  const mainNavRef = useRef<HTMLDivElement>(null);
  const caseNavRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useLayoutEffect(() => {
    const mainNav = mainNavRef.current;
    const caseNav = caseNavRef.current;
    if (!mainNav || !caseNav) return;

    if (!initialized.current) {
      gsap.set(mainNav, { opacity: showCaseNav ? 0 : 1 });
      gsap.set(caseNav, { opacity: showCaseNav ? 1 : 0 });
      mainNav.style.pointerEvents = showCaseNav ? "none" : "auto";
      caseNav.style.pointerEvents = showCaseNav ? "auto" : "none";
      initialized.current = true;
      return;
    }

    if (showCaseNav) {
      mainNav.style.pointerEvents = "none";
      caseNav.style.pointerEvents = "auto";
      gsap.to(mainNav, { opacity: 0, duration: 0.35, ease: "power2.inOut" });
      gsap.fromTo(caseNav, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.inOut" });
    } else {
      caseNav.style.pointerEvents = "none";
      mainNav.style.pointerEvents = "auto";
      gsap.to(caseNav, { opacity: 0, duration: 0.35, ease: "power2.inOut" });
      gsap.fromTo(mainNav, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.inOut" });
    }
  }, [showCaseNav]);

  return (
    <div id="nav-wrapper" className="relative h-full w-56.25">
      <div id="nav-main" ref={mainNavRef} className="absolute inset-0">
        <Navigation />
      </div>
      <div id="nav-case" ref={caseNavRef} className="absolute inset-0">
        <CaseNavigation />
      </div>
    </div>
  );
}
