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

  absoluteCoordinates?: { 
    x: number; 
    y: number 
  };

  viewport?: {
    width: number;
    height: number;
  };

  device?: {
    type: string;
    userAgent: string;
  }

  element?: {
    tagName: string;
    text?: string;
    id?: string;
    className?: string;
  };
}