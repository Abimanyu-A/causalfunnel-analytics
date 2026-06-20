import { Request, Response } from "express";
import { getHeatmapData, getHeatmapOverlay } from "../services/heatmap.service";
import { getTrackedPages } from "../services/heatmap.service";

export const fetchHeatmapData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pageUrl = req.query.pageUrl as string;

    if (!pageUrl) {
      res.status(400).json({
        success: false,
        message: "pageUrl query parameter is required"
      });

      return;
    }

    const data = await getHeatmapData(pageUrl);

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch heatmap data"
    });
  }
};

export const fetchTrackedPages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pages = await getTrackedPages();

    res.status(200).json({
      success: true,
      data: pages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch pages"
    });
  }
};

export const fetchHeatmapOverlay = async (req: Request, res: Response): Promise<void> => {
  try {
    const pageUrl = req.query.pageUrl as string;
    if (!pageUrl) {
      res.status(400).json({ success: false, message: "pageUrl is required" });
      return;
    }
    const data = await getHeatmapOverlay(pageUrl);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch overlay data" });
  }
};