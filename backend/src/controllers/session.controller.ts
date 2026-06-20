import { Request, Response } from "express";
import { getSessions, getSessionEvents } from "../services/session.service";

export const fetchSessions = async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
    const skip  = parseInt(req.query.skip as string) || 0;

    const sessions = await getSessions(limit, skip);
    res.status(200).json({ success: true, data: sessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch sessions" });
  }
};

export const fetchSessionEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const events = await getSessionEvents(id);
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch session events" });
  }
};