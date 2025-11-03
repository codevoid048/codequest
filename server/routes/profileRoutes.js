import express from "express";
import { protect } from "../middleware/auth.js";
import { getUserProfile, updateUserProfile, getUserById, updateUserStreak } from "../controllers/profileController.js";


const router = express.Router();

router.get('/me', getUserProfile);
router.put('/update', protect, updateUserProfile);
router.get('/getUser', getUserById);
router.get('/streak', protect, updateUserStreak);
// router.post("/potd", postPotdChallenge);



export default router;