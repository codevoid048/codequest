import express from "express";
import { protect } from "../middleware/auth.js";
import { getLeaderboardData, setDummyData } from "../controllers/leaderboardController.js";

const router = express.Router();

//http://localhost:5000/api/leaderboard/dummy
router.post('/dummy', setDummyData);

router.get("/", getLeaderboardData);

export default router;