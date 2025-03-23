import express from "express";
import { protect } from "../middleware/auth.js";
import { getLeaderboardData } from "../controllers/leaderboardController.js";

const router = express.Router();

router.get('/', getLeaderboardData);

export default router;