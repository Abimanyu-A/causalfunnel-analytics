import { useQuery } from "@tanstack/react-query";
import { getPages } from "@/services/heatmap.service";

export const usePages = () => {
  return useQuery({
    queryKey: ["pages"],
    queryFn: getPages
  });
};