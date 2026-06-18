import { EventType } from "./event.types";

export interface Coordinates {
  x: number;
  y: number;
}

export interface EventDocument {
  sessionId: string;
  eventType: EventType;
  pageUrl: string;
  timestamp: Date;
  coordinates?: Coordinates;
}