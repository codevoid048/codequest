import express from "express";
import { protect } from "../middleware/auth.js";
import { getChallenges, getChallengeById } from "../controllers/challengeController.js";

const router = express.Router();

router.get('/',getChallenges);
router.get('/:id', protect, getChallengeById);
export default router;
