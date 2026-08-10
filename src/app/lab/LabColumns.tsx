"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

type CardVariant = "landscape" | "square" | "portrait" | "wide";

interface CardData {
  variant: CardVariant;
  src: string;
  // Images only — videos are decorative and carry no alt.
  alt?: string;
}

const ASPECT_RATIO: Record<CardVariant, number> = {
  landscape: 16 / 9,
  square: 1,
  portrait: 3 / 4,
  wide: 4 / 3,
};

const COLUMNS: CardData[][] = [
  [
    {
      variant: "square",
      src: "/lab/1/1.jpg",
      alt: "Two smartphone-sized glass panels floating on a black reflective surface",
    },
    { variant: "portrait", src: "/lab/1/2.mp4" },
    { variant: "portrait", src: "/lab/1/3.mp4" },
    {
      variant: "square",
      src: "/lab/1/4.jpg",
      alt: "Metal Business World Elite Mastercard engraved with two classical figures holding a star emblem",
    },
    {
      variant: "portrait",
      src: "/lab/1/5.jpg",
      alt: "Gradium poster: a classical bust rendered as a thermal heat map above the line Expressive Real-Time Text-To-Speech",
    },
  ],
  [
    {
      variant: "portrait",
      src: "/lab/2/1.jpg",
      alt: "Hand holding a yellow phone case marked with two black asterisks against a blue sky",
    },
    { variant: "square", src: "/lab/2/2.mp4" },
    {
      variant: "square",
      src: "/lab/2/4.jpg",
      alt: "3D render of a mint green phone case with an inflated, puffy quilted surface",
    },
    {
      variant: "portrait",
      src: "/lab/2/3.jpg",
      alt: "Construction sketch of a logo mark, blue diagonal strokes over grey guidelines on a pale green ground",
    },
    {
      variant: "square",
      src: "/lab/2/5.jpg",
      alt: "Bold black ALL W logotype in a condensed stacked wordmark",
    },
  ],
  [
    {
      variant: "square",
      src: "/lab/3/1.jpg",
      alt: "Website layers exploded in 3D space, showing a dark homepage over a photo of a runner",
    },
    { variant: "portrait", src: "/lab/3/4.mp4" },
    {
      variant: "portrait",
      src: "/lab/3/2.jpg",
      alt: "Waste poster with red and black flags reading Choose To Be Wastivist and Trash Is Cash",
    },
    { variant: "portrait", src: "/lab/3/3.mp4" },
  ],
  [
    {
      variant: "portrait",
      src: "/lab/4/1.jpg",
      alt: "Frosted glass app icon with a wave symbol over icebergs lit orange at sunset",
    },
    {
      variant: "portrait",
      src: "/lab/4/2.jpg",
      alt: "ORB logo with its circular mark shown below in vector construction curves and anchor points",
    },
    { variant: "landscape", src: "/lab/4/5.mp4" },
    {
      variant: "landscape",
      src: "/lab/4/3.jpg",
      alt: "Crypto app screen reading Buy Your First Bitcoin beside a red poster repeating It's Time!",
    },
    {
      variant: "portrait",
      src: "/lab/4/4.jpg",
      alt: "Bundle of thin black metal blades crossing in a vase, shadows striping the beige wall behind",
    },
  ],
  [
    { variant: "portrait", src: "/lab/5/1.mp4" },
    { variant: "landscape", src: "/lab/5/2.mp4" },
    {
      variant: "portrait",
      src: "/lab/5/3.jpg",
      alt: "Glossy grey sphere glowing against a black background",
    },
    {
      variant: "portrait",
      src: "/lab/5/4.jpg",
      alt: "3D traffic light displaying DCA, BTC and EUR, wrapped in yellow and olive chrome blobs",
    },
  ],
];

// Videos and images share the same card layout; the extension picks the tag.
const isVideo = (src: string) => src.endsWith(".mp4");

// quickTo duration per column — different durations = different scroll velocities
const DURATIONS = [0.5, 0.8, 0.6, 0.3, 0.7];

// Matches the project's mobile breakpoint convention (max-[766px]:)
const MOBILE_BREAKPOINT = 767;

// Mobile: same breakpoint as elsewhere in the app, but 2 columns instead of 5.
// Every card from the 5 desktop columns is redistributed round-robin across
// the 2 mobile columns so nothing is dropped, just regrouped.
const MOBILE_COLUMNS: CardData[][] = [[], []];
COLUMNS.flat().forEach((card, i) => {
  MOBILE_COLUMNS[i % 2].push(card);
});
const MOBILE_DURATIONS = [0.5, 0.75];

function Card({ card, colWidth }: { card: CardData; colWidth: number }) {
  const height = colWidth / ASPECT_RATIO[card.variant];
  const mediaRef = useRef<HTMLVideoElement | HTMLImageElement>(null);

  function fadeIn() {
    if (mediaRef.current)
      gsap.to(mediaRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
  }

  return (
    <div
      className="relative shrink-0 w-full overflow-hidden bg-[#e5e5e5]"
      style={{ height: `${height}px` }}
    >
      {isVideo(card.src) ? (
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          src={card.src}
          className="w-full h-full object-cover"
          style={{ opacity: 0 }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={fadeIn}
        />
      ) : (
        <Image
          ref={mediaRef as React.RefObject<HTMLImageElement>}
          src={card.src}
          alt={card.alt ?? ""}
          fill
          sizes="20vw"
          className="object-cover"
          style={{ opacity: 0 }}
          draggable={false}
          onLoad={fadeIn}
        />
      )}
    </div>
  );
}

function Column({
  cards,
  index,
  duration,
  colWidth,
  incrRef,
}: {
  cards: CardData[];
  index: number;
  duration: number;
  colWidth: number;
  incrRef: React.RefObject<number>;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || colWidth === 0) return;

    const half = track.scrollHeight / 2;
    const wrap = gsap.utils.wrap(-half, 0);

    const yTo = gsap.quickTo(track, "y", {
      duration,
      ease: "power3",
      modifiers: {
        y: gsap.utils.unitize(wrap),
      },
    });

    let rafId: number;
    let lastIncr = incrRef.current;

    const tick = () => {
      if (incrRef.current !== lastIncr) {
        lastIncr = incrRef.current;
        yTo(lastIncr);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [duration, colWidth, incrRef]);

  const looped = [...cards, ...cards];

  return (
    <div id={`lab-col-${index}`} className="flex-1 min-w-0 overflow-hidden">
      <div ref={trackRef} className="flex flex-col gap-4 will-change-transform">
        {looped.map((card, i) => (
          <Card key={i} card={card} colWidth={colWidth} />
        ))}
      </div>
    </div>
  );
}

export default function LabColumns() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [colWidth, setColWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const incrRef = useRef(0);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const columns = isMobile ? MOBILE_COLUMNS : COLUMNS;
  const durations = isMobile ? MOBILE_DURATIONS : DURATIONS;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const calc = () => {
      const gap = 16;
      const cols = columns.length;
      const totalGap = gap * (cols - 1);
      const w = Math.floor((el.clientWidth - totalGap) / cols);
      setColWidth(w);
    };

    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      incrRef.current -= e.deltaY / 2;
    };

    // Touch has no native momentum like a wheel/trackpad does, so we track
    // velocity during the drag and keep coasting (with friction) after the
    // finger lifts, instead of stopping dead on touchend.
    const TOUCH_SENSITIVITY = 1;
    const FRICTION = 0.97;
    const MIN_VELOCITY = 0.05;

    let lastTouchY: number | null = null;
    let lastTouchTime = 0;
    let velocity = 0;
    let momentumRaf: number | null = null;

    const stopMomentum = () => {
      if (momentumRaf !== null) {
        cancelAnimationFrame(momentumRaf);
        momentumRaf = null;
      }
    };

    const runMomentum = () => {
      velocity *= FRICTION;
      if (Math.abs(velocity) < MIN_VELOCITY) {
        momentumRaf = null;
        return;
      }
      incrRef.current -= velocity;
      momentumRaf = requestAnimationFrame(runMomentum);
    };

    const onTouchStart = (e: TouchEvent) => {
      stopMomentum();
      lastTouchY = e.touches[0].clientY;
      lastTouchTime = performance.now();
      velocity = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (lastTouchY === null) return;
      e.preventDefault();
      const y = e.touches[0].clientY;
      const now = performance.now();
      const dt = Math.max(1, now - lastTouchTime);
      const dy = (lastTouchY - y) * TOUCH_SENSITIVITY;

      incrRef.current -= dy;
      // Smooth the instantaneous velocity so a single jittery frame doesn't
      // dictate the whole coast.
      velocity = velocity * 0.7 + (dy / dt) * 16 * 0.3;

      lastTouchY = y;
      lastTouchTime = now;
    };
    const onTouchEnd = () => {
      lastTouchY = null;
      if (Math.abs(velocity) > MIN_VELOCITY) {
        stopMomentum();
        momentumRaf = requestAnimationFrame(runMomentum);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      ro.disconnect();
      stopMomentum();
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [columns.length]);

  return (
    <div
      ref={containerRef}
      id="lab-columns"
      className="flex gap-4 w-full h-full pl-2 pr-4 max-[766px]:px-4"
    >
      {columns.map((cards, i) => (
        <Column
          key={i}
          cards={cards}
          index={i}
          duration={durations[i] ?? 0.5}
          colWidth={colWidth}
          incrRef={incrRef}
        />
      ))}
    </div>
  );
}
