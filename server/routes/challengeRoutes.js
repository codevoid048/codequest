import express from 'express';
import { protect } from '../middleware/auth.js';
import { 
    getChallenges, 
    getChallengeById, 
    getSolutionByChallengeId, 
    getDailyChallenge, 
    getFilterOptions 
} from '../controllers/challengeController.js';

const router = express.Router();

// Get all challenges with filters and pagination
router.get('/', getChallenges);

// Get daily challenge
router.get('/daily', getDailyChallenge);

// Get filter options (categories, difficulties, platforms)
router.get('/filter-options', getFilterOptions);

// Get challenge by ID
router.get('/:id', getChallengeById);

// Get solution by challenge ID
router.get('/solution/:id', protect, getSolutionByChallengeId);

export default router;