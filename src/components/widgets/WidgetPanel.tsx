"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import WidgetToggleButton from "./WidgetToggleButton";
import PhotoCarouselWidget from "./PhotoCarouselWidget";
import ClockWidget from "./ClockWidget";
import VisitorsWidget from "./VisitorsWidget";
import MusicWidget from "./MusicWidget";
import RolesStackWidget from "./RolesStackWidget";
import type { OpenRole } from "../OpenRoles";
import { globalLenisRef } from "@/lib/lenis";

gsap.registerPlugin(useGSAP);

export default function WidgetPanel({ openRoles }: { openRoles: OpenRole[] }) {
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
    gsap.set(verticalPathRef.current, {
      transformOrigin: "50% 50%",
      rotate: 0,
    });

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
        { rotate: 90, duration: 0.4, ease: "power2.out" },
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
      <WidgetToggleButton
        buttonRef={buttonRef}
        verticalPathRef={verticalPathRef}
        onClick={toggle}
      />

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
        <div className="flex justify-center items-start gap-4">
          <div
            ref={(el) => addWidget(el, 0)}
            className="flex flex-col gap-4 w-31 shrink-0"
          >
            <MusicWidget />
            <div className="h-40 shrink-0">
              <VisitorsWidget />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div ref={(el) => addWidget(el, 1)}>
              <PhotoCarouselWidget />
            </div>
            <div ref={(el) => addWidget(el, 3)}>
              <RolesStackWidget roles={openRoles} />
            </div>
          </div>
          <div ref={(el) => addWidget(el, 2)} className="shrink-0">
            <ClockWidget />
          </div>
        </div>
      </div>
    </>
  );
}
