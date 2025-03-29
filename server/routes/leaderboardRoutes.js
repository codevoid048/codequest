
import express from "express";
import { protect } from "../middleware/auth.js";
import { getLeaderboardData, setDummyData,updateUserPoints } from "../controllers/leaderboardController.js";

const router = express.Router();

//http://localhost:5000/api/leaderboard/dummy
router.post('/dummy', setDummyData);

router.get("/", getLeaderboardData);

// POST update user points (protected route)
router.post('/update-points', protect, updateUserPoints);

export default router;