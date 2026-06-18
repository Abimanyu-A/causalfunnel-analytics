import { Router } from "express";
import { trackEvent } from "../controllers/event.controller";

const router = Router();

router.post("/", trackEvent);

export default router;