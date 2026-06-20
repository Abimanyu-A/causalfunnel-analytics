import { useQuery } from "@tanstack/react-query";
import { getHeatmapOverlay } from "@/services/heatmap.service";

export const useHeatmapOverlay = (pageUrl: string) => {
  return useQuery({
    queryKey: ["heatmap-overlay", pageUrl],
    queryFn: () => getHeatmapOverlay(pageUrl),
    enabled: !!pageUrl,
  });
};