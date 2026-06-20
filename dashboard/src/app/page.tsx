import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <header className="border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-2xl font-semibold pt-2 tracking-tight text-zinc-900">
            CausalFunnel
          </span>
          <Link
            href="/sessions"
            className="text-sm font-medium bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-700 transition-colors"
          >
            Open Dashboard
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
            User Behavior Analytics
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-zinc-900 leading-[1.1] mb-6">
            Understand every session.
          </h1>
          <p className="text-lg text-zinc-500 leading-relaxed mb-10 max-w-xl">
            CausalFunnel captures page views, clicks, and user journeys across your product.
            Spot friction, replay sessions, and visualize where users click with heatmaps.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/sessions"
              className="inline-flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-zinc-700 transition-colors"
            >
              View Sessions
            </Link>
            <Link
              href="/heatmap"
              className="inline-flex items-center gap-2 border border-zinc-200 text-zinc-700 text-sm font-medium px-5 py-2.5 rounded-md hover:bg-zinc-50 transition-colors"
            >
              View Heatmap
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-3 gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">
              Session Tracking
            </p>
            <h3 className="text-base font-semibold text-zinc-900 mb-2">
              Every user journey, recorded
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Each visit is tied to a persistent session. Browse the full ordered event log - page views, clicks, device info, and duration - in one place.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">
              Click Heatmaps
            </p>
            <h3 className="text-base font-semibold text-zinc-900 mb-2">
              See where attention lands
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Aggregated click data rendered as a density heatmap per page. Instantly identify which areas users engage with and which they ignore.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">
              Lightweight Tracker
            </p>
            <h3 className="text-base font-semibold text-zinc-900 mb-2">
              One script tag. No config.
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Drop a single script into any webpage. The tracker captures events automatically with normalized coordinates, device type, and viewport metadata.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-100 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center">
          <p className="text-xs text-zinc-400">
            CausalFunnel Analytics - Full Stack Assignment
          </p>
        </div>
      </footer>
    </div>
  );
}