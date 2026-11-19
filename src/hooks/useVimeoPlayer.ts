import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Injection queue — serializes all iframe injections with 180ms stagger to avoid buffer contention
const STAGGER_MS = 180;
const VOLUME_FADE_DURATION = 0.6;
let injectionQueue: Promise<void> = Promise.resolve();
function enqueueInjection(fn: () => Promise<boolean>): Promise<void> {
  // Only stagger after a real injection: entries that went stale while
  // queued (fast scroll) must not delay the video the user stopped on.
  injectionQueue = injectionQueue.then(fn).then((injected) => {
    if (injected) return new Promise<void>((r) => setTimeout(r, STAGGER_MS));
  });
  return injectionQueue;
}

// Players only exist while their block is within this distance of the
// screen: created on approach, fully destroyed once far away. A paused
// iframe still holds its document, player JS and decoded video, so keeping
// every player of a long case page alive is what weighs on scroll.
const LIVE_MARGIN = "200%";

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
  // Never destroy the player once created, e.g. when it carries user state
  // (sound on, volume) that a fresh muted player would silently drop.
  keepAlive?: boolean;
};

export function useVimeoPlayer({ embedRef, dataSrc, dataRatio, title, keepAlive = false }: Options) {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const el = embedRef.current;
    if (!el || !dataSrc) return;

    let player: any = null;
    let st: InstanceType<typeof ScrollTrigger> | null = null;
    let iframeWrapper: HTMLDivElement | null = null;
    let destroyed = false;
    let fadeTween: gsap.core.Tween | null = null;
    let mounted = false;
    // Bumped on every mount/unmount so an injection still waiting in the
    // queue for a block that has since left the live zone bails out.
    let mountId = 0;

    const ratio = dataRatio || "16/9";
    const quality = isMobile() ? "720p" : "auto";
    const scroller = document.getElementById("smooth-scroll-container") ?? undefined;

    async function inject(id: number): Promise<boolean> {
      const stale = () => destroyed || id !== mountId;
      if (stale() || !el) return false;

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

      const Vimeo = (window as any).Vimeo;
      const created = new Vimeo.Player(iframe);
      player = created;
      playerRef.current = created;
      activePlayers.add(created);

      // Muted and volume are independent in the Vimeo SDK — getVolume()
      // stays at its default even while muted, so mute state must be
      // checked first or every silent background video would "fade".
      function readUnmutedVolume(p: any): Promise<number | null> {
        return p
          .getMuted()
          .then((muted: boolean) => {
            if (destroyed || playerRef.current !== p || muted) return null;
            return p.getVolume().then((vol: number) => (vol > 0 ? vol : null));
          })
          .catch(() => null);
      }

      // Leaving the viewport pauses the video outright — if the viewer had
      // turned sound on, that's an abrupt cut. Duck the volume to 0 first,
      // then pause, and restore it so playback resumes at the same level.
      function fadeOutAndPause() {
        fadeTween?.kill();
        const p = player;
        if (!p) return;
        readUnmutedVolume(p).then((vol) => {
          if (destroyed || playerRef.current !== p) return;
          if (vol === null) {
            p.pause().catch(() => {});
            return;
          }
          const proxy = { v: vol };
          fadeTween = gsap.to(proxy, {
            v: 0,
            duration: VOLUME_FADE_DURATION,
            ease: "power1.out",
            onUpdate: () => p.setVolume(proxy.v).catch(() => {}),
            onComplete: () => {
              p.pause().catch(() => {});
              p.setVolume(vol).catch(() => {});
            },
          });
        });
      }

      // Mirrors fadeOutAndPause: ramp back up from 0 instead of resuming at
      // full volume the instant the video re-enters the viewport.
      function play() {
        fadeTween?.kill();
        fadeTween = null;
        const p = player;
        if (!p) return;
        setTimeout(() => {
          if (destroyed || playerRef.current !== p) return;
          readUnmutedVolume(p).then((vol) => {
            if (destroyed || playerRef.current !== p) return;
            if (vol === null) {
              p.play().catch(() => {});
              return;
            }
            p.setVolume(0).catch(() => {});
            p.play().catch(() => {});
            const proxy = { v: 0 };
            fadeTween = gsap.to(proxy, {
              v: vol,
              duration: VOLUME_FADE_DURATION,
              ease: "power1.out",
              onUpdate: () => p.setVolume(proxy.v).catch(() => {}),
            });
          });
        }, 120);
      }

      st = ScrollTrigger.create({
        trigger: el,
        scroller,
        start: "top bottom",
        end: "bottom top",
        markers: false,
        onEnter: play,
        onEnterBack: play,
        onLeave: fadeOutAndPause,
        onLeaveBack: fadeOutAndPause,
      });

      // On ready: play if already in viewport, pause otherwise
      created.ready().then(() => {
        if (stale()) return;
        if (st?.isActive) {
          setTimeout(() => {
            if (!stale()) created.play().catch(() => {});
          }, 120);
        } else {
          created.pause().catch(() => {});
        }
      });

      return true;
    }

    async function mount() {
      if (mounted) return;
      mounted = true;
      const id = ++mountId;
      await loadVimeoSDK();
      if (destroyed || id !== mountId) return;
      await enqueueInjection(() => inject(id));
    }

    function unmount() {
      mounted = false;
      mountId++;
      playerRef.current = null;
      st?.kill();
      st = null;
      fadeTween?.kill();
      fadeTween = null;
      if (player) {
        activePlayers.delete(player);
        player.destroy().catch(() => {});
        player = null;
      }
      iframeWrapper?.remove();
      iframeWrapper = null;
    }

    const liveSt = ScrollTrigger.create({
      trigger: el,
      scroller,
      start: `top bottom+=${LIVE_MARGIN}`,
      end: `bottom top-=${LIVE_MARGIN}`,
      onToggle: (self) => {
        if (self.isActive) mount();
        else if (!keepAlive) unmount();
      },
    });

    return () => {
      destroyed = true;
      liveSt.kill();
      unmount();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSrc, dataRatio]);

  return { playerRef };
}
