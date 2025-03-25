import express from 'express';
import { 
    getLeaderboardData, 
    updateUserPoints 
} from '../controllers/leaderboardController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET leaderboard data (public route)
router.get('/', getLeaderboardData);

// POST update user points (protected route)
router.post('/update-points', protect, updateUserPoints);

export default router;