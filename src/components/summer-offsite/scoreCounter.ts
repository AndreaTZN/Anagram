import * as THREE from "three";
import gsap from "gsap";
import {
  NEWS_DURATION,
  NEWS_EASE,
  NEWS_RATE,
  frameDelta,
  pop,
  prefersReducedMotion,
  response,
  smooth,
} from "@/lib/newsMotion";
import type { AssetGate } from "./experienceAssets";
import { CounterPhysics } from "./counterPhysics";
import { OFFSITE_PHOTOS, type OffsitePhoto } from "./photos";

type PhotoMesh = THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
type PhotoCard = {
  photo: OffsitePhoto;
  // The ribbon shows the 512px thumbnail; the full texture loads on enlargement.
  fullRequested: boolean;
  mesh: PhotoMesh;
  order: number;
  amount: number;
  // Undefined until the card has entered the ribbon once.
  age?: number;
  duration: number;
  laneX: number;
  laneY: number;
  photoScale: number;
  depth: number;
  slant: number;
  wasActive: boolean;
  returning: boolean;
};

const SVG_NS = "http://www.w3.org/2000/svg";
const N = 11;
const RAIL_SCALE = 0.5;
const TOKEN_PATH =
  "M -14.4 -4 C -11 -4 -7 -11 -4 -21 C -2.7 -26 2.7 -26 4 -21 C 7 -11 11 -4 14.4 -4 L 14.4 4 C 11 4 7 11 4 21 C 2.7 26 -2.7 26 -4 21 C -7 11 -11 4 -14.4 4 Z";

function make<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number>,
  parent?: Element,
) {
  const node = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([key, value]) =>
    node.setAttribute(key, String(value)),
  );
  parent?.appendChild(node);
  return node;
}

// XP3: SVG score selector + WebGL photo ribbon. Physics is owned by CounterPhysics.
export function createScoreCounter(
  canvas: HTMLCanvasElement,
  host: HTMLElement,
  gate: AssetGate,
) {
  const listeners = new AbortController();
  const { signal } = listeners;
  let destroyed = false;
  let unavailable = false;
  let renderer: THREE.WebGLRenderer | null = null;
  let scene: THREE.Scene | null = null;
  let camera: THREE.OrthographicCamera | null = null;
  let visible = false;
  let frame = 0;
  let last = 0;
  let drag = -1;
  let previous = 0;
  let velocity = 0;
  let selected = 0;
  let dragOffset = 0;
  let sampleTime = 0;
  let pointCount = 2;
  let pendingCount = 2;
  let pendingSince = 0;
  let expandedCard: PhotoCard | null = null;
  let expandAmount = 0;
  const photoCards: PhotoCard[] = [];
  const textures = new Set<THREE.Texture>();
  const loader = new THREE.TextureLoader();
  const physics = new CounterPhysics(N);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const intersection = new THREE.Vector3();

  // SVG selector; the photo ribbon keeps its own WebGL renderer.
  let selector: SVGSVGElement | null = null;
  let tokenLayer: SVGGElement | null = null;
  let pill: SVGRectElement | null = null;
  let rail: SVGRectElement | null = null;
  let selectorHeight = NaN;
  const beads: SVGPathElement[] = [];
  const beadState = Array.from({ length: N }, () => ({
    x: NaN,
    selected: undefined as boolean | undefined,
  }));
  let dragPointer: number | null = null;
  let photoPress: { card: PhotoCard; id: number; x: number; y: number } | null =
    null;

  function enlargePhoto(card: PhotoCard) {
    expandedCard = card;
    loadFullTexture(card);
    invalidate();
  }

  // Same aspect ratio as the thumbnail, so only the material's map changes.
  function loadFullTexture(card: PhotoCard) {
    if (card.fullRequested) return;
    card.fullRequested = true;
    loader.load(card.photo.full, (texture) => {
      if (destroyed) {
        texture.dispose();
        return;
      }
      texture.colorSpace = THREE.SRGBColorSpace;
      const thumb = card.mesh.material.map;
      card.mesh.material.map = texture;
      textures.add(texture);
      if (thumb) {
        textures.delete(thumb);
        thumb.dispose();
      }
      invalidate();
    });
  }

  function restorePhoto() {
    if (!expandedCard) return;
    expandedCard.returning = true;
    expandedCard = null;
    invalidate();
  }

  // Convert a viewport pointer into the rail units used by the physics model.
  function targetPosition(event: PointerEvent) {
    const r = canvas.getBoundingClientRect();
    pointer.set(
      ((event.clientX - r.left) / r.width) * 2 - 1,
      -((event.clientY - r.top) / r.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointer, camera!);
    return raycaster.ray.intersectPlane(plane, intersection)
      ? intersection.x / RAIL_SCALE
      : 0;
  }

  function init() {
    if (renderer || unavailable || destroyed) return;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: "low-power",
      });
      renderer.setClearColor(0xffffff);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-4, 4, 1.8, -1.8, 0.1, 40);
      camera.position.set(0, 2.15, 9);
      camera.lookAt(0, 2.15, 0);
      createSelector();
      preparePhotos();
      resize();
      draw();
    } catch (error) {
      renderer?.dispose();
      renderer = null;
      unavailable = true;
      console.warn("Photo counter unavailable.", error);
    }
  }

  function createSelector() {
    selector = make(
      "svg",
      {
        "aria-hidden": "true",
        style:
          "position:absolute;top:0;left:0;width:100%;overflow:visible;pointer-events:none;user-select:none;-webkit-user-select:none",
      },
      host,
    );
    const defs = make("defs", {}, selector);
    const filter = make(
      "filter",
      {
        id: "home-news-modal-counter-melt",
        x: "-20%",
        y: "-70%",
        width: "140%",
        height: "240%",
        "color-interpolation-filters": "sRGB",
      },
      defs,
    );
    make(
      "feGaussianBlur",
      { in: "SourceGraphic", stdDeviation: "2.1", result: "soft" },
      filter,
    );
    make(
      "feColorMatrix",
      {
        in: "soft",
        type: "matrix",
        values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8",
      },
      filter,
    );
    // The pill is the only hit target of the overlay; grabbing it drags a bead.
    pill = make(
      "rect",
      {
        width: 380,
        height: 65,
        rx: 32.5,
        fill: "#fafafa",
        style: "pointer-events:all;touch-action:none;cursor:grab",
      },
      selector,
    );
    // Decorative rail stays outside the gooey filter and behind the score beads.
    rail = make(
      "rect",
      {
        x: 212,
        width: 332,
        height: 3,
        rx: 1.5,
        fill: "#ebebeb",
        style: "pointer-events:none",
      },
      selector,
    );
    tokenLayer = make(
      "g",
      { filter: "url(#home-news-modal-counter-melt)", fill: "#aaaaaa" },
      selector,
    );
    for (let i = 0; i < N; i++) {
      beads.push(
        make(
          "path",
          { d: TOKEN_PATH, "data-token": i, style: "pointer-events:none" },
          tokenLayer,
        ),
      );
    }
  }

  // Match SVG coordinates to the camera; the hint stays outside this overlay.
  function updateSelector() {
    if (!selector || !camera || !pill || !rail || !tokenLayer) return;
    const height = (camera.top - camera.bottom) * 100;
    const centerY = (camera.top + 2.15 - 0.04 * RAIL_SCALE) * 100;
    if (selectorHeight !== height) {
      selector.setAttribute("viewBox", `0 0 756 ${height}`);
      pill.setAttribute("x", "188");
      pill.setAttribute("y", String(centerY - 32.5));
      rail.setAttribute("y", String(centerY - 1.5));
      tokenLayer.setAttribute("transform", `translate(378 ${centerY})`);
      selectorHeight = height;
    }
    beads.forEach((bead, i) => {
      const state = beadState[i];
      const x = physics.x[i] * RAIL_SCALE * 100;
      if (Number.isNaN(state.x) || Math.abs(x - state.x) > 0.01) {
        bead.setAttribute("transform", `translate(${x} 0) scale(.5 .65)`);
        state.x = x;
      }
      // Same group boundary as the photo count, including packed groups.
      const isSelected = i >= N - pointCount;
      if (state.selected !== isSelected) {
        const fill = isSelected ? "#aaaaaa" : "#d8d8d8";
        if (state.selected === undefined) gsap.set(bead, { attr: { fill } });
        else {
          gsap.to(bead, {
            attr: { fill },
            duration: NEWS_DURATION.control,
            ease: NEWS_EASE.standard,
          });
        }
        bead.setAttribute("data-selected", String(isSelected));
        state.selected = isSelected;
      }
    });
  }

  function preparePhotos() {
    const sources = OFFSITE_PHOTOS.counter;
    const deck = sources.map((_, i) => i);
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    deck.slice(0, N).forEach((index, order) => {
      const done = gate.begin();
      loader.load(
        sources[index].thumb,
        (texture) => {
          if (destroyed || !scene) {
            texture.dispose();
            return;
          }
          textures.add(texture);
          texture.colorSpace = THREE.SRGBColorSpace;
          const aspect = texture.image.width / texture.image.height;
          const mesh: PhotoMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(aspect, 1),
            new THREE.MeshBasicMaterial({
              map: texture,
              transparent: true,
              opacity: 0,
              depthWrite: false,
              depthTest: false,
            }),
          );
          mesh.visible = false;
          scene.add(mesh);
          photoCards.push({
            photo: sources[index],
            fullRequested: false,
            mesh,
            order,
            amount: prefersReducedMotion() && order === 0 ? 1 : 0,
            duration: 0,
            laneX: 0,
            laneY: 0,
            photoScale: 0,
            depth: 0,
            slant: 0,
            wasActive: false,
            returning: false,
          });
          done();
          updatePhotos(0);
          invalidate();
        },
        undefined,
        () => {
          done();
          invalidate();
        },
      );
    });
  }

  function readPoints(dt: number) {
    // A packed group may extend beyond the middle. Its separating gap, not x=0,
    // determines which beads have been transferred to the right.
    let gap = 0;
    let index = -1;
    for (let i = 0; i < N - 1; i++) {
      const distance = physics.x[i + 1] - physics.x[i];
      if (distance > gap) {
        gap = distance;
        index = i;
      }
    }
    const middle = physics.x.reduce((sum, x) => sum + x, 0) / N;
    const candidate = gap > 0.67 ? N - index - 1 : middle > 0 ? N : 0;
    if (candidate !== pendingCount) {
      pendingCount = candidate;
      pendingSince = 0;
    } else pendingSince += dt;
    if (pendingSince > 0.15 && pointCount !== candidate) pointCount = candidate;
  }

  // Randomness is sampled once per cycle so frames never jitter.
  function renewPhoto(card: PhotoCard) {
    card.age = 0;
    card.duration = 3.5 + Math.random() * 0.65;
    // A single irregular ribbon with a shared rightward motion.
    const count = Math.max(1, pointCount);
    const spacing = count > 1 ? Math.min(1.24, 5.6 / (count - 1)) : 0;
    card.laneX =
      (card.order - (count - 1) / 2) * spacing +
      (Math.random() - 0.5) * Math.min(0.28, spacing * 0.4);
    card.photoScale = 1.34 + Math.random() * 0.92;
    card.laneY = 2.98 + (Math.random() - 0.5) * 0.78;
    card.depth = (Math.random() - 0.5) * 0.7;
    card.slant = (Math.random() - 0.5) * 0.065;
  }

  function updatePhotos(dt: number) {
    const reduced = prefersReducedMotion();
    readPoints(dt);
    expandAmount +=
      ((expandedCard ? 1 : 0) - expandAmount) * response(NEWS_RATE.zoom, dt);
    const blend = response(NEWS_RATE.follow, dt);
    const paused = Boolean(expandedCard) || expandAmount > 0.005;
    photoCards.forEach((card) => {
      const target = card.order < pointCount ? 1 : 0;
      if (target && !card.wasActive) {
        renewPhoto(card);
        card.age = -card.order * 0.07;
      }
      card.wasActive = Boolean(target);
      card.amount += (target - card.amount) * blend;
      if (Math.abs(card.amount - target) < 0.001) card.amount = target;
      if (card.age === undefined) {
        card.mesh.visible = false;
        return;
      }
      if (!paused && target && !reduced) card.age += dt;
      if (card.age > card.duration && target && !paused && !reduced)
        renewPhoto(card);
      const age = card.age;
      const entry = reduced ? 1 : pop(age / NEWS_DURATION.photoIn);
      const out = reduced
        ? 0
        : Math.max(
            0,
            Math.min(
              1,
              (age - (card.duration - NEWS_DURATION.photoOut)) /
                NEWS_DURATION.photoOut,
            ),
          );
      const exit = smooth(out);
      const lifeScale = Math.max(0, entry) * (1 - exit) * card.amount;
      card.mesh.visible = lifeScale > 0.001;
      if (!card.mesh.visible) return;
      const progress = reduced
        ? 0.5
        : Math.max(0, Math.min(1, age / card.duration));
      const x = card.laneX + (progress - 0.5) * 1.35;
      const y = card.laneY + (1 - Math.min(1, entry)) * 0.1 - exit * 0.16;
      card.mesh.position.set(x, y, card.depth);
      card.mesh.rotation.set(0, card.slant, 0);
      // Smooth spatial scale gradient: tiny edges, generous center, random size variation.
      const distance = Math.min(1, Math.abs(x) / 3.35);
      const bell = Math.pow(Math.cos((distance * Math.PI) / 2), 1.25);
      const scaleGradient = 0.16 + 0.99 * bell;
      card.mesh.scale.setScalar(card.photoScale * lifeScale * scaleGradient);
      // Reuse zoom progress so background dimming and restoration stay synchronized.
      const isFocused = card === expandedCard || card.returning;
      card.mesh.material.opacity = isFocused ? 1 : 1 - 0.75 * expandAmount;
      card.mesh.renderOrder = Math.round((card.depth + 2) * 100);
      if (isFocused) {
        const t = expandAmount;
        card.mesh.position.x *= 1 - t;
        card.mesh.position.y += (2.6 - card.mesh.position.y) * t;
        card.mesh.position.z += (3 - card.mesh.position.z) * t;
        card.mesh.rotation.y *= 1 - t;
        const enlarged = Math.min(
          3.7,
          5.1 / card.mesh.geometry.parameters.width,
        );
        card.mesh.scale.setScalar(
          card.mesh.scale.x + (enlarged - card.mesh.scale.x) * t,
        );
        card.mesh.renderOrder = 1000;
        if (!expandedCard && expandAmount < 0.001) card.returning = false;
      }
    });
  }

  // Animation lifecycle: no continuous rendering offscreen or in a hidden tab.
  function active() {
    return Boolean(renderer) && visible && !document.hidden;
  }

  function draw() {
    if (renderer && scene && camera) renderer.render(scene, camera);
  }

  function animate(time: number) {
    frame = 0;
    if (!active()) {
      last = 0;
      return;
    }
    const reduced = prefersReducedMotion();
    const dt = frameDelta(time, last);
    last = time;
    updatePhotos(dt);
    physics.step(dt);
    updateSelector();
    draw();
    const zooming = expandedCard ? expandAmount < 0.999 : expandAmount > 0.001;
    const cycling =
      !reduced && !expandedCard && expandAmount < 0.005 && pointCount > 0;
    const settling = photoCards.some(
      (card) =>
        Math.abs(card.amount - (card.order < pointCount ? 1 : 0)) > 0.001,
    );
    if (
      physics.moving() ||
      pendingCount !== pointCount ||
      zooming ||
      cycling ||
      settling
    ) {
      frame = requestAnimationFrame(animate);
    }
  }

  function invalidate() {
    if (!destroyed && active() && !frame) {
      last = 0;
      frame = requestAnimationFrame(animate);
    }
  }

  function resize() {
    if (!renderer || !camera || !selector) return;
    const r = canvas.getBoundingClientRect();
    if (!r.width || !r.height) return;
    selector.style.height = `${r.height}px`;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setSize(r.width, r.height, false);
    const halfWidth = 3.78;
    camera.left = -halfWidth;
    camera.right = halfWidth;
    camera.top = (halfWidth * r.height) / r.width;
    camera.bottom = -camera.top;
    camera.updateProjectionMatrix();
    updateSelector();
    draw();
  }

  // Pick in the same order as the visible layers, never through the SVG selector.
  function photoAtPointer() {
    return raycaster
      .intersectObjects(
        photoCards
          .filter(
            (c) => c.mesh.visible && c.amount > 0.1 && c.mesh.scale.x > 0.05,
          )
          .map((c) => c.mesh),
        false,
      )
      .sort(
        (a, b) =>
          b.object.renderOrder - a.object.renderOrder ||
          a.distance - b.distance,
      )[0];
  }

  function tokenAtPointer(event: PointerEvent) {
    if (!selector || !camera) return -1;
    const r = selector.getBoundingClientRect();
    const height = (camera.top - camera.bottom) * 100;
    const x = ((event.clientX - r.left) / r.width) * 756 - 378;
    const y =
      ((event.clientY - r.top) / r.height) * height -
      (camera.top + 2.15 - 0.04 * RAIL_SCALE) * 100;
    if (Math.abs(y) > 23 || Math.abs(x) > 190) return -1;
    let nearest = -1;
    let distance = Infinity;
    physics.x.forEach((position, i) => {
      const delta = Math.abs(x - position * RAIL_SCALE * 100);
      if (delta < distance) {
        distance = delta;
        nearest = i;
      }
    });
    return distance <= 9 ? nearest : -1;
  }

  host.addEventListener(
    "pointerdown",
    (event) => {
      if (
        !renderer ||
        dragPointer !== null ||
        event.isPrimary === false ||
        event.button !== 0
      ) {
        return;
      }
      const localX = targetPosition(event);
      const token = tokenAtPointer(event);
      photoPress = null;
      if (token >= 0) {
        if (expandedCard || expandAmount > 0.005) {
          restorePhoto();
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        dragPointer = event.pointerId;
        drag = selected = token;
        dragOffset = physics.x[drag] - localX;
        previous = localX;
        velocity = 0;
        sampleTime = event.timeStamp;
        physics.drag = drag;
        physics.target = physics.x[drag];
        invalidate();
        host.setPointerCapture(event.pointerId);
        canvas.focus({ preventScroll: true });
        return;
      }
      const photoHit = photoAtPointer();
      if (expandedCard) {
        if (!photoHit || photoHit.object !== expandedCard.mesh) restorePhoto();
        return;
      }
      if (expandAmount > 0.005) return;
      const card =
        photoHit && photoCards.find((c) => c.mesh === photoHit.object);
      if (card) {
        photoPress = {
          card,
          id: event.pointerId,
          x: event.clientX,
          y: event.clientY,
        };
      }
    },
    { signal },
  );

  host.addEventListener(
    "pointermove",
    (event) => {
      if (
        photoPress &&
        event.pointerId === photoPress.id &&
        Math.hypot(event.clientX - photoPress.x, event.clientY - photoPress.y) >
          6
      ) {
        photoPress = null;
      }
      if (drag < 0 || event.pointerId !== dragPointer || !renderer) return;
      event.preventDefault();
      const x = targetPosition(event);
      const dt = Math.max(0.001, (event.timeStamp - sampleTime) / 1000);
      const instant = (x - previous) / dt;
      velocity +=
        (THREE.MathUtils.clamp(instant, -14, 14) - velocity) *
        (1 - Math.exp(-dt / 0.035));
      previous = x;
      sampleTime = event.timeStamp;
      physics.target = THREE.MathUtils.clamp(
        x + dragOffset,
        physics.left + drag * physics.diameter,
        physics.right - (N - 1 - drag) * physics.diameter,
      );
      invalidate();
    },
    { signal },
  );

  function release(event: PointerEvent) {
    if (photoPress && event.pointerId === photoPress.id) {
      const press = photoPress;
      photoPress = null;
      if (
        event.type === "pointerup" &&
        Math.hypot(event.clientX - press.x, event.clientY - press.y) <= 6
      ) {
        targetPosition(event);
        const hit = photoAtPointer();
        if (hit?.object === press.card.mesh) enlargePhoto(press.card);
      }
    }
    if (drag < 0 || event.pointerId !== dragPointer) return;
    const pointerId = dragPointer;
    const elapsed = Math.max(0, (event.timeStamp - sampleTime) / 1000);
    physics.v[drag] =
      event.type === "pointerup"
        ? THREE.MathUtils.clamp(velocity * Math.exp(-elapsed * 18), -14, 14)
        : 0;
    physics.drag = -1;
    drag = -1;
    dragPointer = null;
    velocity = 0;
    if (host.hasPointerCapture(pointerId))
      host.releasePointerCapture(pointerId);
    invalidate();
  }
  host.addEventListener("pointerup", release, { signal });
  host.addEventListener("pointercancel", release, { signal });
  host.addEventListener("lostpointercapture", release, { signal });
  document.addEventListener(
    "pointerup",
    (event) => {
      if (photoPress?.id === event.pointerId) photoPress = null;
    },
    { signal },
  );

  canvas.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape" && expandedCard) {
        event.preventDefault();
        // The modal listens on document: stop here so only the photo closes.
        event.stopPropagation();
        restorePhoto();
        return;
      }
      if (
        !renderer ||
        ![
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
          "Home",
          "End",
        ].includes(event.key)
      ) {
        return;
      }
      event.preventDefault();
      if (event.key === "ArrowUp") selected = Math.min(N - 1, selected + 1);
      else if (event.key === "ArrowDown") selected = Math.max(0, selected - 1);
      else {
        physics.v[selected] +=
          event.key === "Home"
            ? -5
            : event.key === "End"
              ? 5
              : event.key === "ArrowRight"
                ? 2
                : -2;
      }
      invalidate();
    },
    { signal },
  );

  document.addEventListener(
    "pointerdown",
    (event) => {
      if (expandedCard && !host.contains(event.target as Node)) restorePhoto();
    },
    { signal },
  );

  function sync() {
    if (active()) {
      resize();
      invalidate();
    } else {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      drag = -1;
      physics.drag = -1;
      dragPointer = null;
      photoPress = null;
    }
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      if (visible) init();
      sync();
    },
    { threshold: 0 },
  );
  intersectionObserver.observe(canvas);
  document.addEventListener("visibilitychange", sync, { signal });
  window
    .matchMedia("(prefers-reduced-motion: reduce)")
    .addEventListener("change", sync, { signal });
  canvas.addEventListener(
    "webglcontextlost",
    (event) => {
      event.preventDefault();
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    },
    { signal },
  );
  canvas.addEventListener("webglcontextrestored", sync, { signal });

  init();
  sync();

  return () => {
    destroyed = true;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    listeners.abort();
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    gsap.killTweensOf(beads);
    // Each opening creates a new WebGL context: release everything it holds.
    photoCards.forEach(({ mesh }) => {
      mesh.geometry.dispose();
      mesh.material.dispose();
    });
    textures.forEach((texture) => texture.dispose());
    renderer?.dispose();
    selector?.remove();
  };
}
