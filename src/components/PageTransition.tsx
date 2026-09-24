"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pageTransitionRef } from "@/lib/page-transition";
import { useCaseNav } from "@/contexts/CaseNavContext";

gsap.registerPlugin(ScrollTrigger);

const OFFSET = "0.75rem";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { transitionCaseExit, isTabTransitioning } = useCaseNav();
  const prevPathname = useRef(pathname);
  const transitioning = useRef(false);

  // Enter: runs whenever the route changes (click, back/forward…), never on
  // the initial load so page intro animations stay untouched.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    if (isTabTransitioning) {
      transitioning.current = false;
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // `top` instead of `y`: a transform on this wrapper would turn it into the
    // containing block of the fixed widget layer living inside <main>.
    gsap.fromTo(
      el,
      { top: reduceMotion ? 0 : OFFSET, opacity: 0 },
      {
        top: 0,
        opacity: 1,
        duration: reduceMotion ? 0 : 0.45,
        ease: "power2.out",
        overwrite: true,
        clearProps: "top,opacity",
        onComplete: () => {
          transitioning.current = false;
          // Triggers were measured while the page was offset by OFFSET.
          ScrollTrigger.refresh();
        },
      },
    );
  }, [pathname, isTabTransitioning]);

  useEffect(() => {
    function navigate(href: string, skipExitAnimation = false) {
      const el = ref.current;
      if (!el || transitioning.current) return;
      transitioning.current = true;

      // The sidebar exits before the route commits and replaces its content.
      document.dispatchEvent(
        new CustomEvent("anagram:page-exit", { detail: { href } }),
      );

      if (skipExitAnimation) {
        router.push(href);
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      gsap.to(el, {
        top: reduceMotion ? 0 : `-${OFFSET}`,
        opacity: 0,
        duration: reduceMotion ? 0 : 0.2,
        ease: "sine.inOut",
        overwrite: true,
        onComplete: () => router.push(href),
      });
    }

    pageTransitionRef.current = (href) =>
      transitionCaseExit((skipExitAnimation) =>
        navigate(href, skipExitAnimation),
      );

    function onClick(e: MouseEvent) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;

      const anchor = (e.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      // Opt-out for links that drive the transition from their own onClick.
      if (anchor.dataset.transition === "manual") return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Same page (hash links, current route): let Next handle it.
      if (url.pathname === window.location.pathname) return;

      // Capture phase so this runs before Next's <Link> onClick, which bails
      // out on an already-prevented event.
      e.preventDefault();
      navigate(url.pathname + url.search + url.hash);
    }

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      pageTransitionRef.current = null;
    };
  }, [router, transitionCaseExit]);

  return (
    <div ref={ref} id="page-transition" className="relative">
      {children}
    </div>
  );
}
