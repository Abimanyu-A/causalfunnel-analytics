import { useQuery } from "@tanstack/react-query";
import { getSessions } from "@/services/session.service";

export const useSessions = () => {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: getSessions
  });
};