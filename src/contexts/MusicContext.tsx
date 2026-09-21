"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const TRACK = "/widgets/music-track.mp3";
const INITIAL_VOLUME = 0;
const DISC_VOLUME = 0.3;
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
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = INITIAL_VOLUME;
    return () => {
      gsap.killTweensOf(audio);
      audio.pause();
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    gsap.killTweensOf(audio);
    if (playing && !audio.paused) {
      audio.pause();
      return;
    }
    setVolume(DISC_VOLUME);
  }

  function setVolume(next: number) {
    const clamped = gsap.utils.clamp(0, 1, next);
    volumeRef.current = clamped;
    setVolumeState(clamped);

    const audio = audioRef.current;
    if (!audio) return;
    // A user adjustment takes priority over a pending route-change fade.
    gsap.killTweensOf(audio);
    audio.volume = clamped;
    if (clamped > 0) {
      if (audio.paused) audio.play().catch(() => {});
      else setPlaying(true);
    }
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
      <audio
        ref={audioRef}
        src={TRACK}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setPlaying(false)}
      />
    </MusicContext.Provider>
  );
}

export function useMusicPlayer() {
  return useContext(MusicContext);
}
