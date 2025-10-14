// routes/stats.js
import express from "express";
import { getCounts } from "../controllers/statsControllers.js";

const router = express.Router();

// Get total stats
router.get("/stats", getCounts);

export default router;
