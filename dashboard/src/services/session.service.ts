import { api } from "@/lib/api";

export const getSessions = async () => {
  const response = await api.get("/sessions");

  return response.data.data;
};

export const getSessionEvents = async (
  sessionId: string
) => {
  const response = await api.get(
    `/sessions/${sessionId}`
  );

  return response.data.data;
};