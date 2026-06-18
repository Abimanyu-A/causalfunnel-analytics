export interface Event {
  eventType: string;
  pageUrl: string;
  timestamp: string;

  coordinates?: {
    x: number;
    y: number;
  };
}