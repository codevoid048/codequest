import express from "express";
import { codechefData, codeforcesData, fetchLeetCodeGraphql, geeksforgeeksData, heatmap, leetcodeData, solvedChallenges } from "../controllers/platformsController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

router.post('/leetcode',leetcodeData);
router.post('/gfg',  geeksforgeeksData);
router.post('/codeforces', codeforcesData);
router.post('/codechef', codechefData);
router.get('/solvedChallenges',protect,solvedChallenges);
router.post('/leetcode/graphql',fetchLeetCodeGraphql);
router.post('/heatmap',heatmap);




export default router;