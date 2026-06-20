# CausalFunnel Analytics

A full-stack user behavior analytics application that tracks page views and click interactions, displays session journeys, and renders click density heatmaps with page structure overlays.

## Live Demo

| | URL |
|---|---|
| Dashboard | https://causalfunnel-analytics-pi.vercel.app |
| Demo Storefront | https://causalfunnel-analytics-v64f.vercel.app |
| Backend API | https://causalfunnel-analytics-yi0e.onrender.com |

> The backend runs on Render's free tier and may take 30–60 seconds to wake on the first request.

## Tech Stack

| Layer         | Technology                      |
|---------------|---------------------------------|
| Tracker       | Vanilla JavaScript              |
| Backend       | Node.js, Express, TypeScript    |
| Database      | MongoDB, Mongoose               |
| Dashboard     | Next.js 15, React, Tailwind CSS |
| Data Fetching | TanStack Query, Axios           |

## Project Structure

```
causalfunnel-analytics/
├── backend/       Express API and tracker script
├── dashboard/     Next.js dashboard
└── demo/          Multi-page demo storefront
```

## Setup

### Prerequisites

- Node.js 18+
- MongoDB running locally on the default port (27017)

### Backend

```bash
cd backend
npm install
npm run dev
```

The API starts on `http://localhost:5000`. The tracker script is served from `http://localhost:5000/tracker/tracker.js`.

### Dashboard

```bash
cd dashboard
npm install
npm run dev
```

The dashboard starts on `http://localhost:3000`.

### Demo Page

Open `demo/index.html` in a browser. The demo is a multi-page mock storefront (home, product, cart, checkout, collections, search, about) that loads the tracker script from the backend and generates realistic session data across page navigations.

The tracker script URL is hardcoded to `http://localhost:5000/tracker/tracker.js`. If you change the backend port, update the `<script>` src in each demo HTML file accordingly.

## API Reference

| Method | Endpoint                    | Description                                      |
|--------|-----------------------------|--------------------------------------------------|
| POST   | `/api/events`               | Ingest a tracking event                          |
| GET    | `/api/sessions`             | List sessions (`?limit=50&skip=0`)               |
| GET    | `/api/sessions/:id`         | All events for a session, ordered by timestamp   |
| GET    | `/api/heatmap?pageUrl=`     | Normalized click coordinates for a page          |
| GET    | `/api/heatmap/overlay?pageUrl=` | Page snapshot and absolute click positions   |
| GET    | `/api/heatmap/pages`        | List of all tracked page URLs                    |
| POST   | `/api/snapshots`            | Store a page structure snapshot (upsert by URL)  |

## How Tracking Works

Each page visit sends a `page_view` event and, on first visit per browser, a structural snapshot of the DOM. Click events capture the target element's tag, text, and position — both relative to the viewport (for the density heatmap) and relative to the full page scroll height (for the overlay heatmap).

Sessions are identified by a UUID in `localStorage`, persistent across page navigations within the same browser and origin.

## Assumptions and Trade-offs

**Session identity via localStorage**
Sessions are identified by a UUID stored in `localStorage`. This means a new session is created per browser and per origin. Private/incognito windows generate a new session. A cookie-based approach would behave identically in this context since `HttpOnly` cookies cannot be read by JavaScript anyway; `localStorage` was chosen for simplicity.

**Normalized click coordinates**
Click positions are stored as values between 0 and 1, relative to viewport width and full page scroll height at the time of the click. This makes overlay positioning device-independent when rendering in the dashboard.

**Snapshot device bucketing**
The page structure snapshot is captured once per URL per browser, at whatever viewport width was active at first visit. The overlay heatmap renders all clicks against this single wireframe. A production implementation would store device-bucketed snapshots (mobile, tablet, desktop) and match clicks to the appropriate wireframe.

**No JavaScript, no tracking**
The tracker relies on JavaScript to capture page views and click interactions. Users with JavaScript disabled will not be tracked. A common mitigation used by analytics platforms is a `<noscript>` tracking pixel, which allows basic page-view tracking without JavaScript. This approach was intentionally omitted to keep the implementation focused, and because it cannot capture click interactions or maintain session continuity.

**Pagination is client-side for the session list**
The backend supports `limit` and `skip` query parameters on `GET /api/sessions`. The dashboard fetches up to 50 sessions and paginates them locally in groups of 10. For very large datasets this would be replaced with server-driven pagination and a total count in the response.

**No authentication**
The API has no auth layer. In a production context, ingestion endpoints would be keyed (similar to how Segment or Mixpanel use write keys) and the dashboard would sit behind authentication.
