"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/sessions", label: "Sessions" },
  { href: "/heatmap",  label: "Heatmap"  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 border-r border-zinc-100 p-6 flex flex-col gap-8 min-h-screen bg-white">
      <Link href="/" className="font-semibold text-sm tracking-tight text-zinc-900">
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
    </aside>
  );
}