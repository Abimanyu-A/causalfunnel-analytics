import Event from "../models/Event";
import { EventPayload } from "../types/event.payload";

export const createEvent = async (
  eventData: EventPayload
) => {
  return Event.create(eventData);
};