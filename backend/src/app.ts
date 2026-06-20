import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event.routes";
import sessionRoutes from "./routes/session.routes";
import heatmapRoutes from "./routes/heatmap.routes";
import snapshotRoutes from "./routes/snapshot.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/health", (_, res) => {
  res.status(200).json({
    status: "OK"
  });
});

app.use("/api/events", eventRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/heatmap", heatmapRoutes);
app.use("/api/snapshots", snapshotRoutes);
app.use("/tracker", express.static("public"));

export default app;