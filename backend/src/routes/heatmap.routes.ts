import { Router } from "express";
import { fetchHeatmapData, fetchTrackedPages } from "../controllers/heatmap.controller";

const router = Router();

router.get("/", fetchHeatmapData);
router.get("/pages", fetchTrackedPages);


export default router;