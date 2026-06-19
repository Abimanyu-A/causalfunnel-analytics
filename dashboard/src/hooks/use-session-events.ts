import { useQuery } from "@tanstack/react-query";
import { getSessionEvents } from "@/services/session.service";

export const useSessionEvents = (
  sessionId: string
) => {
  return useQuery({
    queryKey: ["session-events", sessionId],

    queryFn: () =>
      getSessionEvents(sessionId),

    enabled: !!sessionId
  });
};