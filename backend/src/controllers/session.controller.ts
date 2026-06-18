import { Request, Response } from "express";
import { getSessions } from "../services/session.service";

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