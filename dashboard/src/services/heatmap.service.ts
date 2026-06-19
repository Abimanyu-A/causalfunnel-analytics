import { api } from "@/lib/api";

export const getPages = async () => {
  const response = await api.get(
    "/heatmap/pages"
  );

  return response.data.data;
};

export const getHeatmapData = async (
  pageUrl: string
) => {
  const response = await api.get(
    "/heatmap",
    {
      params: {
        pageUrl
      }
    }
  );

  return response.data.data;
};