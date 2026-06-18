import { EventType } from "./event.types";

export interface EventPayload {
  sessionId: string;
  eventType: EventType;
  pageUrl: string;
  timestamp: Date;
  coordinates?: {
    x: number;
    y: number;
  };
}