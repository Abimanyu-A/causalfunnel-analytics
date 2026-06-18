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
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to track event"
    });
  }
};