import express from 'express';
import {addChallenge,} from '../controllers/adminControllers.js';
const router = express.Router();

router.post('/',addChallenge);

export default router;