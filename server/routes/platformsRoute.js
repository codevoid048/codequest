import express from "express";
import { geeksforgeeksData, leetcodeData } from "../controllers/platformsController.js";
const router = express.Router();

router.post('/leetcode', leetcodeData);
router.post('/gfg', geeksforgeeksData);

export default router;