"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import SlidingDots from "@/components/SlidingDots";

const PHOTO_COUNT = 52;
const photos = Array.from({ length: PHOTO_COUNT }, (_, i) => ({
  src: `/widgets/carousel/${i + 1}.webp`,
  alt: `Life at Anagram, photo ${i + 1}`,
}));

const DELAY = 4000;
const FADE_SPEED = 800;

// The fade effect stacks every slide in view, so lazy loading would fetch all
// of them at once: only the active slide and its neighbours get an image.
function isNearSlide(index: number, active: number) {
  const distance = Math.abs(index - active);
  return Math.min(distance, PHOTO_COUNT - distance) <= 1;
}

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
        () => gsap.set(progressRef.current, { x: 0, xPercent: -100 }),
        CLOSE_DURATION,
      );
      return () => clearTimeout(id);
    }
    // Swiper only starts the autoplay delay once the fade has ended, so a full
    // cycle lasts the fade plus the delay.
    gsap.fromTo(
      progressRef.current,
      { x: 0, xPercent: -100 },
      { xPercent: 0, duration: (DELAY + FADE_SPEED) / 1000, ease: "none" },
    );
  }, [activeSlide, active]);

  return (
    <div
      id="home-widgets-photo-carousel"
      className="relative h-full w-full rounded-lg overflow-hidden"
    >
      <Swiper
        loop
        effect="fade"
        speed={FADE_SPEED}
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
        className="w-full h-full cursor-pointer"
      >
        {photos.map((photo, i) => (
          <SwiperSlide key={i}>
            {isNearSlide(i, activeSlide) && (
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="18.75rem"
                className="object-cover"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <SlidingDots
        id="home-widgets-photo-carousel-dots"
        count={PHOTO_COUNT}
        active={activeSlide}
        onSelect={(i) => swiperRef.current?.slideToLoop(i)}
        progressRef={progressRef}
        className="absolute bottom-[0.65rem] left-1/2 -translate-x-1/2 z-10 flex items-center px-2 rounded-full backdrop-blur-2xl bg-[rgba(12,12,12,0.2)]"
      />
    </div>
  );
}
