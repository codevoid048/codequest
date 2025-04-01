//APp 
import express from "express";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import { updateRanks } from "./utils/leaderBoardCache.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true, }));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'))

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/auth/admin', adminAuthRoutes);
app.use('/admin', adminRoutes);
// app.use('/api/solvedChallenges',profileRoutes);
updateRanks();

// Schedule leaderboard update every hour
setInterval(() => {
    updateRanks();
}, 60000);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

export default app;