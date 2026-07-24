"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { globalLenisRef } from "@/lib/lenis";
import { navWorks } from "@/lib/nav-works";

gsap.registerPlugin(useGSAP);

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Works", href: "/works" },
  { label: "Studio", href: "/about" },
  { label: "Lab", href: "/lab" },
  { label: "Store", href: "/store" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const isCasePage = /^\/works\/.+/.test(pathname);

  // The nav unmounts on case pages, so the timeline must be rebuilt on the
  // fresh menu element every time it reappears.
  useGSAP(
    () => {
      tl.current = null;
      setOpen(false);
      if (!menuRef.current) return;
      gsap.set(menuRef.current, { y: -16, opacity: 0, pointerEvents: "none" });

      tl.current = gsap.timeline({ paused: true }).to(menuRef.current, {
        y: 0,
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.4,
        ease: "power3.out",
      });
    },
    { dependencies: [isCasePage] },
  );

  function lockBody(lock: boolean) {
    document.body.style.position = lock ? "fixed" : "";
    document.body.style.inset = lock ? "0" : "";
  }

  function playVideos() {
    menuRef.current?.querySelectorAll("video").forEach((video) => {
      video.play().catch(() => {});
    });
  }

  function resetVideos() {
    menuRef.current?.querySelectorAll("video").forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });
  }

  function resetMenuScroll() {
    if (menuRef.current) menuRef.current.scrollTop = 0;
  }

  function toggle() {
    if (!tl.current) return;
    if (!open) {
      resetMenuScroll();
      tl.current.play();
      globalLenisRef.current?.stop();
      lockBody(true);
      playVideos();
    } else {
      tl.current.reverse();
      globalLenisRef.current?.start();
      lockBody(false);
      resetVideos();
    }
    setOpen((v) => !v);
  }

  function close() {
    if (!open) return;
    tl.current?.reverse();
    globalLenisRef.current?.start();
    lockBody(false);
    resetVideos();
    setOpen(false);
  }

  if (isCasePage) return null;

  return (
    <div
      id="mobile-nav"
      className="absolute top-0 left-0 z-50 max-[992px]:flex hidden items-center justify-between px-4 py-3 w-full"
    >
      {/* Logo */}
      <Link href="/" onClick={close} className="relative z-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="93"
          fill="none"
          viewBox="0 0 102 18"
          aria-label="Anagram"
        >
          <path
            fill="#0C0C0C"
            d="M0 6.23c0 3.39 2.442 6.232 5.626 6.232 1.652 0 2.921-.836 3.448-1.6V12.2h3.28V.263h-3.28V1.6C8.547.835 7.278 0 5.626 0 2.442 0 0 2.84 0 6.23Zm9.337 0c0 1.863-1.221 3.248-3.017 3.248-1.795 0-3.016-1.385-3.016-3.247 0-1.862 1.22-3.247 3.016-3.247S9.337 4.37 9.337 6.231Zm6.205 5.97h3.28V6.373c0-2.292 1.15-3.39 2.658-3.39 1.364 0 2.106 1.05 2.106 2.77v6.445h3.28V5.204c0-3.103-1.723-5.204-4.62-5.204-1.556 0-2.801.668-3.424 1.623V.263h-3.28v11.936Zm13.566-5.97c0 3.39 2.442 6.232 5.626 6.232 1.652 0 2.92-.836 3.448-1.6V12.2h3.28V.263h-3.28V1.6C37.655.835 36.386 0 34.734 0c-3.184 0-5.626 2.84-5.626 6.23Zm9.337 0c0 1.863-1.221 3.248-3.017 3.248-1.795 0-3.016-1.385-3.016-3.247 0-1.862 1.22-3.247 3.016-3.247s3.017 1.385 3.017 3.247Zm5.965 6.71c.216 2.554 2.443 4.487 5.842 4.487 3.113 0 6.034-1.647 6.034-5.968V.263h-3.28V1.6C52.407.691 51.09 0 49.558 0c-3.112 0-5.65 2.674-5.65 6.04 0 3.342 2.538 6.016 5.65 6.016 1.532 0 2.85-.692 3.448-1.576v1.409c0 1.886-1.245 2.817-2.682 2.817-1.364 0-2.298-.55-2.729-1.767h-3.184Zm8.859-6.9c0 1.814-1.365 3.056-3.017 3.056s-3.04-1.242-3.04-3.056c0-1.838 1.388-3.056 3.04-3.056 1.652 0 3.017 1.218 3.017 3.056Zm6.204 6.16h3.28V6.493c0-1.958 1.03-3.176 2.586-3.176.526 0 .981.096 1.484.263V.263a3.776 3.776 0 0 0-1.101-.144c-1.341 0-2.562.884-2.969 2.053V.262h-3.28V12.2Zm8.282-5.97c0 3.39 2.442 6.232 5.626 6.232 1.652 0 2.921-.836 3.448-1.6V12.2h3.28V.263h-3.28V1.6C76.302.835 75.033 0 73.38 0c-3.184 0-5.626 2.84-5.626 6.23Zm9.337 0c0 1.863-1.221 3.248-3.017 3.248-1.795 0-3.016-1.385-3.016-3.247 0-1.862 1.22-3.247 3.016-3.247s3.017 1.385 3.017 3.247Zm6.205 5.97h3.28V6.373c0-2.292.982-3.39 2.394-3.39 1.293 0 1.868 1.074 1.868 2.841V12.2h3.28V6.374c0-2.292.981-3.39 2.394-3.39 1.292 0 1.867 1.074 1.867 2.841V12.2h3.28V5.276c0-3.223-1.628-5.276-4.477-5.276-1.365 0-2.969.716-3.71 2.196C92.752.812 91.508 0 89.76 0c-1.46 0-2.537.692-3.184 1.623V.263h-3.28v11.936Z"
          />
        </svg>
      </Link>

      {/* Menu button */}
      <button
        onClick={toggle}
        className="relative z-50 flex items-center gap-2 rounded-full px-4 py-3 cursor-pointer bg-[#0c0c0c]"
      >
        <span className="text-base leading-[0.9] tracking-[-0.08px] text-white">
          {open ? "Close" : "Menu"}
        </span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="#ffffff"
        >
          {open ? (
            <>
              <line
                x1="1"
                y1="1"
                x2="9"
                y2="9"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="9"
                y1="1"
                x2="1"
                y2="9"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </>
          ) : (
            <>
              <line
                x1="0"
                y1="3"
                x2="10"
                y2="3"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="0"
                y1="7"
                x2="10"
                y2="7"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </>
          )}
        </svg>
      </button>

      {/* Fullscreen menu */}
      <div
        id="mobile-nav-menu"
        ref={menuRef}
        className="fixed inset-0 z-40 bg-white flex flex-col gap-6 px-4 pt-20 pb-6 overflow-y-auto overscroll-none opacity-0 pointer-events-none"
      >
        <p className="text-[#0c0c0c] leading-[1.1] text-xl tracking-[-0.1px]">
          We shape brands that need no introduction.
        </p>

        <div id="mobile-nav-links" className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="text-[#0c0c0c] font-medium leading-[0.8] text-[2rem]"
                style={{ opacity: isActive ? 1 : 0.3 }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <a
          href="mailto:hello@anagram.club"
          className="flex items-center bg-[#f5f5f5] rounded-full px-4 py-3 self-start"
        >
          <span className="text-[#0c0c0c] leading-[0.9] text-base tracking-[-0.08px]">
            hello@anagram.club
          </span>
        </a>

        <div id="mobile-nav-works" className="flex flex-col gap-2 pb-6">
          {navWorks.map((work) => (
            <Link key={work.name} href={work.href} onClick={close}>
              <div className="flex items-center gap-4 p-2 bg-[#f9f9f9] rounded-sm">
                <div className="relative shrink-0 overflow-hidden w-32.5 h-20">
                  <video
                    src={work.video}
                    poster={work.poster}
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[#7c7c7c] text-sm leading-[0.9]">
                    {work.category}
                  </span>
                  <span className="text-[#0c0c0c] text-base leading-[0.9] font-medium">
                    {work.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
