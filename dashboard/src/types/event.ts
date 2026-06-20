export type EventType =
  | "page_view"
  | "click";

export interface Event {
  eventType: EventType;
  pageUrl: string;
  timestamp: string;

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
  };

  element?: {
    tagName: string;
    text?: string;
    id?: string;
    className?: string;
  };
}