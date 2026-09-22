export const WAVE_MAP_SCALE = 96;

export type WaveGeometry = {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  pillWidth: number;
  pillHeight: number;
};

type WaveFrame = { progress: number; opacity: number; pulse: number; time: number };

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function smootherStep(start: number, end: number, value: number) {
  const x = clamp((value - start) / (end - start));
  return x * x * x * (x * (x * 6 - 15) + 10);
}

function smoothStep(start: number, end: number, value: number) {
  const x = clamp((value - start) / (end - start));
  return x * x * (3 - 2 * x);
}

export function createWidgetWaveMap(geometry: WaveGeometry) {
  const { width, height, centerX, centerY, pillWidth, pillHeight } = geometry;
  // Only the smooth displacement field is sampled; the page remains at native resolution.
  const ratio = Math.min(1, 384 / Math.max(width, height));
  const columns = Math.ceil(width * ratio);
  const rows = Math.ceil(height * ratio);
  const canvas = document.createElement("canvas");
  canvas.width = columns * 3;
  canvas.height = rows;
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) return null;

  const bitmap = context.createImageData(canvas.width, rows);
  const sourceX = Math.max(pillWidth * 0.08, 24);
  const sourceY = Math.max(pillHeight * 0.12, 6);
  const edgeX = Math.max(centerX, width - centerX);
  const edgeY = Math.max(centerY, height - centerY);
  const points = new Float32Array(columns * rows * 7);

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const x = ((column + 0.5) / columns) * width - centerX;
      const y = centerY - ((row + 0.5) / rows) * height;
      const angle = Math.atan2(y, x);
      const q = Math.max(Math.abs(x) - Math.max(sourceX - sourceY, 0), 0);
      const distance = Math.sqrt(q * q + y * y) - sourceY;
      const index = (row * columns + column) * 7;
      points.set([
        x, y, smootherStep(6, 72, distance),
        Math.sin(angle * 5) * 0.34, Math.cos(angle * 5) * 0.34,
        Math.sin(angle * 9) * 0.14, Math.cos(angle * 9) * 0.14,
      ], index);
    }
  }

  return {
    render({ progress, opacity, pulse, time }: WaveFrame) {
      const halfX = sourceX + (edgeX + edgeY + 40 - sourceX) * progress;
      const halfY = sourceY + (edgeY + 20 - sourceY) * progress;
      const tip = Math.max(halfX - halfY, 0);
      const lifecycle = smoothStep(0, 0.025, progress) * (1 - smoothStep(0.9, 1, progress));
      const launch = progress < 0.34 ? Math.sin(clamp(progress / 0.34) * 3.14159265) : 0;
      const ignition = smootherStep(0, 0.045, progress);
      const sin1 = Math.sin(time * 1.35), cos1 = Math.cos(time * 1.35);
      const sin2 = Math.sin(time * 0.8), cos2 = Math.cos(time * 0.8);

      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const index = (row * columns + column) * 7;
          const x = points[index], y = points[index + 1];
          const directionX = x - clamp(x, -tip, tip);
          const length = Math.sqrt(directionX * directionX + y * y);
          const distance = length - halfY;
          const position = clamp((420 - distance) / 840);
          const convexity = smootherStep(0, 0.36, position) * (1 - smootherStep(0.64, 1, position));
          const band = Math.exp(-Math.pow((distance - 28) / 126, 2));
          const wave = clamp(Math.max(convexity * lifecycle, band * launch * (1 + pulse * 0.38)))
            * opacity * points[index + 2] * ignition;
          const organic = points[index + 3] * cos1 + points[index + 4] * sin1
            + points[index + 5] * cos2 - points[index + 6] * sin2;
          const displacement = 28 + organic * 12;
          const normalX = directionX / Math.max(length, 0.0001);
          const normalY = y / Math.max(length, 0.0001);
          const screenX = x + centerX, screenY = centerY - y;

          for (let channel = 0; channel < 3; channel++) {
            const shift = wave * (displacement + (channel - 1) * 1.6);
            const dx = clamp(screenX - normalX * shift, width * 0.001, width * 0.999) - screenX;
            const dy = clamp(screenY + normalY * shift, height * 0.001, height * 0.999) - screenY;
            const pixel = (row * columns * 3 + column + channel * columns) * 4;
            bitmap.data[pixel] = Math.round(128 + dx * 256 / WAVE_MAP_SCALE);
            bitmap.data[pixel + 1] = Math.round(128 + dy * 256 / WAVE_MAP_SCALE);
            bitmap.data[pixel + 2] = 0;
            bitmap.data[pixel + 3] = 255;
          }
        }
      }

      context.putImageData(bitmap, 0, 0);
      return canvas.toDataURL("image/png");
    },
  };
}
