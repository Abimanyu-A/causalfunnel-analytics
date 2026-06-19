"use client";

import { useSessions } from "@/hooks/use-sessions";

interface Session {
  sessionId: string;
  eventCount: number;
}

interface SessionTableProps {
  selectedSession: string;
  onSelect: (id: string) => void;
}

export default function SessionTable({
  selectedSession,
  onSelect
}: SessionTableProps) {

  const {
    data: sessions,
    isLoading
  }: { data?: Session[]; isLoading: boolean } = useSessions();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border rounded-xl">

      <table className="w-full">

        <thead className="border-b">
          <tr>

            <th className="text-left p-4">
              Session ID
            </th>

            <th className="text-left p-4">
              Events
            </th>

          </tr>
        </thead>

        <tbody>

          {sessions?.map((session) => (

            <tr
              key={session.sessionId}
              className={`cursor-pointer border-b hover:bg-muted ${
                selectedSession === session.sessionId
                  ? "bg-muted"
                  : ""
              }`}
              onClick={() =>
                onSelect(session.sessionId)
              }
            >

              <td className="p-4">
                {session.sessionId.slice(0, 8)}...
              </td>

              <td className="p-4">
                {session.eventCount}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}