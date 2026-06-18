import { Router } from "express";
import { fetchSessions } from "../controllers/session.controller";

const router = Router();

router.get("/", fetchSessions);

export default router;