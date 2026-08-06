"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import WidgetToggleButton from "./WidgetToggleButton";
import PhotoCarouselWidget from "./PhotoCarouselWidget";
import ClockWidget from "./ClockWidget";
import MusicWidget from "./MusicWidget";
import RolesStackWidget from "./RolesStackWidget";
import type { OpenRole } from "../OpenRoles";
import { scrollLockRef } from "@/lib/lenis";

gsap.registerPlugin(useGSAP);

export default function WidgetPanel({ openRoles }: { openRoles: OpenRole[] }) {
  const [open, setOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
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
      .timeline({ paused: true, defaults: { ease: "power2.out" } })
      // width drives layout, so a bouncy ease here would reflow on every
      // oscillation — a light back.out gives the stretch without the cost.
      .to(buttonRef.current, {
        width: "36.1875rem",
        duration: 0.65,
        ease: "back.out(1.4)",
      })
      .to(
        verticalPathRef.current,
        { rotate: 90, duration: 0.5, ease: "back.out(2)" },
        "<",
      )
      .to(overlayRef.current, { opacity: 1, duration: 0.5 }, "<0.05")
      .to(
        panelRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
        },
        "<0.05",
      )
      .to(
        widgetsRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.06 },

        "<0.12",
      );
  }, []);

  function toggle() {
    if (!tl.current) return;
    // pointerEvents isn't interpolatable, so it's set outright rather than
    // tweened — the overlay must stop catching clicks the moment we close.
    gsap.set(overlayRef.current, { pointerEvents: open ? "none" : "auto" });
    if (!open) {
      // invalidate() drops the cached start width so the tween re-reads the
      // button's current size — it differs depending on whether the vinyl is in.
      tl.current.invalidate().timeScale(1).play();
      scrollLockRef.current = true;
    } else {
      // Played backwards, the elastic overshoot reads as sluggish — closing
      // runs faster so the panel snaps away instead of wobbling out.
      tl.current.timeScale(1.8).reverse();
      // Reverse restores the width measured when the timeline was built, which
      // predates the vinyl. Clearing it lets the button size to its content.
      tl.current.eventCallback("onReverseComplete", () => {
        gsap.set(buttonRef.current, { clearProps: "width" });
      });
      scrollLockRef.current = false;
    }
    setOpen((v) => !v);
  }

  function addWidget(el: HTMLDivElement | null, i: number) {
    if (el) widgetsRef.current[i] = el;
  }

  return (
    <div
      id="home-widgets-layer"
      className="fixed inset-y-0 right-0 left-(--nav-w) z-50 pointer-events-none max-[62rem]:hidden"
    >
      {/* CTA Button */}
      <WidgetToggleButton
        buttonRef={buttonRef}
        verticalPathRef={verticalPathRef}
        onClick={toggle}
        showVinyl={musicPlaying && !open}
      />

      {/* Overlay + Panel */}
      <div
        ref={overlayRef}
        id="home-widgets-overlay"
        className="absolute inset-0 z-20 backdrop-blur-2xl bg-[rgba(12,12,12,0.15)] opacity-0 pointer-events-none"
        onClick={toggle}
      />

      <div
        ref={panelRef}
        id="home-widgets-panel"
        // Swiper (effect-fade) force `pointer-events: auto` sur sa slide active,
        // ce qui perce le pointer-events:none du panel fermé. On neutralise tous
        // les descendants tant que le widget est fermé.
        className={`absolute z-20 top-32 left-1/2 -translate-x-1/2 w-188 opacity-0 ${
          open ? "" : "**:pointer-events-none!"
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        {/* Widgets grid */}
        <div className="flex justify-center items-start gap-4">
          <div
            ref={(el) => addWidget(el, 0)}
            className="flex flex-col gap-4 w-31 shrink-0"
          >
            <MusicWidget onPlayingChange={setMusicPlaying} />
          </div>
          <div className="flex flex-col gap-4">
            <div ref={(el) => addWidget(el, 1)}>
              <PhotoCarouselWidget active={open} />
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
    </div>
  );
}
