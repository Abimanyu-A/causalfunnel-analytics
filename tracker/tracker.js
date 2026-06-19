const API_URL = "http://localhost:5000/api/events";

const SESSION_KEY = "cf_session_id";

function getSessionId() {
    let sessionId = localStorage.getItem(SESSION_KEY);

    if (!sessionId) {
        sessionId = crypto.randomUUID();

        localStorage.setItem(
            SESSION_KEY,
            sessionId
        );
    }

    return sessionId;
}

function sendEvent(eventData) {
    fetch(API_URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(eventData)
    }).catch(console.error);
}

function trackPageView() {
    sendEvent({
        sessionId: getSessionId(),

        eventType: "page_view",

        pageUrl: window.location.pathname,

        timestamp: new Date()
    });
}

document.addEventListener(
    "click",
    (event) => {

        sendEvent({
            sessionId: getSessionId(),

            eventType: "click",

            pageUrl: window.location.pathname,

            timestamp: new Date().toISOString(),

            coordinates: {
                x: event.clientX / window.innerWidth,
                y: event.clientY / window.innerHeight
            },

            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        });

    }
);

trackPageView();