"use client";

import { useSessionEvents } from "@/hooks/use-session-events";
import { SummaryItem } from "../ui/summary-item";

interface Props {
    sessionId: string;
}

interface SessionEvent {
    pageUrl: string;
    eventType: string;
    timestamp: string;
    viewport?: {
        width: number;
        height: number;
    };
    device?: {
        type: string;
    };
}

export default function SessionSummary({
    sessionId
}: Props) {

    const {
        data: events
    } = useSessionEvents(sessionId) as {
        data?: SessionEvent[];
    };

    if (!events?.length) {
        return null;
    }

    const entryPage =
        events[0].pageUrl;

    const pagesVisited =
        new Set(
            events.map(
                event => event.pageUrl
            )
        ).size;

    const clickEvents =
        events.filter(
            event =>
                event.eventType === "click"
        );

    const clickCount =
        clickEvents.length;

    const durationMs =
        new Date(
            events.at(-1)!.timestamp
        ).getTime() -
        new Date(
            events[0].timestamp
        ).getTime();

    const durationSeconds =
        Math.floor(durationMs / 1000);

    const minutes =
        Math.floor(durationSeconds / 60);

    const seconds =
        durationSeconds % 60;

    const viewport =
        events[0].viewport;

    const device =
        events[0].device?.type;

    const pageCounts =
        events.reduce(
            (acc, event) => {

                acc[event.pageUrl] =
                    (acc[event.pageUrl] || 0) + 1;

                return acc;

            },
            {} as Record<
                string,
                number
            >
        );

    const mostClickedPage =
        Object.entries(
            pageCounts
        ).sort(
            (
                a,
                b
            ) => b[1] - a[1]
        )[0][0];

    return (

        <div className="
            border
            rounded-xl
            p-6
            grid
            grid-cols-2
            gap-6
        ">

            <SummaryItem
                label="Entry Page"
                value={entryPage}
            />

            <SummaryItem
                label="Pages Visited"
                value={pagesVisited}
            />

            <SummaryItem
                label="Clicks"
                value={clickCount}
            />

            <SummaryItem
                label="Most Active Page"
                value={mostClickedPage}
            />

            <SummaryItem
                label="Duration"
                value={`${minutes}m ${seconds}s`}
            />

            <SummaryItem
                label="Device"
                value={device}
            />

            <SummaryItem
                label="Viewport"
                value={
                    viewport
                        ? `${viewport.width} × ${viewport.height}`
                        : "-"
                }
            />

        </div>

    );
}