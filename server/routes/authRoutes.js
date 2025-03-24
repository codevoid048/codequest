import express from "express"
import { registerUser, loginUser, verifyEmail, logoutUser, googleAuthCallback, githubAuthCallback } from "../controllers/authController.js"
const router = express.Router();
import passport from "../config/passport.js";

router.post('/register', registerUser);
router.get('/verify/:token', verifyEmail);
router.post('/login', loginUser);

router.get("/google",passport.authenticate("google", { scope: ["profile", "email"], session: false}));
router.get("/github", passport.authenticate("github", { scope: ["user:email"], session: false}));

router.get("/google/callback", passport.authenticate("google", { session: false }), googleAuthCallback);
router.get("/github/callback", passport.authenticate("github", { session: false }), githubAuthCallback);

router.post("/logout", logoutUser);


export default router;