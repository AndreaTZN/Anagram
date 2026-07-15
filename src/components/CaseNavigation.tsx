"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useCaseNav } from "@/contexts/CaseNavContext";

export default function CaseNavigation() {
  const { data, activeTab, setActiveTab } = useCaseNav();
  const [activeSection, setActiveSection] = useState<string>("");
  const activeSectionRef = useRef<string>("");
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const navRef = useRef<HTMLElement>(null);
  const tabReleaseRef = useRef<HTMLButtonElement>(null);
  const tabBackstageRef = useRef<HTMLButtonElement>(null);
  const closeIconRef = useRef<SVGSVGElement>(null);
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
      gsap.to(sectionDescs, { color: "#7e7e7e", duration, ease: "power2.inOut" });
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
      gsap.to(prevEl, { height: 0, opacity: 0, duration: 0.5, ease: "power3.out" });
    }

    if (nextEl) {
      const nextText = nextEl.querySelector("p");
      gsap.set(nextEl, { height: 0, opacity: 0 });
      gsap.to(nextEl, { height: "auto", opacity: 1, duration: 0.65, ease: "power4.out" });
      if (nextText) {
        gsap.fromTo(nextText, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.65, ease: "power4.out" });
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
        className="flex flex-col gap-10 pl-4 pr-2 pt-6 pb-8"
      >
        <Link
          id="case-nav-close"
          href="/works"
          className="flex items-center gap-2 opacity-50 w-fit"
          onMouseEnter={() =>
            gsap.to(closeIconRef.current, {
              rotation: 90,
              duration: 0.3,
              ease: "power2.out",
            })
          }
          onMouseLeave={() =>
            gsap.to(closeIconRef.current, {
              rotation: 0,
              duration: 0.3,
              ease: "power2.inOut",
            })
          }
        >
          <svg
            ref={closeIconRef}
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L9 9M9 1L1 9"
              stroke="#0C0C0C"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[#0c0c0c] text-sm leading-[0.9] tracking-[-0.07px]">
            Close project
          </span>
        </Link>

        {data && (
          <div id="case-nav-content" className="flex flex-col gap-10">
            <div id="case-nav-header" className="flex flex-col gap-4">
              <h1
                id="case-nav-title"
                className="text-[#0c0c0c] text-xl leading-[1.1] tracking-[-0.1px]"
              >
                {data.title}
              </h1>
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
                  className="text-[#0c0c0c] text-sm leading-[0.9] tracking-[-0.07px] w-fit"
                >
                  See it live
                </a>
              )}
            </div>

            {(data.release && data.backstage) && (
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
                      className={`cursor-pointer text-[1.125rem] font-normal leading-[1.1] tracking-[-0.09px] text-[#0c0c0c] transition-opacity duration-200 ${
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
