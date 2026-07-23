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
      className="flex gap-4 w-full h-full pl-2 pr-4"
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
