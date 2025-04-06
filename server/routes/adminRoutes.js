import express from 'express';
import {addChallenge, getUsers,} from '../controllers/adminControllers.js';
import { protectAdmin } from '../middleware/adminAuth.js';
const router = express.Router();

router.post('/add-challenges',addChallenge);
router.get('/users', getUsers);

export default router;