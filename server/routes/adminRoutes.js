import express from 'express';
import {addChallenge, getUsers,} from '../controllers/adminControllers.js';
const router = express.Router();

router.post('/',addChallenge);
router.get('/users', getUsers);

export default router;