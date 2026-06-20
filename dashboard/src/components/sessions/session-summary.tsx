"use client";

import { useSessionEvents } from "@/hooks/use-session-events";

interface Props {
  sessionId: string;
}

interface SessionEvent {
  pageUrl: string;
  eventType: string;
  timestamp: string;
  viewport?: { width: number; height: number };
  device?: { type: string };
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border border-zinc-100 rounded-lg px-4 py-3 bg-zinc-50">
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1">{label}</p>
      <p className="text-sm font-medium text-zinc-900 truncate">{value ?? "—"}</p>
    </div>
  );
}

export default function SessionSummary({ sessionId }: Props) {
  const { data: events } = useSessionEvents(sessionId) as { data?: SessionEvent[] };

  if (!events?.length) return null;

  const entryPage = events[0].pageUrl;
  const pagesVisited = new Set(events.map((e) => e.pageUrl)).size;
  const clickCount = events.filter((e) => e.eventType === "click").length;

  const durationMs =
    new Date(events.at(-1)!.timestamp).getTime() -
    new Date(events[0].timestamp).getTime();
  const totalSeconds = Math.floor(durationMs / 1000);
  const duration = `${Math.floor(totalSeconds / 60)}m ${totalSeconds % 60}s`;

  const pageCounts = events.reduce((acc, e) => {
    acc[e.pageUrl] = (acc[e.pageUrl] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const mostActivePage = Object.entries(pageCounts).sort((a, b) => b[1] - a[1])[0][0];

  const viewport = events[0].viewport;
  const device = events[0].device?.type;

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">
        Session Summary
      </p>
      <div className="grid grid-cols-4 gap-3">
        <Stat label="Entry Page" value={entryPage} />
        <Stat label="Pages Visited" value={pagesVisited} />
        <Stat label="Total Clicks" value={clickCount} />
        <Stat label="Duration" value={duration} />
        <Stat label="Most Active Page" value={mostActivePage} />
        <Stat label="Device" value={device} />
        <Stat
          label="Viewport"
          value={viewport ? `${viewport.width} x ${viewport.height}` : "—"}
        />
      </div>
    </div>
  );
}