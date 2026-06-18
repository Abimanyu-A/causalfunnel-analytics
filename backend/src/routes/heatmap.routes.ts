import { Router } from "express";
import { fetchHeatmapData } from "../controllers/heatmap.controller";

const router = Router();

router.get("/", fetchHeatmapData);

export default router;