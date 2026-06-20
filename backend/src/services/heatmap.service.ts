import Event from "../models/Event";
import { EventType } from "../types/event.types";
import { getSnapshot } from "./snapshot.service";

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

export const getHeatmapOverlay = async (pageUrl: string) => {
  const [snapshot, events] = await Promise.all([
    getSnapshot(pageUrl),
    Event.find(
      { pageUrl, eventType: EventType.CLICK, "absoluteCoordinates.x": { $exists: true } },
      { _id: 0, absoluteCoordinates: 1, element: 1, timestamp: 1 }
    ).lean(),
  ]);

  const points = events.map((e) => ({
    x: e.absoluteCoordinates?.x,
    y: e.absoluteCoordinates?.y,
    element: e.element,
    timestamp: e.timestamp,
  }));

  return { snapshot, points };
};

export const getTrackedPages = async () => {
  return Event.distinct("pageUrl");
};