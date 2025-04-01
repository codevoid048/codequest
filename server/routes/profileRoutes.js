import express from "express";
import { protect } from "../middleware/auth.js";
import { getUserProfile, updateUserProfile, getUserActivity ,solvedChallenges} from "../controllers/profileController.js";

const router = express.Router();

router.get('/me', protect, getUserProfile);
router.put('/update', protect, updateUserProfile);
router.get('/activity', protect, getUserActivity)
router.post('/solvedChallenges',protect,solvedChallenges);
export default router;