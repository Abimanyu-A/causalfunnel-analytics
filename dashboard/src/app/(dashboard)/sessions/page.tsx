"use client";

import { useState } from "react";
import SessionTable from "@/components/sessions/session-table";
import SessionTimeline from "@/components/sessions/session-timeline";
import SessionSummary from "@/components/sessions/session-summary";

export default function SessionsPage() {

  const [
    selectedSession,
    setSelectedSession
  ] = useState("");

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-semibold">
          Sessions
        </h1>

        <p className="text-muted-foreground mt-2">
          Browse recorded sessions.
        </p>

      </div>

      <SessionTable
        selectedSession={selectedSession}
        onSelect={setSelectedSession}
      />

      <SessionSummary
        sessionId={selectedSession}
      />

      {selectedSession && (
        <SessionTimeline
          sessionId={selectedSession}
        />
      )}

    </div>
  );
}