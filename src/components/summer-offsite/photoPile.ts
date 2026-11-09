import Matter from "matter-js";
import { NEWS_RATE, prefersReducedMotion, response } from "@/lib/newsMotion";
import { isReady, loadImage, type AssetGate } from "./experienceAssets";
import { OFFSITE_PHOTOS, type OffsitePhoto } from "./photos";

const { Engine, Bodies, Body, Composite, Sleeping } = Matter;

type Point = { x: number; y: number };
type Visual = {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
};
type Card = {
  photo: OffsitePhoto;
  // The thumbnail; `full` only loads once the card is drawn larger than it.
  image: HTMLImageElement;
  full: HTMLImageElement | null;
  body: Matter.Body;
  width: number;
  height: number;
  visual: Visual;
  switchKick: number;
  stackOffset: Point;
  stackAngle: number;
  galleryDelay: number;
  galleryFrom: Visual;
};

// Logical drawing space; the canvas scales it to its displayed size.
const settings = { width: 568, height: 420, batchSize: 24, step: 1000 / 120 };
// Gallery timings use seconds; the physics step above uses milliseconds.
const gallerySettings = {
  arrivalTolerance: 12,
  restDuration: 0.07,
  stagger: 0.002,
  scaleDuration: 0.32,
  scaleOvershoot: 0.12,
  mobileAdvanceInterval: 0.5,
  maxPhotoSize: 290,
};

// XP2: hover-collectable photo pile. Matter.js owns collisions; Canvas 2D draws
// the original photos.
export function createPhotoPile(
  canvas: HTMLCanvasElement,
  _host: HTMLElement,
  gate: AssetGate,
) {
  const context = canvas.getContext("2d");
  if (!context) return () => {};
  const listeners = new AbortController();
  const { signal } = listeners;
  let destroyed = false;
  const mobileGallery = window.matchMedia(
    "(max-width: 40.625rem) and (pointer: coarse)",
  );
  const engine = Engine.create({
    enableSleeping: true,
    positionIterations: 8,
    velocityIterations: 8,
  });
  engine.gravity.y = 1;
  engine.gravity.scale = 0.001;

  // The exclusive deck cycles without ever duplicating a photo within a batch.
  const deck = [...OFFSITE_PHOTOS.pile];
  for (let i = deck.length - 1; i > 0; i--) {
    const other = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[other]] = [deck[other], deck[i]];
  }
  const cache = new Map<string, Promise<HTMLImageElement | null>>();
  let cards: Card[] = [];
  let next = 0;
  let preparing = false;
  let prepared = false;
  let visible = false;
  let frame = 0;
  let last = 0;
  let elapsed = 0;
  let pointerId: number | null = null;
  let press: Point | null = null;
  const collector = { inside: false, x: 284, y: 210 };
  const gathered = new Set<Card>();
  const releasing = new Map<Card, { age: number; x: number; y: number }>();
  let galleryActive = false;
  let galleryIndex = 0;
  let galleryElapsed = 0;
  let galleryIntroEnd = 0;
  let collectionRest = 0;
  let autoAdvance = 0;

  function active() {
    return visible && !document.hidden;
  }

  function loadThumb({ thumb }: OffsitePhoto) {
    if (!cache.has(thumb)) {
      cache.set(
        thumb,
        new Promise((resolve) => {
          const image = new Image();
          image.decoding = "async";
          image.onload = () => resolve(image);
          image.onerror = () => resolve(null);
          image.src = thumb;
        }),
      );
    }
    return cache.get(thumb)!;
  }

  async function nextBatch() {
    if (preparing || pointerId !== null || gathered.size) return;
    preparing = true;
    const done = gate.begin();
    const sources = Array.from(
      { length: Math.min(settings.batchSize, deck.length) },
      () => deck[next++ % deck.length],
    );
    try {
      const images = await Promise.all(sources.map(loadThumb));
      if (destroyed) return;
      // Retain only this batch; the browser keeps compressed WebP resources cached.
      for (const key of cache.keys()) {
        if (!sources.some((photo) => photo.thumb === key)) cache.delete(key);
      }
      gathered.clear();
      releasing.clear();
      galleryActive = false;
      galleryIndex = 0;
      galleryElapsed = galleryIntroEnd = collectionRest = autoAdvance = 0;
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      const wallOptions = {
        isStatic: true,
        friction: 0.3,
        restitution: 0.62,
        collisionFilter: { group: 0, category: 1, mask: 2 },
      };
      Composite.add(engine.world, [
        Bodies.rectangle(284, 450, 688, 60, wallOptions),
        Bodies.rectangle(-30, 180, 60, 1100, wallOptions),
        Bodies.rectangle(598, 180, 60, 1100, wallOptions),
        Bodies.rectangle(284, -30, 688, 60, wallOptions),
      ]);
      cards = images.flatMap((image, index) => {
        if (!image) return [];
        const size = 57 + Math.random() * 22;
        const ratio = image.naturalWidth / image.naturalHeight;
        const width = ratio > 1 ? Math.min(size * ratio, 112) : size;
        const height = width / ratio;
        const x = 52 + (index % 6) * 92 + (Math.random() - 0.5) * 14;
        const y = 62 + Math.floor(index / 6) * 88;
        const body = Bodies.rectangle(x, y, width, height, {
          angle: (Math.random() - 0.5) * 0.65,
          chamfer: { radius: 2 },
          restitution: 0.62,
          collisionFilter: { group: 0, category: 2, mask: 3 },
          friction: 0.45,
          frictionStatic: 0.7,
          frictionAir: 0.015,
          density: 0.001,
          sleepThreshold: 70,
        });
        Composite.add(engine.world, body);
        const visual = { x, y, width, height, angle: body.angle };
        return [
          {
            photo: sources[index],
            image,
            full: null,
            body,
            width,
            height,
            visual,
            switchKick: 0,
            stackOffset: { x: 0, y: 0 },
            stackAngle: 0,
            galleryDelay: 0,
            galleryFrom: { ...visual },
          },
        ];
      });
      if (prefersReducedMotion()) {
        for (let i = 0; i < 420; i++) Engine.update(engine, settings.step);
      }
      for (const card of cards) {
        Object.assign(card.visual, {
          x: card.body.position.x,
          y: card.body.position.y,
          angle: card.body.angle,
        });
      }
      prepared = true;
      last = elapsed = 0;
      draw();
    } finally {
      preparing = false;
      done();
      invalidate();
    }
  }

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    const width = Math.round(bounds.width * ratio);
    const height = Math.round(bounds.height * ratio);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    draw();
  }

  function draw() {
    if (!canvas.width || !canvas.height) return;
    context!.setTransform(
      canvas.width / settings.width,
      0,
      0,
      canvas.height / settings.height,
      0,
      0,
    );
    context!.clearRect(0, 0, settings.width, settings.height);
    // Preserve the existing stack throughout enlargement: changing front cards every
    // stagger slot causes visible flashes. Only explicit browsing rotates the order.
    const ordered = galleryActive
      ? [...cards.slice(galleryIndex + 1), ...cards.slice(0, galleryIndex + 1)]
      : cards;
    const pixelScale = canvas.width / settings.width;
    for (const card of ordered) {
      const visual = card.visual;
      context!.save();
      context!.translate(visual.x, visual.y);
      context!.rotate(visual.angle);
      context!.shadowColor = "rgba(0,0,0,.10)";
      context!.shadowBlur = 5;
      context!.shadowOffsetY = 2;
      // Draw the whole photograph, including in the enlarged stack. Past the
      // thumbnail's resolution the full version takes over once it arrives;
      // only the front of the stack asks for it, the cards behind barely show.
      const drawn = Math.max(visual.width, visual.height) * pixelScale;
      const sharper =
        drawn > Math.max(card.image.naturalWidth, card.image.naturalHeight);
      if (sharper && (!galleryActive || galleryRank(card) <= 1)) {
        card.full ??= loadImage(card.photo.full, invalidate);
      }
      context!.drawImage(
        sharper && isReady(card.full) ? card.full! : card.image,
        -visual.width / 2,
        -visual.height / 2,
        visual.width,
        visual.height,
      );
      context!.restore();
    }
  }

  function galleryRank(card: Card) {
    return (cards.indexOf(card) - galleryIndex + cards.length) % cards.length;
  }

  function updateGalleryState(dt: number) {
    const allCollected =
      collector.inside && cards.length > 0 && gathered.size === cards.length;
    // Count arrivals at the stack, rather than merely entering the pickup radius.
    const settled =
      allCollected &&
      cards.every(
        (card) =>
          Math.hypot(
            card.body.position.x - collector.x - card.stackOffset.x,
            card.body.position.y - collector.y - card.stackOffset.y,
          ) < gallerySettings.arrivalTolerance,
      );
    collectionRest = settled ? collectionRest + dt : 0;
    const complete =
      allCollected &&
      (galleryActive || collectionRest >= gallerySettings.restDuration);
    if (complete && !galleryActive) {
      galleryIndex = cards.length - 1;
      galleryElapsed = 0;
      cards.forEach((card, index) => {
        // A compact cascade keeps the stack responsive without simultaneous arrivals.
        card.galleryDelay = index * gallerySettings.stagger;
        card.galleryFrom = { ...card.visual };
      });
      galleryIntroEnd =
        cards[cards.length - 1].galleryDelay + gallerySettings.scaleDuration;
    }
    galleryActive = complete;
    galleryElapsed = complete ? galleryElapsed + dt : 0;
    // Advance only after the enlargement has settled, inside the existing loop,
    // so hidden sections and a closed modal can't keep timers running.
    if (
      mobileGallery.matches &&
      galleryActive &&
      galleryElapsed >= galleryIntroEnd
    ) {
      autoAdvance += dt;
      if (autoAdvance >= gallerySettings.mobileAdvanceInterval) {
        autoAdvance %= gallerySettings.mobileAdvanceInterval;
        nextCollectedPhoto();
      }
    } else autoAdvance = 0;
  }

  function updatePresentation(dt: number) {
    updateGalleryState(dt);
    const reduced = prefersReducedMotion();
    const blend = response(
      galleryActive ? NEWS_RATE.zoom : NEWS_RATE.follow,
      dt,
    );
    for (const card of cards) {
      const phase = reduced
        ? 1
        : Math.max(
            0,
            Math.min(
              1,
              (galleryElapsed - card.galleryDelay) /
                gallerySettings.scaleDuration,
            ),
          );
      const travelProgress =
        phase * phase * phase * (phase * (phase * 6 - 15) + 10);
      // Smooth endpoint velocities, with a small size overshoot that settles naturally.
      const scaleProgress =
        travelProgress +
        gallerySettings.scaleOvershoot * Math.sin(Math.PI * phase) ** 2;
      let x = card.body.position.x;
      let y = card.body.position.y;
      let width = card.width;
      let height = card.height;
      let angle = card.body.angle;
      if (galleryActive) {
        const rank = galleryRank(card);
        const scale =
          Math.min(
            gallerySettings.maxPhotoSize / card.width,
            gallerySettings.maxPhotoSize / card.height,
          ) *
          (1 - Math.min(rank, 12) * 0.008);
        width *= scale;
        height *= scale;
        x =
          Math.max(165, Math.min(settings.width - 165, collector.x)) +
          Math.sin(rank * 2.4) * 8;
        y =
          Math.max(165, Math.min(settings.height - 165, collector.y)) +
          Math.cos(rank * 2.4) * 6;
        angle = rank === 0 ? 0 : ((rank % 5) - 2) * 0.025;
        x += card.switchKick * 24;
      }
      card.switchKick *= Math.exp(-dt * NEWS_RATE.follow);
      const visual = card.visual;
      if (galleryActive && phase < 1) {
        const from = card.galleryFrom;
        visual.x = from.x + (x - from.x) * travelProgress;
        visual.y = from.y + (y - from.y) * travelProgress;
        visual.width = from.width + (width - from.width) * scaleProgress;
        visual.height = from.height + (height - from.height) * scaleProgress;
        visual.angle = from.angle + (angle - from.angle) * travelProgress;
      } else {
        visual.x += (x - visual.x) * blend;
        visual.y += (y - visual.y) * blend;
        visual.width += (width - visual.width) * blend;
        visual.height += (height - visual.height) * blend;
        let delta = (angle - visual.angle + Math.PI) % (Math.PI * 2);
        if (delta < 0) delta += Math.PI * 2;
        visual.angle += (delta - Math.PI) * blend;
      }
    }
  }

  function nextCollectedPhoto() {
    if (!galleryActive) return;
    galleryElapsed = galleryIntroEnd;
    galleryIndex = (galleryIndex + 1) % cards.length;
    cards[galleryIndex].switchKick = 1;
    invalidate();
  }

  // Fast throws and overlapping stacks can't escape the visible four-sided box.
  // Matter handles normal impacts; this final projection guards solver overshoot.
  function containPhotos() {
    for (const { body } of cards) {
      const xs = body.vertices.map((vertex) => vertex.x);
      const ys = body.vertices.map((vertex) => vertex.y);
      const left = Math.min(...xs);
      const right = Math.max(...xs);
      const top = Math.min(...ys);
      const bottom = Math.max(...ys);
      const dx =
        left < 0 ? -left : right > settings.width ? settings.width - right : 0;
      const dy =
        top < 0
          ? -top
          : bottom > settings.height
            ? settings.height - bottom
            : 0;
      if (!dx && !dy) continue;
      Body.translate(body, { x: dx, y: dy });
      Body.setVelocity(body, {
        x:
          dx && body.velocity.x * dx < 0
            ? -body.velocity.x * 0.62
            : body.velocity.x,
        y:
          dy && body.velocity.y * dy < 0
            ? -body.velocity.y * 0.62
            : body.velocity.y,
      });
    }
  }

  function animate(time: number) {
    frame = 0;
    if (!active() || !prepared) {
      last = 0;
      return;
    }
    elapsed += last ? Math.min(time - last, 50) : 1000 / 60;
    last = time;
    let simulatedTime = 0;
    while (elapsed >= settings.step) {
      updateCollection(settings.step / 1000);
      Engine.update(engine, settings.step);
      containPhotos();
      simulatedTime += settings.step / 1000;
      elapsed -= settings.step;
    }
    updatePresentation(simulatedTime);
    draw();
    if (
      gathered.size ||
      releasing.size ||
      cards.some((card) => !card.body.isSleeping)
    ) {
      frame = requestAnimationFrame(animate);
    } else last = 0;
  }

  function invalidate() {
    if (!destroyed && active() && prepared && !frame) {
      frame = requestAnimationFrame(animate);
    }
  }

  function position(event: PointerEvent) {
    const bounds = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - bounds.left) / bounds.width) * settings.width,
      y: ((event.clientY - bounds.top) / bounds.height) * settings.height,
    };
  }

  // Entering a photo's neighborhood picks it up, without requiring a click.
  // Collected photos can overlap, like the compact stack in the reference.
  function updateCollection(dt: number) {
    const reduced = prefersReducedMotion();
    if (collector.inside) {
      for (const card of cards) {
        if (gathered.has(card) || releasing.has(card)) continue;
        const distance = Math.hypot(
          card.body.position.x - collector.x,
          card.body.position.y - collector.y,
        );
        if (distance < 115 + Math.min(card.width, card.height) * 0.3) {
          const index = gathered.size;
          card.stackOffset = {
            x: Math.sin(index * 2.4) * 18,
            y: Math.cos(index * 2.4) * 13,
          };
          card.stackAngle = ((index % 5) - 2) * 0.09;
          card.body.collisionFilter.mask = 1;
          gathered.add(card);
          Sleeping.set(card.body, false);
        }
      }
      for (const card of gathered) {
        const body = card.body;
        const blend = 1 - Math.exp(-dt * (reduced ? 10 : 17));
        const dx = collector.x + card.stackOffset.x - body.position.x;
        const dy = collector.y + card.stackOffset.y - body.position.y;
        // A lightly underdamped spring adds one small overshoot on pickup.
        // Fixed physics steps and a speed cap keep quick pointer changes stable.
        const frequency = reduced ? 16 : 20;
        const damping = reduced ? 1 : 0.72;
        const velocity = {
          x:
            body.velocity.x +
            ((frequency * frequency * dx -
              2 * damping * frequency * body.velocity.x * 60) *
              dt) /
              60,
          y:
            body.velocity.y +
            ((frequency * frequency * dy -
              2 * damping * frequency * body.velocity.y * 60) *
              dt) /
              60,
        };
        const speed = Math.hypot(velocity.x, velocity.y);
        if (speed > 16) {
          velocity.x *= 16 / speed;
          velocity.y *= 16 / speed;
        }
        Body.setVelocity(body, velocity);
        let angle = (card.stackAngle - body.angle + Math.PI) % (Math.PI * 2);
        if (angle < 0) angle += Math.PI * 2;
        angle -= Math.PI;
        Body.setAngularVelocity(
          body,
          body.angularVelocity + (angle * 0.12 - body.angularVelocity) * blend,
        );
        Sleeping.set(body, false);
      }
    }
    // Collision masks are restored synchronously in releaseCollection().
    // This short impulse envelope adds energy, never delays physical contacts.
    for (const [card, state] of releasing) {
      state.age += dt;
      if (state.age < 0.16 && !reduced) {
        const boost = Math.sin((Math.PI * state.age) / 0.16) * dt * 45;
        Body.setVelocity(card.body, {
          x: card.body.velocity.x + state.x * boost,
          y: card.body.velocity.y + state.y * boost,
        });
      }
      if (state.age > 0.65) {
        card.body.frictionAir = 0.015;
        releasing.delete(card);
      }
    }
  }

  function releaseCollection(scatter = true) {
    const reduced = prefersReducedMotion();
    collector.inside = false;
    galleryActive = false;
    galleryElapsed = galleryIntroEnd = collectionRest = autoAdvance = 0;
    let index = 0;
    for (const card of gathered) {
      const angle = (index++ + 0.5) * Math.PI * (3 - Math.sqrt(5));
      const strength = scatter && !reduced ? 12 + (index % 5) * 1.6 : 0;
      const direction = { x: Math.cos(angle), y: Math.sin(angle) };
      // All four walls AND other photos collide from the very first release step.
      card.body.collisionFilter.mask = 3;
      card.body.frictionAir = strength ? 0.008 : 0.015;
      releasing.set(card, {
        age: 0,
        x: strength ? direction.x : 0,
        y: strength ? direction.y : 0,
      });
      Body.setVelocity(card.body, {
        x: direction.x * strength + card.body.velocity.x * 0.1,
        y: direction.y * strength + card.body.velocity.y * 0.1,
      });
      Body.setAngularVelocity(
        card.body,
        (index % 2 ? 1 : -1) * (strength ? 0.08 + (index % 4) * 0.025 : 0),
      );
      Sleeping.set(card.body, false);
    }
    gathered.clear();
    invalidate();
  }

  function collectAt(event: PointerEvent) {
    if (!prepared || preparing || event.isPrimary === false) return;
    const point = position(event);
    collector.x = Math.max(30, Math.min(settings.width - 30, point.x));
    collector.y = Math.max(35, Math.min(settings.height - 35, point.y));
    collector.inside = true;
    invalidate();
  }

  canvas.addEventListener(
    "pointerenter",
    (event) => {
      if (event.pointerType !== "touch") collectAt(event);
    },
    { signal },
  );
  canvas.addEventListener(
    "pointermove",
    (event) => {
      if (pointerId !== null && pointerId !== event.pointerId) return;
      if (event.pointerType === "touch" && pointerId === null) return;
      collectAt(event);
      if (event.pointerType === "touch") event.preventDefault();
    },
    { signal },
  );
  canvas.addEventListener(
    "pointerleave",
    (event) => {
      if (
        event.pointerType === "touch" &&
        mobileGallery.matches &&
        galleryActive
      )
        return;
      releaseCollection();
    },
    { signal },
  );
  canvas.addEventListener(
    "pointerdown",
    (event) => {
      if (pointerId !== null || event.isPrimary === false || event.button !== 0)
        return;
      pointerId = event.pointerId;
      press = { x: event.clientX, y: event.clientY };
      if (event.pointerType === "touch") {
        canvas.setPointerCapture(pointerId);
        collectAt(event);
        event.preventDefault();
      }
      canvas.focus({ preventScroll: true });
    },
    { signal },
  );

  function release(event: PointerEvent) {
    if (event.pointerId !== pointerId) return;
    const id = pointerId;
    const clicked =
      press !== null &&
      event.type === "pointerup" &&
      Math.hypot(event.clientX - press.x, event.clientY - press.y) < 6;
    const browse = clicked && galleryActive;
    const reshuffle = clicked && !gathered.size;
    pointerId = press = null;
    const keepMobileGallery =
      event.pointerType === "touch" &&
      event.type === "pointerup" &&
      mobileGallery.matches &&
      galleryActive;
    if (
      !keepMobileGallery &&
      (event.pointerType === "touch" || event.type !== "pointerup")
    ) {
      releaseCollection(event.type === "pointerup");
    }
    if (canvas.hasPointerCapture(id)) canvas.releasePointerCapture(id);
    if (browse) nextCollectedPhoto();
    else if (reshuffle) nextBatch();
  }
  for (const type of [
    "pointerup",
    "pointercancel",
    "lostpointercapture",
  ] as const) {
    canvas.addEventListener(type, release, { signal });
  }
  document.addEventListener("pointerup", release, { signal });

  canvas.addEventListener(
    "keydown",
    (event) => {
      if (galleryActive && ["ArrowRight", " "].includes(event.key)) {
        event.preventDefault();
        nextCollectedPhoto();
        return;
      }
      if (event.key.toLowerCase() !== "r" || event.repeat) return;
      event.preventDefault();
      nextBatch();
    },
    { signal },
  );

  // Same effect as a cancelled pointer: no browse, no reshuffle, no scatter.
  function cancelPointer() {
    const id = pointerId;
    pointerId = press = null;
    if (id !== null && canvas.hasPointerCapture(id))
      canvas.releasePointerCapture(id);
  }

  function sync() {
    if (active()) {
      draw();
      invalidate();
    } else {
      releaseCollection(false);
      cancelPointer();
      if (frame) cancelAnimationFrame(frame);
      frame = last = elapsed = 0;
    }
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();
  const intersectionObserver = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    sync();
  });
  intersectionObserver.observe(canvas);
  document.addEventListener("visibilitychange", sync, { signal });
  nextBatch();

  return () => {
    destroyed = true;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    listeners.abort();
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    for (const card of cards) {
      if (card.full) card.full.onload = null;
    }
    cache.clear();
    Composite.clear(engine.world, false);
    Engine.clear(engine);
  };
}
