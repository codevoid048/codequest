import express from 'express';
import {addChallenge, getUsers, updateChallenge, getTodayChallenge, getCategories, deleteChallenge, getChallengeById} from '../controllers/adminControllers.js';
import { protectAdmin } from '../middleware/adminAuth.js';
import { getCounts } from "../controllers/statsControllers.js";
const router = express.Router();

router.post('/add-challenges', protectAdmin, addChallenge);
router.put('/update-challenge', protectAdmin, updateChallenge);
router.delete('/challenges/:id', protectAdmin, deleteChallenge);
router.get('/challenges/:id', protectAdmin, getChallengeById);
router.get('/getPotd',protectAdmin, getTodayChallenge);
router.get('/users', protectAdmin, getUsers);
router.get('/categories', protectAdmin, getCategories);
router.get('/stats', protectAdmin, getCounts);

export default router;