"use client";

import { useEffect, useImperativeHandle, useRef } from "react";
import gsap from "gsap";

export type CloseWebGLHandle = {
  play: () => void;
};

type CloseWebGLProps = {
  className?: string;
  ref?: React.Ref<CloseWebGLHandle>;
};

const MICRO_INTERACTION_MS = 520;
const STAGGER_MS = 75;

/** Génère les triangles d'une capsule 3D entre deux points 2D. */
function makeCapsule(
  a: [number, number],
  b: [number, number],
  radius = 0.085,
  segments = 16,
  capSteps = 5,
) {
  const vertices: number[] = [];
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const length = Math.hypot(dx, dy);
  const ux = dx / length;
  const uy = dy / length;
  const nx = -uy;
  const ny = ux;
  const rings: number[][][] = [];

  const addRing = (
    base: [number, number],
    offset: number,
    ringRadius: number,
  ) => {
    const ring: number[][] = [];
    for (let i = 0; i < segments; i++) {
      const angle = (i * Math.PI * 2) / segments;
      ring.push([
        base[0] + ux * offset + nx * Math.cos(angle) * ringRadius,
        base[1] + uy * offset + ny * Math.cos(angle) * ringRadius,
        Math.sin(angle) * ringRadius,
      ]);
    }
    rings.push(ring);
  };

  for (let j = 0; j <= capSteps; j++) {
    const theta = -Math.PI / 2 + (j * Math.PI) / 2 / capSteps;
    addRing(a, Math.sin(theta) * radius, Math.cos(theta) * radius);
  }
  addRing(b, 0, radius);
  for (let j = 1; j <= capSteps; j++) {
    const theta = (j * Math.PI) / 2 / capSteps;
    addRing(b, Math.sin(theta) * radius, Math.cos(theta) * radius);
  }

  for (let r = 0; r < rings.length - 1; r++) {
    for (let i = 0; i < segments; i++) {
      const n = (i + 1) % segments;
      const a0 = rings[r][i];
      const a1 = rings[r][n];
      const b0 = rings[r + 1][i];
      const b1 = rings[r + 1][n];
      vertices.push(...a0, ...b0, ...b1, ...a0, ...b1, ...a1);
    }
  }
  return new Float32Array(vertices);
}

const VERTEX_SOURCE = `
  attribute vec3 aPosition;
  uniform float uAngle;
  void main() {
    float c = cos(uAngle), s = sin(uAngle);
    vec3 p = vec3(
      c * aPosition.x + s * aPosition.z,
      aPosition.y,
      -s * aPosition.x + c * aPosition.z
    );
    gl_Position = vec4(p.x * 1.36, p.y * 1.36, p.z * .35, 1.0);
  }
`;
// Couleur figée (#7c7c7c) : ce bouton garde un fond clair quel que soit le
// thème de la nav, la croix n'a donc jamais à changer de couleur.
const FRAGMENT_SOURCE = `
  precision mediump float;
  void main() { gl_FragColor = vec4(.4863, .4863, .4863, 1.0); }
`;

export default function CloseWebGL({ className, ref }: CloseWebGLProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playRef = useRef<() => void>(() => {});

  useImperativeHandle(ref, () => ({ play: () => playRef.current() }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
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

    const buffers = [gl.createBuffer(), gl.createBuffer()];
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    const angle = gl.getUniformLocation(program, "uAngle");
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);

    // inset raccourcit simultanément les deux branches vers leur centre.
    const render = (valueA: number, valueB = valueA, inset = 0) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      buffers.forEach((buffer, index) => {
        const edge = 0.44 - inset;
        const data = index
          ? makeCapsule([-edge, edge], [edge, -edge])
          : makeCapsule([-edge, -edge], [edge, edge]);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
        gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);
        gl.uniform1f(angle, index ? valueB : valueA);
        gl.drawArrays(gl.TRIANGLES, 0, data.length / 3);
      });
    };

    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    render(0, 0, 0);
    // Le canvas est rendu côté serveur : il apparaît vide dès le premier paint
    // et ne se remplit qu'à l'hydratation. On ne le révèle qu'une fois dessiné,
    // en fondu pour que l'apparition ne soit pas sèche.
    const reveal = gsap.to(canvas, {
      autoAlpha: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    // Les deux branches tournent d'un demi-tour, la seconde décalée.
    playRef.current = () => {
      if (reduceMotion.matches) return;
      cancelAnimationFrame(frame);
      const start = performance.now();
      const duration = MICRO_INTERACTION_MS - STAGGER_MS;
      const branchDelay = STAGGER_MS;
      const smooth = (value: number) => value * value * (3 - 2 * value);
      const motion = (progress: number) => {
        if (progress <= 0) return 0;
        if (progress >= 1) return -Math.PI;
        if (progress < 0.72)
          return (
            ((-190 * Math.PI) / 180) * (1 - Math.pow(1 - progress / 0.72, 3))
          );
        if (progress < 0.88)
          return (
            ((-190 + 14 * smooth((progress - 0.72) / 0.16)) * Math.PI) / 180
          );
        return ((-176 - 4 * smooth((progress - 0.88) / 0.12)) * Math.PI) / 180;
      };
      const tick = (now: number) => {
        const elapsed = now - start;
        const a = Math.min(1, elapsed / duration);
        const b = Math.min(1, Math.max(0, elapsed - branchDelay) / duration);
        const total = Math.min(1, elapsed / (duration + branchDelay));
        const contraction =
          total < 0.28
            ? smooth(total / 0.28)
            : total < 0.58
              ? 1 - smooth((total - 0.28) / 0.3)
              : 0;
        const rebound =
          total > 0.58 && total < 0.78
            ? Math.sin(((total - 0.58) / 0.2) * Math.PI) * -0.012
            : 0;
        render(motion(a), motion(b), 0.055 * contraction + rebound);
        if (elapsed < duration + branchDelay)
          frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    return () => {
      cancelAnimationFrame(frame);
      playRef.current = () => {};
      reveal.kill();
      buffers.forEach((b) => gl.deleteBuffer(b));
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      // Surtout pas de loseContext() ici : la perte est définitive pour cet
      // élément canvas, et React le réutilise au remontage — le contexte
      // reviendrait mort et plus rien ne se dessinerait.
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
