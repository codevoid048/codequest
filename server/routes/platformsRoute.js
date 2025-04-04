import express from "express";
import { codechefData, codeforcesData, geeksforgeeksData, leetcodeData } from "../controllers/platformsController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

router.get('/leetcode',leetcodeData);
router.get('/gfg',  geeksforgeeksData);
router.get('/codeforces', codeforcesData);
router.get('/codechef', codechefData);




export default router;