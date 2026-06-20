const API_URL = "http://localhost:5000/api";
const SESSION_KEY = "cf_session_id";
const SNAPSHOT_KEY = "cf_snapped";

function getSessionId() {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function send(path, body) {
  fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).catch(() => {});
}

function getDeviceType() {
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

// Capture a lightweight structural snapshot of the page (no text content, no sensitive data).

function captureSnapshot() {
  const snapped = JSON.parse(localStorage.getItem(SNAPSHOT_KEY) || "{}");
  if (snapped[window.location.pathname]) return;

  const elements = [];
  const tags = ["nav", "header", "footer", "section", "button", "a", "img", "h1", "h2", "h3", "input", "form"];

  document.querySelectorAll(tags.join(",")).forEach((el) => {
    const rect = el.getBoundingClientRect();
    const scrollY = window.scrollY;
    if (rect.width === 0 || rect.height === 0) return;

    elements.push({
      tag: el.tagName.toLowerCase(),
      x: rect.left / window.innerWidth,
      y: (rect.top + scrollY) / document.documentElement.scrollHeight,
      w: rect.width / window.innerWidth,
      h: rect.height / document.documentElement.scrollHeight,
    });
  });

  send("/snapshots", {
    pageUrl: window.location.pathname,
    pageHeight: document.documentElement.scrollHeight,
    viewportWidth: window.innerWidth,
    elements,
  });

  snapped[window.location.pathname] = true;
  localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snapped));
}

function trackPageView() {
  send("/events", {
    sessionId: getSessionId(),
    eventType: "page_view",
    pageUrl: window.location.pathname,
    timestamp: new Date().toISOString(),
    viewport: { width: window.innerWidth, height: window.innerHeight },
    device: { type: getDeviceType(), userAgent: navigator.userAgent },
  });
}

document.addEventListener("click", (e) => {
  const target = e.target;

  send("/events", {
    sessionId: getSessionId(),
    eventType: "click",
    pageUrl: window.location.pathname,
    timestamp: new Date().toISOString(),

    // Normalized to viewport for the existing heatmap (unchanged)
    coordinates: {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    },

    // Absolute position on the full page — used by the overlay heatmap
    absoluteCoordinates: {
      x: e.clientX / window.innerWidth,
      y: (e.clientY + window.scrollY) / document.documentElement.scrollHeight,
    },

    viewport: { width: window.innerWidth, height: window.innerHeight },
    device: { type: getDeviceType(), userAgent: navigator.userAgent },

    element: {
      tagName: target.tagName,
      text: target.innerText?.trim().slice(0, 50) || null,
      id: target.id || null,
      className: typeof target.className === "string" ? target.className.slice(0, 100) : null,
    },
  });
});

// Wait for DOM before snapshotting
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    trackPageView();
    captureSnapshot();
  });
} else {
  trackPageView();
  captureSnapshot();
}