"use client";

import { useState } from "react";
import HeatmapCanvas from "@/components/heatmap/heatmap-canvas";
import HeatmapOverlayView from "@/components/heatmap/heatmap-overlay";
import { usePages } from "@/hooks/use-pages";
import { useHeatmap } from "@/hooks/use-heatmap";
import { useHeatmapOverlay } from "@/hooks/use-heatmap-overlay";

type Tab = "overlay" | "density";

export default function HeatmapPage() {
  const [pageUrl, setPageUrl] = useState("");
  const [tab, setTab] = useState<Tab>("overlay");

  const { data: pages } = usePages();
  const { data: points } = useHeatmap(pageUrl);
  const { data: overlayData } = useHeatmapOverlay(pageUrl);

  return (
    <div className="space-y-8">
      <div className="border-b border-zinc-200 pb-6">
        <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Heatmap</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Visualize where users click. The overlay view shows clicks mapped onto the actual page structure.
        </p>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">
          Page URL
        </label>
        <select
          className="border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-700 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-300 min-w-64"
          value={pageUrl}
          onChange={(e) => setPageUrl(e.target.value)}
        >
          <option value="">Select a page</option>
          {pages?.map((page: string) => (
            <option key={page} value={page}>{page}</option>
          ))}
        </select>
      </div>

      {pageUrl && (
        <div className="space-y-6">
          {/* Tab switcher */}
          <div className="flex gap-1 border-b border-zinc-200">
            {(["overlay", "density"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  tab === t
                    ? "border-zinc-900 text-zinc-900"
                    : "border-transparent text-zinc-400 hover:text-zinc-700"
                }`}
              >
                {t === "overlay" ? "Page Overlay" : "Density Map"}
              </button>
            ))}
          </div>

          {tab === "overlay" && overlayData && (
            <HeatmapOverlayView data={overlayData} />
          )}

          {tab === "overlay" && !overlayData && (
            <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center">
              <p className="text-sm text-zinc-400">Select a page to load the overlay.</p>
            </div>
          )}

          {tab === "density" && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-zinc-700">{pageUrl}</p>
                <p className="text-xs text-zinc-400">{points?.length ?? 0} clicks recorded</p>
              </div>
              <HeatmapCanvas points={points ?? []} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}