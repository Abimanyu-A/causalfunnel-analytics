"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

interface Props {
  points: Point[];
}

const RADIUS = 40;
const MAX_OPACITY = 0.85;

// Maps 0–1 intensity to blue → cyan → green → yellow → red
function intensityToColor(t: number): [number, number, number] {
  const stops: [number, [number, number, number]][] = [
    [0.0, [0, 0, 255]],
    [0.25, [0, 255, 255]],
    [0.5, [0, 255, 0]],
    [0.75, [255, 255, 0]],
    [1.0, [255, 0, 0]],
  ];

  for (let i = 1; i < stops.length; i++) {
    const [t0, c0] = stops[i - 1];
    const [t1, c1] = stops[i];

    if (t <= t1) {
      const ratio = (t - t0) / (t1 - t0);

      return [
        Math.round(c0[0] + (c1[0] - c0[0]) * ratio),
        Math.round(c0[1] + (c1[1] - c0[1]) * ratio),
        Math.round(c0[2] + (c1[2] - c0[2]) * ratio),
      ];
    }
  }

  return [255, 0, 0];
}

function drawHeatmap(
  canvas: HTMLCanvasElement,
  offscreen: HTMLCanvasElement,
  points: Point[]
) {
  const ctx = canvas.getContext("2d");
  const offCtx = offscreen.getContext("2d");

  if (!ctx || !offCtx) return;

  const dpr = window.devicePixelRatio || 1;

  // CSS size
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // Clear both canvases
  ctx.clearRect(0, 0, width, height);
  offCtx.clearRect(0, 0, width, height);

  if (!points.length) return;

  // Draw density layer
  for (const point of points) {
    const x = point.x * width;
    const y = point.y * height;

    const gradient = offCtx.createRadialGradient(
      x,
      y,
      0,
      x,
      y,
      RADIUS
    );

    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.4)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    offCtx.fillStyle = gradient;
    offCtx.beginPath();
    offCtx.arc(x, y, RADIUS, 0, Math.PI * 2);
    offCtx.fill();
  }

  // Read density
  const imageData = offCtx.getImageData(
    0,
    0,
    width * dpr,
    height * dpr
  );

  const data = imageData.data;

  const colorized = ctx.createImageData(width * dpr, height * dpr);
  const cd = colorized.data;

  for (let i = 0; i < data.length; i += 4) {
    const intensity = data[i + 3] / 255;

    if (intensity === 0) continue;

    const [r, g, b] = intensityToColor(intensity);

    cd[i] = r;
    cd[i + 1] = g;
    cd[i + 2] = b;
    cd[i + 3] = Math.round(intensity * MAX_OPACITY * 255);
  }

  ctx.putImageData(colorized, 0, 0);
}

export default function HeatmapCanvas({ points }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    if (!offscreenRef.current) {
      offscreenRef.current = document.createElement("canvas");
    }

    const offscreen = offscreenRef.current;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      const width = container.clientWidth;
      const height = container.clientHeight;

      // Main canvas backing resolution
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Offscreen backing resolution
      offscreen.width = width * dpr;
      offscreen.height = height * dpr;

      const ctx = canvas.getContext("2d");
      const offCtx = offscreen.getContext("2d");

      if (!ctx || !offCtx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      drawHeatmap(canvas, offscreen, points);
    };

    resize();

    const observer = new ResizeObserver(resize);

    observer.observe(container);

    return () => observer.disconnect();
  }, [points]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video rounded-xl border overflow-hidden bg-muted"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {points.length === 0 && (
        <p className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
          No click data for this page yet.
        </p>
      )}
    </div>
  );
}