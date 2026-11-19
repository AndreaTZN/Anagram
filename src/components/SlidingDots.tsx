"use client";

import { useRef, useState, type Ref } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const VISIBLE_DOTS = 7;
const DOT_REM = 0.3125;
const ACTIVE_DOT_REM = 1.3125;
// One track step: an inactive dot plus the gap-2 between dots.
const STEP_REM = DOT_REM + 0.5;
const EDGE_SCALE = 0.6;
// Track, widths and edge scales share one duration and ease, so the total
// width stays constant while they move and nothing jitters.
const DURATION = 0.6;
const EASE = "power2.inOut";

// The window only shifts when the active dot would reach its outer slot, so the
// dot travels inside it instead of staying pinned to the middle.
function nextWindowStart(start: number, active: number, count: number) {
  const max = Math.max(0, count - VISIBLE_DOTS);
  let next = start;
  if (active < next + 1) next = active - 1;
  if (active > next + VISIBLE_DOTS - 2) next = active - VISIBLE_DOTS + 2;
  return Math.min(Math.max(next, 0), max);
}

export default function SlidingDots({
  id,
  count,
  active,
  onSelect,
  progressRef,
  className,
}: {
  id: string;
  count: number;
  active: number;
  onSelect: (index: number) => void;
  progressRef: Ref<HTMLSpanElement>;
  className: string;
}) {
  const [windowStart, setWindowStart] = useState(0);
  const [previousActive, setPreviousActive] = useState(active);
  // The window depends on where it was before, so it is adjusted during render
  // to land in the same commit as the new active dot.
  if (active !== previousActive) {
    setPreviousActive(active);
    setWindowStart(nextWindowStart(windowStart, active, count));
  }

  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const hasPlaced = useRef(false);
  const windowed = count > VISIBLE_DOTS;

  useGSAP(
    () => {
      // The first run only places the dots: animating it would show them settling on load.
      const animate = hasPlaced.current;
      hasPlaced.current = true;
      const move = (target: gsap.TweenTarget, vars: gsap.TweenVars) =>
        animate
          ? gsap.to(target, {
              ...vars,
              duration: DURATION,
              ease: EASE,
              overwrite: "auto",
            })
          : gsap.set(target, vars);

      if (windowed) {
        move(trackRef.current, { x: `${-windowStart * STEP_REM}rem` });
      }
      const last = windowStart + VISIBLE_DOTS - 1;
      gsap.utils.toArray<HTMLElement>("[data-dot]").forEach((dot, i) => {
        // Shrunk edge dots hint that more photos sit beyond the window.
        const isEdge =
          windowed &&
          ((i === windowStart && i > 0) || (i === last && i < count - 1));
        move(dot, { scale: isEdge ? EDGE_SCALE : 1 });
      });
      gsap.utils.toArray<HTMLElement>("[data-dot-bar]").forEach((bar, i) => {
        move(bar, { width: `${i === active ? ACTIVE_DOT_REM : DOT_REM}rem` });
      });
    },
    { dependencies: [active, windowStart], scope: rootRef },
  );

  return (
    <div id={id} ref={rootRef} className={className}>
      <div
        className="overflow-hidden"
        style={
          windowed
            ? {
                width: `${(VISIBLE_DOTS - 1) * STEP_REM + ACTIVE_DOT_REM}rem`,
              }
            : undefined
        }
      >
        <div ref={trackRef} className="flex w-max items-center gap-2">
          {Array.from({ length: count }, (_, i) => {
            const inWindow =
              !windowed || (i >= windowStart && i < windowStart + VISIBLE_DOTS);
            return (
              <button
                key={i}
                type="button"
                data-dot
                onClick={() => onSelect(i)}
                className="shrink-0 cursor-pointer py-2"
                aria-label={`Go to photo ${i + 1}`}
                aria-current={i === active}
                // Dots scrolled out of the window stay out of the tab order.
                tabIndex={inWindow ? undefined : -1}
                aria-hidden={inWindow ? undefined : true}
              >
                <span
                  data-dot-bar
                  className={`relative block h-1.25 overflow-hidden rounded-full bg-white/30 ${
                    i === active ? "w-5.25" : "w-1.25"
                  }`}
                >
                  {i === active && (
                    <span
                      ref={progressRef}
                      className="absolute inset-0 rounded-full bg-white"
                      // Inline transform, not a Tailwind translate class: v4 uses the
                      // `translate` property, which would stack with GSAP's transform.
                      style={{ transform: "translateX(-100%)" }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
