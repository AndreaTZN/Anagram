import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Injection queue — serializes all iframe injections with 180ms stagger to avoid buffer contention
const STAGGER_MS = 180;
let injectionQueue: Promise<void> = Promise.resolve();
function enqueueInjection(fn: () => Promise<void>): Promise<void> {
  injectionQueue = injectionQueue.then(fn).then(
    () => new Promise((r) => setTimeout(r, STAGGER_MS))
  );
  return injectionQueue;
}

// Debounced ScrollTrigger.refresh() — batches refreshes from multiple videos
// injecting in quick succession into a single layout recalculation, instead
// of one expensive refresh per video (which caused scroll jank on Safari).
let refreshTimeout: ReturnType<typeof setTimeout> | null = null;
function scheduleRefresh() {
  if (refreshTimeout) clearTimeout(refreshTimeout);
  refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);
}

// SDK singleton — loaded once across all instances
let sdkPromise: Promise<void> | null = null;
function loadVimeoSDK(): Promise<void> {
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve) => {
    if ((window as any).Vimeo) return resolve();
    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
  return sdkPromise;
}

// Mobile unlock — one listener for all active players
const activePlayers = new Set<any>();
let mobileUnlocked = false;
let mobileListenersRegistered = false;

function unlockOnGesture() {
  if (mobileUnlocked || activePlayers.size === 0) return;
  mobileUnlocked = true;
  activePlayers.forEach((p) => {
    p.setMuted(true).catch(() => {});
    p.play().then(() => p.pause()).catch(() => {});
  });
  window.removeEventListener("touchstart", unlockOnGesture);
  window.removeEventListener("touchmove", unlockOnGesture);
}

function ensureMobileListeners() {
  if (mobileListenersRegistered) return;
  mobileListenersRegistered = true;
  window.addEventListener("touchstart", unlockOnGesture, { passive: true });
  window.addEventListener("touchmove", unlockOnGesture, { passive: true });
}

const isMobile = () => window.innerWidth < 992;

type Options = {
  embedRef: RefObject<HTMLDivElement | null>;
  dataSrc: string;
  dataRatio?: string;
  title?: string;
};

export function useVimeoPlayer({ embedRef, dataSrc, dataRatio, title }: Options) {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const el = embedRef.current;
    if (!el || !dataSrc) return;

    let player: any = null;
    let st: InstanceType<typeof ScrollTrigger> | null = null;
    let iframeWrapper: HTMLDivElement | null = null;
    let destroyed = false;

    const ratio = dataRatio || "16/9";
    const quality = isMobile() ? "720p" : "auto";

    async function inject() {
      if (destroyed || !el) return;

      ensureMobileListeners();

      const wrapper = document.createElement("div");
      wrapper.style.cssText = `
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%) scale(1.01);
        min-width:100%;
        min-height:100%;
        aspect-ratio:${ratio};
        z-index:2;
        pointer-events:none;
      `;

      const iframe = document.createElement("iframe");
      iframe.src = `https://player.vimeo.com/video/${dataSrc}?muted=1&autopause=0&controls=0&loop=1&background=1&quality=${quality}`;
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture; encrypted-media");
      iframe.setAttribute("title", title || "Vimeo video player");
      iframe.style.cssText = "position:absolute; top:0; left:0; width:100%; height:100%;";

      wrapper.appendChild(iframe);
      el.appendChild(wrapper);
      iframeWrapper = wrapper;

      // Check again — component may have unmounted while waiting in queue
      if (destroyed) {
        el.removeChild(wrapper);
        iframeWrapper = null;
        return;
      }

      const Vimeo = (window as any).Vimeo;
      player = new Vimeo.Player(iframe);
      playerRef.current = player;
      activePlayers.add(player);

      // Check again — cleanup may have run between player creation and now
      if (destroyed) {
        player.pause().catch(() => {});
        activePlayers.delete(player);
        player = null;
        el.removeChild(wrapper);
        return;
      }

      const scroller = document.getElementById("smooth-scroll-container");

      st = ScrollTrigger.create({
        trigger: el,
        scroller: scroller ?? undefined,
        start: "top bottom",
        end: "bottom top",
        markers: false,
        onEnter: () => setTimeout(() => player?.play().catch(() => {}), 120),
        onEnterBack: () => setTimeout(() => player?.play().catch(() => {}), 120),
        onLeave: () => player?.pause().catch(() => {}),
        onLeaveBack: () => player?.pause().catch(() => {}),
      });

      scheduleRefresh();

      // On ready: play if already in viewport, pause otherwise
      player.ready().then(() => {
        if (destroyed) return;
        if (st?.isActive) {
          setTimeout(() => player?.play().catch(() => {}), 120);
        } else {
          player?.pause().catch(() => {});
        }
      });
    }

    async function init() {
      await loadVimeoSDK();
      if (destroyed) return;
      await enqueueInjection(inject);
    }

    init();

    return () => {
      destroyed = true;
      playerRef.current = null;
      st?.kill();
      if (player) {
        player.pause().catch(() => {});
        activePlayers.delete(player);
        player = null;
      }
      if (iframeWrapper && el.contains(iframeWrapper)) {
        el.removeChild(iframeWrapper);
        iframeWrapper = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSrc, dataRatio]);

  return { playerRef };
}
