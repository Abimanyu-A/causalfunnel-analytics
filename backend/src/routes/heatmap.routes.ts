import { Router } from "express";
import { fetchHeatmapData, fetchHeatmapOverlay, fetchTrackedPages } from "../controllers/heatmap.controller";

const router = Router();

router.get("/", fetchHeatmapData);
router.get("/pages", fetchTrackedPages);
router.get("/overlay", fetchHeatmapOverlay);


export default router;