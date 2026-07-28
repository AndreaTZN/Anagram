"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

type CardVariant = "landscape" | "square" | "portrait" | "wide";

interface CardData {
  variant: CardVariant;
  src: string;
}

const ASPECT_RATIO: Record<CardVariant, number> = {
  landscape: 16 / 9,
  square: 1,
  portrait: 3 / 4,
  wide: 4 / 3,
};

const COLUMNS: CardData[][] = [
  [
    { variant: "square", src: "/lab/1/1.jpg" },
    { variant: "portrait", src: "/lab/1/2.mp4" },
    { variant: "portrait", src: "/lab/1/3.mp4" },
  ],
  [
    { variant: "portrait", src: "/lab/2/1.jpg" },
    { variant: "square", src: "/lab/2/2.mp4" },
    { variant: "portrait", src: "/lab/2/3.jpg" },
  ],
  [
    { variant: "square", src: "/lab/3/1.jpg" },
    { variant: "portrait", src: "/lab/3/2.jpg" },
    { variant: "portrait", src: "/lab/3/3.mp4" },
  ],
  [
    { variant: "portrait", src: "/lab/4/1.jpg" },
    { variant: "portrait", src: "/lab/4/2.jpg" },
    { variant: "landscape", src: "/lab/4/3.jpg" },
    { variant: "portrait", src: "/lab/4/4.jpg" },
  ],
  [
    { variant: "portrait", src: "/lab/5/1.mp4" },
    { variant: "landscape", src: "/lab/5/2.mp4" },
    { variant: "portrait", src: "/lab/5/3.jpg" },
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
  return (
    <div
      className="relative shrink-0 w-full overflow-hidden"
      style={{ height: `${height}px` }}
    >
      {isVideo(card.src) ? (
        <video
          src={card.src}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <Image
          src={card.src}
          alt=""
          fill
          sizes="20vw"
          className="object-cover"
          draggable={false}
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

    let lastTouchY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (lastTouchY === null) return;
      e.preventDefault();
      const y = e.touches[0].clientY;
      incrRef.current -= (lastTouchY - y) / 2;
      lastTouchY = y;
    };
    const onTouchEnd = () => {
      lastTouchY = null;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      ro.disconnect();
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
