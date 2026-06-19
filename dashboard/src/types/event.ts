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
}