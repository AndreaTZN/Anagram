"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// Type-only: the runtime module is imported dynamically inside the effect so
// three (~520 kB) stays out of the bundle that loads with the panel.
import type * as THREE_NS from "three";

gsap.registerPlugin(useGSAP);

export type SphereProjectSelected = {
  index: number;
  projectNumber: number;
  projectColor: string;
  oppositeProject: number;
  url: string;
};

const CONFIG = {
  projectCount: 12,
  camera: { fov: 26, distance: 11.9 },
  sphere: { radius: 2.25 },
  idle: {
    speed: 0.00042,
    rampMs: 900,
    tiltEaseMs: 1600,
    tiltYTurns: 0.1,
    tiltZTurns: 0.005,
  },
  hover: {
    followEaseMs: 180,
    snapDurationMs: 680,
    snapDamping: 7.0,
    snapFrequency: 9.5,
  },
  drag: {
    thresholdPx: 5,
    radiansPerPixel: 0.0076,
    velocityScale: 0.18,
  },
  launch: {
    minimumPassages: 5,
    baseDurationMs: 1700,
    speedDurationMs: 550,
    passageDurationMs: 55,
    preBounceOffset: 0.2,
  },
  settle: {
    durationMs: 640,
    damping: 7.3,
    frequency: 9.4,
  },
  color: {
    desaturation: 0.4,
    brightness: 1.1,
    contrast: 1.1,
    grainStrength: 0.07,
  },
} as const;

const PROJECT_COUNT = CONFIG.projectCount;
const PASSAGE_ANGLE = Math.PI;
const FIXED_Y_ROTATION = Math.PI * 2 * CONFIG.idle.tiltYTurns;
const FIXED_Z_ROTATION = Math.PI * 2 * CONFIG.idle.tiltZTurns;

// Exact order supplied by the designer. The sequence repeats after 8.
const COLOR_SEQUENCE = [
  "#03C8FF",
  "#F3FF65",
  "#8B7759",
  "#F981FE",
  "#9FEB4A",
  "#E3CEFC",
  "#FF331B",
  "#C3BD9A",
];

// Index = numéro affiché sur la sphère - 1. L'ordre est éditable : il définit
// vers quel projet chaque numéro envoie. Doit compter exactement PROJECT_COUNT
// entrées, chacune correspondant à un dossier de src/app/works/.
const PROJECT_SLUGS = [
  "wastetide",
  "founders-future",
  "planity",
  "pennylane",
  "inbolt",
  "arcads",
  "twin",
  "vizzia",
  "perma",
  "henoo",
  "tilt",
  "semplice",
] as const;

// Noms affichables, alignés index par index sur PROJECT_SLUGS.
const PROJECT_NAMES = [
  "Wastetide",
  "Founders Future",
  "Planity",
  "Pennylane",
  "Inbolt",
  "Arcads",
  "Twin",
  "Vizzia",
  "Perma",
  "Henoo",
  "Tilt",
  "Semplice",
] as const;

// Le décalage silencieux entre les deux tableaux enverrait tous les numéros
// suivants sur le mauvais projet ; on échoue en dev plutôt qu'en production.
if (
  process.env.NODE_ENV !== "production" &&
  PROJECT_SLUGS.length !== CONFIG.projectCount
) {
  throw new Error(
    `SphereWidget: PROJECT_SLUGS has ${PROJECT_SLUGS.length} entries, expected ${CONFIG.projectCount}`,
  );
}

if (
  process.env.NODE_ENV !== "production" &&
  PROJECT_NAMES.length !== PROJECT_SLUGS.length
) {
  throw new Error(
    `SphereWidget: PROJECT_NAMES has ${PROJECT_NAMES.length} entries, expected ${PROJECT_SLUGS.length}`,
  );
}

// Laisse le temps de lire le numéro obtenu avant de quitter la page.
const NAVIGATION_DELAY_MS = 700;

const VERTEX_SHADER = `
  varying vec3 vWorldDirection;
  varying vec3 vLocalDirection;
  varying vec3 vViewNormal;
  varying vec3 vViewPosition;

  void main() {
    // World space keeps the gradient vertical on screen instead of
    // letting it flip with the sphere's X-axis rotation.
    vWorldDirection = normalize(mat3(modelMatrix) * position);
    // Local space stays attached to the rotating sphere and is used
    // for the organic noise and fine grain.
    vLocalDirection = normalize(position);
    vViewNormal = normalize(normalMatrix * normal);

    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = viewPosition.xyz;
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  varying vec3 vWorldDirection;
  varying vec3 vLocalDirection;
  varying vec3 vViewNormal;
  varying vec3 vViewPosition;
  uniform vec3 colorTop;
  uniform vec3 colorBottom;
  uniform float gradientTime;
  uniform float motionAmount;
  uniform float desaturation;
  uniform float brightness;
  uniform float contrast;
  uniform float grainStrength;
  uniform vec3 fresnelColor;
  uniform float fresnelStrength;
  uniform float fresnelPower;

  float hash31(vec3 p) {
    p = fract(p * 0.1031);
    p += dot(p, p.yzx + 33.33);
    return fract((p.x + p.y) * p.z);
  }

  float noise3D(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    // Quintic interpolation removes the visible grid derivatives
    // produced by the former cubic value-noise interpolation.
    f = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

    float n000 = hash31(i + vec3(0.,0.,0.));
    float n100 = hash31(i + vec3(1.,0.,0.));
    float n010 = hash31(i + vec3(0.,1.,0.));
    float n110 = hash31(i + vec3(1.,1.,0.));
    float n001 = hash31(i + vec3(0.,0.,1.));
    float n101 = hash31(i + vec3(1.,0.,1.));
    float n011 = hash31(i + vec3(0.,1.,1.));
    float n111 = hash31(i + vec3(1.,1.,1.));

    float x00 = mix(n000, n100, f.x);
    float x10 = mix(n010, n110, f.x);
    float x01 = mix(n001, n101, f.x);
    float x11 = mix(n011, n111, f.x);
    float y0 = mix(x00, x10, f.y);
    float y1 = mix(x01, x11, f.y);

    return mix(y0, y1, f.z);
  }

  vec3 gradientHash(vec3 p) {
    vec3 q = vec3(
      dot(p, vec3(127.1, 311.7, 74.7)),
      dot(p, vec3(269.5, 183.3, 246.1)),
      dot(p, vec3(113.5, 271.9, 124.6))
    );
    return normalize(fract(sin(q) * 43758.5453) * 2.0 - 1.0);
  }

  float gradientNoise3D(vec3 p) {
    vec3 cell = floor(p);
    vec3 local = fract(p);
    vec3 fade = local * local * local *
      (local * (local * 6.0 - 15.0) + 10.0);

    float n000 = dot(gradientHash(cell + vec3(0.,0.,0.)), local - vec3(0.,0.,0.));
    float n100 = dot(gradientHash(cell + vec3(1.,0.,0.)), local - vec3(1.,0.,0.));
    float n010 = dot(gradientHash(cell + vec3(0.,1.,0.)), local - vec3(0.,1.,0.));
    float n110 = dot(gradientHash(cell + vec3(1.,1.,0.)), local - vec3(1.,1.,0.));
    float n001 = dot(gradientHash(cell + vec3(0.,0.,1.)), local - vec3(0.,0.,1.));
    float n101 = dot(gradientHash(cell + vec3(1.,0.,1.)), local - vec3(1.,0.,1.));
    float n011 = dot(gradientHash(cell + vec3(0.,1.,1.)), local - vec3(0.,1.,1.));
    float n111 = dot(gradientHash(cell + vec3(1.,1.,1.)), local - vec3(1.,1.,1.));

    float x00 = mix(n000, n100, fade.x);
    float x10 = mix(n010, n110, fade.x);
    float x01 = mix(n001, n101, fade.x);
    float x11 = mix(n011, n111, fade.x);
    return mix(mix(x00, x10, fade.y), mix(x01, x11, fade.y), fade.z);
  }

  float surfaceGrain(vec3 p) {
    // Four tighter, decorrelated octaves create smaller grains and
    // richer micro-detail without reintroducing visible noise cells.
    float octaveA = gradientNoise3D(p * 180.0 + vec3(17.1, 3.7, 11.9));
    float octaveB = gradientNoise3D(p.yzx * 367.0 + vec3(5.4, 29.2, 2.8));
    float octaveC = gradientNoise3D(p.zxy * 743.0 + vec3(31.7, 7.3, 19.6));
    float octaveD = gradientNoise3D(p.xzy * 1091.0 + vec3(13.4, 41.2, 6.5));
    return 0.5 +
      octaveA * 0.42 +
      octaveB * 0.27 +
      octaveC * 0.18 +
      octaveD * 0.10;
  }

  vec3 linearToSrgb(vec3 value) {
    vec3 low = value * 12.92;
    vec3 high = 1.055 * pow(max(value, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055;
    return mix(low, high, step(vec3(0.0031308), value));
  }

  vec3 srgbToLinear(vec3 value) {
    vec3 low = value / 12.92;
    vec3 high = pow((max(value, vec3(0.0)) + 0.055) / 1.055, vec3(2.4));
    return mix(low, high, step(vec3(0.04045), value));
  }

  void main() {
    vec3 p = normalize(vWorldDirection);
    vec3 surface = normalize(vLocalDirection);

    // Large low-frequency fields create the broad, curved colour
    // masses visible in the reference while using only two colours.
    float phase = gradientTime * 0.72;
    float flowA = noise3D(
      vec3(surface.x * 1.05, surface.y * 0.62, surface.z * 0.92) +
      vec3(2.5, 4.3, 1.7)
    );
    float flowB = noise3D(
      surface.yzx * vec3(1.55, 1.12, 1.38) +
      vec3(6.4, 1.9, 3.7)
    );
    float sweepingBand = sin(
      surface.x * 1.45 -
      surface.y * 2.05 +
      surface.z * 0.85 +
      flowA * 2.7
    ) * 0.095;
    float movement = sin(p.x * 2.4 + phase) * 0.024 * motionAmount;
    float vertical = (p.y + 1.0) * 0.5;

    // Deformation fades to zero at both poles. This guarantees that
    // the top and bottom exactly match their assigned hex colours.
    float edgeFade = 4.0 * vertical * (1.0 - vertical);
    float deformation = (
      (flowA - 0.5) * 0.19 +
      (flowB - 0.5) * 0.09 +
      sweepingBand +
      surface.x * 0.035 +
      movement
    ) * edgeFade;

    // The supplied references use a linear vertical progression.
    float t = clamp(vertical + deformation, 0.0, 1.0);

    // Match design-tool/CSS gradients by interpolating the supplied
    // HEX values in sRGB, then return to linear space for rendering.
    vec3 topSrgb = linearToSrgb(colorTop);
    vec3 bottomSrgb = linearToSrgb(colorBottom);
    vec3 mixedSrgb = mix(bottomSrgb, topSrgb, t);
    float mixedLuminance = dot(
      mixedSrgb,
      vec3(0.2126, 0.7152, 0.0722)
    );
    mixedSrgb = mix(mixedSrgb, vec3(mixedLuminance), desaturation);
    float brighterLuminance = min(1.0, mixedLuminance * brightness);
    mixedSrgb = clamp(
      mixedSrgb + vec3(brighterLuminance - mixedLuminance),
      0.0,
      1.0
    );
    mixedSrgb = clamp(
      (mixedSrgb - 0.5) * contrast + 0.5,
      0.0,
      1.0
    );
    vec3 col = srgbToLinear(mixedSrgb);

    // Camera-facing Fresnel rim. The effect is nearly absent at the
    // centre and grows smoothly toward the sphere silhouette.
    vec3 viewDirection = normalize(-vViewPosition);
    float facing = max(dot(normalize(vViewNormal), viewDirection), 0.0);
    float fresnel = pow(1.0 - facing, fresnelPower) * fresnelStrength;
    col = mix(col, fresnelColor, clamp(fresnel, 0.0, 1.0));

    // Grain changes luminance only, preserving the hue and
    // saturation of both supplied HEX colours.
    float grain = surfaceGrain(surface);
    col *= 1.0 + (grain - 0.5) * grainStrength;

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`;

function modulo(value: number, divisor: number) {
  return ((value % divisor) + divisor) % divisor;
}

function smootherstep(t: number) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * c * (c * (c * 6 - 15) + 10);
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function SphereWidget({
  onProjectSelected,
}: {
  onProjectSelected?: (detail: SphereProjectSelected) => void;
}) {
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const navigationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [status, setStatus] = useState("Spin the ball");
  const [spinning, setSpinning] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  // Read inside the WebGL loop without re-running the effect on every change.
  const onSelectedRef = useRef(onProjectSelected);
  onSelectedRef.current = onProjectSelected;
  const routerRef = useRef(router);
  routerRef.current = router;

  // Replaces the CSS @keyframes mask-in/out: the label swaps text mid-tween.
  const pendingStatus = useRef<{ text: string; spinning: boolean } | null>(
    null,
  );
  useGSAP(
    () => {
      const el = statusRef.current;
      if (!el) return;
      gsap.fromTo(
        el,
        { yPercent: 120, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.3, ease: "power2.out" },
      );
    },
    { dependencies: [status] },
  );

  // Le canvas apparaît en fondu une fois la scène compilée.
  useGSAP(
    () => {
      if (!ready) return;
      const canvas = wrapRef.current?.querySelector("canvas");
      if (!canvas) return;

      gsap.to(canvas, { autoAlpha: 1, duration: 0.5, ease: "power2.out" });
    },
    { dependencies: [ready] },
  );

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Queue the outgoing tween, then commit the new text on completion so the
    // label reads as a single masked swap rather than two independent states.
    function pushStatus(text: string, isSpinning = false) {
      const el = statusRef.current;
      pendingStatus.current = { text, spinning: isSpinning };
      if (!el) {
        setStatus(text);
        setSpinning(isSpinning);
        return;
      }
      gsap.to(el, {
        yPercent: -120,
        autoAlpha: 0,
        duration: 0.22,
        ease: "power2.in",
        overwrite: true,
        onComplete: () => {
          const next = pendingStatus.current;
          if (!next) return;
          setStatus(next.text);
          setSpinning(next.spinning);
        },
      });
    }

    // The effect may be cleaned up while three is still being fetched; the
    // teardown below is only wired once setup() has actually built the scene.
    let disposed = false;
    let teardown: (() => void) | null = null;

    async function setup() {
      // Re-bound inside the async scope: TypeScript drops the outer null check
      // across the await, and `wrap` is captured by every handler below.
      const canvasWrap = wrap as HTMLDivElement;
      const THREE = await import("three");
      if (disposed) return;

      let renderer: THREE_NS.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
      } catch (error) {
        setFailed(true);
        setStatus("WebGL could not be loaded");
        console.error("Anagram Continuous Gradient Sphere:", error);
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        CONFIG.camera.fov,
        1,
        0.1,
        100,
      );
      camera.position.set(0, 0, CONFIG.camera.distance);
      camera.lookAt(0, 0, 0);

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.NoToneMapping;
      renderer.shadowMap.enabled = false;
      // Masqué dès l'insertion : le fondu est lancé par le useGSAP sur `ready`,
      // une fois le programme GLSL compilé et la première frame rendue.
      gsap.set(renderer.domElement, { autoAlpha: 0 });
      canvasWrap.appendChild(renderer.domElement);

      // Camera-relative hover tilt lives on a parent group. Keeping it
      // separate from the sphere's local rotation prevents cursor directions
      // from flipping after the rotor has completed half a turn.
      const hoverPivot = new THREE.Group();
      const rotor = new THREE.Group();
      hoverPivot.add(rotor);
      scene.add(hoverPivot);

      const radius = CONFIG.sphere.radius;

      const PROJECT_COLOR_HEX = Array.from(
        { length: PROJECT_COUNT },
        (_, index) => COLOR_SEQUENCE[index % COLOR_SEQUENCE.length],
      );
      const PROJECT_COLORS = PROJECT_COLOR_HEX.map(
        (hex) => new THREE.Color(hex),
      );

      const PROJECTS = Array.from({ length: PROJECT_COUNT }, (_, i) => ({
        id: i + 1,
        name: PROJECT_NAMES[i],
        color: PROJECT_COLOR_HEX[i],
        opposite: ((i + PROJECT_COUNT / 2) % PROJECT_COUNT) + 1,
        url: `/works/${PROJECT_SLUGS[i]}`,
      }));

      const sphereMaterial = new THREE.ShaderMaterial({
        uniforms: {
          colorTop: { value: PROJECT_COLORS[0].clone() },
          colorBottom: { value: PROJECT_COLORS[1].clone() },
          gradientTime: { value: 0 },
          motionAmount: { value: 0 },
          desaturation: { value: CONFIG.color.desaturation },
          brightness: { value: CONFIG.color.brightness },
          contrast: { value: CONFIG.color.contrast },
          grainStrength: { value: CONFIG.color.grainStrength },
          fresnelColor: { value: new THREE.Color("#FFFFFF") },
          fresnelStrength: { value: 0.46 },
          fresnelPower: { value: 5.2 },
        },
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
      });

      const sphereGeometry = new THREE.SphereGeometry(radius, 192, 128);
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      rotor.add(sphere);

      const patchSurfaceRadius = radius + 0.006;
      const patchAngularRadius = 0.29;

      function createSphericalCapGeometry(
        surfaceRadius: number,
        angularRadius: number,
        radialSegments = 32,
        angularSegments = 128,
      ) {
        const positions: number[] = [];
        const uvs: number[] = [];
        const indices: number[] = [];

        for (let ring = 0; ring <= radialSegments; ring++) {
          const v = ring / radialSegments;
          const theta = angularRadius * v;
          const sinTheta = Math.sin(theta);
          const cosTheta = Math.cos(theta);

          for (let seg = 0; seg <= angularSegments; seg++) {
            const u = seg / angularSegments;
            const phi = u * Math.PI * 2;

            positions.push(
              surfaceRadius * sinTheta * Math.cos(phi),
              surfaceRadius * sinTheta * Math.sin(phi),
              surfaceRadius * cosTheta,
            );

            const radial = v * 0.5;
            uvs.push(
              0.5 + Math.cos(phi) * radial,
              0.5 + Math.sin(phi) * radial,
            );
          }
        }

        const stride = angularSegments + 1;

        for (let ring = 0; ring < radialSegments; ring++) {
          for (let seg = 0; seg < angularSegments; seg++) {
            const a = ring * stride + seg;
            const b = a + 1;
            const c = (ring + 1) * stride + seg;
            const d = c + 1;

            indices.push(a, c, b);
            indices.push(b, c, d);
          }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(positions, 3),
        );
        geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
        geometry.setIndex(indices);
        geometry.computeVertexNormals();
        return geometry;
      }

      const curvedPatchGeometry = createSphericalCapGeometry(
        patchSurfaceRadius,
        patchAngularRadius,
      );

      function makePatchTexture(number: number) {
        const canvas = document.createElement("canvas");
        canvas.width = 1024;
        canvas.height = 1024;

        const ctx = canvas.getContext("2d")!;
        ctx.clearRect(0, 0, 1024, 1024);

        ctx.beginPath();
        ctx.arc(512, 512, 511, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();

        ctx.fillStyle = "#0C0C0C";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "500 440px Aeonik, Arial, Helvetica, sans-serif";
        ctx.fillText(String(number), 512, 530);

        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(
          8,
          renderer.capabilities.getMaxAnisotropy(),
        );
        texture.needsUpdate = true;
        return texture;
      }

      // Prebuild every label texture once. Creating and disposing a 1024 px
      // canvas texture at each number boundary caused visible frame hitches.
      const PATCH_TEXTURES = Array.from({ length: PROJECT_COUNT }, (_, index) =>
        makePatchTexture(index + 1),
      );

      type PatchObject = {
        mesh: THREE_NS.Mesh;
        material: THREE_NS.MeshBasicMaterial;
        currentNumber: number | null;
      };
      const patchObjects: PatchObject[] = [];
      const forward = new THREE.Vector3(0, 0, 1);

      function createPatch(baseAngle: number, uprightCorrection: boolean) {
        const normal = new THREE.Vector3(
          0,
          Math.sin(baseAngle),
          Math.cos(baseAngle),
        ).normalize();

        const orientation = new THREE.Quaternion().setFromUnitVectors(
          forward,
          normal,
        );

        if (uprightCorrection) {
          const correction = new THREE.Quaternion().setFromAxisAngle(
            forward,
            Math.PI,
          );
          orientation.multiply(correction);
        }

        const material = new THREE.MeshBasicMaterial({
          map: PATCH_TEXTURES[0],
          transparent: true,
          depthWrite: true,
          side: THREE.FrontSide,
          polygonOffset: true,
          polygonOffsetFactor: -2,
          polygonOffsetUnits: -2,
        });

        const mesh = new THREE.Mesh(curvedPatchGeometry, material);
        mesh.quaternion.copy(orientation);
        rotor.add(mesh);

        patchObjects.push({ mesh, material, currentNumber: null });
      }

      createPatch(0, false);
      createPatch(Math.PI, true);

      // Interaction state.
      let rotation = 0;
      let dragging = false;
      let locked = false;
      let pointerId: number | null = null;
      let startY = 0;
      let hasDragged = false;
      let previousY = 0;
      let previousTime = 0;
      let velocity = 0;
      let hovered = false;
      let hoverAligning = false;

      // Camera-relative presentation state.
      let ambientYaw = 0;
      let ambientRoll = 0;
      let hoverPitch = 0;
      let hoverYaw = 0;
      let hoverTargetPitch = 0;
      let hoverTargetYaw = 0;

      // Each animation channel owns its own requestAnimationFrame handle.
      let raf = 0;
      let idleRaf = 0;
      let hoverFollowRaf = 0;

      // Reused Three.js values avoid allocations inside render().
      const hoverEuler = new THREE.Euler(0, 0, 0, "XYZ");
      const hoverOrientation = new THREE.Quaternion();

      // Animation clocks and shader motion state.
      let ambientBlend = 0;
      let lastIdleTime = performance.now();
      let gradientClock = 0;
      let gradientMotion = 0;
      let lastRenderTime = performance.now();
      let lastRenderRotation = 0;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      function getPassageIndex() {
        return Math.round(-rotation / PASSAGE_ANGLE);
      }

      function getCurrentIndex() {
        return modulo(getPassageIndex(), PROJECT_COUNT);
      }

      const tempTop = new THREE.Color();
      const tempBottom = new THREE.Color();

      function updateContinuousGradient() {
        /*
        logicalPosition is continuous:

        0.00 = project 01 exactly centred
        0.50 = halfway toward project 02
        1.00 = project 02 exactly centred

        There is NEVER a discrete colour switch here.
      */
        const logicalPosition = -rotation / PASSAGE_ANGLE;
        const base = Math.floor(logicalPosition);
        const fraction = logicalPosition - base;
        const blend = smootherstep(fraction);

        const current = modulo(base, PROJECT_COUNT);
        const next = modulo(base + 1, PROJECT_COUNT);
        // Gradient chain:
        // bottom(n) = top(n + 1), including the 12 -> 01 loop.
        const afterNext = modulo(base + 2, PROJECT_COUNT);

        tempTop.copy(PROJECT_COLORS[current]).lerp(PROJECT_COLORS[next], blend);
        tempBottom
          .copy(PROJECT_COLORS[next])
          .lerp(PROJECT_COLORS[afterNext], blend);

        sphereMaterial.uniforms.colorTop.value.copy(tempTop);
        sphereMaterial.uniforms.colorBottom.value.copy(tempBottom);
      }

      function setPatchNumber(object: PatchObject, projectIndex: number) {
        const number = modulo(projectIndex, PROJECT_COUNT) + 1;
        if (object.currentNumber === number) return;

        object.material.map = PATCH_TEXTURES[number - 1];
        object.material.needsUpdate = true;
        object.currentNumber = number;
      }

      function updatePatches() {
        const passage = getPassageIndex();
        const visiblePatchIndex = modulo(passage, 2);
        const hiddenPatchIndex = 1 - visiblePatchIndex;

        setPatchNumber(patchObjects[visiblePatchIndex], passage);
        setPatchNumber(patchObjects[hiddenPatchIndex], passage + 1);
      }

      function render() {
        const now = performance.now();
        const dt = Math.min(50, Math.max(1, now - lastRenderTime));
        const angularSpeed = Math.abs(rotation - lastRenderRotation) / dt;
        const targetMotion = reducedMotion.matches
          ? 0
          : Math.min(1, angularSpeed * 115);

        gradientMotion +=
          (targetMotion - gradientMotion) *
          (targetMotion > gradientMotion ? 0.24 : 0.1);
        gradientClock += (dt / 1000) * gradientMotion;
        sphereMaterial.uniforms.gradientTime.value = gradientClock;
        sphereMaterial.uniforms.motionAmount.value = gradientMotion;

        lastRenderTime = now;
        lastRenderRotation = rotation;
        // Functional rotation stays local to the sphere. Hover orientation
        // is applied in camera-relative axes by its parent group.
        rotor.rotation.set(rotation, ambientYaw, ambientRoll);
        hoverEuler.set(hoverPitch, hoverYaw, 0);
        hoverOrientation.setFromEuler(hoverEuler);
        hoverPivot.quaternion.copy(hoverOrientation);
        updatePatches();
        updateContinuousGradient();
        renderer.render(scene, camera);
      }

      function animateTo(
        target: number,
        duration: number,
        callback?: () => void,
      ) {
        if (raf) cancelAnimationFrame(raf);

        const from = rotation;
        const started = performance.now();
        const finalDuration = reducedMotion.matches
          ? Math.min(duration, 260)
          : duration;

        function frame(now: number) {
          const t = Math.min(1, (now - started) / finalDuration);
          rotation = from + (target - from) * easeOutCubic(t);
          render();

          if (t < 1) {
            raf = requestAnimationFrame(frame);
          } else {
            rotation = target;
            raf = 0;
            render();
            callback?.();
          }
        }

        raf = requestAnimationFrame(frame);
      }

      function settleWithBounce(target: number, callback?: () => void) {
        if (reducedMotion.matches) {
          animateTo(target, 220, callback);
          return;
        }

        if (raf) cancelAnimationFrame(raf);

        const from = rotation;
        const distance = target - from;
        const started = performance.now();
        const { durationMs: duration, damping, frequency } = CONFIG.settle;

        function frame(now: number) {
          const t = Math.min(1, (now - started) / duration);

          // One continuous damped spring. Its initial movement follows the
          // launch direction, crosses the snap point and settles smoothly.
          const spring = 1 - Math.exp(-damping * t) * Math.cos(frequency * t);
          rotation = from + distance * spring;
          render();

          if (t < 1) {
            raf = requestAnimationFrame(frame);
          } else {
            rotation = target;
            raf = 0;
            render();
            callback?.();
          }
        }

        raf = requestAnimationFrame(frame);
      }

      function stopIdleRotation() {
        if (!idleRaf) return;
        cancelAnimationFrame(idleRaf);
        idleRaf = 0;
      }

      function stopHoverFollow() {
        if (!hoverFollowRaf) return;
        cancelAnimationFrame(hoverFollowRaf);
        hoverFollowRaf = 0;
      }

      function startIdleRotation() {
        if (idleRaf || hovered || dragging || locked || hoverAligning) return;
        lastIdleTime = performance.now();
        ambientBlend = 0;

        function frame(now: number) {
          const dt = Math.min(40, now - lastIdleTime);
          lastIdleTime = now;
          ambientBlend = Math.min(1, ambientBlend + dt / CONFIG.idle.rampMs);
          const idleRamp = smootherstep(ambientBlend);

          // X, Y and Z share the same startup ramp. The fixed tilts approach
          // their targets asymptotically, without a visible stop or a
          // rightward movement occurring before the upward rotation.
          rotation -= dt * CONFIG.idle.speed * idleRamp;
          const tiltSmoothing =
            1 - Math.exp(-(dt * idleRamp) / CONFIG.idle.tiltEaseMs);
          ambientYaw += (FIXED_Y_ROTATION - ambientYaw) * tiltSmoothing;
          ambientRoll += (FIXED_Z_ROTATION - ambientRoll) * tiltSmoothing;
          render();
          idleRaf = requestAnimationFrame(frame);
        }

        idleRaf = requestAnimationFrame(frame);
      }

      function alignNearestProjectOnHover(pointAtCursor = false) {
        if (locked || dragging || hoverAligning) return;

        stopIdleRotation();
        stopHoverFollow();
        hoverAligning = true;
        if (raf) cancelAnimationFrame(raf);

        const fromX = rotation;
        const fromY = ambientYaw;
        const fromZ = ambientRoll;
        const fromHoverPitch = hoverPitch;
        const fromHoverYaw = hoverYaw;
        const targetX = Math.round(fromX / PASSAGE_ANGLE) * PASSAGE_ANGLE;
        // The Y inclination belongs to idle only; interaction returns to 0°.
        const targetY = 0;
        const targetZ = 0;
        const started = performance.now();
        const duration = reducedMotion.matches
          ? 240
          : CONFIG.hover.snapDurationMs;
        const damping = CONFIG.hover.snapDamping;
        const frequency = CONFIG.hover.snapFrequency;

        function frame(now: number) {
          const t = Math.min(1, (now - started) / duration);
          // The same spring progress is applied to each signed angular
          // distance. Overshoot direction and amplitude therefore follow
          // the sphere's actual incoming 3D orientation.
          const spring = reducedMotion.matches
            ? easeOutCubic(t)
            : 1 - Math.exp(-damping * t) * Math.cos(frequency * t);

          rotation = fromX + (targetX - fromX) * spring;
          ambientYaw = fromY + (targetY - fromY) * spring;
          ambientRoll = fromZ + (targetZ - fromZ) * spring;
          const useCursorTarget = pointAtCursor && hovered;
          const targetHoverPitch = useCursorTarget ? hoverTargetPitch : 0;
          const targetHoverYaw = useCursorTarget ? hoverTargetYaw : 0;
          hoverPitch =
            fromHoverPitch + (targetHoverPitch - fromHoverPitch) * spring;
          hoverYaw = fromHoverYaw + (targetHoverYaw - fromHoverYaw) * spring;
          render();

          if (t < 1) {
            raf = requestAnimationFrame(frame);
          } else {
            rotation = targetX;
            ambientYaw = targetY;
            ambientRoll = targetZ;
            hoverPitch = pointAtCursor && hovered ? hoverTargetPitch : 0;
            hoverYaw = pointAtCursor && hovered ? hoverTargetYaw : 0;
            raf = 0;
            hoverAligning = false;
            render();
            if (!hovered) startIdleRotation();
          }
        }

        raf = requestAnimationFrame(frame);
      }

      function launchSpin() {
        if (locked || hoverAligning) return;

        stopIdleRotation();
        stopHoverFollow();
        hoverPitch = 0;
        hoverYaw = 0;
        ambientYaw = 0;
        ambientRoll = 0;
        locked = true;
        dragging = false;
        canvasWrap.classList.remove("cursor-grabbing");
        canvasWrap.classList.add("cursor-wait");
        pushStatus("Spinning", true);

        const direction =
          Math.abs(velocity) > 0.003
            ? Math.sign(velocity)
            : Math.random() > 0.5
              ? 1
              : -1;

        // The destination project is truly random. Passage count is derived
        // from that destination, so the final number is not biased by speed.
        const speed = Math.min(1.25, Math.max(0.22, Math.abs(velocity)));
        const currentPassage = Math.round(rotation / PASSAGE_ANGLE);
        const currentProjectIndex = modulo(-currentPassage, PROJECT_COUNT);
        // Pick one of the other projects: a spin can never return directly
        // to the number that was visible when it started.
        const targetProjectIndex = modulo(
          currentProjectIndex +
            1 +
            Math.floor(Math.random() * (PROJECT_COUNT - 1)),
          PROJECT_COUNT,
        );
        let passages = 1;

        while (
          modulo(-(currentPassage + direction * passages), PROJECT_COUNT) !==
          targetProjectIndex
        ) {
          passages += 1;
        }

        // Preserve a satisfying launch even when the random target is close.
        if (passages < CONFIG.launch.minimumPassages) {
          passages += PROJECT_COUNT;
        }

        const snapped = (currentPassage + direction * passages) * PASSAGE_ANGLE;
        // A relatively generous duration over the reduced distance produces
        // a slower rotation without making the final settle feel heavy.
        const duration =
          CONFIG.launch.baseDurationMs +
          speed * CONFIG.launch.speedDurationMs +
          passages * CONFIG.launch.passageDurationMs;

        animateTo(
          snapped - direction * CONFIG.launch.preBounceOffset,
          duration,
          () => {
            settleWithBounce(snapped, () => {
              locked = false;
              canvasWrap.classList.remove("cursor-wait");

              const index = getCurrentIndex();
              const project = PROJECTS[index];

              onSelectedRef.current?.({
                index,
                projectNumber: project.id,
                projectColor: project.color,
                oppositeProject: project.opposite,
                url: project.url,
              });

              pushStatus(`Going to ${project.name}`);
              navigationTimeout.current = setTimeout(() => {
                navigationTimeout.current = null;
                routerRef.current.push(project.url);
              }, NAVIGATION_DELAY_MS);

              if (!hovered) startIdleRotation();
            });
          },
        );
      }

      function onPointerDown(event: PointerEvent) {
        if (locked || hoverAligning) return;

        stopIdleRotation();
        dragging = true;
        hasDragged = false;
        pointerId = event.pointerId;
        startY = event.clientY;
        previousY = event.clientY;
        previousTime = performance.now();
        velocity = 0;

        canvasWrap.classList.add("cursor-grabbing");
        canvasWrap.setPointerCapture?.(pointerId);
      }

      function updateHoverOrientation(event: PointerEvent | MouseEvent) {
        if (!hovered || locked) return;

        const rect = canvasWrap.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
        const clampedX = Math.max(-1, Math.min(1, x));
        const clampedY = Math.max(-1, Math.min(1, y));
        const halfVerticalFov = THREE.MathUtils.degToRad(camera.fov * 0.5);
        const verticalProjection = Math.tan(halfVerticalFov);

        // Convert the cursor's screen position to the actual camera-ray
        // angle. At the box edge this is ~13°, rather than the former 6.5°.
        hoverTargetPitch = Math.atan(clampedY * verticalProjection);
        hoverTargetYaw = Math.atan(
          clampedX * verticalProjection * camera.aspect,
        );

        // The hover-alignment animation reads these live targets itself.
        if (hoverAligning) return;
        if (hoverFollowRaf) return;

        let previousFollowTime = performance.now();
        function followFrame(now: number) {
          if (!hovered || dragging || locked || hoverAligning) {
            hoverFollowRaf = 0;
            return;
          }

          const dt = Math.min(40, now - previousFollowTime);
          previousFollowTime = now;
          const smoothing = 1 - Math.exp(-dt / CONFIG.hover.followEaseMs);
          hoverPitch += (hoverTargetPitch - hoverPitch) * smoothing;
          hoverYaw += (hoverTargetYaw - hoverYaw) * smoothing;
          render();

          const remaining =
            Math.abs(hoverTargetPitch - hoverPitch) +
            Math.abs(hoverTargetYaw - hoverYaw);

          if (remaining > 0.0001) {
            hoverFollowRaf = requestAnimationFrame(followFrame);
          } else {
            hoverPitch = hoverTargetPitch;
            hoverYaw = hoverTargetYaw;
            hoverFollowRaf = 0;
            render();
          }
        }

        hoverFollowRaf = requestAnimationFrame(followFrame);
      }

      function onPointerMove(event: PointerEvent) {
        if (!dragging) {
          updateHoverOrientation(event);
          return;
        }

        if (locked || event.pointerId !== pointerId) return;

        const now = performance.now();
        const dy = event.clientY - previousY;
        const dt = Math.max(8, now - previousTime);

        if (!hasDragged) {
          if (Math.abs(event.clientY - startY) < CONFIG.drag.thresholdPx) {
            previousY = event.clientY;
            previousTime = now;
            return;
          }

          hasDragged = true;
        }

        rotation += dy * CONFIG.drag.radiansPerPixel;
        hoverPitch *= 0.82;
        hoverYaw *= 0.82;

        const instant = (dy / dt) * CONFIG.drag.velocityScale;
        velocity = velocity * 0.55 + instant * 0.45;

        previousY = event.clientY;
        previousTime = now;
        render();
      }

      function onPointerUp(event: PointerEvent) {
        if (!dragging || locked || event.pointerId !== pointerId) return;

        dragging = false;
        pointerId = null;
        canvasWrap.classList.remove("cursor-grabbing");

        if (!hasDragged) {
          alignNearestProjectOnHover();
          return;
        }

        launchSpin();
      }

      function onMouseEnter(event: MouseEvent) {
        hovered = true;
        stopIdleRotation();
        updateHoverOrientation(event);
        alignNearestProjectOnHover(true);
      }

      function onMouseLeave() {
        hovered = false;
        if (!locked && !dragging && !hoverAligning) {
          alignNearestProjectOnHover();
        }
      }

      function onKeyDown(event: KeyboardEvent) {
        if (locked) return;

        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          event.preventDefault();
          velocity = event.key === "ArrowUp" ? -0.6 : 0.6;
          launchSpin();
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          velocity = Math.random() > 0.5 ? 0.75 : -0.75;
          launchSpin();
        }
      }

      canvasWrap.addEventListener("pointerdown", onPointerDown);
      canvasWrap.addEventListener("pointermove", onPointerMove);
      canvasWrap.addEventListener("pointerup", onPointerUp);
      canvasWrap.addEventListener("pointercancel", onPointerUp);
      canvasWrap.addEventListener("mouseenter", onMouseEnter);
      canvasWrap.addEventListener("mouseleave", onMouseLeave);
      canvasWrap.addEventListener("keydown", onKeyDown);

      function resize() {
        const rect = canvasWrap.getBoundingClientRect();
        const width = Math.max(1, Math.round(rect.width));
        const height = Math.max(1, Math.round(rect.height));

        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        render();
      }

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvasWrap);

      resize();
      // Compile le programme GLSL avant de retirer le loader : sans ça `ready`
      // passe à true pendant que le GPU compile encore, découvrant un canvas vide.
      renderer.compile(scene, camera);
      render();
      setReady(true);
      startIdleRotation();

      teardown = () => {
        resizeObserver.disconnect();
        canvasWrap.removeEventListener("pointerdown", onPointerDown);
        canvasWrap.removeEventListener("pointermove", onPointerMove);
        canvasWrap.removeEventListener("pointerup", onPointerUp);
        canvasWrap.removeEventListener("pointercancel", onPointerUp);
        canvasWrap.removeEventListener("mouseenter", onMouseEnter);
        canvasWrap.removeEventListener("mouseleave", onMouseLeave);
        canvasWrap.removeEventListener("keydown", onKeyDown);

        cancelAnimationFrame(raf);
        cancelAnimationFrame(idleRaf);
        cancelAnimationFrame(hoverFollowRaf);

        // GPU resources aren't garbage-collected with the JS objects — every
        // remount would otherwise leak a context, its textures and its buffers.
        PATCH_TEXTURES.forEach((texture) => texture.dispose());
        patchObjects.forEach((patch) => patch.material.dispose());
        curvedPatchGeometry.dispose();
        sphereGeometry.dispose();
        sphereMaterial.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    setup().catch((error) => {
      setFailed(true);
      setStatus("WebGL could not be loaded");
      console.error("Anagram Continuous Gradient Sphere:", error);
    });

    return () => {
      disposed = true;
      // Sans ça, fermer le panel pendant le délai navigue quand même.
      if (navigationTimeout.current) clearTimeout(navigationTimeout.current);
      teardown?.();
    };
  }, []);

  return (
    <div
      id="widget-sphere"
      className="w-full overflow-hidden rounded-lg bg-[#f7f7f5]"
    >
      <div className="relative w-full aspect-square">
        <div
          ref={wrapRef}
          id="widget-sphere-canvas"
          tabIndex={0}
          role="application"
          aria-label="3D project selector. Drag vertically and release to spin."
          className="size-full overflow-hidden rounded-lg bg-[#f7f7f5] cursor-grab outline-none touch-pan-x [&>canvas]:block [&>canvas]:size-full"
        />
      </div>

      <div
        id="widget-sphere-status"
        className="flex items-center justify-center overflow-hidden px-5 py-8 text-center leading-none text-[#0c0c0c] text-sm opacity-50"
      >
        <span ref={statusRef} className="inline-block will-change-transform">
          {status}
          {spinning && (
            <span className="inline-block ml-[0.35em]" aria-hidden>
              <SpinningDots />
            </span>
          )}
        </span>
      </div>

      {failed && (
        <div className="px-5 pb-8 text-center text-[#0c0c0c] opacity-50">
          3D unavailable
        </div>
      )}
    </div>
  );
}

function SpinningDots() {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      gsap.to(".sphere-dot", {
        y: "-0.25rem",
        duration: 0.41,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.18,
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref}>
      <span className="sphere-dot inline-block">.</span>
      <span className="sphere-dot inline-block">.</span>
      <span className="sphere-dot inline-block">.</span>
    </span>
  );
}
