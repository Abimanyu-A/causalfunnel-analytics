"use client";

import { useSessionEvents } from "@/hooks/use-session-events";

interface TimelineEvent {
  eventType: "page_view" | "click";
  pageUrl: string;
  timestamp: string;
  coordinates?: { x: number; y: number };
}

export default function SessionTimeline({ sessionId }: { sessionId: string }) {
  const { data: events, isLoading } = useSessionEvents(sessionId);

  if (isLoading) {
    return (
      <div className="border border-zinc-200 rounded-xl bg-white p-6">
        <p className="text-sm text-zinc-400">Loading events...</p>
      </div>
    );
  }

  if (!events?.length) {
    return (
      <div className="border border-zinc-200 rounded-xl bg-white p-6">
        <p className="text-sm text-zinc-400">No events recorded for this session.</p>
      </div>
    );
  }

  return (
    <div className="border border-zinc-200 rounded-xl bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-6">
        User Journey
      </p>

      <div>
        {events.map((event: TimelineEvent, index: number) => (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${
                  event.eventType === "click" ? "bg-zinc-400" : "bg-zinc-900"
                }`}
              />
              {index !== events.length - 1 && (
                <div className="w-px flex-1 min-h-8 bg-zinc-100 mt-1" />
              )}
            </div>

            <div className="pb-6">
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded ${
                    event.eventType === "page_view"
                      ? "bg-zinc-100 text-zinc-700"
                      : "bg-zinc-50 text-zinc-500"
                  }`}
                >
                  {event.eventType === "page_view" ? "Page View" : "Click"}
                </span>
                <span className="text-xs text-zinc-400">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm text-zinc-700">{event.pageUrl}</p>
              {event.coordinates && (
                <p className="text-xs text-zinc-400 mt-0.5">
                  {(event.coordinates.x * 100).toFixed(1)}% x{" "}
                  {(event.coordinates.y * 100).toFixed(1)}%
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}