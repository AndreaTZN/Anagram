"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

const photos = ["/studio/1.webp", "/studio/2.webp", "/studio/3.webp"];

export default function PhotoCarouselWidget() {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;
    gsap.killTweensOf(progressRef.current);
    gsap.fromTo(
      progressRef.current,
      { width: "0%" },
      { width: "100%", duration: 4, ease: "none" },
    );
  }, [activeSlide]);

  return (
    <div className="relative w-80 aspect-square rounded-lg overflow-hidden bg-[#d9d9d9]">
      <Swiper
        loop
        effect="fade"
        modules={[EffectFade, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        onSwiper={(s) => {
          swiperRef.current = s;
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
