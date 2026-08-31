"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

const photos = ["/studio/1.webp", "/studio/2.webp", "/studio/3.webp"];

const DELAY = 4000;

// WidgetPanel's open timeline runs ~1.07s and closes with timeScale(1.8), so
// the panel is gone after ~0.6s — plus a margin before the carousel rewinds.
const CLOSE_DURATION = 700;

export default function PhotoCarouselWidget({ active }: { active: boolean }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  // The panel stays mounted while closed, so the carousel would otherwise cycle
  // and burn a GSAP tween per slide with nothing on screen.
  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay) return;

    if (active) {
      swiper.autoplay.start();
      return;
    }

    swiper.autoplay.stop();
    // Rewinding straight away would show the jump back to slide 1 while the
    // panel is still fading out, so it waits for the close to finish.
    const id = setTimeout(() => swiper.slideToLoop(0, 0), CLOSE_DURATION);
    return () => clearTimeout(id);
  }, [active]);

  useEffect(() => {
    if (!progressRef.current) return;
    gsap.killTweensOf(progressRef.current);
    // Left where it stopped: resetting it now would be visible mid-close. The
    // rewind below puts it back to 0 once the panel is gone.
    if (!active) {
      const id = setTimeout(
        () => gsap.set(progressRef.current, { width: "0%" }),
        CLOSE_DURATION,
      );
      return () => clearTimeout(id);
    }
    gsap.fromTo(
      progressRef.current,
      { width: "0%" },
      { width: "100%", duration: DELAY / 1000, ease: "none" },
    );
  }, [activeSlide, active]);

  return (
    <div className="relative w-80 aspect-square rounded-lg overflow-hidden bg-[#d9d9d9]">
      <Swiper
        loop
        effect="fade"
        modules={[EffectFade, Autoplay]}
        autoplay={{ delay: DELAY, disableOnInteraction: false }}
        onSwiper={(s) => {
          swiperRef.current = s;
          if (!active) s.autoplay?.stop();
        }}
        onClick={(s) => {
          s.slideNext();
          s.autoplay?.start(); // relance le timer complet
        }}
        onSlideChange={(s) => setActiveSlide(s.realIndex)}
        className="w-full h-full"
      >
        {photos.map((src, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-[0.65rem] left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-2 py-2 rounded-full backdrop-blur-2xl bg-[rgba(12,12,12,0.2)]">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => swiperRef.current?.slideToLoop(i)}
            className="cursor-pointer"
            aria-label={`Go to photo ${i + 1}`}
            aria-current={i === activeSlide}
          >
            <span
              className={`relative rounded-full shrink-0 overflow-hidden block transition-[width] duration-300 ${
                i === activeSlide
                  ? "h-1.25 w-5.25 bg-white/30"
                  : "size-1.25 bg-white opacity-30"
              }`}
            >
              {i === activeSlide && (
                <span
                  ref={progressRef}
                  className="absolute inset-y-0 left-0 bg-white rounded-full w-0"
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
