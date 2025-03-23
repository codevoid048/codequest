import express from "express";
import { protect } from "../middleware/auth";
import { getUserProfile, updateUserProfile, getUserActivity } from "../controllers/profileController";

const router = express.Router();

router.get('/me', protect, getUserProfile);
router.put('/me', protect, updateUserProfile);
router.get('/activity', protect, getUserActivity)

export default router;