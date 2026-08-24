"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const TRACK = "/widgets/music-track.mp3";
const INITIAL_VOLUME = 0.35;
const FADE_DURATION = 1;

type MusicContextType = {
  playing: boolean;
  volume: number;
  toggle: () => void;
  setVolume: (volume: number) => void;
};

const MusicContext = createContext<MusicContextType>({
  playing: false,
  volume: INITIAL_VOLUME,
  toggle: () => {},
  setVolume: () => {},
});

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolumeState] = useState(INITIAL_VOLUME);
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeRef = useRef(volume);
  volumeRef.current = volume;
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    gsap.killTweensOf(audio);
    if (!playing) {
      audio.volume = volumeRef.current;
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
    setPlaying((v) => !v);
  }

  function setVolume(next: number) {
    setVolumeState(next);
    if (audioRef.current) audioRef.current.volume = next;
  }

  // Playing across a route change would leak the widget's audio onto pages
  // that have no player UI to stop it — fade it out instead of an abrupt cut.
  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    const audio = audioRef.current;
    if (!audio || audio.paused) return;

    gsap.killTweensOf(audio);
    gsap.to(audio, {
      volume: 0,
      duration: FADE_DURATION,
      ease: "power1.out",
      onComplete: () => {
        audio.pause();
        audio.volume = volumeRef.current;
      },
    });
    setPlaying(false);
  }, [pathname]);

  return (
    <MusicContext.Provider value={{ playing, volume, toggle, setVolume }}>
      {children}
      <audio ref={audioRef} src={TRACK} loop preload="none" />
    </MusicContext.Provider>
  );
}

export function useMusicPlayer() {
  return useContext(MusicContext);
}
