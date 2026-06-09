"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { globalLenisRef } from "@/lib/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

    const lenis = new Lenis({
      wrapper,
      content,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
      { opacity: 1, duration: 0.35, ease: "power2.inOut" },
    );
  }, [pathname]);

  return (
    <div
      ref={wrapperRef}
      id="smooth-scroll-container"
      className="flex-1  overflow-y-auto overflow-x-hidden"
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
