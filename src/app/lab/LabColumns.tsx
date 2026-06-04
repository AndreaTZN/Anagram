"use client";

import { useRef, useEffect, useState } from "react";
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
    { variant: "landscape", src: "/works/Planity/release/1.webp" },
    { variant: "portrait", src: "/works/Allo/3.webp" },
    { variant: "wide", src: "/works/Everyday/release/4.webp" },
    { variant: "square", src: "/works/Arcads/4.webp" },
    { variant: "landscape", src: "/works/Planity/release/5.webp" },
  ],
  [
    { variant: "square", src: "/works/Fortuneo/backstage/25.webp" },
    { variant: "landscape", src: "/works/FoundersFuture/release/1.webp" },
    { variant: "portrait", src: "/works/Planity/backstage/25.webp" },
    { variant: "wide", src: "/works/Arcads/2.webp" },
    { variant: "square", src: "/works/Fortuneo/release/6.webp" },
    { variant: "landscape", src: "/works/FoundersFuture/release/7.webp" },
  ],
  [
    { variant: "wide", src: "/works/Planity/release/8.webp" },
    { variant: "square", src: "/works/Fortuneo/release/9.webp" },
    { variant: "landscape", src: "/works/FoundersFuture/release/10.webp" },
    { variant: "portrait", src: "/works/Arcads/9.webp" },
    { variant: "wide", src: "/works/Planity/release/10.webp" },
    { variant: "square", src: "/works/Fortuneo/backstage/27.webp" },
  ],
  [
    { variant: "portrait", src: "/works/FoundersFuture/release/11.webp" },
    { variant: "wide", src: "/works/Planity/release/11.webp" },
    { variant: "square", src: "/works/Arcads/6.webp" },
    { variant: "landscape", src: "/works/Fortuneo/release/12.webp" },
    { variant: "portrait", src: "/works/FoundersFuture/backstage/20.webp" },
  ],
  [
    { variant: "landscape", src: "/works/Planity/release/12.webp" },
    { variant: "square", src: "/works/Fortuneo/release/4.webp" },
    { variant: "portrait", src: "/works/FoundersFuture/release/4.webp" },
    { variant: "wide", src: "/works/Arcads/5.webp" },
    { variant: "landscape", src: "/works/Planity/backstage/26.webp" },
    { variant: "square", src: "/works/Fortuneo/backstage/29.webp" },
  ],
];

// quickTo duration per column — different durations = different scroll velocities
const DURATIONS = [0.5, 0.8, 0.6, 0.3, 0.7];

function Card({ card, colWidth }: { card: CardData; colWidth: number }) {
  const height = colWidth / ASPECT_RATIO[card.variant];
  return (
    <div className="shrink-0 w-full overflow-hidden rounded-sm" style={{ height: `${height}px` }}>
      <img src={card.src} alt="" className="w-full h-full object-cover" draggable={false} />
    </div>
  );
}

function Column({
  cards,
  index,
  colWidth,
  incrRef,
}: {
  cards: CardData[];
  index: number;
  colWidth: number;
  incrRef: React.RefObject<number>;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || colWidth === 0) return;

    const half = track.scrollHeight / 2;
    const wrap = gsap.utils.wrap(-half, 0);
    const duration = DURATIONS[index] ?? 0.5;

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
  }, [index, colWidth, incrRef]);

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
  const incrRef = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const calc = () => {
      const gap = 16;
      const cols = 5;
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

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      ro.disconnect();
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="lab-columns"
      className="flex gap-4 w-full h-full px-2"
    >
      {COLUMNS.map((cards, i) => (
        <Column
          key={i}
          cards={cards}
          index={i}
          colWidth={colWidth}
          incrRef={incrRef}
        />
      ))}
    </div>
  );
}
