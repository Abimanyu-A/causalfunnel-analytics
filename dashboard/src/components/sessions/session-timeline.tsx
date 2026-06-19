"use client";

import { useSessionEvents } from "@/hooks/use-session-events";
import { Badge } from "@/components/ui/badge";

interface SessionTimelineEvent {
  eventType: "page_view" | "click";
  pageUrl: string;
  timestamp: string;
  coordinates?: {
    x: number;
    y: number;
  };
}

interface SessionTimelineProps {
  sessionId: string;
}

export default function SessionTimeline({
  sessionId
}: SessionTimelineProps) {

  const {
    data: events,
    isLoading
  } = useSessionEvents(sessionId);

  if (isLoading) {
    return <div>Loading timeline...</div>;
  }

  if (!events?.length) {
    return (
        <div className="border rounded-xl bg-card p-6">

        <h2 className="font-semibold mb-4">
            User Journey
        </h2>

        <p className="text-sm text-muted-foreground">
            No events recorded for this session.
        </p>

        </div>
    );
  }

  return (

    <div className="border rounded-xl bg-card p-6">

        <h2 className="font-semibold mb-6">
            User Journey
        </h2>

        <div>

            {events?.map((event:SessionTimelineEvent, index:number) => (

            <div
                key={index}
                className="flex gap-4"
            >

                <div className="flex flex-col items-center">

                <div className="w-3 h-3 rounded-full bg-primary" />

                {index !== events.length - 1 && (
                    <div className="w-px flex-1 min-h-12 bg-border" />
                )}

                </div>

                <div className="pb-8">

                <Badge variant="secondary">
                    {event.eventType === "page_view"
                    ? "Page View"
                    : "Click"}
                </Badge>

                <p className="mt-2 text-sm">
                    {event.pageUrl}
                </p>

                <p className="text-xs text-muted-foreground">
                    {new Date(event.timestamp).toLocaleTimeString()}
                </p>

                {event.coordinates && (
                    <p className="text-xs text-muted-foreground">
                    ({event.coordinates.x}, {event.coordinates.y})
                    </p>
                )}

                </div>

            </div>

            ))}

        </div>

    </div>

  );
}