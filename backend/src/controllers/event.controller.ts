import { Request, Response } from "express";
import { createEvent } from "../services/event.service";

export const trackEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const event = await createEvent(req.body);

    res.status(201).json({
      success: true,
      data: event
    });
  } catch (error) {

    if (error instanceof Error && (error as Error & { status?: number }).status === 400) {
      res.status(400).json({ success: false, message: error.message });
      return;
    }
    
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to track event"
    });
  }
};