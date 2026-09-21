"use client";

import Image from "next/image";
import { useId, useRef, useState, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useVimeoPlayer } from "@/hooks/useVimeoPlayer";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BAR_COUNT = 3;
const AUDIO_SETTINGS = {
  transitionDistance: 4,
  lowPassStartHz: 18_000,
  lowPassEndHz: 278,
  highPassHz: 33,
  reverbLowPassHz: 4_500,
  reverbAmount: 0.2,
  distortionAmount: 0.18,
  bassBoostDb: 3.5,
  stereoPan: -0.08,
  finalVolume: 0.5,
  filterSmoothingSeconds: 0.2,
  mixSmoothingSeconds: 0.22,
  volumeSmoothingSeconds: 0.28,
};

function smootherStep(progress: number) {
  return progress ** 3 * (progress * (progress * 6 - 15) + 10);
}

function createDistortionCurve(amount: number) {
  const curve = new Float32Array(2_048);
  const strength = amount * 12;

  for (let index = 0; index < curve.length; index += 1) {
    const input = (index * 2) / curve.length - 1;
    curve[index] = ((1 + strength) * input) / (1 + strength * Math.abs(input));
  }

  return curve;
}

function createImpulseResponse(context: AudioContext) {
  const length = Math.floor(context.sampleRate * 0.42);
  const impulse = context.createBuffer(2, length, context.sampleRate);

  for (let channel = 0; channel < impulse.numberOfChannels; channel += 1) {
    const samples = impulse.getChannelData(channel);
    for (let index = 0; index < length; index += 1) {
      const decay = (1 - index / length) ** 3.2;
      samples[index] = (Math.random() * 2 - 1) * decay;
    }
  }

  return impulse;
}

function createScrollAudio(video: HTMLVideoElement) {
  const context = new AudioContext();
  const highPass = context.createBiquadFilter();
  const lowShelf = context.createBiquadFilter();
  const distortion = context.createWaveShaper();
  const lowPass = context.createBiquadFilter();
  const reverbTone = context.createBiquadFilter();
  const convolver = context.createConvolver();
  const wetGain = context.createGain();
  const dryGain = context.createGain();
  const panner = context.createStereoPanner();
  const masterGain = context.createGain();

  highPass.type = "highpass";
  highPass.frequency.value = AUDIO_SETTINGS.highPassHz;
  highPass.Q.value = 1.4;
  lowShelf.type = "lowshelf";
  lowShelf.frequency.value = 180;
  lowShelf.gain.value = AUDIO_SETTINGS.bassBoostDb;
  lowPass.type = "lowpass";
  lowPass.Q.value = 0.72;
  reverbTone.type = "lowpass";
  reverbTone.frequency.value = AUDIO_SETTINGS.reverbLowPassHz;
  convolver.buffer = createImpulseResponse(context);
  panner.pan.value = AUDIO_SETTINGS.stereoPan;
  distortion.oversample = "4x";

  const source = context.createMediaElementSource(video);
  source
    .connect(highPass)
    .connect(lowShelf)
    .connect(distortion)
    .connect(lowPass);
  lowPass.connect(dryGain).connect(panner);
  lowPass
    .connect(reverbTone)
    .connect(convolver)
    .connect(wetGain)
    .connect(panner);
  panner.connect(masterGain).connect(context.destination);

  function update(progress: number, immediate = false) {
    const now = context.currentTime;
    const set = (parameter: AudioParam, value: number, smoothing: number) => {
      if (immediate) {
        parameter.cancelScheduledValues(now);
        parameter.setValueAtTime(value, now);
      } else {
        parameter.setTargetAtTime(value, now, smoothing);
      }
    };

    const cutoff =
      AUDIO_SETTINGS.lowPassStartHz *
      (AUDIO_SETTINGS.lowPassEndHz / AUDIO_SETTINGS.lowPassStartHz) ** progress;

    set(lowPass.frequency, cutoff, AUDIO_SETTINGS.filterSmoothingSeconds);
    set(
      wetGain.gain,
      progress * AUDIO_SETTINGS.reverbAmount,
      AUDIO_SETTINGS.mixSmoothingSeconds,
    );
    set(dryGain.gain, 1 - progress * 0.12, AUDIO_SETTINGS.mixSmoothingSeconds);
    set(
      masterGain.gain,
      1 - progress * (1 - AUDIO_SETTINGS.finalVolume),
      AUDIO_SETTINGS.volumeSmoothingSeconds,
    );
    distortion.curve = createDistortionCurve(
      progress * AUDIO_SETTINGS.distortionAmount,
    );
  }

  return {
    context,
    update,
    dispose() {
      for (const node of [
        source,
        highPass,
        lowShelf,
        distortion,
        lowPass,
        reverbTone,
        convolver,
        wetGain,
        dryGain,
        panner,
        masterGain,
      ]) {
        node.disconnect();
      }
      void context.close().catch(() => {});
    },
  };
}

type Props = {
  dataSrc: string;
  videoSrc?: string;
  dataRatio?: string;
  src: string;
  alt?: string;
  priority?: boolean;
};

export default function VimeoSound(props: Props) {
  // A media element can only be attached to one Web Audio source in its lifetime.
  return <VimeoSoundPlayer key={props.videoSrc ?? props.dataSrc} {...props} />;
}

function VimeoSoundPlayer({
  dataSrc,
  videoSrc,
  dataRatio,
  src,
  alt = "",
  priority = false,
}: Props) {
  const embedRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const nativeSoundRef = useRef<((enabled: boolean) => Promise<void>) | null>(
    null,
  );
  const idPrefix = `case-sound-${useId()
    .replace(/[^a-z0-9-]/gi, "")
    .toLowerCase()}`;
  const [isMuted, setIsMuted] = useState(true);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  const { playerRef } = useVimeoPlayer({
    embedRef,
    dataSrc: videoSrc ? "" : dataSrc,
    dataRatio,
    title: alt,
  });

  useGSAP(
    () => {
      const video = videoRef.current;
      const scroller = document.getElementById("smooth-scroll-container");
      if (!video || !videoSrc || !scroller) return;

      let audio: ReturnType<typeof createScrollAudio> | null = null;
      let disposed = false;
      let soundRequest = 0;
      const motion = { progress: 0 };
      let visibility: ScrollTrigger | undefined;

      const syncPlayback = () => {
        if (disposed) return;
        // Audible playback must continue offscreen for the four-panel audio effect.
        if (!document.hidden && (visibility?.isActive || !video.muted)) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      };

      gsap.to(motion, {
        progress: 1,
        ease: smootherStep,
        onUpdate: () => audio?.update(motion.progress),
        scrollTrigger: {
          trigger: video,
          scroller,
          start: "top center",
          end: () =>
            `+=${video.offsetHeight * AUDIO_SETTINGS.transitionDistance}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      visibility = ScrollTrigger.create({
        trigger: video,
        scroller,
        start: "top bottom",
        end: "bottom top",
        onToggle: syncPlayback,
        onRefresh: syncPlayback,
      });

      nativeSoundRef.current = async (enabled) => {
        const request = ++soundRequest;
        if (!enabled) {
          video.muted = true;
          syncPlayback();
          return;
        }

        try {
          audio ??= createScrollAudio(video);
          // Apply the current scroll position before unmuting to avoid a loud first frame.
          audio.update(motion.progress, true);
          const resume = audio.context.resume();
          video.muted = false;
          await Promise.all([resume, video.play()]);
        } catch (error) {
          if (disposed || request !== soundRequest) return;
          video.muted = true;
          syncPlayback();
          console.error("Unable to enable video audio", error);
        }
      };

      document.addEventListener("visibilitychange", syncPlayback);
      syncPlayback();

      return () => {
        disposed = true;
        soundRequest += 1;
        nativeSoundRef.current = null;
        document.removeEventListener("visibilitychange", syncPlayback);
        video.muted = true;
        video.pause();
        audio?.dispose();
      };
    },
    { dependencies: [videoSrc], revertOnUpdate: true },
  );

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
        if (bar)
          gsap.to(bar, { scaleY: 0.2, duration: 0.25, ease: "power2.out" });
      });
    }

    return () => {
      tweensRef.current.forEach((t) => t?.kill());
    };
  }, [isMuted]);

  function toggleSound() {
    if (videoSrc) {
      void nativeSoundRef.current?.(videoRef.current?.muted ?? true);
      return;
    }
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
    <div
      id={idPrefix}
      className="vimeosound_component relative w-full aspect-video overflow-hidden cursor-pointer"
      onClick={toggleSound}
    >
      <div
        ref={embedRef}
        id={`${idPrefix}-media`}
        data-src={dataSrc}
        data-ratio={dataRatio}
        className="projet-card_embed-vimeo-contain relative w-full h-full overflow-hidden"
      >
        {videoSrc ? (
          <video
            ref={videoRef}
            id={`${idPrefix}-video`}
            crossOrigin="anonymous"
            src={videoSrc}
            poster={src}
            aria-label={alt}
            preload={priority ? "auto" : "metadata"}
            loop
            muted
            playsInline
            onVolumeChange={(event) => setIsMuted(event.currentTarget.muted)}
            className="absolute inset-0 w-full h-full object-cover scale-[1.01]"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            loading={priority ? undefined : "lazy"}
            priority={priority}
            sizes="100vw"
            className="projet-card_vimeo-image object-cover z-1 scale-[1.01]"
          />
        )}
      </div>

      <button
        type="button"
        id={`${idPrefix}-toggle`}
        aria-label={isMuted ? "Enable video sound" : "Mute video sound"}
        aria-pressed={!isMuted}
        onClick={(event) => {
          event.stopPropagation();
          toggleSound();
        }}
        className="absolute bottom-4 right-4 flex items-center gap-4 bg-[rgba(12,12,12,0.2)] backdrop-blur-[17px] px-4 py-3 rounded-full z-10"
      >
        <div id={`${idPrefix}-levels`} className="flex items-center gap-0.75">
          {Array.from({ length: BAR_COUNT }).map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                barRefs.current[i] = el;
              }}
              className="w-0.5 h-2 bg-white rounded-full"
            />
          ))}
        </div>
        <span className="text-white text-sm opacity-75 leading-[0.9]">
          {isMuted ? "Sound Off" : "Sound On"}
        </span>
      </button>
    </div>
  );
}
