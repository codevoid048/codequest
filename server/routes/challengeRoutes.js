import express from "express";
import { protect } from "../middleware/auth.js";
import { getChallenges, getChallengeById,getSolutionByChallengeId} from "../controllers/challengeController.js";
const router = express.Router();

router.get('/', getChallenges);
router.get('/:id', protect, getChallengeById);
router.get('/solution/:id', getSolutionByChallengeId);

export default router;
