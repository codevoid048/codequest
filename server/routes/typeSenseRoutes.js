import express from "express";
import { test, search, searchUser } from "../controllers/typeSenseController.js";
const router = express.Router();

router.get("/typesense-test", test);
router.get("/search", search);
router.get("/search-user", searchUser)

export default router;
