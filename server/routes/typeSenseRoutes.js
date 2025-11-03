import express from "express";
import { search, searchUser } from "../controllers/typeSenseController.js";
const router = express.Router();

router.get("/", search);
router.get("/user", searchUser);

export default router;
