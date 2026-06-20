# CausalFunnel Analytics

A full-stack user behavior analytics application that tracks page views and click interactions, displays session journeys, and renders click density heatmaps.

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Tracker   | Vanilla JavaScript                  |
| Backend   | Node.js, Express, TypeScript        |
| Database  | MongoDB, Mongoose                   |
| Dashboard | Next.js 15, React, Tailwind CSS     |
| Data Fetching | TanStack Query, Axios          |

## Project Structure

```
causalfunnel-analytics/
├── backend/       Express API
├── dashboard/     Next.js dashboard
└── tracker/       JS tracking script + demo page
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

The API starts on `http://localhost:5000`.

### Dashboard

```bash
cd dashboard
npm install
npm run dev
```

The dashboard starts on `http://localhost:3000`.

### Tracker / Demo Page

Open `tracker/demo.html` directly in a browser. It sends events to `http://localhost:5000/api/events` by default.

To test on a different host, update the `API_URL` constant at the top of `tracker/tracker.js`.

## API Reference

| Method | Endpoint                  | Description                          |
|--------|---------------------------|--------------------------------------|
| POST   | `/api/events`             | Ingest a tracking event              |
| GET    | `/api/sessions`           | List sessions (`?limit=50&skip=0`)   |
| GET    | `/api/sessions/:id`       | All events for a session             |
| GET    | `/api/heatmap?pageUrl=`   | Click coordinates for a page         |
| GET    | `/api/heatmap/pages`      | List of all tracked page URLs        |

## Assumptions and Trade-offs

**Session identity via localStorage**
Sessions are identified by a UUID stored in `localStorage`. This means a new session is created per browser and per origin. Private/incognito windows generate a new session. A cookie-based approach would behave identically in this context since `HttpOnly` cookies cannot be read by JavaScript anyway; `localStorage` was chosen for simplicity.

**Normalized click coordinates**
Click `x` and `y` are stored as values between 0 and 1 (relative to viewport dimensions at time of click). This allows the heatmap to render correctly regardless of the viewport size used when viewing the dashboard.

**No JavaScript, no tracking**
The tracker relies on JavaScript to capture page views and click interactions. Users with JavaScript disabled will not be tracked. A common mitigation used by analytics platforms is a `<noscript>` tracking pixel, which allows basic page-view tracking without JavaScript. This approach was intentionally omitted to keep the implementation focused, and because it cannot capture click interactions or maintain session continuity.

**Pagination is client-side for the session list**
The backend supports `limit` and `skip` query parameters on `/api/sessions`. The dashboard fetches up to 50 sessions and paginates them locally. For very large datasets this would be replaced with server-driven pagination.

**No authentication**
The API has no auth layer. In a production context, ingestion endpoints would be keyed (similar to how Segment or Mixpanel use write keys) and the dashboard would sit behind auth.