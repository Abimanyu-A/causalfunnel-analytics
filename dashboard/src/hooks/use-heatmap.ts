import { useQuery } from "@tanstack/react-query";
import { getHeatmapData } from "@/services/heatmap.service";

export const useHeatmap = (
  pageUrl: string
) => {
  return useQuery({
    queryKey: ["heatmap", pageUrl],

    queryFn: () =>
      getHeatmapData(pageUrl),

    enabled: !!pageUrl
  });
};