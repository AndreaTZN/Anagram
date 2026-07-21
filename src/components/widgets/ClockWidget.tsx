"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import AnalogClock from "../AnalogClock";

const CITIES = [
  { label: "Paris", timezone: "Europe/Paris", color: "#E3CEFC" },
  { label: "New York", timezone: "America/New_York", color: "#03C8FF" },
];

function getOffset(timezone: string) {
  const now = new Date();
  const diff =
    (new Date(now.toLocaleString("en-US", { timeZone: timezone })).getTime() -
      new Date(now.toLocaleString("en-US", { timeZone: "UTC" })).getTime()) /
    3600000;
  const sign = diff >= 0 ? "+" : "-";
  const abs = Math.abs(diff);
  return `GMT${sign}${abs % 1 === 0 ? abs : abs.toFixed(1)}`;
}

function getTime(timezone: string) {
  return new Date()
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: timezone,
    })
    .replace(" ", "");
}

export default function ClockWidget() {
  const [active, setActive] = useState(0);
  const [times, setTimes] = useState<string[]>([]);
  const [offsets, setOffsets] = useState<string[]>([]);
  const swiperRef = useRef<SwiperType | null>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function tick() {
      setTimes(CITIES.map((c) => getTime(c.timezone)));
      setOffsets(CITIES.map((c) => getOffset(c.timezone)));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!progressRef.current) return;
    gsap.killTweensOf(progressRef.current);
    gsap.fromTo(
      progressRef.current,
      { width: "0%" },
      { width: "100%", duration: 4, ease: "none" },
    );
  }, [active]);

  const city = CITIES[active];

  return (
    <div className="w-46 flex flex-col items-center rounded-lg bg-[#f5f5f5] pt-4 px-4 overflow-hidden">
      <Swiper
        effect="fade"
        modules={[EffectFade, Autoplay]}
        onSwiper={(s) => {
          swiperRef.current = s;
        }}
        onSlideChange={(s) => setActive(s.realIndex)}
        className="w-full"
      >
        {CITIES.map((c) => (
          <SwiperSlide key={c.timezone}>
            <AnalogClock timezone={c.timezone} color={c.color} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dots with GSAP progress bar */}
      <div className="flex items-center gap-2 mt-4">
        {CITIES.map((c, i) => (
          <button
            key={i}
            onClick={() => swiperRef.current?.slideToLoop(i)}
            className="cursor-pointer"
            aria-label={`Show time in ${c.label}`}
            aria-current={i === active}
          >
            <span
              className={`relative rounded-full shrink-0 overflow-hidden block transition-[width] duration-300 ${
                i === active
                  ? "h-1.25 w-5.25 bg-[#0c0c0c]/20"
                  : "size-1.25 bg-[#0c0c0c] opacity-30"
              }`}
            >
              {i === active && (
                <span
                  ref={progressRef}
                  className="absolute inset-y-0 left-0 bg-[#0c0c0c] rounded-full w-0"
                />
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Label */}
      <div className="flex flex-col items-center gap-2 px-4 py-3 mt-4 w-full rounded-full backdrop-blur-2xl">
        <span className="text-base font-medium leading-[0.9] text-[#0c0c0c] opacity-50 uppercase tracking-wide whitespace-nowrap">
          {city.label}
        </span>
        <span className="text-base font-medium leading-[0.9] text-[#0c0c0c] whitespace-nowrap">
          {offsets[active] ?? ""} {times[active] ?? ""}
        </span>
      </div>
    </div>
  );
}
