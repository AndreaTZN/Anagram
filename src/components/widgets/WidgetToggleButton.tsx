"use client";

import { RefObject, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import WorldClock from "./WorldClock";

gsap.registerPlugin(useGSAP);

interface WidgetToggleButtonProps {
  buttonRef: RefObject<HTMLButtonElement | null>;
  verticalPathRef: RefObject<SVGPathElement | null>;
  onClick: () => void;
  /** True when music is playing and the panel is closed. */
  showVinyl?: boolean;
}

export default function WidgetToggleButton({
  buttonRef,
  verticalPathRef,
  onClick,
  showVinyl = false,
}: WidgetToggleButtonProps) {
  const vinylRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);

  // Scoped to the vinyl itself so nothing here can touch the button, which the
  // panel animates separately.
  useGSAP(
    () => {
      // The clock slides aside to make room for the vinyl, and back when the
      // music stops.
      gsap.to(clockRef.current, {
        x: showVinyl ? "1rem" : 0,
        duration: 0.4,
        ease: "power3.out",
      });

      const vinyl = vinylRef.current;
      if (!vinyl) return;

      gsap.fromTo(
        vinyl,
        { autoAlpha: 0, scale: 0.5 },
        { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
      );

      const spin = gsap.to(vinyl, {
        rotation: 360,
        duration: 8,
        ease: "none",
        repeat: -1,
      });

      return () => {
        spin.kill();
      };
    },
    { dependencies: [showVinyl] },
  );

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      // Le bouton vit dans un conteneur fixed : au focus, le navigateur tente de
      // le "remettre en vue" et scrolle #smooth-scroll-container jusqu'en haut.
      // On bloque le focus à la souris ; la navigation clavier reste intacte.
      onMouseDown={(e) => e.preventDefault()}
      className="absolute top-12 left-1/2 -translate-x-1/2 z-50 pointer-events-auto flex items-center justify-between gap-12 px-4 py-4 rounded-full backdrop-blur-2xl bg-[rgba(12,12,12,0.2)] cursor-pointer overflow-hidden opacity-0"
    >
      {/* relative so the vinyl can sit out of the flow: the clock's 1rem shift
          is what makes room for it, not the layout. */}
      <div className="relative flex items-center">
        {showVinyl && (
          <div
            ref={vinylRef}
            className="relative size-4 overflow-hidden rounded-full"
          >
            <Image
              src={"/widgets/music-cover.png"}
              alt=""
              fill
              sizes="28px"
              className="object-cover"
            />
            <span className="absolute left-1/2 top-1/2 size-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
          </div>
        )}
        <div ref={clockRef} className="flex items-center gap-1.5">
          <WorldClock />
        </div>
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
  );
}
