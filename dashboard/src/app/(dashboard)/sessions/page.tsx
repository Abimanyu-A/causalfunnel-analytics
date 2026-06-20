"use client";

import { useState } from "react";
import SessionTable from "@/components/sessions/session-table";
import SessionTimeline from "@/components/sessions/session-timeline";
import SessionSummary from "@/components/sessions/session-summary";

export default function SessionsPage() {
  const [selectedSession, setSelectedSession] = useState("");

  return (
    <div className="space-y-8">
      <div className="border-b border-zinc-200 pb-6">
        <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Sessions</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Select a session to inspect the full user journey and event log.
        </p>
      </div>

      <SessionTable selectedSession={selectedSession} onSelect={setSelectedSession} />

      {selectedSession && (
        <>
          <SessionSummary sessionId={selectedSession} />
          <SessionTimeline sessionId={selectedSession} />
        </>
      )}
    </div>
  );
}