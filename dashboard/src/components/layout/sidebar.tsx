"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/sessions", label: "Sessions" },
  { href: "/heatmap", label: "Heatmap" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 border-r border-zinc-200 p-6 flex flex-col gap-8 min-h-screen bg-white">
      <Link
        href="/"
        className="font-semibold text-2xl tracking-tight text-zinc-900"
      >
        CausalFunnel
      </Link>

      <nav className="flex flex-col gap-1">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-2 px-2">
          Analytics
        </p>

        {links.map(({ href, label }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`text-sm px-2 py-1.5 rounded-md transition-colors ${
                active
                  ? "bg-zinc-100 text-zinc-900 font-medium"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-zinc-100 pt-6">
        <a
          href="https://causalfunnel-analytics-v64f.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            block
            rounded-md
            px-2
            py-2
            text-sm
            text-zinc-700
            transition-colors
            hover:bg-zinc-50
            hover:text-zinc-900
          "
        >
          Visit Demo Store ↗
          <p className="mt-1 text-xs text-zinc-400">
            Generate sample events
          </p>
        </a>
      </div>
    </aside>
  );
}