import express from "express";
import { protect } from "../middleware/auth.js";
import { getUserProfile, updateUserProfile, getUserActivity } from "../controllers/profileController.js";

const router = express.Router();

router.get('/me', protect, getUserProfile);
router.put('/me', protect, updateUserProfile);
router.get('/activity', protect, getUserActivity)

export default router;