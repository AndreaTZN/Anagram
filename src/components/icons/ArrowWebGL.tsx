"use client";

import { useEffect, useImperativeHandle, useRef } from "react";
import gsap from "gsap";

export type ArrowWebGLHandle = {
  play: () => void;
};

type ArrowWebGLProps = {
  className?: string;
  /** Flèche blanche (fond sombre) ou grise (#8e8e90) sur fond clair. */
  light?: boolean;
  ref?: React.Ref<ArrowWebGLHandle>;
};

const MICRO_INTERACTION_MS = 520;
const STAGGER_MS = 75;

/**
 * Génère les triangles d'une capsule 3D entre deux points 2D : un cercle
 * « sweepé » le long du segment, avec une demi-sphère à chaque extrémité.
 */
function capsule(
  a: [number, number],
  b: [number, number],
  radius = 0.075,
  segments = 12,
  caps = 4,
) {
  const out: number[] = [];
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const nx = -uy;
  const ny = ux;
  const rings: number[][][] = [];

  const ring = (base: [number, number], offset: number, r: number) => {
    const v: number[][] = [];
    for (let i = 0; i < segments; i++) {
      const q = (i * Math.PI * 2) / segments;
      v.push([
        base[0] + ux * offset + nx * Math.cos(q) * r,
        base[1] + uy * offset + ny * Math.cos(q) * r,
        Math.sin(q) * r,
      ]);
    }
    rings.push(v);
  };

  for (let j = 0; j <= caps; j++) {
    const q = -Math.PI / 2 + (j * Math.PI) / 2 / caps;
    ring(a, Math.sin(q) * radius, Math.cos(q) * radius);
  }
  ring(b, 0, radius);
  for (let j = 1; j <= caps; j++) {
    const q = (j * Math.PI) / 2 / caps;
    ring(b, Math.sin(q) * radius, Math.cos(q) * radius);
  }

  for (let r = 0; r < rings.length - 1; r++) {
    for (let i = 0; i < segments; i++) {
      const n = (i + 1) % segments;
      const a0 = rings[r][i];
      const a1 = rings[r][n];
      const b0 = rings[r + 1][i];
      const b1 = rings[r + 1][n];
      out.push(...a0, ...b0, ...b1, ...a0, ...b1, ...a1);
    }
  }
  return out;
}

// Géométrie statique de la pointe : transférée une seule fois au GPU.
const TIP_GEOMETRY = new Float32Array([
  ...capsule([-0.2, 0.35], [0.35, 0.35]),
  ...capsule([0.35, 0.35], [0.35, -0.2]),
]);

const VERTEX_SOURCE = `attribute vec3 p;uniform float a;uniform vec2 o;void main(){vec3 k=normalize(vec3(1.,1.,0.));float c=cos(a),s=sin(a);vec3 q=p*c+cross(k,p)*s+k*dot(k,p)*(1.-c);q.xy+=o;gl_Position=vec4(q.xy*1.42,q.z*.35,1.);}`;
const FRAGMENT_SOURCE = `precision mediump float;uniform vec3 c;void main(){gl_FragColor=vec4(c,1.);}`;

export default function ArrowWebGL({
  className,
  light = false,
  ref,
}: ArrowWebGLProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playRef = useRef<() => void>(() => {});
  // La couleur passe par un ref, pas par une dépendance d'effet : la relire à
  // chaque frame évite de recréer le contexte GL quand le thème bascule.
  // 0 = gris (fond clair), 1 = blanc (fond sombre).
  const lightRef = useRef(light ? 1 : 0);
  const redrawRef = useRef<() => void>(() => {});

  useImperativeHandle(ref, () => ({ play: () => playRef.current() }), []);

  // Le canvas ne peut pas suivre une transition CSS : on interpole l'uniform
  // à la main pour rester en phase avec le fondu de thème du parent.
  useEffect(() => {
    const target = light ? 1 : 0;
    const from = lightRef.current;

    // Déjà à la bonne couleur (montage, ou thème inchangé) : rien à animer.
    // Le dessin est assuré par l'effet de création du contexte.
    if (from === target) return;

    const start = performance.now();
    const duration = 500;
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      lightRef.current = from + (target - from) * eased;
      redrawRef.current();
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [light]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // preserveDrawingBuffer : la flèche au repos est une image fixe, dessinée
    // une seule fois. Sans ça le buffer est vidé après composition et le
    // canvas reste blanc sur les pages sans animation continue.
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    if (!gl) return;

    const shader = (type: number, source: string) => {
      const v = gl.createShader(type)!;
      gl.shaderSource(v, source);
      gl.compileShader(v);
      return v;
    };

    const program = gl.createProgram()!;
    const vs = shader(gl.VERTEX_SHADER, VERTEX_SOURCE);
    const fs = shader(gl.FRAGMENT_SHADER, FRAGMENT_SOURCE);
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const shaftBuffer = gl.createBuffer();
    const tipBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tipBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, TIP_GEOMETRY, gl.STATIC_DRAW);

    const p = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(p);
    const angle = gl.getUniformLocation(program, "a");
    const offset = gl.getUniformLocation(program, "o");
    const color = gl.getUniformLocation(program, "c");
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);

    // La tige se raccourcit pendant que la pointe rentre vers le centre.
    const draw = (v: number, inset = 0) => {
      gl.viewport(0, 0, 56, 56);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      const k = lightRef.current;
      gl.uniform3f(
        color,
        0.557 + (1 - 0.557) * k,
        0.557 + (1 - 0.557) * k,
        0.565 + (1 - 0.565) * k,
      );
      const shaft = new Float32Array(
        capsule([-0.46, -0.46], [0.28 - inset, 0.28 - inset]),
      );
      gl.bindBuffer(gl.ARRAY_BUFFER, shaftBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, shaft, gl.DYNAMIC_DRAW);
      gl.vertexAttribPointer(p, 3, gl.FLOAT, false, 0, 0);
      gl.uniform1f(angle, 0);
      gl.uniform2f(offset, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, shaft.length / 3);
      gl.bindBuffer(gl.ARRAY_BUFFER, tipBuffer);
      gl.vertexAttribPointer(p, 3, gl.FLOAT, false, 0, 0);
      gl.uniform1f(angle, v);
      gl.uniform2f(offset, -inset, -inset);
      gl.drawArrays(gl.TRIANGLES, 0, TIP_GEOMETRY.length / 3);
    };
    // Dernière pose dessinée : un redraw de couleur doit la conserver, sinon
    // un changement de thème pendant le survol ramènerait la flèche au repos.
    let lastAngle = 0;
    let lastInset = 0;
    const drawPose = (v: number, inset = 0) => {
      lastAngle = v;
      lastInset = inset;
      draw(v, inset);
    };

    redrawRef.current = () => draw(lastAngle, lastInset);

    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    drawPose(0, 0);
    // Le canvas est rendu côté serveur : il apparaît vide dès le premier paint
    // et ne se remplit qu'à l'hydratation. On ne le révèle qu'une fois dessiné,
    // en fondu pour que l'apparition ne soit pas sèche.
    const reveal = gsap.to(canvas, {
      autoAlpha: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    // Séquence : renfoncement, rotation différée, retour continu.
    playRef.current = () => {
      if (reduceMotion.matches) return;
      cancelAnimationFrame(frame);
      const start = performance.now();
      const smooth = (x: number) => x * x * (3 - 2 * x);
      const tick = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(1, elapsed / MICRO_INTERACTION_MS);
        const r = Math.min(
          1,
          Math.max(0, elapsed - STAGGER_MS) /
            (MICRO_INTERACTION_MS - STAGGER_MS),
        );
        let d: number;
        if (r < 0.72) {
          d = 190 * (1 - Math.pow(1 - r / 0.72, 3));
        } else if (r < 0.88) {
          d = 190 - 14 * smooth((r - 0.72) / 0.16);
        } else {
          d = 176 + 4 * smooth((r - 0.88) / 0.12);
        }
        const travel =
          t < 0.3 ? smooth(t / 0.3) : t < 0.6 ? 1 - smooth((t - 0.3) / 0.3) : 0;
        drawPose((d * Math.PI) / 180, 0.095 * travel);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    return () => {
      cancelAnimationFrame(frame);
      playRef.current = () => {};
      redrawRef.current = () => {};
      reveal.kill();
      gl.deleteBuffer(shaftBuffer);
      gl.deleteBuffer(tipBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width="56"
      height="56"
      aria-hidden="true"
      className={className}
      style={{ visibility: "hidden", opacity: 0 }}
    />
  );
}
