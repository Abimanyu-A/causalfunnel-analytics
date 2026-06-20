"use client";

import { useEffect, useRef, useState } from "react";
import type { HeatmapOverlay, SnapshotElement } from "@/types/heatmap";

interface Props {
  data: HeatmapOverlay;
}

const RADIUS = 28;

const TAG_COLORS: Record<string, string> = {
  nav:     "#e5e7eb",
  header:  "#e5e7eb",
  footer:  "#e5e7eb",
  section: "#f3f4f6",
  button:  "#d1d5db",
  a:       "#dbeafe",
  input:   "#fef3c7",
  form:    "#fce7f3",
  img:     "#f0fdf4",
  h1:      "transparent",
  h2:      "transparent",
  h3:      "transparent",
};

function intensityToColor(t: number): [number, number, number] {
  const stops: [number, [number, number, number]][] = [
    [0.0,  [0,   0,   255]],
    [0.25, [0,   255, 255]],
    [0.5,  [0,   255, 0  ]],
    [0.75, [255, 255, 0  ]],
    [1.0,  [255, 0,   0  ]],
  ];
  for (let i = 1; i < stops.length; i++) {
    const [t0, c0] = stops[i - 1];
    const [t1, c1] = stops[i];
    if (t <= t1) {
      const r = (t - t0) / (t1 - t0);
      return [
        Math.round(c0[0] + (c1[0] - c0[0]) * r),
        Math.round(c0[1] + (c1[1] - c0[1]) * r),
        Math.round(c0[2] + (c1[2] - c0[2]) * r),
      ];
    }
  }
  return [255, 0, 0];
}

function drawOverlayHeatmap(canvas: HTMLCanvasElement, points: { x: number; y: number }[]) {
  const ctx = canvas.getContext("2d");
  if (!ctx || !points.length) return;

  const { width, height } = canvas;

  const offscreen = document.createElement("canvas");
  offscreen.width = width;
  offscreen.height = height;
  const off = offscreen.getContext("2d")!;

  for (const pt of points) {
    const px = pt.x * width;
    const py = pt.y * height;
    const g = off.createRadialGradient(px, py, 0, px, py, RADIUS);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.5, "rgba(255,255,255,0.4)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    off.fillStyle = g;
    off.beginPath();
    off.arc(px, py, RADIUS, 0, Math.PI * 2);
    off.fill();
  }

  const raw = off.getImageData(0, 0, width, height);
  const colorized = ctx.createImageData(width, height);
  for (let i = 0; i < raw.data.length; i += 4) {
    const intensity = raw.data[i + 3] / 255;
    if (intensity === 0) continue;
    const [r, g, b] = intensityToColor(intensity);
    colorized.data[i]     = r;
    colorized.data[i + 1] = g;
    colorized.data[i + 2] = b;
    colorized.data[i + 3] = Math.round(intensity * 200);
  }
  ctx.putImageData(colorized, 0, 0);
}

function WireframeLayer({ elements, width, height }: {
  elements: SnapshotElement[];
  width: number;
  height: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      className="absolute inset-0"
      style={{ pointerEvents: "none" }}
    >
      {elements.map((el, i) => (
        <rect
          key={i}
          x={el.x * width}
          y={el.y * height}
          width={el.w * width}
          height={Math.max(el.h * height, 2)}
          fill={TAG_COLORS[el.tag] ?? "#f3f4f6"}
          stroke="#e5e7eb"
          strokeWidth={0.5}
          rx={el.tag === "button" ? 4 : 2}
          fillOpacity={0.7}
        />
      ))}
    </svg>
  );
}

export default function HeatmapOverlayView({ data }: Props) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  const { snapshot, points } = data;

  // Aspect ratio derived from page proportions at capture time
  const aspectRatio = snapshot
    ? snapshot.pageHeight / snapshot.viewportWidth
    : 9 / 16;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = Math.round(w * aspectRatio);
      setDims({ width: w, height: h });
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [aspectRatio]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !dims.width) return;

    canvas.width  = dims.width;
    canvas.height = dims.height;

    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, dims.width, dims.height);

    if (points.length) {
      drawOverlayHeatmap(canvas, points as { x: number; y: number }[]);
    }
  }, [points, dims]);

  return (
    <div ref={containerRef} className="w-full relative">
      <div
        className="relative w-full overflow-hidden rounded-xl border border-zinc-200 bg-white"
        style={{ height: dims.height || "auto", minHeight: 200 }}
      >
        {snapshot && dims.width > 0 && (
          <WireframeLayer
            elements={snapshot.elements}
            width={dims.width}
            height={dims.height}
          />
        )}

        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ mixBlendMode: "multiply" }}
        />

        {!snapshot && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <p className="text-sm font-medium text-zinc-500">No page snapshot captured yet</p>
            <p className="text-xs text-zinc-400">
              Visit this page with the tracker script loaded to capture a wireframe.
            </p>
          </div>
        )}

        {snapshot && points.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-zinc-400">Wireframe captured — no clicks recorded yet.</p>
          </div>
        )}
      </div>

      {snapshot && (
        <div className="flex items-center gap-6 mt-3">
          <p className="text-xs text-zinc-400">
            Captured at {snapshot.viewportWidth}px wide — {snapshot.elements.length} elements mapped
          </p>
          <p className="text-xs text-zinc-400">
            {points.length} click{points.length !== 1 ? "s" : ""} recorded
          </p>
        </div>
      )}
    </div>
  );
}