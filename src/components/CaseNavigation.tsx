"use client";

import Link from "next/link";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useCaseNav } from "@/contexts/CaseNavContext";
import { getCaseOrigin } from "@/lib/case-origin";
import { transitionTo } from "@/lib/page-transition";
import ArrowWebGL, {
  type ArrowWebGLHandle,
} from "@/components/icons/ArrowWebGL";
import CloseWebGL, {
  type CloseWebGLHandle,
} from "@/components/icons/CloseWebGL";

gsap.registerPlugin(useGSAP);

export default function CaseNavigation() {
  const { data, activeTab, setActiveTab } = useCaseNav();
  const [activeSection, setActiveSection] = useState<string>("");
  const activeSectionRef = useRef<string>("");
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const sectionIconRefs = useRef<Record<string, HTMLImageElement | null>>({});

  const navRef = useRef<HTMLElement>(null);
  const tabReleaseRef = useRef<HTMLButtonElement>(null);
  const tabBackstageRef = useRef<HTMLButtonElement>(null);
  const closeIconRef = useRef<CloseWebGLHandle>(null);
  const liveArrowRef = useRef<ArrowWebGLHandle>(null);
  const isFirstTheme = useRef(true);

  const sections = data?.[activeTab]?.sections;

  const { contextSafe } = useGSAP(
    () => {
      const firstId = sections?.[0]?.id ?? "";
      activeSectionRef.current = firstId;
      setActiveSection(firstId);

      // Initialize on tab changes, not in ref callbacks that rerun on every click.
      sections?.forEach((section, index) => {
        const open = index === 0;
        const panel = contentRefs.current[section.id];
        const icon = sectionIconRefs.current[section.id];
        if (panel) {
          gsap.set(panel, { height: open ? "auto" : 0, opacity: open ? 1 : 0 });
          const text = panel.querySelector("p");
          if (text)
            gsap.set(text, {
              opacity: open ? 1 : 0,
              y: open ? "0rem" : "0.375rem",
            });
        }
        if (icon) {
          const scale = open ? 1.1 : 1;
          const background = icon.parentElement?.querySelector<HTMLElement>(
            "[data-section-indicator-background]",
          );
          if (background) gsap.set(background, { scale });
          gsap.set(icon, { rotation: open ? 45 : 0 });
        }
      });
    },
    { scope: navRef, dependencies: [data, activeTab], revertOnUpdate: true },
  );

  // Dark / light theme animation
  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const dark = activeTab === "backstage";
    const duration = isFirstTheme.current ? 0 : 0.5;
    isFirstTheme.current = false;

    const textColor = dark ? "#ffffff" : "#0c0c0c";
    const navBg = dark ? "#0c0c0c" : "#ffffff";

    gsap.to(nav, { backgroundColor: navBg, duration, ease: "power2.inOut" });
    gsap.to(nav.querySelectorAll("span, p, h1, a, button"), {
      color: textColor,
      duration,
      ease: "power2.inOut",
    });
    const sectionDescs = Array.from(nav.querySelectorAll(".section-desc"));
    if (sectionDescs.length > 0) {
      gsap.to(sectionDescs, {
        color: "#7e7e7e",
        duration,
        ease: "power2.inOut",
      });
    }
    gsap.to(nav.querySelectorAll("path"), {
      attr: { stroke: textColor },
      duration,
      ease: "power2.inOut",
    });

    // Tab buttons — Release is active in light, Backstage is active in dark
    if (tabReleaseRef.current) {
      gsap.to(tabReleaseRef.current, {
        backgroundColor: dark ? "#161616" : "#0c0c0c",
        color: "#ffffff",
        duration,
        ease: "power2.inOut",
      });
    }
    if (tabBackstageRef.current) {
      gsap.to(tabBackstageRef.current, {
        backgroundColor: dark ? "#ffffff" : "#f5f5f5",
        color: dark ? "#0c0c0c" : "#0c0c0c",
        duration,
        ease: "power2.inOut",
      });
    }
  }, [activeTab]);

  const handleSectionClick = contextSafe((id: string) => {
    const nextId = id === activeSectionRef.current ? "" : id;
    const prevEl = contentRefs.current[activeSectionRef.current];
    const nextEl = contentRefs.current[nextId];
    const prevIcon = sectionIconRefs.current[activeSectionRef.current];
    const nextIcon = sectionIconRefs.current[nextId];
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prevEl) {
      gsap.set(prevEl, { height: prevEl.getBoundingClientRect().height });
      const prevText = prevEl.querySelector("p");
      if (prevText)
        gsap.to(prevText, {
          opacity: 0,
          y: "0.375rem",
          duration: reduceMotion ? 0 : 0.2,
          overwrite: true,
        });
      gsap.to(prevEl, {
        height: 0,
        opacity: 0,
        duration: reduceMotion ? 0 : 0.5,
        ease: "power3.out",
        overwrite: true,
      });
    }

    if (nextEl) {
      const nextText = nextEl.querySelector("p");
      gsap.to(nextEl, {
        height: "auto",
        opacity: 1,
        duration: reduceMotion ? 0 : 0.65,
        ease: "power4.out",
        overwrite: true,
      });
      if (nextText) {
        gsap.to(nextText, {
          opacity: 1,
          y: "0rem",
          duration: reduceMotion ? 0 : 0.65,
          ease: "power4.out",
          overwrite: true,
        });
      }
    }

    [
      { icon: prevIcon, open: false },
      { icon: nextIcon, open: true },
    ].forEach(({ icon, open }) => {
      const background = icon?.parentElement?.querySelector<HTMLElement>(
        "[data-section-indicator-background]",
      );
      if (!icon || !background) return;

      const scale = open ? 1.1 : 1;
      gsap.killTweensOf(background, "scaleX,scaleY");
      gsap.killTweensOf(icon, "rotation");

      if (reduceMotion) {
        gsap.set(background, { scale });
        gsap.set(icon, { rotation: open ? 45 : 0 });
        return;
      }

      // Keep the background's asymmetric bounce from stretching the rotating icon.
      gsap
        .timeline()
        .to(
          background,
          { scaleX: scale, duration: 0.55, ease: "elastic.out(1, 0.5)" },
          0,
        )
        .to(
          background,
          { scaleY: scale, duration: 0.55, ease: "back.out(1.4)" },
          0.05,
        )
        .to(
          icon,
          { rotation: open ? 45 : 0, duration: 0.25, ease: "power2.inOut" },
          0,
        );
    });

    activeSectionRef.current = nextId;
    setActiveSection(nextId);
  });

  return (
    <nav
      ref={navRef}
      id="case-nav"
      className="relative flex flex-col bg-white h-dvh max-h-screen overflow-y-auto scrollbar-none"
    >
      <div
        id="case-nav-inner"
        className="flex flex-col gap-8 pl-4 pr-2 pt-6 pb-8"
      >
        <Link
          id="case-nav-close"
          href="/works"
          aria-label="Close project"
          className="grid place-items-center size-9.5 rounded-full bg-[#f7f7f7] hover:bg-[#ededed] transition-colors duration-500"
          data-transition="manual"
          onClick={(e) => {
            e.preventDefault();
            transitionTo(getCaseOrigin());
          }}
          onMouseEnter={() => closeIconRef.current?.play()}
          onFocus={() => closeIconRef.current?.play()}
        >
          <CloseWebGL ref={closeIconRef} className="block size-3" />
        </Link>

        {data && (
          <div id="case-nav-content" className="flex flex-col gap-10">
            <div id="case-nav-header" className="flex flex-col gap-4">
              <p
                id="case-nav-title"
                className="text-[#0c0c0c] text-xl leading-[1.1] tracking-[-0.1px]"
              >
                {data.title}
              </p>
              <p
                id="case-nav-description"
                className="text-[#0c0c0c] text-sm leading-[1.3]"
              >
                {data.description}
              </p>
              {data.liveUrl && (
                <a
                  id="case-nav-live"
                  href={data.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => liveArrowRef.current?.play()}
                  onFocus={() => liveArrowRef.current?.play()}
                  className="flex items-center gap-2 text-[#0c0c0c] text-sm font-medium leading-[0.9] tracking-[-0.07px] w-fit"
                >
                  See it live
                  <ArrowWebGL
                    ref={liveArrowRef}
                    light={activeTab === "backstage"}
                    className="block size-3.5 shrink-0"
                  />
                </a>
              )}
            </div>

            {data.release && data.backstage && (
              <div id="case-nav-tabs" className="flex gap-2">
                {data.release && (
                  <button
                    ref={tabReleaseRef}
                    id="case-nav-tab-release"
                    onClick={() => setActiveTab("release")}
                    className="cursor-pointer px-4 py-4 rounded-full text-sm font-medium leading-[0.9] bg-[#0c0c0c] text-white"
                  >
                    Release
                  </button>
                )}
                {data.backstage && (
                  <button
                    ref={tabBackstageRef}
                    id="case-nav-tab-backstage"
                    onClick={() => setActiveTab("backstage")}
                    className="cursor-pointer px-4 py-4 rounded-full text-sm font-medium leading-[0.9] bg-[#f5f5f5] text-[#0c0c0c]"
                  >
                    Backstage
                  </button>
                )}
              </div>
            )}

            {sections && sections.length > 0 && (
              <div id="case-nav-sections" className="flex flex-col gap-6">
                {sections.map((section, i) => (
                  <div id={`case-nav-section-${section.id}`} key={section.id}>
                    <button
                      id={`case-nav-section-toggle-${activeTab}-${i}`}
                      type="button"
                      onClick={() => handleSectionClick(section.id)}
                      aria-expanded={activeSection === section.id}
                      aria-controls={`case-nav-section-panel-${activeTab}-${i}`}
                      className="flex w-full items-center justify-between gap-4 cursor-pointer text-left text-sm font-medium leading-[1.1] text-[#0c0c0c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
                    >
                      <span
                        className={
                          activeSection !== section.id
                            ? "opacity-30"
                            : undefined
                        }
                      >
                        {section.label}
                      </span>
                      <span
                        id={`case-nav-section-indicator-${activeTab}-${i}`}
                        aria-hidden="true"
                        className="relative inline-flex shrink-0 items-center px-4 py-3"
                      >
                        <span
                          id={`case-nav-section-indicator-${activeTab}-${i}-background`}
                          data-section-indicator-background
                          className="absolute inset-0 rounded-full bg-[#f5f5f5] backdrop-blur-[2.50625rem]"
                        />
                        <Image
                          ref={(el) => {
                            sectionIconRefs.current[section.id] = el;
                          }}
                          src="/icons/case-section-plus.svg"
                          alt=""
                          width={10}
                          height={10}
                          className="relative block size-[0.625rem]"
                        />
                      </span>
                    </button>
                    <div
                      id={`case-nav-section-panel-${activeTab}-${i}`}
                      ref={(el) => {
                        contentRefs.current[section.id] = el;
                      }}
                      role="region"
                      aria-labelledby={`case-nav-section-toggle-${activeTab}-${i}`}
                      aria-hidden={activeSection !== section.id}
                      inert={activeSection !== section.id}
                      className="overflow-hidden"
                    >
                      <p className="section-desc mt-2 text-[#7c7c7c] text-[0.875rem] leading-[1.3] whitespace-pre-line">
                        {section.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
