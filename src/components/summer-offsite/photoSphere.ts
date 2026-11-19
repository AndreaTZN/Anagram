import {
  NEWS_RATE,
  frameDelta,
  prefersReducedMotion,
  response,
} from "@/lib/newsMotion";
import { isReady, loadImage, type AssetGate } from "./experienceAssets";
import { OFFSITE_PHOTOS } from "./photos";

type Bounds = {
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  alpha: number;
};
type Hit = Bounds & { i: number };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function contains(b: Bounds | null | undefined, x: number, y: number) {
  return (
    Boolean(b) &&
    Math.abs(x - b!.x) <= b!.w / 2 &&
    Math.abs(y - b!.y) <= b!.h / 2
  );
}

// XP1: Fibonacci photo sphere projected into Canvas 2D, with drag inertia and zoom.
export function createPhotoSphere(
  canvas: HTMLCanvasElement,
  _host: HTMLElement,
  gate: AssetGate,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const sources = OFFSITE_PHOTOS.sphere;
  const listeners = new AbortController();
  const { signal } = listeners;
  let destroyed = false;

  let width = 568;
  let height = 650;
  let visible = false;
  let frame = 0;
  let last = 0;
  let life = 0;
  let rotation = 0;
  let hover = -1;
  let focus = -1;
  let opening = false;
  let amount = 0;
  let tiltX = 0;
  let tiltY = 0;
  let targetX = 0;
  let targetY = 0;
  let hits: Hit[] = [];
  let focusBounds: Bounds | null = null;
  let pitchRotation = 0;
  let spin = 0;
  let pitchSpin = 0;
  let dragging = false;
  let pressed = false;
  let lastPointerX = 0;
  let lastPointerY = 0;
  let lastPointerTime = 0;
  let startX = 0;
  let startY = 0;
  let suppressClick = false;

  const weights = sources.map(() => 0);
  // Uniformly distributed surface points; every photograph is used once.
  const points = sources.map((_, i) => {
    const y = 1 - (2 * (i + 0.5)) / sources.length;
    const r = Math.sqrt(1 - y * y);
    const angle = i * Math.PI * (3 - Math.sqrt(5));
    return { x: Math.cos(angle) * r, y, z: Math.sin(angle) * r };
  });
  // Thumbnails draw the sphere; a photo's full version loads once it's enlarged.
  const photos = sources.map(() => {
    const thumb = new Image();
    thumb.decoding = "async";
    return { thumb, full: null as HTMLImageElement | null };
  });

  function enlarge(i: number) {
    focus = i;
    opening = true;
    photos[i].full ??= loadImage(sources[i].full, invalidate);
  }

  let loadingStarted = false;
  function loadPhotos() {
    if (loadingStarted) return;
    loadingStarted = true;
    const done = gate.begin();
    let remaining = photos.length;
    photos.forEach(({ thumb }, i) => {
      const settled = () => {
        remaining -= 1;
        if (!remaining) done();
        invalidate();
      };
      thumb.addEventListener("load", settled, { once: true, signal });
      thumb.addEventListener("error", settled, { once: true, signal });
      thumb.src = sources[i].thumb;
    });
  }

  function base(i: number): Bounds {
    const p = points[i];
    const a = rotation + tiltX * 0.11;
    const c = Math.cos(a);
    const s = Math.sin(a);
    const x = p.x * c + p.z * s;
    const z = -p.x * s + p.z * c;
    const pitch = 0.1 + pitchRotation + tiltY * 0.09;
    const py = p.y * Math.cos(pitch) - z * Math.sin(pitch);
    const pz = p.y * Math.sin(pitch) + z * Math.cos(pitch);
    // Perspective depth is kept subtle so rear photographs remain readable.
    const perspective = 1 / (1 - pz * 0.14);
    const radius = Math.min(width * 0.385, height * 0.385);
    const w = width * 0.075 * perspective * (1 + weights[i] * 0.07);
    const { thumb } = photos[i];
    const h = (w * thumb.naturalHeight) / (thumb.naturalWidth || 1);
    const float = prefersReducedMotion()
      ? 0
      : Math.sin(life * 0.42 + i * 1.7) * 1.2;
    return {
      x: width / 2 + x * radius * perspective,
      y: height / 2 - py * radius * perspective + float,
      w,
      h,
      z: pz,
      alpha: 0.48 + (0.52 * (pz + 1)) / 2,
    };
  }

  function active() {
    return visible && !document.hidden;
  }

  function invalidate() {
    if (!destroyed && !frame)
      frame = requestAnimationFrame((time) => draw(time, true));
  }

  function draw(time: number, prepared = false) {
    frame = 0;
    if (!active() && !prepared) {
      last = 0;
      return;
    }
    const reduced = prefersReducedMotion();
    const dt = frameDelta(time, last);
    last = time;
    life += dt;
    const ease = response(NEWS_RATE.zoom, dt);
    const soft = response(NEWS_RATE.drift, dt);
    tiltX = lerp(tiltX, opening ? 0 : targetX, soft);
    tiltY = lerp(tiltY, opening ? 0 : targetY, soft);
    amount = lerp(amount, opening ? 1 : 0, ease);
    // Gradually hold the sphere when inspecting an image; resume on return.
    if (!dragging && !opening) {
      rotation += (reduced ? 0 : dt * 0.065) * (1 - amount) + spin * dt;
      pitchRotation = Math.max(
        -1.25,
        Math.min(1.25, pitchRotation + pitchSpin * dt),
      );
      spin *= Math.exp(-dt * 5);
      pitchSpin *= Math.exp(-dt * 6);
      if (Math.abs(spin) < 0.005) spin = 0;
      if (Math.abs(pitchSpin) < 0.005) pitchSpin = 0;
    }
    if (!opening && amount < 0.001) {
      amount = 0;
      focus = -1;
    }
    weights.forEach((v, i) => {
      weights[i] = lerp(v, i === hover && !opening ? 1 : 0, ease);
    });
    ctx!.clearRect(0, 0, width, height);
    ctx!.fillStyle = "#fff";
    ctx!.fillRect(0, 0, width, height);
    hits = [];
    // Projection/trigonometry runs once per image, rather than in sort comparisons.
    const projected = photos.map((_, i) => base(i));

    function paint(i: number, expanded = false) {
      const { thumb, full } = photos[i];
      if (!isReady(thumb)) return;
      let b = projected[i];
      const t = expanded ? amount : 0;
      if (expanded) {
        const ratio = thumb.naturalHeight / thumb.naturalWidth;
        const maxW = Math.min(width * 0.76, (height * 0.79) / ratio);
        const maxH = maxW * ratio;
        b = {
          ...b,
          x: lerp(b.x, width / 2, t),
          y: lerp(b.y, height / 2, t),
          w: lerp(b.w, maxW, t),
          h: lerp(b.h, maxH, t),
        };
        focusBounds = b;
      }
      ctx!.save();
      ctx!.globalAlpha = expanded
        ? lerp(b.alpha, 1, t)
        : b.alpha * (1 - amount * 0.83);
      ctx!.shadowColor = `rgba(0,0,0,${0.025 + weights[i] * 0.02 + t * 0.075})`;
      ctx!.shadowBlur = 3 + weights[i] * 3 + t * 14;
      ctx!.shadowOffsetY = 1 + t * 4;
      // Draw the entire photograph, no crop or filters. The enlarged one shows
      // its thumbnail until the full version has arrived.
      ctx!.drawImage(
        expanded && isReady(full) ? full! : thumb,
        b.x - b.w / 2,
        b.y - b.h / 2,
        b.w,
        b.h,
      );
      ctx!.restore();
      hits.push({ i, ...b });
    }

    photos
      .map((_, i) => i)
      .sort((a, b) => projected[a].z - projected[b].z)
      .forEach((i) => {
        if (i !== focus) paint(i);
      });
    if (focus >= 0) paint(focus, true);
    const zooming = opening ? amount < 0.999 : amount > 0.001;
    const hovering = weights.some(
      (value, i) => Math.abs(value - (i === hover && !opening ? 1 : 0)) > 0.001,
    );
    if (active() && ((!reduced && !opening) || zooming || hovering)) {
      frame = requestAnimationFrame((next) => draw(next));
    }
  }

  function resize() {
    const r = canvas.getBoundingClientRect();
    if (!r.width || !r.height) return;
    width = r.width;
    height = r.height;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    invalidate();
  }

  function at(event: MouseEvent) {
    const r = canvas.getBoundingClientRect();
    return { x: event.clientX - r.left, y: event.clientY - r.top };
  }

  function hitAt(x: number, y: number) {
    return [...hits].reverse().find((b) => contains(b, x, y));
  }

  canvas.addEventListener(
    "pointerdown",
    (event) => {
      if (opening || event.button !== 0) return;
      pressed = true;
      dragging = false;
      suppressClick = false;
      spin = pitchSpin = 0;
      startX = lastPointerX = event.clientX;
      startY = lastPointerY = event.clientY;
      lastPointerTime = event.timeStamp;
      canvas.setPointerCapture(event.pointerId);
    },
    { signal },
  );

  canvas.addEventListener(
    "pointermove",
    (event) => {
      if (pressed) {
        if (
          !dragging &&
          Math.hypot(event.clientX - startX, event.clientY - startY) > 5
        ) {
          dragging = true;
        }
        if (dragging) {
          const dx = event.clientX - lastPointerX;
          const dy = event.clientY - lastPointerY;
          const dt = Math.max(
            0.008,
            (event.timeStamp - lastPointerTime) / 1000,
          );
          rotation += dx * 0.008;
          pitchRotation = Math.max(
            -1.25,
            Math.min(1.25, pitchRotation + dy * 0.006),
          );
          spin =
            spin * 0.5 + Math.max(-5, Math.min(5, (dx * 0.008) / dt)) * 0.5;
          pitchSpin =
            pitchSpin * 0.5 +
            Math.max(-3, Math.min(3, (dy * 0.006) / dt)) * 0.5;
          targetX = targetY = 0;
          hover = -1;
        }
        lastPointerX = event.clientX;
        lastPointerY = event.clientY;
        lastPointerTime = event.timeStamp;
      } else {
        const p = at(event);
        targetX = (p.x / width - 0.5) * 2;
        targetY = (p.y / height - 0.5) * 2;
        hover = hitAt(p.x, p.y)?.i ?? -1;
      }
      invalidate();
    },
    { signal },
  );

  function releaseSphere(event: PointerEvent) {
    if (!pressed) return;
    pressed = false;
    suppressClick = dragging;
    dragging = false;
    const decay = Math.exp(
      -Math.max(0, event.timeStamp - lastPointerTime) / 100,
    );
    const reduced = prefersReducedMotion();
    spin = reduced ? 0 : spin * decay;
    pitchSpin = reduced ? 0 : pitchSpin * decay;
    if (event.type === "pointercancel") spin = pitchSpin = 0;
    invalidate();
  }
  canvas.addEventListener("pointerup", releaseSphere, { signal });
  canvas.addEventListener("pointercancel", releaseSphere, { signal });
  canvas.addEventListener("lostpointercapture", releaseSphere, { signal });

  canvas.addEventListener(
    "pointerleave",
    () => {
      targetX = targetY = 0;
      hover = -1;
      invalidate();
    },
    { signal },
  );

  canvas.addEventListener(
    "click",
    (event) => {
      canvas.focus({ preventScroll: true });
      if (suppressClick) {
        suppressClick = false;
        return;
      }
      const p = at(event);
      if (opening) {
        if (!contains(focusBounds, p.x, p.y)) {
          opening = false;
          hover = -1;
        }
      } else {
        const hit = hitAt(p.x, p.y);
        if (hit) {
          enlarge(hit.i);
          spin = pitchSpin = 0;
        }
      }
      invalidate();
    },
    { signal },
  );

  document.addEventListener(
    "pointerdown",
    (event) => {
      if (opening && event.target !== canvas) {
        opening = false;
        hover = -1;
        invalidate();
      }
    },
    { signal },
  );

  canvas.addEventListener(
    "keydown",
    (event) => {
      if (
        !["ArrowRight", "ArrowLeft", "Escape", "Enter", " "].includes(event.key)
      )
        return;
      if (event.key === "Escape") {
        // With nothing enlarged, Escape belongs to the modal and closes it.
        if (!opening) return;
        // The modal listens on document: stop here so only the photo closes.
        event.stopPropagation();
        opening = false;
        hover = -1;
      } else if (event.key === "Enter" || event.key === " ") {
        if (hover >= 0) enlarge(hover);
      } else {
        const direction = event.key === "ArrowRight" ? 1 : -1;
        if (opening) {
          // Browse the full gallery while keeping the enlarged presentation open.
          enlarge((focus + direction + photos.length) % photos.length);
          hover = focus;
          spin = pitchSpin = 0;
        } else {
          hover = (hover + direction + photos.length) % photos.length;
        }
      }
      event.preventDefault();
      invalidate();
    },
    { signal },
  );

  function visibility() {
    if (active()) {
      loadPhotos();
      last = 0;
      resize();
      invalidate();
    } else {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      pressed = dragging = false;
      spin = pitchSpin = 0;
    }
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      visibility();
    },
    { threshold: 0 },
  );
  intersectionObserver.observe(canvas);
  document.addEventListener("visibilitychange", visibility, { signal });
  window
    .matchMedia("(prefers-reduced-motion: reduce)")
    .addEventListener("change", invalidate, { signal });

  loadPhotos();
  resize();

  return () => {
    destroyed = true;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    listeners.abort();
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    photos.forEach(({ full }) => {
      if (full) full.onload = null;
    });
  };
}
