"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { globalLenisRef, scrollLockRef } from "@/lib/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// TEMP EXPERIMENT: desktop Safari only. Confirmed disabling Lenis entirely
// fixes the scroll jank around Vimeo videos — now trying to keep Lenis wired
// while fixing the jank, before falling back to removing it on this browser.
function isDesktopSafari() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /^((?!chrome|android|crios|fxios|mobile).)*safari/i.test(ua);
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const isFirstRender = useRef(true);
  const pathname = usePathname();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    // Trial 1: keep Lenis wired (API, ScrollTrigger sync) but stop it from
    // JS-driving wheel scroll on desktop Safari — native wheel scroll takes
    // over instead, Lenis picks it back up via onNativeScroll.
    const safariTrial = isDesktopSafari();

    const lenis = new Lenis({
      wrapper,
      content,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      prevent: () => scrollLockRef.current,
      ...(safariTrial ? { smoothWheel: false } : {}),
    });
    lenisRef.current = lenis;
    globalLenisRef.current = lenis;

    lenis.on("scroll", () => ScrollTrigger.update());

    // let lastWidth = window.innerWidth;
    // let resizeTimeout: ReturnType<typeof setTimeout>;
    // function onResize() {
    //   const currentWidth = window.innerWidth;
    //   if (currentWidth !== lastWidth) {
    //     clearTimeout(resizeTimeout);
    //     resizeTimeout = setTimeout(() => location.reload(), 500);
    //     lastWidth = currentWidth;
    //   }
    // }
    // window.addEventListener("resize", onResize);

    let raf: number;
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      // clearTimeout(resizeTimeout);
      // window.removeEventListener("resize", onResize);
      lenis.destroy();
      lenisRef.current = null;
      globalLenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    gsap.fromTo(
      content,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.inOut" },
    );
  }, [pathname]);

  return (
    <div
      ref={wrapperRef}
      id="smooth-scroll-container"
      className="flex-1  overflow-y-auto overflow-x-hidden touch-pan-y overscroll-x-none"
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
