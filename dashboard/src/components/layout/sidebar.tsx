import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-56 border-r p-6">
      <h1 className="font-semibold text-lg mb-8">
        Analytics
      </h1>

      <nav className="space-y-3">
        <Link
          href="/sessions"
          className="block text-sm text-muted-foreground hover:text-foreground"
        >
          Sessions
        </Link>

        <Link
          href="/heatmap"
          className="block text-sm text-muted-foreground hover:text-foreground"
        >
          Heatmap
        </Link>
      </nav>
    </aside>
  );
}