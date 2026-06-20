"use client";

import { useState } from "react";
import HeatmapCanvas from "@/components/heatmap/heatmap-canvas";
import { usePages } from "@/hooks/use-pages";
import { useHeatmap } from "@/hooks/use-heatmap";

export default function HeatmapPage() {
  const [pageUrl, setPageUrl] = useState("");

  const { data: pages } = usePages();
  const { data: points } = useHeatmap(pageUrl);

  return (
    <div className="space-y-8">
      <div className="border-b border-zinc-200 pb-6">
        <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Heatmap</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Visualize click density across a page. Warmer colors indicate higher activity.
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
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
      </div>

      {pageUrl && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-zinc-700">{pageUrl}</p>
            <p className="text-xs text-zinc-400">{points?.length ?? 0} clicks recorded</p>
          </div>
          <HeatmapCanvas points={points ?? []} />
        </div>
      )}
    </div>
  );
}