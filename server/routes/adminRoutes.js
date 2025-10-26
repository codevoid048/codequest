import express from 'express';
import {addChallenge, getUsers, updateChallenge, getTodayChallenge, getCategories} from '../controllers/adminControllers.js';
import { protectAdmin } from '../middleware/adminAuth.js';
import { getCounts } from "../controllers/statsControllers.js";
const router = express.Router();

router.post('/add-challenges', protectAdmin, addChallenge);
router.put('/update-challenge', protectAdmin, updateChallenge);
router.get('/getPotd',protectAdmin, getTodayChallenge);
router.get('/users', protectAdmin, getUsers);
router.get('/categories', protectAdmin, getCategories);
router.get('/stats', protectAdmin, getCounts);

export default router;