import { Request, Response } from "express";
import { upsertSnapshot } from "../services/snapshot.service";

export const saveSnapshot = async (req: Request, res: Response): Promise<void> => {
  try {
    await upsertSnapshot(req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to save snapshot" });
  }
};