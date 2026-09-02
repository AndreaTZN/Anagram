"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useCaseNav } from "@/contexts/CaseNavContext";
import { getCaseOrigin } from "@/lib/case-origin";
import ArrowWebGL, {
  type ArrowWebGLHandle,
} from "@/components/icons/ArrowWebGL";
import CloseWebGL, {
  type CloseWebGLHandle,
} from "@/components/icons/CloseWebGL";

export default function CaseNavigation() {
  const router = useRouter();
  const { data, activeTab, setActiveTab } = useCaseNav();
  const [activeSection, setActiveSection] = useState<string>("");
  const activeSectionRef = useRef<string>("");
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const navRef = useRef<HTMLElement>(null);
  const tabReleaseRef = useRef<HTMLButtonElement>(null);
  const tabBackstageRef = useRef<HTMLButtonElement>(null);
  const closeIconRef = useRef<CloseWebGLHandle>(null);
  const liveArrowRef = useRef<ArrowWebGLHandle>(null);
  const isFirstTheme = useRef(true);

  const sections = data?.[activeTab]?.sections;

  // Sections dropdown reset on tab change
  useLayoutEffect(() => {
    if (!sections?.length) return;
    const firstId = sections[0].id;
    activeSectionRef.current = firstId;
    setActiveSection(firstId);
  }, [data, activeTab]);

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

  function handleSectionClick(id: string) {
    if (id === activeSectionRef.current) return;

    const prevEl = contentRefs.current[activeSectionRef.current];
    const nextEl = contentRefs.current[id];

    if (prevEl) {
      gsap.set(prevEl, { height: prevEl.scrollHeight });
      const prevText = prevEl.querySelector("p");
      if (prevText) gsap.set(prevText, { opacity: 0, y: 6 });
      gsap.to(prevEl, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    }

    if (nextEl) {
      const nextText = nextEl.querySelector("p");
      gsap.set(nextEl, { height: 0, opacity: 0 });
      gsap.to(nextEl, {
        height: "auto",
        opacity: 1,
        duration: 0.65,
        ease: "power4.out",
      });
      if (nextText) {
        gsap.fromTo(
          nextText,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.65, ease: "power4.out" },
        );
      }
    }

    activeSectionRef.current = id;
    setActiveSection(id);
  }

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
          onClick={(e) => {
            e.preventDefault();
            router.push(getCaseOrigin());
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
                      onClick={() => handleSectionClick(section.id)}
                      className={`cursor-pointer text-sm font-medium leading-[1.1]] text-[#0c0c0c] transition-opacity duration-200 ${
                        activeSection !== section.id ? "opacity-30" : ""
                      }`}
                    >
                      {section.label}
                    </button>
                    <div
                      ref={(el) => {
                        contentRefs.current[section.id] = el;
                        if (el && i !== 0) {
                          gsap.set(el, { height: 0, opacity: 0 });
                          const p = el.querySelector("p");
                          if (p) gsap.set(p, { opacity: 0, y: 6 });
                        }
                      }}
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
