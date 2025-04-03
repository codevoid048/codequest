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
import platformRoute from "./routes/platformsRoute.js";
import axios from "axios";
import { fetchCodeChefProfile, fetchCodeforcesProfile, fetchgfgProfile, fetchLeetCodeProfile } from "./utils/platforms.js";
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
app.use('/platforms', platformRoute);

app.get("/geeksforgeeks-profile/:handle", async (req, res) => {
  try {
    const handle = req.params.handle;
    const response = await axios.get(
      `https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=${handle}`
    );
    return res.json(response.data);
  } catch (error) {
    return res.status(error.response?.status || 500).json({ error: "Error fetching data" });
  }
});

updateRanks();
fetchCodeforcesProfile();
fetchLeetCodeProfile();
fetchgfgProfile();
fetchCodeChefProfile();

// Schedule leaderboard update every hour
setInterval(() => {
  updateRanks();
  fetchCodeforcesProfile();
  fetchLeetCodeProfile();
  fetchgfgProfile();
  fetchCodeChefProfile();
}, 300000);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app;