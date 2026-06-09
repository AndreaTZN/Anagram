"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import WorldClock from "./WorldClock";
import PhotoCarouselWidget from "./PhotoCarouselWidget";
import ClockWidget from "./ClockWidget";
import { globalLenisRef } from "@/lib/lenis";

gsap.registerPlugin(useGSAP);

export default function WidgetPanel() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const verticalPathRef = useRef<SVGPathElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const widgetsRef = useRef<HTMLDivElement[]>([]);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    if (!buttonRef.current || !overlayRef.current || !panelRef.current) return;

    gsap.set(buttonRef.current, { opacity: 0 });
    gsap.set(overlayRef.current, { opacity: 0, pointerEvents: "none" });
    gsap.set(panelRef.current, { opacity: 0, y: -16, scale: 0.96 });
    gsap.set(widgetsRef.current, { opacity: 0, y: 20 });

    gsap.to(buttonRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.3,
    });

    tl.current = gsap
      .timeline({ paused: true })
      .to(buttonRef.current, {
        width: "36.1875rem",
        duration: 0.5,
        ease: "power3.out",
      })
      .to(
        verticalPathRef.current,
        { opacity: 0, duration: 0.2, ease: "power2.out" },
        "<",
      )
      .to(
        overlayRef.current,
        {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.4,
          ease: "power2.out",
        },
        "<0.1",
      )
      .to(
        panelRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" },
        "<0.05",
      )
      .to(
        widgetsRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.06 },
        "<0.15",
      );
  }, []);

  function toggle() {
    if (!tl.current) return;
    if (!open) {
      tl.current.play();
      globalLenisRef.current?.stop();
    } else {
      tl.current.reverse();
      globalLenisRef.current?.start();
    }
    setOpen((v) => !v);
  }

  function addWidget(el: HTMLDivElement | null, i: number) {
    if (el) widgetsRef.current[i] = el;
  }

  return (
    <>
      {/* CTA Button */}
      <button
        ref={buttonRef}
        onClick={toggle}
        className="absolute top-12 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-12 px-4 py-4 rounded-full backdrop-blur-2xl bg-[rgba(12,12,12,0.2)] cursor-pointer overflow-hidden opacity-0"
      >
        <div className="flex items-center gap-1.5">
          <WorldClock />
        </div>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M0 7.50293C0 7.08872 0.335786 6.75293 0.75 6.75293L14.25 6.75293C14.6642 6.75293 15 7.08872 15 7.50293C15 7.91714 14.6642 8.25293 14.25 8.25293H0.75C0.335787 8.25293 0 7.91714 0 7.50293Z"
            fill="white"
          />
          <path
            ref={verticalPathRef}
            d="M7.51172 0C7.92593 1.81058e-08 8.26172 0.335786 8.26172 0.75L8.26172 14.25C8.26172 14.6642 7.92593 15 7.51172 15C7.0975 15 6.76172 14.6642 6.76172 14.25L6.76172 0.75C6.76172 0.335787 7.09751 -1.81058e-08 7.51172 0Z"
            fill="white"
          />
        </svg>
      </button>

      {/* Overlay + Panel */}
      <div
        ref={overlayRef}
        className="absolute -inset-6 z-20 backdrop-blur-2xl bg-[rgba(12,12,12,0.15)] opacity-0 pointer-events-none"
        onClick={toggle}
      />

      <div
        ref={panelRef}
        className="absolute z-20 top-32 left-1/2 -translate-x-1/2 w-188 pointer-events-none opacity-0"
        onClick={(e) => e.stopPropagation()}
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        {/* Widgets grid */}
        <div className="flex gap-4">
          <div ref={(el) => addWidget(el, 0)} className="">
            <PhotoCarouselWidget />
          </div>
          <div ref={(el) => addWidget(el, 1)} className="shrink-0">
            <ClockWidget />
          </div>
        </div>
      </div>
    </>
  );
}
