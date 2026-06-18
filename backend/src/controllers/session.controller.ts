import { Request, Response } from "express";
import { getSessions } from "../services/session.service";
import { getSessionEvents } from "../services/session.service";

export const fetchSessions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const sessions = await getSessions();

    res.status(200).json({
      success: true,
      data: sessions
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch sessions"
    });
  }
};

export const fetchSessionEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const events = await getSessionEvents(
      Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    );

    res.status(200).json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch session events"
    });
  }
};