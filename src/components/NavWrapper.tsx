"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Navigation from "./Navigation";
import CaseNavigation from "./CaseNavigation";
import { useCaseNav } from "@/contexts/CaseNavContext";

gsap.registerPlugin(useGSAP);

function getNavGroups(nav: HTMLElement, showCaseNav: boolean) {
  // Animate the containers, leaving link opacity and card transforms untouched.
  const selectors = showCaseNav
    ? ["#case-nav-close", "#case-nav-header", "#case-nav-tabs, #case-nav-sections"]
    : [
        ":scope > nav > div:first-child > a",
        ":scope > nav > div:first-child > div",
        "#nav-works",
      ];

  return selectors.map((selector) =>
    Array.from(nav.querySelectorAll<HTMLElement>(selector)),
  );
}

export default function NavWrapper() {
  const { data } = useCaseNav();
  const showCaseNav = data !== null;
  const pathname = usePathname();

  const navRef = useRef<HTMLDivElement>(null);
  const prevShowCaseNav = useRef(showCaseNav);
  const exiting = useRef(false);

  useGSAP(
    (_, contextSafe) => {
      const nav = navRef.current;
      if (!nav) return;

      const shouldEnter = prevShowCaseNav.current !== showCaseNav || exiting.current;
      prevShowCaseNav.current = showCaseNav;
      exiting.current = false;
      nav.inert = false;

      const groups = getNavGroups(nav, showCaseNav);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let animation: gsap.core.Animation | undefined;

      if (shouldEnter) {
        const timeline = gsap.timeline();
        groups.forEach((group, index) => {
          if (!group.length) return;
          timeline.fromTo(
            group,
            { opacity: 0, y: reduceMotion ? 0 : "0.5rem" },
            {
              opacity: 1,
              y: 0,
              duration: reduceMotion ? 0 : 0.35,
              ease: "power2.out",
              clearProps: "transform,opacity",
            },
            reduceMotion ? 0 : index * 0.04,
          );
        });
        animation = timeline;
      }

      const onPageExit = contextSafe!((event: Event) => {
        const href = (event as CustomEvent<{ href: string }>).detail?.href;
        if (!href) return;
        const nextPathname = new URL(href, window.location.href).pathname;
        if (/^\/works\/.+/.test(nextPathname) === showCaseNav) return;

        animation?.kill();
        exiting.current = true;
        nav.inert = true;
        animation = gsap.to(groups.flat(), {
          opacity: 0,
          y: reduceMotion ? 0 : "-0.375rem",
          duration: reduceMotion ? 0 : 0.15,
          ease: "sine.inOut",
          overwrite: true,
        });
      });

      document.addEventListener("anagram:page-exit", onPageExit);
      return () => {
        document.removeEventListener("anagram:page-exit", onPageExit);
        nav.inert = false;
      };
    },
    { scope: navRef, dependencies: [pathname, showCaseNav], revertOnUpdate: true },
  );

  return (
    <div id="nav-wrapper" className="relative h-full w-62.5 ">
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
