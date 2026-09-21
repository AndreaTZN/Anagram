"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useMusicPlayer } from "@/contexts/MusicContext";

gsap.registerPlugin(useGSAP);

export default function MusicWidget() {
  const { playing, volume, toggle, setVolume } = useMusicPlayer();
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
      } else {
        spin.current?.pause();
      }
    },
    { dependencies: [playing] },
  );

  useGSAP(
    () => {
      gsap.to(volumeRef.current, {
        scaleY: volume,
        transformOrigin: "center bottom",
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
    { dependencies: [volume] },
  );

  function setVolumeFromPointer(clientY: number) {
    const slider = sliderRef.current;
    if (!slider) return;
    const rect = slider.getBoundingClientRect();
    // Inverted: dragging up (smaller clientY) raises the volume.
    const next = gsap.utils.clamp(0, 1, (rect.bottom - clientY) / rect.height);
    setVolume(next);
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

  function onSliderKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    let next = volume;
    if (e.key === "ArrowUp" || e.key === "ArrowRight") next += 0.05;
    else if (e.key === "ArrowDown" || e.key === "ArrowLeft") next -= 0.05;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 1;
    else return;
    e.preventDefault();
    setVolume(next);
  }

  return (
    <div id="widget-music" className="flex items-stretch gap-1 w-full">
      {/* Disc */}
      <button
        id="home-music-disc"
        ref={discRef}
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause" : "Play"}
        className="relative shrink-0 size-31.25 rounded-lg overflow-hidden cursor-pointer bg-[#0c0c0c]"
      >
        <div id="home-music-vinyl" ref={vinylRef} className="absolute inset-1">
          <Image
            src={"/widgets/music-cover.png"}
            alt="Anagram studio playlist cover artwork"
            fill
            sizes="125px"
            className="object-cover"
          />
        </div>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[0.633rem] rounded-full bg-white" />
      </button>

      {/* Volume slider */}
      <div
        id="home-music-volume"
        ref={sliderRef}
        role="slider"
        tabIndex={0}
        aria-label="Music volume"
        aria-orientation="vertical"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(volume * 100)}
        onPointerDown={onSliderPointerDown}
        onPointerMove={onSliderPointerMove}
        onKeyDown={onSliderKeyDown}
        className="relative flex flex-col justify-end gap-2.5 w-full overflow-hidden rounded-lg backdrop-blur-2xl bg-[rgba(12,12,12,0.2)] px-2 py-3 cursor-ns-resize touch-none select-none"
      >
        <div
          id="home-music-volume-fill"
          ref={volumeRef}
          style={{ transform: "scaleY(0)", transformOrigin: "center bottom" }}
          className="absolute inset-x-0 bottom-0 h-full bg-white"
        />
        <div
          id="home-music-volume-label"
          className="flex items-center justify-center mix-blend-difference pointer-events-none"
        >
          <span className="text-sm text-center leading-[0.9] tracking-[-0.015em] text-[#f5f5f5] whitespace-nowrap">
            {Math.round(volume * 100)}%
          </span>
        </div>
        <div
          id="home-music-volume-icon"
          className="absolute left-1/2 top-4 -translate-x-1/2  mix-blend-difference"
        >
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
    </div>
  );
}
