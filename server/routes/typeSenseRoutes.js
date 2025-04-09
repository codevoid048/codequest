import express from "express";
import { test, search } from "../controllers/typeSenseController.js";
const router = express.Router();

router.get("/typesense-test", test);
router.get("/search", search);

export default router;
