"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import WidgetToggleButton from "./WidgetToggleButton";
import PhotoCarouselWidget from "./PhotoCarouselWidget";
import ClockWidget from "./ClockWidget";
import MusicWidget from "./MusicWidget";
import RolesStackWidget from "./RolesStackWidget";

import type { OpenRole } from "../OpenRoles";
import { scrollLockRef } from "@/lib/lenis";
import { useMusicPlayer } from "@/contexts/MusicContext";

gsap.registerPlugin(useGSAP);

function SpherePlaceholder() {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-[#f7f7f5]">
      <div className="relative w-full aspect-square" />
      <div className="px-5 py-8 leading-none">&nbsp;</div>
    </div>
  );
}

// Chargé à la demande : three (~520 kB) resterait dans le bundle de la page
// avec un import statique, même tant que le panel n'a jamais été ouvert.
const SphereWidget = dynamic(() => import("./SphereWidget"), {
  ssr: false,
  loading: () => <SpherePlaceholder />,
});

export default function WidgetPanel({ openRoles }: { openRoles: OpenRole[] }) {
  const [open, setOpen] = useState(false);
  // La sphère monte à la première ouverture et reste montée : la démonter à
  // chaque fermeture recréerait un contexte WebGL et perdrait sa rotation.
  const [sphereMounted, setSphereMounted] = useState(false);

  useEffect(() => {
    if (open) setSphereMounted(true);
  }, [open]);

  const { playing: musicPlaying } = useMusicPlayer();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const verticalPathRef = useRef<SVGPathElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const widgetsRef = useRef<HTMLDivElement[]>([]);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const previousButtonState = useRef({ open, musicPlaying });

  useGSAP(() => {
    if (!buttonRef.current || !overlayRef.current || !panelRef.current) return;

    gsap.set(buttonRef.current, { opacity: 0 });
    gsap.set(overlayRef.current, { opacity: 0, pointerEvents: "none" });
    gsap.set(panelRef.current, { opacity: 0, y: "-1rem", scale: 0.96 });
    gsap.set(widgetsRef.current, { opacity: 0, y: "1.25rem" });
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
      .timeline({
        paused: true,
        defaults: { ease: "power2.inOut" },
      })
      .to(verticalPathRef.current, { rotate: 90, duration: 0.52 }, 0)
      .to(
        overlayRef.current,
        { opacity: 1, duration: 0.5, ease: "sine.inOut" },
        0,
      )
      .to(
        panelRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "sine.inOut",
        },
        0.08,
      )
      .to(
        widgetsRef.current,
        { opacity: 1, y: 0, duration: 0.44, stagger: 0.035 },
        0.12,
      );
  }, []);

  useGSAP(
    () => {
      const button = buttonRef.current;
      if (!button) return;

      const previous = previousButtonState.current;
      if (previous.open === open && previous.musicPlaying === musicPlaying)
        return;
      previousButtonState.current = { open, musicPlaying };

      // Keep the initial width natural while the clock fills in its client-side times.
      let width: string | number = "36.1875rem";
      if (!open) {
        // Measure after React adds the cover, then restore the current width before paint.
        const currentWidth = button.getBoundingClientRect().width;
        button.style.width = "auto";
        width = button.getBoundingClientRect().width;
        gsap.set(button, { width: currentWidth });
      }

      gsap.to(button, {
        width,
        duration: open ? 0.68 : 0.68 / 1.2,
        ease: "power2.inOut",
        overwrite: "auto",
        onComplete: () => {
          if (!open) gsap.set(button, { clearProps: "width" });
        },
      });
    },
    { dependencies: [open, musicPlaying] },
  );

  function toggle() {
    if (!tl.current) return;

    gsap.set(overlayRef.current, { pointerEvents: open ? "none" : "auto" });
    if (!open) {
      tl.current.timeScale(1).play();
      scrollLockRef.current = true;
    } else {
      tl.current.timeScale(1.2).reverse();
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
        className={`absolute z-20 top-32 left-1/2 -translate-x-1/2 w-188 opacity-0 ${
          open ? "" : "**:pointer-events-none!"
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        {/* Widgets grid */}
        <div className="flex justify-center items-start gap-4">
          <div className="flex flex-col gap-4 shrink-0 w-46.5">
            <div ref={(el) => addWidget(el, 1)}>
              {sphereMounted ? <SphereWidget /> : <SpherePlaceholder />}
            </div>
            <div ref={(el) => addWidget(el, 2)}>
              <MusicWidget />
            </div>
          </div>

          <div id="home-widgets-right" className="flex items-stretch gap-4">
            <div
              id="home-widgets-photo-cell"
              className="relative w-75 shrink-0"
            >
              {/* The clock and collapsed roles determine the photo's height. */}
              <div
                id="home-widgets-photo"
                ref={(el) => addWidget(el, 3)}
                className="absolute inset-0"
              >
                <PhotoCarouselWidget active={open} />
              </div>
            </div>
            <div
              id="home-widgets-details"
              className="flex w-52 shrink-0 flex-col gap-4"
            >
              <div id="home-widgets-clock" ref={(el) => addWidget(el, 5)}>
                <ClockWidget />
              </div>
              <div id="home-widgets-roles" ref={(el) => addWidget(el, 4)}>
                <RolesStackWidget roles={openRoles} active={open} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
