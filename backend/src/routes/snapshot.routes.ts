import { Router } from "express";
import { saveSnapshot } from "../controllers/snapshot.controller";

const router = Router();

router.post("/", saveSnapshot);

export default router;