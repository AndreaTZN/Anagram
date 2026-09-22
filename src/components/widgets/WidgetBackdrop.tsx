"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function WidgetBackdrop({
  open,
  buttonRef,
  onClose,
}: {
  open: boolean;
  buttonRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const blurRef = useRef<HTMLDivElement>(null);
  const animateRef = useRef<
    ((expanded: boolean, immediate?: boolean) => void) | null
  >(null);

  useGSAP(
    (_context, contextSafe) => {
      const overlay = overlayRef.current;
      const blur = blurRef.current;
      if (!overlay || !blur || !contextSafe) return;

      const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
      let expanded = false;
      let timeline: gsap.core.Timeline | undefined;
      let previousBounds = overlay.getBoundingClientRect();

      gsap.set(blur, { autoAlpha: 0 });

      const animate = contextSafe((nextOpen: boolean, immediate = false) => {
        expanded = nextOpen;
        timeline?.kill();
        const opacity = Number(gsap.getProperty(blur, "opacity")) || 0;
        const instant = immediate || motion.matches;

        timeline = gsap.timeline({
          onComplete: () => {
            blur.style.willChange = "";
          },
        });

        if (!expanded) {
          // Closing fades the current capsule instead of sending the wave backwards.
          timeline.to(blur, {
            autoAlpha: 0,
            duration:
              instant || opacity === 0 ? 0 : Math.max(0.14, 0.38 * opacity),
            ease: "sine.inOut",
          });
          return;
        }

        const button = buttonRef.current;
        if (!button) return;
        const bounds = overlay.getBoundingClientRect();
        if (!bounds.width || !bounds.height) return;
        const pill = button.getBoundingClientRect();
        const rem = Number.parseFloat(
          getComputedStyle(document.documentElement).fontSize,
        );
        const centerX = (pill.left - bounds.left + pill.width / 2) / rem;
        const centerY = (pill.top - bounds.top + pill.height / 2) / rem;
        const edgeX = Math.max(centerX, bounds.width / rem - centerX);
        const edgeY = Math.max(centerY, bounds.height / rem - centerY);
        const sourceWidth = Math.min(3, pill.width / rem);
        const sourceHeight = Math.min(0.75, pill.height / rem);
        // Extend the capsule's straight section past both sides, including its soft edge.
        const targetHeight = 2 * (edgeY + 7.5);
        const targetWidth = 2 * (edgeX + edgeY + 7.5);

        if (opacity <= 0.001) {
          gsap.set(blur, {
            left: `${centerX - sourceWidth / 2}rem`,
            top: `${centerY - sourceHeight / 2}rem`,
            width: `${sourceWidth}rem`,
            height: `${sourceHeight}rem`,
            borderRadius: `${sourceHeight / 2}rem`,
          });
        }

        const currentWidth = Number.parseFloat(blur.style.width) || sourceWidth;
        const progress = gsap.utils.clamp(
          0,
          1,
          (currentWidth - sourceWidth) / (targetWidth - sourceWidth),
        );
        const duration = instant ? 0 : Math.max(0.16, 1.05 * (1 - progress));
        gsap.set(blur, {
          visibility: "inherit",
          willChange: "left, top, width, height, opacity",
        });

        timeline
          .to(
            blur,
            {
              opacity: 1,
              duration: Math.min(0.62, duration),
              ease: "sine.inOut",
            },
            0,
          )
          .to(
            blur,
            {
              left: `${centerX - targetWidth / 2}rem`,
              top: `${centerY - targetHeight / 2}rem`,
              width: `${targetWidth}rem`,
              height: `${targetHeight}rem`,
              borderRadius: `${targetHeight / 2}rem`,
              duration,
              ease: "power2.out",
            },
            0,
          );
      });

      animateRef.current = animate;
      const observer = new ResizeObserver(() => {
        const bounds = overlay.getBoundingClientRect();
        const changed =
          bounds.width !== previousBounds.width ||
          bounds.height !== previousBounds.height;
        previousBounds = bounds;
        if (expanded && changed) animate(true, true);
      });
      const handleMotionChange = () => {
        if (motion.matches) animate(expanded, true);
      };
      observer.observe(overlay);
      motion.addEventListener("change", handleMotionChange);

      return () => {
        observer.disconnect();
        motion.removeEventListener("change", handleMotionChange);
        animateRef.current = null;
      };
    },
    { scope: overlayRef, dependencies: [buttonRef], revertOnUpdate: true },
  );

  useGSAP(() => animateRef.current?.(open), { dependencies: [open] });

  return (
    <div
      ref={overlayRef}
      id="home-widgets-overlay"
      className="absolute inset-0 z-20 overflow-hidden"
      style={{ pointerEvents: open ? "auto" : "none" }}
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        ref={blurRef}
        id="home-widgets-blur"
        className="pointer-events-none invisible absolute left-0 top-0 h-3 w-12 rounded-full bg-[rgba(12,12,12,0.15)] opacity-0"
        style={{
          backdropFilter: "blur(2.5rem)",
          WebkitBackdropFilter: "blur(2.5rem)",
          filter: "blur(1.875rem)",
        }}
      />
    </div>
  );
}
