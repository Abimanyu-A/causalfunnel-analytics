import Event from "../models/Event";
import { EventType } from "../types/event.types";

export const getHeatmapData = async (
  pageUrl: string
) => {
  const events = await Event.find(
    {
      pageUrl,
      eventType: EventType.CLICK
    },
    {
      _id: 0,
      coordinates: 1
    }
  ).lean();

  return events.map(event => ({
    x: event.coordinates?.x,
    y: event.coordinates?.y
  }));
};

export const getTrackedPages = async () => {
  return Event.distinct("pageUrl");
};