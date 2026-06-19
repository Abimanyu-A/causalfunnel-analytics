"use client";

import { useState } from "react";
import SessionTable from "@/components/sessions/session-table";

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

      {selectedSession && (

        <div className="border rounded-xl p-6">

          <h2 className="font-medium">
            Selected Session
          </h2>

          <p className="text-muted-foreground mt-2">
            {selectedSession}
          </p>

        </div>

      )}

    </div>
  );
}