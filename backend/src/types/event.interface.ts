import { EventType } from "./event.types";

export interface Coordinates {
  x: number;
  y: number;
}

export interface viewport {
  width: number;
  height: number;
};

export interface EventDocument {
  sessionId: string;
  eventType: EventType;
  pageUrl: string;
  timestamp: Date;
  coordinates?: Coordinates;
  viewport?: viewport;
}