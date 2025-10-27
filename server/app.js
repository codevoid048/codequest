import express from "express";
import cors from "cors";
import helmet from "helmet";
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
import { ensureDbConnection } from './lib/db.js';
dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "https:"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  xssFilter: true,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" }
}));

app.use(express.json({ limit: '5mb' }));

app.use(express.urlencoded({ limit: '5mb', extended: false }));

app.use(cookieParser());
app.use(passport.initialize());

// Global database connection middleware for all routes
app.use(ensureDbConnection);


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