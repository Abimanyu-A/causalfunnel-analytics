export interface HeatmapPoint {
  x: number;
  y: number;
}

export interface OverlayPoint {
  x: number;
  y: number;
  element?: {
    tagName: string;
    text?: string;
    id?: string;
  };
  timestamp?: string;
}

export interface SnapshotElement {
  tag: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface PageSnapshot {
  pageUrl: string;
  pageHeight: number;
  viewportWidth: number;
  elements: SnapshotElement[];
}

export interface HeatmapOverlay {
  snapshot: PageSnapshot | null;
  points: OverlayPoint[];
}