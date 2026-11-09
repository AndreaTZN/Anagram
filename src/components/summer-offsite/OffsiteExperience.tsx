"use client";

import { useEffect, useRef } from "react";
import { createAssetGate, type AssetGate } from "./experienceAssets";

export type OffsiteExperienceKind = "sphere" | "pile" | "counter";

type CreateEngine = (
  canvas: HTMLCanvasElement,
  host: HTMLElement,
  gate: AssetGate,
) => () => void;

// Engines load on demand so Matter.js and Three.js stay out of the home bundle
// until the article is actually opened.
const ENGINES: Record<OffsiteExperienceKind, () => Promise<CreateEngine>> = {
  sphere: () => import("./photoSphere").then((m) => m.createPhotoSphere),
  pile: () => import("./photoPile").then((m) => m.createPhotoPile),
  counter: () => import("./scoreCounter").then((m) => m.createScoreCounter),
};

const CANVAS: Record<
  OffsiteExperienceKind,
  { className: string; role: string; label: string }
> = {
  sphere: {
    // Touch devices keep vertical page scroll over the sphere.
    className: "aspect-square touch-none pointer-coarse:touch-pan-y",
    role: "img",
    label:
      "A slowly rotating sphere of thirty-two offsite photos. Drag to explore. Click a photo to enlarge it, then click outside to close. Use the left and right arrow keys to browse photos, Enter to enlarge one, and Escape to close it.",
  },
  pile: {
    className: "aspect-[568/420] touch-none pointer-coarse:touch-pan-y",
    role: "application",
    label:
      "An interactive pile of offsite photos. Move your pointer over the photos to collect them. Once all photos are collected, the stack enlarges. Click or press the right arrow to view the next photo. On desktop, move your pointer outside the area to scatter the photos. On mobile, collected photos advance automatically every half-second. Click the empty background or press R for the next set of photos.",
  },
  counter: {
    className: "aspect-[756/491] touch-pan-y active:cursor-grabbing",
    role: "application",
    label:
      "A foosball score counter with eleven score beads. Move the light beads from the left to the darker selected group on the right to reveal more photos. Drag and flick the beads to make them collide. Use the up and down arrow keys to select a bead, and left and right to push it.",
  },
};

type OffsiteExperienceProps = {
  kind: OffsiteExperienceKind;
  // False while the modal is still morphing open, so loading can't stutter it.
  active: boolean;
};

export default function OffsiteExperience({
  kind,
  active,
}: OffsiteExperienceProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!active || !host || !canvas) return;
    let cancelled = false;
    let destroyEngine: (() => void) | undefined;
    const gate = createAssetGate(
      host,
      canvas,
      host.closest<HTMLElement>("[data-news-sheet]"),
    );
    ENGINES[kind]()
      .then((create) => {
        if (!cancelled) destroyEngine = create(canvas, host, gate);
      })
      .catch((error) => console.warn(`Offsite ${kind} unavailable.`, error));
    return () => {
      cancelled = true;
      destroyEngine?.();
      gate.destroy();
    };
  }, [kind, active]);

  const canvasProps = CANVAS[kind];

  return (
    <div
      id={`home-news-modal-xp-${kind}`}
      ref={hostRef}
      className="relative bg-white"
    >
      {/* Hidden and inert until its photos have loaded; the asset gate fades it in. */}
      <canvas
        ref={canvasRef}
        tabIndex={0}
        role={canvasProps.role}
        aria-label={canvasProps.label}
        className={`pointer-events-none block w-full bg-white opacity-0 outline-none ${canvasProps.className}`}
      />
      {kind === "counter" && (
        <p
          id="home-news-modal-xp-counter-hint"
          className="pointer-events-none mt-2 text-center text-[0.6875rem] leading-3.75 text-[#999] opacity-45"
        >
          Slide the score beads to the right
          <br />
          to reveal more photos.
        </p>
      )}
    </div>
  );
}
