"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const FRAME_COUNT = 91;
const INITIAL_FRAME = Math.floor(FRAME_COUNT / 2);
const BLUR_REM = 1.25;
const BLUR_SAMPLES = Array.from({ length: 19 }, (_, i) => {
  const offset = i - 9;
  return { offset, weight: Math.exp(-(offset * offset) / 18) };
});
const BLUR_WEIGHT = BLUR_SAMPLES.reduce((sum, sample) => sum + sample.weight, 0);
const FRAMES = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/arpe-rotation/arpe_Main_${String(i).padStart(5, "0")}.webp`,
);

export default function ArpeRotation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameIndex = useRef(INITIAL_FRAME);
  const targetFrame = useRef(INITIAL_FRAME);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const supportsFilter = Reflect.has(ctx, "filter");
    const source = document.createElement("canvas");
    const horizontal = document.createElement("canvas");
    const sourceCtx = source.getContext("2d");
    const horizontalCtx = horizontal.getContext("2d");
    let blurSize = 0;
    let lastDrawnFrame = -1;

    function drawFrame(index: number) {
      const roundedIndex = Math.round(index);
      const img = images[roundedIndex];
      if (
        !img?.complete ||
        img.naturalWidth === 0 ||
        roundedIndex === lastDrawnFrame
      ) return;
      if (!canvas || !ctx || !blurSize) return;

      const scale = Math.min(
        canvas.width / img.naturalWidth,
        canvas.height / img.naturalHeight,
      );
      const width = img.naturalWidth * scale;
      const height = img.naturalHeight * scale;
      const x = (canvas.width - width) / 2;
      const y = (canvas.height - height) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (supportsFilter) {
        ctx.save();
        ctx.filter = `blur(${BLUR_REM}rem)`;
        ctx.drawImage(img, x, y, width, height);
        ctx.restore();
      } else {
        if (!sourceCtx || !horizontalCtx) return;
        // Safari needs a pixel blur fallback; small buffers keep both Gaussian passes inexpensive.
        sourceCtx.clearRect(0, 0, source.width, source.height);
        sourceCtx.drawImage(
          img,
          (x / canvas.width) * source.width,
          (y / canvas.height) * source.height,
          (width / canvas.width) * source.width,
          (height / canvas.height) * source.height,
        );
        horizontalCtx.clearRect(0, 0, horizontal.width, horizontal.height);
        horizontalCtx.save();
        horizontalCtx.globalCompositeOperation = "lighter";
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        for (const { offset, weight } of BLUR_SAMPLES) {
          horizontalCtx.globalAlpha = weight / BLUR_WEIGHT;
          horizontalCtx.drawImage(source, offset, 0);
        }
        for (const { offset, weight } of BLUR_SAMPLES) {
          ctx.globalAlpha = weight / BLUR_WEIGHT;
          ctx.drawImage(
            horizontal,
            0,
            (offset * canvas.height) / source.height,
            canvas.width,
            canvas.height,
          );
        }
        horizontalCtx.restore();
        ctx.restore();
      }

      lastDrawnFrame = roundedIndex;
    }

    const images = FRAMES.map((src, i) => {
      const img = new window.Image();
      img.onload = () => {
        if (i === Math.round(frameIndex.current)) drawFrame(i);
      };
      img.src = src;
      return img;
    });

    function resizeCanvas() {
      if (!canvas) return;
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      // Layout resolution is sufficient for a blurred image and avoids filtering full-size assets.
      canvas.width = Math.round(width);
      canvas.height = Math.round(height);
      blurSize = BLUR_REM * parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      if (!supportsFilter) {
        source.width = horizontal.width = Math.max(
          1, Math.ceil((canvas.width * 3) / blurSize),
        );
        source.height = horizontal.height = Math.max(
          1, Math.ceil((canvas.height * 3) / blurSize),
        );
      }
      lastDrawnFrame = -1;
      drawFrame(frameIndex.current);
    }

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);
    resizeCanvas();

    const ticker = gsap.ticker.add(() => {
      const diff = targetFrame.current - frameIndex.current;
      if (Math.abs(diff) > 0.05) {
        frameIndex.current += diff * 0.12;
        drawFrame(frameIndex.current);
      }
    });

    return () => {
      gsap.ticker.remove(ticker);
      resizeObserver.disconnect();
      images.forEach((img) => {
        img.onload = null;
      });
    };
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    targetFrame.current = ratio * (FRAME_COUNT - 1);
  }

  return (
    <div
      id="about-merch-rotation"
      className="w-full h-full flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      <canvas
        id="about-merch-canvas"
        ref={canvasRef}
        width={800}
        height={800}
        className="w-full h-full object-contain pointer-events-none"
      />
    </div>
  );
}
