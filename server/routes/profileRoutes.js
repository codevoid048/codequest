import express from "express";
import { protect } from "../middleware/auth.js";
import { getUserProfile, updateUserProfile, getUserActivity ,solvedChallenges,getUserById, updateUserStreak} from "../controllers/profileController.js";


const router = express.Router();

router.get('/me', getUserProfile);
router.put('/update', protect, updateUserProfile);
router.get('/activity', protect, getUserActivity)
router.post('/solvedChallenges',protect,solvedChallenges)
router.get('/getUser',getUserById);
router.get('/streak',protect,updateUserStreak);
router.get('/delete',protect,deleteUserProfile);


export default router;