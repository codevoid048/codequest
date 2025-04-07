import express from "express";
import { codechefData, codeforcesData, fetchLeetCodeGraphql, geeksforgeeksData, leetcodeData, solvedChallenges } from "../controllers/platformsController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

router.get('/leetcode',leetcodeData);
router.get('/gfg',  geeksforgeeksData);
router.get('/codeforces', codeforcesData);
router.get('/codechef', codechefData);
router.get('/solvedChallenges',protect,solvedChallenges);
router.post('/leetcode/graphql',fetchLeetCodeGraphql);




export default router;