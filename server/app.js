import express from "express";
import cors from "cors";
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
import { appLifecycle } from './utils/appLifecycle.js';
import { globalErrorHandler } from './middleware/errorHandler.js';
import auditService from './services/auditService.js';
import { httpLogger, auditContextMiddleware, auditErrorMiddleware, performanceMonitor } from './middleware/auditMiddleware.js';
dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// Memory-safe payload size limits with proper error handling
// Audit context middleware (must be early in middleware chain)
app.use(auditContextMiddleware);

app.use(express.json({ 
    limit: '2mb', // Reduced from 5mb to prevent memory issues
    verify: (req, res, buf) => {
        // Monitor large requests with audit service
        if (buf.length > 1024 * 1024) { // 1MB threshold
            auditService.security('large_request_detected', {
                requestId: req.auditContext?.requestId,
                size: buf.length,
                ip: req.ip,
                url: req.originalUrl,
                userAgent: req.get('User-Agent')
            });
        }
    }
}));

app.use(express.urlencoded({ 
    limit: '2mb', 
    extended: false,
    parameterLimit: 1000 // Limit number of parameters
}));

app.use(cookieParser());
app.use(passport.initialize());

// Replace Morgan with our audit-integrated HTTP logger
app.use(httpLogger);
app.use(performanceMonitor);


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

// Error handling middleware
app.use(auditErrorMiddleware);
app.use(globalErrorHandler);

// Initialize application services with audit logging
auditService.systemEvent('app_initializing', { 
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version
});

warmupLeaderboardCache();
startStreakCronJob();
appLifecycle.initialize();

// Export cleanup function for server.js
export const cleanup = async () => {
    auditService.systemEvent('app_shutting_down');
    await auditService.shutdown();
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