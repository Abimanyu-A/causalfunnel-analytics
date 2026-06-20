"use client";

import { useState } from "react";
import { useSessions } from "@/hooks/use-sessions";

interface Session {
  sessionId: string;
  eventCount: number;
  startedAt: string;
  lastActivity: string;
}

interface Props {
  selectedSession: string;
  onSelect: (id: string) => void;
}

const PAGE_SIZE = 10;

export default function SessionTable({ selectedSession, onSelect }: Props) {
  const [page, setPage] = useState(0);
  const { data: sessions, isLoading }: { data?: Session[]; isLoading: boolean } = useSessions();

  const paginated = sessions?.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE) ?? [];
  const totalPages = Math.ceil((sessions?.length ?? 0) / PAGE_SIZE);

  if (isLoading) {
    return (
      <div className="border border-zinc-200 rounded-xl bg-white">
        <div className="p-8 text-center text-sm text-zinc-400">Loading sessions...</div>
      </div>
    );
  }

  if (!sessions?.length) {
    return (
      <div className="border border-zinc-200 rounded-xl bg-white">
        <div className="p-8 text-center text-sm text-zinc-400">No sessions recorded yet.</div>
      </div>
    );
  }

  return (
    <div className="border border-zinc-200 rounded-xl bg-white overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-100 bg-zinc-50">
            <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">Session ID</th>
            <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">Events</th>
            <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">Started</th>
            <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">Last Activity</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((session) => {
            const active = selectedSession === session.sessionId;
            return (
              <tr
                key={session.sessionId}
                onClick={() => onSelect(session.sessionId)}
                className={`cursor-pointer border-b border-zinc-100 transition-colors last:border-0 ${
                  active ? "bg-zinc-50" : "hover:bg-zinc-50"
                }`}
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 inline-block" />
                    )}
                    <span className="font-mono text-zinc-600 text-xs">
                      {session.sessionId.slice(0, 8)}...
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-zinc-700">{session.eventCount}</td>
                <td className="px-5 py-3.5 text-zinc-500">
                  {new Date(session.startedAt).toLocaleString()}
                </td>
                <td className="px-5 py-3.5 text-zinc-500">
                  {new Date(session.lastActivity).toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-zinc-100 bg-zinc-50">
          <p className="text-xs text-zinc-400">
            Page {page + 1} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="text-xs px-3 py-1.5 border border-zinc-200 rounded-md disabled:opacity-40 hover:bg-white transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="text-xs px-3 py-1.5 border border-zinc-200 rounded-md disabled:opacity-40 hover:bg-white transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}