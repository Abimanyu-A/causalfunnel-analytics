import Event from "../models/Event";
import { EventPayload } from "../types/event.payload";
import { EventType } from "../types/event.types";

const VALID_EVENT_TYPES = Object.values(EventType);

export const createEvent = async (data: EventPayload) => {
  if (!data.sessionId || !data.eventType || !data.pageUrl || !data.timestamp) {
    throw Object.assign(new Error("Missing required fields: sessionId, eventType, pageUrl, timestamp"), { status: 400 });
  }

  if (!VALID_EVENT_TYPES.includes(data.eventType)) {
    throw Object.assign(new Error(`Invalid eventType. Must be one of: ${VALID_EVENT_TYPES.join(", ")}`), { status: 400 });
  }

  return Event.create(data);
};