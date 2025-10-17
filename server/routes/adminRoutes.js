import express from 'express';
import {addChallenge, getUsers,updateChallenge,getTodayChallenge} from '../controllers/adminControllers.js';
import { protectAdmin } from '../middleware/adminAuth.js';
const router = express.Router();

router.post('/add-challenges', protectAdmin, addChallenge);
router.put('/update-challenge', protectAdmin, updateChallenge);
router.get('/get-todaychallenge',protectAdmin, getTodayChallenge);
router.get('/users', protectAdmin, getUsers);

export default router;