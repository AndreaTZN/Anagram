"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const FRAME_COUNT = 91;
const FRAMES = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/arpe-rotation/arpe-${String(i + 1).padStart(2, "0")}.webp`,
);

export default function ArpeRotation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const INITIAL_FRAME = Math.floor(FRAME_COUNT / 2);
  const frameIndex = useRef(INITIAL_FRAME);
  const targetFrame = useRef(INITIAL_FRAME);

  function drawFrame(index: number) {
    const canvas = canvasRef.current;
    const img = images.current[Math.round(index)];
    if (!canvas || !img?.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }

  useEffect(() => {
    images.current = FRAMES.map((src, i) => {
      const img = new window.Image();
      img.src = src;
      if (i === 0) {
        img.onload = () => {
          if (canvasRef.current) {
            canvasRef.current.width = img.naturalWidth;
            canvasRef.current.height = img.naturalHeight;
          }
          const initImg = images.current[INITIAL_FRAME];
          if (initImg?.complete && initImg.naturalWidth > 0) {
            drawFrame(INITIAL_FRAME);
          }
        };
      }
      if (i === INITIAL_FRAME) {
        img.onload = () => drawFrame(INITIAL_FRAME);
      }
      return img;
    });

    const ticker = gsap.ticker.add(() => {
      const diff = targetFrame.current - frameIndex.current;
      if (Math.abs(diff) > 0.05) {
        frameIndex.current += diff * 0.12;
        drawFrame(frameIndex.current);
      }
    });

    return () => gsap.ticker.remove(ticker);
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    targetFrame.current = ratio * (FRAME_COUNT - 1);
  }

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="w-full h-full object-contain pointer-events-none"
      />
    </div>
  );
}