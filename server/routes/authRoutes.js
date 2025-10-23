import express from "express"
import { registerUser, loginUser, verifyEmail, logoutUser, googleAuthCallback, githubAuthCallback, forgotPassword, resetPassword, getCurrentUser, deleteUser } from "../controllers/authController.js"
const router = express.Router();
import passport from "../config/passport.js";
import { verifyProfiles } from "../controllers/verifyProfiles.js";
import { protect, handleGoogleCallback, handleGithubCallback } from "../middleware/auth.js";

router.post('/register', registerUser);
router.post('/verify', verifyEmail);
router.post('/login', loginUser);

router.get("/google",passport.authenticate("google", { scope: ["profile", "email"], session: false}));
router.get("/github", passport.authenticate("github", { scope: ["user:email"], session: false}));

router.get("/google/callback", handleGoogleCallback, googleAuthCallback);
router.get("/github/callback", handleGithubCallback, githubAuthCallback);

router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/me", protect, getCurrentUser);
router.post("/verifyacc", verifyProfiles);

router.delete('/users/:id', protect, deleteUser);

export default router;