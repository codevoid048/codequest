
import express from "express";
import { protect } from "../middleware/auth.js";
import { getLeaderboardData, updateUserPoints } from "../controllers/leaderboardController.js";

const router = express.Router();

router.get("/", getLeaderboardData);

// POST update user points (protected route)
router.post('/update-points', protect, updateUserPoints);

export default router;