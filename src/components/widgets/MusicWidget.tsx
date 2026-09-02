"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useMusicPlayer } from "@/contexts/MusicContext";

gsap.registerPlugin(useGSAP);

const COVER = "/widgets/music-cover.png";

export default function MusicWidget() {
  const { playing, volume, toggle, setVolume } = useMusicPlayer();
  // Kept mounted past `playing` so the slider can animate out before React
  // removes it.
  const [sliderMounted, setSliderMounted] = useState(false);
  const discRef = useRef<HTMLButtonElement>(null);
  const vinylRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const spin = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      gsap.set(vinylRef.current, { transformOrigin: "50% 50%" });
      spin.current = gsap.to(vinylRef.current, {
        rotation: 360,
        duration: 8,
        ease: "none",
        repeat: -1,
        paused: true,
      });
    },
    { scope: discRef },
  );

  useGSAP(
    () => {
      if (playing) {
        spin.current?.play();
        setSliderMounted(true);
      } else {
        spin.current?.pause();
      }
    },
    { dependencies: [playing] },
  );

  useGSAP(
    () => {
      const slider = sliderRef.current;
      if (!slider) return;

      if (playing) {
        gsap.fromTo(
          slider,
          { autoAlpha: 0, scale: 0.9 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.35,
            ease: "back.out(1.7)",
          },
        );
      } else {
        gsap.to(slider, {
          autoAlpha: 0,
          scale: 0.9,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => setSliderMounted(false),
        });
      }
    },
    { dependencies: [playing, sliderMounted] },
  );

  function setVolumeFromPointer(clientY: number) {
    const slider = sliderRef.current;
    if (!slider) return;
    const rect = slider.getBoundingClientRect();
    // Inverted: dragging up (smaller clientY) raises the volume.
    const next = gsap.utils.clamp(0, 1, (rect.bottom - clientY) / rect.height);
    setVolume(next);
    gsap.to(volumeRef.current, {
      scaleY: next,
      transformOrigin: "center bottom",
      duration: 0.2,
      ease: "power2.out",
    });
  }

  function initVolumeBar(el: HTMLDivElement | null) {
    volumeRef.current = el;
    if (el) gsap.set(el, { scaleY: volume, transformOrigin: "center bottom" });
  }

  function onSliderPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setVolumeFromPointer(e.clientY);
  }

  function onSliderPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      setVolumeFromPointer(e.clientY);
    }
  }

  return (
    <div id="widget-music" className="flex items-stretch gap-1 w-full">
      {/* Disc */}
      <button
        ref={discRef}
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause" : "Play"}
        className="relative shrink-0 size-31.25 rounded-lg overflow-hidden cursor-pointer bg-[#0c0c0c]"
      >
        <div ref={vinylRef} className="absolute inset-1">
          <Image
            src={COVER}
            alt=""
            fill
            sizes="125px"
            className="object-cover"
          />
        </div>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[0.633rem] rounded-full bg-white" />
      </button>

      {/* Volume slider */}
      {sliderMounted && (
        <div
          ref={sliderRef}
          onPointerDown={onSliderPointerDown}
          onPointerMove={onSliderPointerMove}
          className="relative flex flex-col justify-end gap-2.5 w-full overflow-hidden rounded-lg backdrop-blur-2xl bg-[rgba(12,12,12,0.2)] px-2 py-3 cursor-ns-resize touch-none select-none"
        >
          <div
            ref={initVolumeBar}
            className="absolute inset-x-0 bottom-0 h-full bg-white"
          />
          <div className="flex items-center justify-center mix-blend-difference pointer-events-none">
            <span className="text-sm text-center leading-[0.9] tracking-[-0.015em] text-[#f5f5f5] whitespace-nowrap">
              {Math.round(volume * 100)}%
            </span>
          </div>
          <div className="absolute left-1/2 top-4 -translate-x-1/2  mix-blend-difference">
            <svg
              viewBox="0 0 9.91162 9.90303"
              fill="none"
              className="block  size-[0.62rem] shrink-0 text-white"
              aria-hidden
            >
              <path
                d="M6.73145 8.83691L2.80762 6.97168L2.71191 6.93262C2.61535 6.89929 2.51376 6.88185 2.41113 6.88184H0.680664L0.683594 3.01562H2.41113C2.54789 3.01562 2.68309 2.98537 2.80664 2.92676L6.73145 1.06348V8.83691Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.3448"
              />
              <rect
                x="8.97656"
                y="2.875"
                width="0.935053"
                height="4.15521"
                rx="0.467527"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
