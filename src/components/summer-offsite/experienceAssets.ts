import gsap from "gsap";
import {
  NEWS_DURATION,
  NEWS_EASE,
  prefersReducedMotion,
} from "@/lib/newsMotion";

// Starts a download on first use; the image is drawable once `isReady` is true.
export function loadImage(source: string, onLoad?: () => void) {
  const image = new Image();
  image.decoding = "async";
  if (onLoad) image.onload = onLoad;
  image.src = source;
  return image;
}

export function isReady(image: HTMLImageElement | null | undefined) {
  return Boolean(image?.complete && image.naturalWidth);
}

export type AssetGate = {
  begin: () => () => void;
  destroy: () => void;
};

// Keeps the canvas hidden and inert until every pending load has settled, then
// fades it in. No spinner, by design of the handoff.
export function createAssetGate(
  host: HTMLElement,
  canvas: HTMLCanvasElement,
  viewport: HTMLElement | null,
): AssetGate {
  let pending = 0;
  let loaded = false;
  let revealed = false;

  function reveal() {
    if (!loaded || revealed) return;
    revealed = true;
    gsap.set(canvas, { pointerEvents: "auto" });
    gsap.to(canvas, {
      opacity: 1,
      duration: prefersReducedMotion() ? 0 : NEWS_DURATION.reveal,
      ease: NEWS_EASE.standard,
    });
  }

  // A canvas taller than the scroll area could never be seen whole.
  function fitToViewport() {
    if (!viewport?.clientHeight) return;
    canvas.style.maxHeight = `max(6.25rem, calc(${viewport.clientHeight}px - 1.5rem))`;
  }
  const resizeObserver = new ResizeObserver(fitToViewport);
  if (viewport) resizeObserver.observe(viewport);
  fitToViewport();

  function begin() {
    pending++;
    host.setAttribute("aria-busy", "true");
    let ended = false;
    return () => {
      if (ended) return;
      ended = true;
      pending = Math.max(0, pending - 1);
      if (pending) return;
      loaded = true;
      host.removeAttribute("aria-busy");
      reveal();
    };
  }

  return {
    begin,
    destroy() {
      resizeObserver.disconnect();
      gsap.killTweensOf(canvas);
    },
  };
}
