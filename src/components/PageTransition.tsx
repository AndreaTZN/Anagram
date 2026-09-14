"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pageTransitionRef } from "@/lib/page-transition";
import { globalLenisRef } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const OFFSET = "1.25rem";
const MAX_IMAGE_WAIT = 1500;

function waitForImage(image: HTMLImageElement, signal: AbortSignal) {
  return new Promise<void>((resolve) => {
    if (signal.aborted) return resolve();
    let decoding = false;

    function finish() {
      image.removeEventListener("load", decode);
      image.removeEventListener("error", finish);
      signal.removeEventListener("abort", finish);
      resolve();
    }

    function decode() {
      if (decoding || signal.aborted) return;
      decoding = true;
      // A loaded image can still need decoding before its first clean paint.
      image.decode().catch(() => {}).then(finish);
    }

    image.addEventListener("load", decode);
    image.addEventListener("error", finish);
    signal.addEventListener("abort", finish, { once: true });
    // The incoming page is transparent, so explicitly start visible lazy images.
    image.loading = "eager";
    if (image.complete) decode();
  });
}

function waitForVisibleImages(container: HTMLElement, signal: AbortSignal) {
  const scroller = document.getElementById("smooth-scroll-container");
  const viewport = scroller?.getBoundingClientRect() ?? {
    top: 0,
    left: 0,
    bottom: window.innerHeight,
    right: window.innerWidth,
  };
  const images = Array.from(container.querySelectorAll("img")).filter((image) => {
    const bounds = image.getBoundingClientRect();
    return bounds.width > 0 && bounds.height > 0 &&
      bounds.bottom > viewport.top && bounds.top < viewport.bottom &&
      bounds.right > viewport.left && bounds.left < viewport.right;
  });

  return Promise.all(images.map((image) => waitForImage(image, signal)));
}

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const transitioning = useRef(false);

  // Enter: runs whenever the route changes (click, back/forward…), never on
  // the initial load so page intro animations stay untouched.
  useGSAP((_, contextSafe) => {
    const el = ref.current;
    if (!el || prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    const controller = new AbortController();
    let cancelled = false;
    let revealed = false;
    // Back/forward can commit a route before a previous exit tween completes.
    gsap.killTweensOf(el);
    gsap.set(el, { top: 0, opacity: 0 });
    // Measure the incoming first screen after resetting the custom scroller.
    globalLenisRef.current?.scrollTo(0, { immediate: true });

    const reveal = contextSafe!(() => {
      if (cancelled || revealed) return;
      revealed = true;
      clearTimeout(timeout);
      controller.abort();
      // `top` preserves the containing block of fixed widgets inside <main>.
      gsap.fromTo(
        el,
        { top: OFFSET, opacity: 0 },
        {
          top: 0,
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
          overwrite: true,
          clearProps: "top,opacity",
          onComplete: () => {
            transitioning.current = false;
            ScrollTrigger.refresh();
          },
        },
      );
    });
    // A failed or very slow asset must never leave the page permanently hidden.
    const timeout = setTimeout(reveal, MAX_IMAGE_WAIT);
    const frame = requestAnimationFrame(() => {
      void waitForVisibleImages(el, controller.signal).then(reveal);
    });

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
      controller.abort();
    };
  }, { scope: ref, dependencies: [pathname], revertOnUpdate: true });

  useEffect(() => {
    let exitTween: gsap.core.Tween | undefined;
    function navigate(href: string) {
      const el = ref.current;
      if (!el || transitioning.current) return;
      transitioning.current = true;
      router.prefetch(href);

      exitTween = gsap.to(el, {
        top: `-${OFFSET}`,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        overwrite: true,
        onComplete: () => router.push(href),
      });
    }

    pageTransitionRef.current = navigate;

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
      exitTween?.kill();
      document.removeEventListener("click", onClick, true);
      pageTransitionRef.current = null;
    };
  }, [router]);

  return (
    <div ref={ref} id="page-transition" className="relative">
      {children}
    </div>
  );
}
