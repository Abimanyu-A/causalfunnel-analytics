import { Router } from "express";
import { fetchSessions } from "../controllers/session.controller";
import { fetchSessionEvents } from "../controllers/session.controller";

const router = Router();

router.get("/", fetchSessions);
router.get("/:id", fetchSessionEvents);

export default router;