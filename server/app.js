import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
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
import { appLifecycle } from './utils/appLifecycle.js';
import { globalErrorHandler } from './middleware/errorHandler.js';
dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(express.json({ limit: '2mb' }));

app.use(express.urlencoded({ limit: '2mb', extended: false }));

app.use(cookieParser());
app.use(passport.initialize());


app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/auth/admin', adminAuthRoutes);
app.use('/api/admin', adminRoutes);
app.use('/platforms', platformRoute);
app.use('/api', statsRoutes);
app.use('/api/user', userRoutes);
// app.use('/api', typeSenseRoutes);

startStreakCronJob();
appLifecycle.initialize();

// Export cleanup function for server.js
export const cleanup = async () => {
    return appLifecycle.cleanup();
};

app.get('/hello', (req, res) => { return res.status(200).send("Hello, World!") })

// 404 handler for unmatched routes
app.use('*', (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.statusCode = 404;
  error.errorCode = 'ROUTE_NOT_FOUND';
  next(error);
});

// Global error handling middleware (must be last)
app.use(globalErrorHandler);

export default app;