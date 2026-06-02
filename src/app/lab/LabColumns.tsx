"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

type CardVariant = "landscape" | "square" | "portrait" | "wide";

interface CardData {
  variant: CardVariant;
  color: string;
  author?: {
    name: string;
    handle: string;
    date: string;
    initials: string;
    avatarColor: string;
  };
}

const COLORS = {
  cyan: "#03c8ff",
  lavender: "#e3cefc",
  beige: "#c3bd9a",
  red: "#ff331b",
};

const AUTHORS = [
  {
    name: "Rémy",
    handle: "@remy_godet",
    date: "Mar 16",
    initials: "R",
    avatarColor: COLORS.red,
  },
  {
    name: "Guillaume",
    handle: "@guillaumebth",
    date: "Mar 16",
    initials: "G",
    avatarColor: COLORS.beige,
  },
];

const ASPECT_RATIO: Record<CardVariant, number> = {
  landscape: 16 / 9,
  square: 1,
  portrait: 3 / 4,
  wide: 4 / 3,
};

const COLUMNS: CardData[][] = [
  [
    { variant: "landscape", color: COLORS.cyan },
    { variant: "square", color: COLORS.lavender, author: AUTHORS[0] },
    { variant: "portrait", color: COLORS.red },
    { variant: "landscape", color: COLORS.cyan },
    { variant: "square", color: COLORS.lavender, author: AUTHORS[0] },
    { variant: "portrait", color: COLORS.red },
  ],
  [
    { variant: "square", color: COLORS.lavender },
    { variant: "wide", color: COLORS.beige, author: AUTHORS[1] },
    { variant: "square", color: COLORS.lavender },
    { variant: "portrait", color: COLORS.red },
    { variant: "landscape", color: COLORS.cyan },
    { variant: "square", color: COLORS.lavender },
    { variant: "wide", color: COLORS.beige },
  ],
  [
    { variant: "wide", color: COLORS.beige },
    { variant: "portrait", color: COLORS.red },
    { variant: "square", color: COLORS.lavender },
    { variant: "landscape", color: COLORS.cyan },
    { variant: "wide", color: COLORS.beige, author: AUTHORS[1] },
    { variant: "wide", color: COLORS.beige },
    { variant: "portrait", color: COLORS.red },
  ],
  [
    { variant: "square", color: COLORS.lavender },
    { variant: "landscape", color: COLORS.cyan },
    { variant: "wide", color: COLORS.beige },
    { variant: "square", color: COLORS.lavender, author: AUTHORS[0] },
    { variant: "portrait", color: COLORS.red },
    { variant: "square", color: COLORS.lavender },
  ],
  [
    { variant: "landscape", color: COLORS.cyan },
    { variant: "square", color: COLORS.lavender, author: AUTHORS[0] },
    { variant: "portrait", color: COLORS.red },
    { variant: "landscape", color: COLORS.cyan },
    { variant: "square", color: COLORS.lavender },
    { variant: "landscape", color: COLORS.cyan },
  ],
];

// Speed multiplier per column — gives each column a distinct scroll velocity
const SPEEDS = [0.55, 0.9, 0.7, 1.1, 0.5, 0.85];
const BASE_DURATION = 28;

function AuthorTag({ author }: { author: NonNullable<CardData["author"]> }) {
  return (
    <div className="flex gap-2 items-center px-2 py-2 bg-white">
      <div
        className="rounded-full shrink-0 w-10 h-10 flex items-center justify-center text-white text-sm font-semibold"
        style={{
          backgroundColor: author.avatarColor,
          fontFamily: "'Aeonik', sans-serif",
        }}
      >
        {author.initials}
      </div>
      <div
        className="flex flex-col text-[#0c0c0c]"
        style={{ fontFamily: "'Aeonik', sans-serif", lineHeight: 1 }}
      >
        <span className="text-sm font-medium mb-1">{author.name}</span>
        <span className="text-xs">
          <span className="text-[#7e7e7e]">{author.handle}</span>
          <span className="text-[#0c0c0c]"> · {author.date}</span>
        </span>
      </div>
    </div>
  );
}

function Card({ card, colWidth }: { card: CardData; colWidth: number }) {
  const height = colWidth / ASPECT_RATIO[card.variant];
  return (
    <div className="shrink-0 w-full overflow-hidden rounded-sm">
      <div
        style={{ backgroundColor: card.color, height: `${height}px` }}
        className="w-full"
      />
      {card.author && <AuthorTag author={card.author} />}
    </div>
  );
}

function Column({
  cards,
  index,
  colWidth,
}: {
  cards: CardData[];
  index: number;
  colWidth: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || colWidth === 0) return;

    const speed = SPEEDS[index];
    const duration = BASE_DURATION / speed;

    const tween = gsap.to(progressRef, {
      current: 1,
      duration,
      ease: "none",
      repeat: -1,
      onUpdate: () => {
        const halfHeight = track.scrollHeight / 2;
        const y = -((progressRef.current % 1) * halfHeight);
        gsap.set(track, { y });
      },
    });

    const obs = Observer.create({
      target: window,
      type: "wheel,touch",
      onChangeY: (self) => {
        const vel = self.velocityY ?? 0;
        const boost = Math.max(0.3, 1 + Math.abs(vel) * 0.0006);
        const dir = vel >= 0 ? 1 : -1;

        gsap.to(tween, {
          timeScale: dir * boost * speed,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(tween, {
          timeScale: speed,
          duration: 1.8,
          ease: "power3.out",
          delay: 0.3,
        });
      },
    });

    return () => {
      tween.kill();
      obs.kill();
    };
  }, [index, colWidth]);

  const looped = [...cards, ...cards];

  return (
    <div
      id={`lab-col-${index}`}
      className="flex-1 min-w-0 overflow-hidden"
      style={{ paddingTop: index % 2 === 1 ? "3rem" : "0" }}
    >
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

    const block = (e: Event) => e.stopPropagation();
    el.addEventListener("wheel", block, { capture: true });
    el.addEventListener("touchmove", block, { capture: true });

    return () => {
      ro.disconnect();
      el.removeEventListener("wheel", block, { capture: true });
      el.removeEventListener("touchmove", block, { capture: true });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="lab-columns"
      className="flex gap-4 w-full h-full px-2"
    >
      {COLUMNS.map((cards, i) => (
        <Column key={i} cards={cards} index={i} colWidth={colWidth} />
      ))}
    </div>
  );
}
