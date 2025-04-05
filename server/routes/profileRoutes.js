import express from "express";
import { protect } from "../middleware/auth.js";
import { getUserProfile, updateUserProfile, getUserActivity ,solvedChallenges,getUserById} from "../controllers/profileController.js";

const router = express.Router();

router.get('/me', getUserProfile);
router.put('/update', protect, updateUserProfile);
router.get('/activity', protect, getUserActivity)
router.post('/solvedChallenges',protect,solvedChallenges)
router.get('/getUser',getUserById);



export default router;