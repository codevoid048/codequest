import express from "express"
import {
  addChallenge,
  getUsers,
  updateChallenge,
  getTodayChallenge,
  getCategories,
  deleteChallenge,
  getChallenges,
  getChallengeById,
} from "../controllers/adminControllers.js"
import { protectAdmin } from "../middleware/adminAuth.js"
import { getCounts } from "../controllers/statsControllers.js"

const router = express.Router()

// Challenge Management Routes
router.post("/add-challenges", protectAdmin, addChallenge)
router.get("/challenges", protectAdmin, getChallenges)
router.get("/challenges/:id", protectAdmin, getChallengeById)
router.put("/update-challenge", protectAdmin, updateChallenge)
router.delete("/challenges/:id", protectAdmin, deleteChallenge)
router.get("/getPotd", protectAdmin, getTodayChallenge)

// User Management Routes
router.get("/users", protectAdmin, getUsers)

// Category & Stats Routes
router.get("/categories", protectAdmin, getCategories)
router.get("/stats", protectAdmin, getCounts)

export default router
