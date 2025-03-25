<<<<<<< HEAD
import express from 'express';
import { 
    getLeaderboardData, 
    updateUserPoints 
} from '../controllers/leaderboardController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET leaderboard data (public route)
router.get('/', getLeaderboardData);
=======
import express from "express";
import { protect } from "../middleware/auth.js";
import { getLeaderboardData, setDummyData } from "../controllers/leaderboardController.js";

const router = express.Router();

//http://localhost:5000/api/leaderboard/dummy
router.post('/dummy', setDummyData);

router.get("/", getLeaderboardData);
>>>>>>> 62828ba4ee57a926d171bbdb4b727307abeac6e9

// POST update user points (protected route)
router.post('/update-points', protect, updateUserPoints);

export default router;