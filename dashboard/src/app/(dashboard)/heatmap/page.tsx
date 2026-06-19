"use client";

import { useState } from "react";

import HeatmapCanvas from "@/components/heatmap/heatmap-canvas";

import { usePages } from "@/hooks/use-pages";

import { useHeatmap } from "@/hooks/use-heatmap";

export default function HeatmapPage() {

  const [pageUrl, setPageUrl] =
    useState("");

  const { data: pages } =
    usePages();

  const { data: points } =
    useHeatmap(pageUrl);
  console.log(points);

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-semibold">
          Heatmap
        </h1>

        <p className="text-muted-foreground mt-2">
          Visualize click activity.
        </p>

      </div>

      <select
        className="border rounded-md p-2"

        value={pageUrl}

        onChange={(e) =>
          setPageUrl(e.target.value)
        }
      >

        <option value="">
          Select a page
        </option>

        {pages?.map((page: string) => (

          <option
            key={page}
            value={page}
          >
            {page}
          </option>

        ))}

      </select>

      {pageUrl && (

        <HeatmapCanvas
          points={points ?? []}
        />

      )}

    </div>

  );
}