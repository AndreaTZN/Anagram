"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { globalLenisRef } from "@/lib/lenis";
import AnalogClock from "./AnalogClock";

gsap.registerPlugin(useGSAP, Flip);

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Works", href: "/works" },
  { label: "Studio", href: "/about" },
  { label: "Lab", href: "/lab" },
  { label: "Store", href: "/store" },
];

const socials = [
  { label: "X", href: "https://x.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Linkedin", href: "https://linkedin.com" },
];

function getParisTime() {
  return new Date()
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Europe/Paris",
    })
    .replace(" ", "");
}

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const baseHomeRef = useRef<HTMLDivElement>(null);
  const baseSlotRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);

  useGSAP(() => {
    if (!menuRef.current) return;
    gsap.set(menuRef.current, { autoAlpha: 0, pointerEvents: "none" });
    gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: "none" });
  }, []);

  const FLIP = 0.5;

  function play(opening: boolean) {
    const menu = menuRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    const base = baseRef.current;
    if (!menu || !overlay || !content || !base || animating.current) return;

    animating.current = true;

    if (opening) {
      setTime(getParisTime());
      globalLenisRef.current?.stop();

      gsap.set(menu, { autoAlpha: 1, pointerEvents: "auto" });

      // Morph the shared base element from inside the button into the panel.
      const state = Flip.getState(base);
      baseSlotRef.current?.appendChild(base);
      Flip.from(state, { duration: FLIP, ease: "power3.inOut", scale: false });

      // Base background morphs from black pill to white rounded panel.
      gsap.to(base, {
        backgroundColor: "#ffffff",
        borderRadius: "1.25rem",
        duration: FLIP,
        ease: "power3.inOut",
      });

      gsap.to(overlay, {
        autoAlpha: 1,
        duration: 0.4,
        ease: "power2.out",
        onStart: () => gsap.set(overlay, { pointerEvents: "auto" }),
      });

      gsap.fromTo(
        content,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.3,
          delay: FLIP * 0.6,
          ease: "power2.out",
          onComplete: () => {
            animating.current = false;
          },
        },
      );
    } else {
      gsap.to(content, { autoAlpha: 0, duration: 0.2, ease: "power2.in" });
      gsap.to(overlay, {
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => gsap.set(overlay, { pointerEvents: "none" }),
      });

      // Morph the base back into the button.
      const state = Flip.getState(base);
      baseHomeRef.current?.appendChild(base);
      Flip.from(state, {
        duration: FLIP,
        ease: "power3.inOut",
        scale: false,
        onComplete: () => {
          gsap.set(menu, { autoAlpha: 0, pointerEvents: "none" });
          animating.current = false;
        },
      });

      gsap.to(base, {
        backgroundColor: "#0c0c0c",
        borderRadius: "9999px",
        duration: FLIP,
        ease: "power3.inOut",
      });

      globalLenisRef.current?.start();
    }
  }

  function toggle() {
    play(!open);
    setOpen((v) => !v);
  }

  function close() {
    if (!open) return;
    play(false);
    setOpen(false);
  }

  return (
    <div
      id="mobile-nav"
      className="absolute top-0 left-0 z-100 max-[992px]:flex hidden items-center justify-between px-4 py-3 w-full"
    >
      {/* Logo */}
      <Link href="/" onClick={close}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="93"
          fill="none"
          viewBox="0 0 102 18"
          aria-label="Anagram"
          className="relative z-100"
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
        className="flex items-center gap-2 bg-[#0c0c0c] rounded-full px-4 py-3 cursor-pointer relative z-100"
      >
        {/* Shared morphing base — lives here, reparents into the panel on open */}
        <div
          ref={baseHomeRef}
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        >
          <div
            ref={baseRef}
            id="mobile-nav-base"
            className="absolute inset-0 bg-[#0c0c0c] rounded-full"
          />
        </div>
        <svg
          className="relative z-10"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
        >
          {open ? (
            <>
              <line
                x1="1"
                y1="1"
                x2="9"
                y2="9"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="9"
                y1="1"
                x2="1"
                y2="9"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </>
          ) : (
            <>
              <line
                x1="5"
                y1="0"
                x2="5"
                y2="10"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="0"
                y1="5"
                x2="10"
                y2="5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </>
          )}
        </svg>
        <span className="relative z-10 text-white text-base leading-[0.9] tracking-[-0.08px]">
          Menu
        </span>
      </button>

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={close}
        className="fixed inset-0 z-40 bg-[#F5F5F5]/50 backdrop-blur-sm opacity-0 pointer-events-none"
      />

      {/* Dropdown menu */}
      <div
        ref={menuRef}
        id="mobile-nav-panel"
        className="fixed top-3 right-4 z-50 w-62.5 opacity-0 pointer-events-none"
      >
        {/* Slot where the morphing base lands to become the panel background */}
        <div
          ref={baseSlotRef}
          className="absolute inset-0 pointer-events-none drop-shadow-[0_3.75rem_2.5rem_rgba(0,0,0,0.1)]"
          aria-hidden
        />
        <div
          ref={contentRef}
          className="relative z-10 flex flex-col gap-8 px-4 pt-16 pb-4"
        >
          {/* Nav links */}
          <div id="mobile-nav-links" className="flex flex-col gap-2">
            {navLinks
              .filter((link) => link.href !== "/")
              .map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="text-[#0c0c0c] font-medium leading-[0.8] text-[2rem] tracking-[-0.12px] transition-opacity"
                    style={{ opacity: isActive ? 1 : 0.3 }}
                  >
                    {link.label}
                  </Link>
                );
              })}
          </div>

          {/* Clock + location */}
          <div
            id="mobile-nav-clock"
            className="flex flex-col items-center gap-4 w-full"
          >
            <div className="size-28">
              <AnalogClock timezone="Europe/Paris" color="#8b7759" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-medium leading-[0.9] text-[#0c0c0c] opacity-50">
                PARIS
              </span>
              <span className="text-base font-medium leading-[0.9] text-[#0c0c0c]">
                CEST {time}
              </span>
            </div>
          </div>

          {/* Footer: dot divider + socials */}
          <div id="mobile-nav-footer" className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between w-full">
              {Array.from({ length: 32 }).map((_, i) => (
                <span
                  key={i}
                  className="size-0.75 rounded-full bg-[#0c0c0c] opacity-10 shrink-0"
                />
              ))}
            </div>
            <div className="flex flex-col">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-normal leading-[1.6] text-[#0c0c0c]"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
