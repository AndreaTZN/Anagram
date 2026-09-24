"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollLockRef } from "@/lib/lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type CaseSection = {
  id: string;
  label: string;
  description: string;
};

export type CaseTab = {
  sections?: CaseSection[];
};

export type CaseNavData = {
  title: string;
  description: string;
  liveUrl?: string;
  release?: CaseTab;
  backstage?: CaseTab;
};

type CaseTabName = "release" | "backstage";
type CaseTransition =
  | { type: "tab"; tab: CaseTabName }
  | { type: "exit"; fromPathname: string; navigate: () => void };

type CaseNavContextType = {
  data: CaseNavData | null;
  setData: (data: CaseNavData | null) => void;
  activeTab: CaseTabName;
  setActiveTab: (tab: CaseTabName, options?: { immediate: boolean }) => void;
  transitionCaseExit: (navigate: (skipExitAnimation: boolean) => void) => void;
  isTabTransitioning: boolean;
};

const CaseNavContext = createContext<CaseNavContextType>({
  data: null,
  setData: () => {},
  activeTab: "release",
  setActiveTab: () => {},
  transitionCaseExit: (navigate) => navigate(false),
  isTabTransitioning: false,
});

// Derived here rather than passed from the root layout: reading the pathname
// from headers() there made every route in the app dynamically rendered.
export function CaseNavProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [data, setData] = useState<CaseNavData | null>(() =>
    /^\/works\/.+/.test(pathname) ? ({} as CaseNavData) : null,
  );
  const [activeTab, setCurrentTab] = useState<CaseTabName>("release");
  const [transition, setTransition] = useState<CaseTransition | null>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const transitionRef = useRef<CaseTransition | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const focusRef = useRef<HTMLElement | null>(null);

  const finishTransition = useCallback(() => {
    transitionRef.current = null;
    setTransition(null);
  }, []);

  useGSAP(
    (context) => {
      const veil = veilRef.current;
      const caption = captionRef.current;
      if (!veil || !caption || !transition) return;

      const dark = transition.type === "tab" && transition.tab === "backstage";
      const previousLock = scrollLockRef.current;
      const focusedElement = focusRef.current;
      scrollLockRef.current = true;
      gsap.set(veil, {
        yPercent: 100,
        visibility: "visible",
        backgroundColor: dark ? "#0c0c0c" : "#ffffff",
      });
      gsap.set(caption, {
        opacity: 0,
        y: "0.5rem",
        color: dark ? "rgba(255, 255, 255, 0.7)" : "rgba(12, 12, 12, 0.65)",
      });

      const timeline = gsap.timeline({
        paused: true,
        onComplete: () => {
          finishTransition();
          ScrollTrigger.refresh();
        },
      });
      timelineRef.current = timeline;
      timeline.to(veil, {
        yPercent: 0,
        duration: 0.6,
        ease: "power3.inOut",
      });
      timeline.to(caption, {
        opacity: 1,
        y: "0rem",
        duration: 0.25,
        ease: "power2.out",
      });

      if (transition.type === "tab") {
        timeline.call(() => {
          // Swap under cover, keeping theme tweens outside this transition's cleanup.
          context.ignore(() => flushSync(() => setCurrentTab(transition.tab)));
        });
      } else {
        // Keep the page covered until Next commits the destination route.
        timeline.addPause(">", () => context.ignore(transition.navigate));
      }

      // Leave time to read the caption and finish the 0.5s background transition.
      timeline.to(
        caption,
        {
          opacity: 0,
          y: "-0.25rem",
          duration: 0.2,
          ease: "power2.in",
        },
        "+=0.55",
      );
      timeline.to(
        veil,
        { yPercent: -100, duration: 0.6, ease: "power3.inOut" },
        "<",
      );
      timeline.play();

      return () => {
        scrollLockRef.current = previousLock;
        timelineRef.current = null;
        if (transition.type === "tab" && focusedElement?.isConnected) {
          focusedElement.focus({ preventScroll: true });
        }
      };
    },
    {
      scope: veilRef,
      dependencies: [transition],
      revertOnUpdate: true,
    },
  );

  useLayoutEffect(() => {
    const pending = transitionRef.current;
    if (pending?.type !== "exit" || pathname === pending.fromPathname) return;

    if (timelineRef.current?.paused()) {
      timelineRef.current.play();
    } else {
      // Back/forward navigation during the rise cancels the pending close action.
      finishTransition();
    }
  }, [pathname, finishTransition]);

  const startTransition = useCallback((next: CaseTransition) => {
    if (transitionRef.current) return;

    focusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    transitionRef.current = next;
    setTransition(next);
  }, []);

  const setActiveTab = useCallback(
    (tab: CaseTabName, options?: { immediate: boolean }) => {
      if (options?.immediate) {
        // Route resets must preserve the veil while a close navigation is pending.
        if (transitionRef.current?.type !== "exit") finishTransition();
        setCurrentTab(tab);
        return;
      }

      if (transitionRef.current || tab === activeTab || !data?.[tab]) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setCurrentTab(tab);
        return;
      }

      startTransition({ type: "tab", tab });
    },
    [activeTab, data, finishTransition, startTransition],
  );

  const transitionCaseExit = useCallback(
    (navigate: (skipExitAnimation: boolean) => void) => {
      if (transitionRef.current) return;

      if (
        activeTab !== "backstage" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        navigate(false);
        return;
      }

      startTransition({
        type: "exit",
        fromPathname: pathname,
        navigate: () => navigate(true),
      });
    },
    [activeTab, pathname, startTransition],
  );

  return (
    <CaseNavContext.Provider
      value={{
        data,
        setData,
        activeTab,
        setActiveTab,
        transitionCaseExit,
        isTabTransitioning: transition !== null,
      }}
    >
      {children}
      <div
        id="case-tab-transition"
        ref={veilRef}
        aria-hidden="true"
        className="pointer-events-none invisible fixed inset-0 z-10000 grid place-items-center overflow-hidden bg-[#0c0c0c] px-6"
      >
        <p
          id="case-tab-transition-caption"
          ref={captionRef}
          className="text-center text-sm font-medium leading-[1.3] text-white opacity-0"
        >
          {transition?.type === "tab" && transition.tab === "backstage"
            ? "Our old site wore black."
            : "Back to the light."}
        </p>
      </div>
    </CaseNavContext.Provider>
  );
}

export function useCaseNav() {
  return useContext(CaseNavContext);
}
