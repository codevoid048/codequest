import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import { warmupLeaderboardCache } from "./utils/leaderBoardCache.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import platformRoute from "./routes/platformsRoute.js";
import statsRoutes from "./routes/statsRoutes.js"
import userRoutes from "./routes/userRoutes.js";
import typeSenseRoutes from "./routes/typeSenseRoutes.js";
import { startStreakCronJob } from './utils/streakResetJob.js';
dotenv.config();

const app = express();

app.use(cors({ origin: ["https://codequest.srkrcodingclub.in", "http://localhost:5173"], credentials: true }));

// Increased payload size limit
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.urlencoded({ limit: '5mb', extended: false }));
app.use(morgan('dev'))
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/auth/admin', adminAuthRoutes);
app.use('/admin', adminRoutes);
app.use('/platforms', platformRoute);
app.use('/api', statsRoutes);
app.use('/api/user', userRoutes);
app.use('/api', typeSenseRoutes);

warmupLeaderboardCache();
startStreakCronJob();

// Schedule leaderboard update every half-hour
setInterval(() => {
  warmupLeaderboardCache();
}, 30 * 60 * 1000);

app.get('/hello', (req, res) => { return res.status(200).send("Hello, World!") })

app.use((err, req, res, next) => {
  //console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app;