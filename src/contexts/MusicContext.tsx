"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const TRACKS = [
  "AmiBlu",
  "Aznavour",
  "Backbeatboy",
  "BadBunny",
  "Berlioz",
  "Cheddar",
  "MaiMai",
  "Mattafix",
  "Underworld",
  "WalkFaster",
].map((name) => ({
  name: name.replace(/([a-z])([A-Z])/g, "$1 $2"),
  src: `/widgets/son/${name}.mp3`,
  cover: `/widgets/cover/${name}.png`,
}));
const INITIAL_VOLUME = 0;
const DISC_VOLUME = 0.3;
const FADE_DURATION = 1;

type MusicContextType = {
  playing: boolean;
  volume: number;
  track: (typeof TRACKS)[number];
  canPrevious: boolean;
  toggle: () => void;
  setVolume: (volume: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
};

const MusicContext = createContext<MusicContextType>({
  playing: false,
  volume: INITIAL_VOLUME,
  track: TRACKS[0],
  canPrevious: false,
  toggle: () => {},
  setVolume: () => {},
  nextTrack: () => {},
  previousTrack: () => {},
});

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolumeState] = useState(INITIAL_VOLUME);
  const [trackIndex, setTrackIndex] = useState(0);
  const trackIndexRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeRef = useRef(volume);
  const playbackRequested = useRef(false);
  const changingTrack = useRef(false);
  const playRequest = useRef(0);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const track = TRACKS[trackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // Pick once after hydration, including when Strict Mode replays this effect.
    const initial =
      trackIndexRef.current ?? Math.floor(Math.random() * TRACKS.length);
    trackIndexRef.current = initial;
    setTrackIndex(initial);
    audio.src = TRACKS[initial].src;
    audio.volume = INITIAL_VOLUME;
    return () => {
      playbackRequested.current = false;
      playRequest.current += 1;
      gsap.killTweensOf(audio);
      audio.pause();
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    gsap.killTweensOf(audio);
    if (playbackRequested.current) {
      playbackRequested.current = false;
      changingTrack.current = false;
      playRequest.current += 1;
      audio.pause();
      setPlaying(false);
      return;
    }
    setVolume(DISC_VOLUME);
  }

  function startPlayback(audio: HTMLAudioElement) {
    const request = ++playRequest.current;
    playbackRequested.current = true;
    void audio.play().catch(() => {
      // Aborting an older source must not stop a newer play request.
      if (request !== playRequest.current) return;
      playbackRequested.current = false;
      changingTrack.current = false;
      setPlaying(false);
    });
  }

  function selectTrack(nextIndex: number) {
    const audio = audioRef.current;
    if (!audio) return;
    trackIndexRef.current = nextIndex;
    setTrackIndex(nextIndex);
    gsap.killTweensOf(audio);
    changingTrack.current = true;
    // Own the source here so skipping and play() share the user's gesture.
    audio.src = TRACKS[nextIndex].src;
    audio.volume = volumeRef.current;
    if (playbackRequested.current) startPlayback(audio);
    else changingTrack.current = false;
  }

  function nextTrack() {
    selectTrack(((trackIndexRef.current ?? 0) + 1) % TRACKS.length);
  }

  function previousTrack() {
    selectTrack(
      ((trackIndexRef.current ?? 0) - 1 + TRACKS.length) % TRACKS.length,
    );
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
      if (audio.paused) startPlayback(audio);
      else {
        playbackRequested.current = true;
        setPlaying(true);
      }
    }
  }

  // Playing across a route change would leak the widget's audio onto pages
  // that have no player UI to stop it — fade it out instead of an abrupt cut.
  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;
    playbackRequested.current = false;
    changingTrack.current = false;
    playRequest.current += 1;
    setPlaying(false);

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
  }, [pathname]);

  return (
    <MusicContext.Provider
      value={{
        playing,
        volume,
        track,
        canPrevious: TRACKS.length > 1,
        toggle,
        setVolume,
        nextTrack,
        previousTrack,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        preload="none"
        onPlay={(event) => {
          changingTrack.current = false;
          if (playbackRequested.current) setPlaying(true);
          else event.currentTarget.pause();
        }}
        onPause={(event) => {
          if (changingTrack.current || event.currentTarget.ended) return;
          playbackRequested.current = false;
          playRequest.current += 1;
          setPlaying(false);
        }}
        onEnded={() => {
          if (playbackRequested.current) nextTrack();
        }}
        onError={() => {
          playbackRequested.current = false;
          changingTrack.current = false;
          playRequest.current += 1;
          setPlaying(false);
        }}
      />
    </MusicContext.Provider>
  );
}

export function useMusicPlayer() {
  return useContext(MusicContext);
}
