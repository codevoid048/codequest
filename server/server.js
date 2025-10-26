import app, { cleanup } from "./app.js"
import dotenv from "dotenv"
import connectDB from "./lib/db.js";
import serverless from "serverless-http";
import mongoose from "mongoose";
import { cleanupRateLimiter } from "./middleware/rateLimiter.js";

dotenv.config();

// Graceful shutdown handler to prevent memory leaks
const gracefulShutdown = async (signal) => {
    try {
        await cleanup();
        cleanupRateLimiter();
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Graceful shutdown failed:', error.message);
        process.exit(1);
    }
};

// Handle various shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2')); // nodemon restart

// Handle uncaught exceptions and rejections
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error.message);
    gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection:', reason);
    gracefulShutdown('unhandledRejection');
});

// Start server after database connection
const startServer = async () => {
    try {
        await connectDB();
        
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => { 
            console.log(`Server is running at ${PORT}`); 
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();

// export const handler = serverless(app);