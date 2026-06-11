"use client";

import Image from "next/image";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { useVimeoPlayer } from "@/hooks/useVimeoPlayer";

const BAR_COUNT = 3;

type Props = {
  dataSrc: string;
  dataRatio?: string;
  src: string;
  alt?: string;
  priority?: boolean;
};

export default function VimeoSound({ dataSrc, dataRatio, src, alt = "", priority = false }: Props) {
  const embedRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  const { playerRef } = useVimeoPlayer({ embedRef, dataSrc, dataRatio });

  useLayoutEffect(() => {
    barRefs.current.forEach((bar) => {
      if (bar) gsap.set(bar, { scaleY: 0.2 });
    });
  }, []);

  useEffect(() => {
    tweensRef.current.forEach((t) => t?.kill());
    tweensRef.current = [];

    if (!isMuted) {
      tweensRef.current = barRefs.current.map((bar, i) => {
        if (!bar) return null!;
        return gsap.to(bar, {
          scaleY: 1,
          duration: 0.28 + i * 0.07,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.1,
        });
      });
    } else {
      barRefs.current.forEach((bar) => {
        if (bar) gsap.to(bar, { scaleY: 0.2, duration: 0.25, ease: "power2.out" });
      });
    }

    return () => {
      tweensRef.current.forEach((t) => t?.kill());
    };
  }, [isMuted]);

  function toggleSound() {
    const player = playerRef.current;
    if (!player) return;
    if (isMuted) {
      player.setMuted(false).catch(() => {});
      player.setVolume(1).catch(() => {});
    } else {
      player.setMuted(true).catch(() => {});
    }
    setIsMuted((prev) => !prev);
  }

  return (
    <div className="vimeosound_component relative w-full aspect-video overflow-hidden cursor-pointer" onClick={toggleSound}>
      <div
        ref={embedRef}
        data-src={dataSrc}
        data-ratio={dataRatio}
        className="projet-card_embed-vimeo-contain relative w-full h-full overflow-hidden"
      >
        <Image
          src={src}
          alt={alt}
          fill
          loading={priority ? undefined : "lazy"}
          priority={priority}
          sizes="100vw"
          className="projet-card_vimeo-image object-cover z-1 scale-[1.01]"
        />
      </div>

      <div
        id="vimeosound-cta"
        className="absolute bottom-4 right-4 flex items-center gap-4 bg-[rgba(12,12,12,0.2)] backdrop-blur-[17px] px-4 py-3 rounded-full z-10"
      >
        <div className="flex items-center gap-0.75">
          {Array.from({ length: BAR_COUNT }).map((_, i) => (
            <div
              key={i}
              ref={(el) => { barRefs.current[i] = el; }}
              className="w-0.5 h-2 bg-white rounded-full"
            />
          ))}
        </div>
        <span className="text-white text-sm opacity-75 leading-[0.9]">
          {isMuted ? "Sound Off" : "Sound On"}
        </span>
      </div>
    </div>
  );
}
