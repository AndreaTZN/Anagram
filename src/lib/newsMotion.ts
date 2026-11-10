import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

// Shared motion language for news articles, ported from the Summer Offsite
// handoff (motion.js). Durations are in seconds, response rates in 1/s.

gsap.registerPlugin(CustomEase);

export const NEWS_EASE = {
  standard: CustomEase.create("newsStandard", ".22,1,.36,1"),
  exit: CustomEase.create("newsExit", ".4,0,.2,1"),
};

export const NEWS_DURATION = {
  open: 0.7,
  close: 0.48,
  reveal: 0.28,
  control: 0.2,
  title: 0.48,
  text: 0.44,
  stagger: 0.06,
  textDelay: 0.4,
  photoIn: 0.48,
  photoOut: 0.44,
};

export const NEWS_RATE = {
  zoom: 9,
  follow: 12,
  hover: 10,
  drift: 5,
};

// Fast expansion peaking 1.6% past the target at 72%, then a cubic settle that
// reaches zero velocity, so the return has no snap. Panel and image share it.
export function panelEase(t: number) {
  const peakTime = 0.72;
  const peakScale = 1.016;
  if (t <= peakTime) return peakScale * (1 - (1 - t / peakTime) ** 3);
  const settle = 1 - (1 - (t - peakTime) / (1 - peakTime)) ** 3;
  return peakScale + (1 - peakScale) * settle;
}

let reducedQuery: MediaQueryList | null = null;

// Cached: canvas loops read it every frame.
export function prefersReducedMotion() {
  reducedQuery ??= window.matchMedia("(prefers-reduced-motion: reduce)");
  return reducedQuery.matches;
}

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

// Frame-rate independent interpolation factor for a given response speed.
export function response(speed: number, dt: number) {
  return prefersReducedMotion() ? 1 : 1 - Math.exp(-Math.max(0, dt) * speed);
}

export function smooth(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

// Entry curve with a small overshoot, used by the counter's photos.
export function pop(t: number) {
  const x = clamp01(t) - 1;
  return 1 + 2.15 * x * x * x + 1.15 * x * x;
}

// Seconds since the previous frame; long gaps are capped so nothing jumps.
export function frameDelta(now: number, previous: number) {
  return previous
    ? Math.max(0, Math.min((now - previous) / 1000, 0.05))
    : 1 / 60;
}
