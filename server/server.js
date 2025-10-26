import app, { cleanup } from "./app.js"
import dotenv from "dotenv"
import connectDB from "./lib/db.js";
import serverless from "serverless-http";
import mongoose from "mongoose";
import { cleanupRateLimiter } from "./middleware/rateLimiter.js";

dotenv.config();

connectDB();

// Graceful shutdown handler to prevent memory leaks
const gracefulShutdown = async (signal) => {
    console.log(`Received ${signal}. Starting graceful shutdown...`);
    
    try {
        cleanup();
        cleanupRateLimiter();
        
        await mongoose.connection.close();
        console.log('Database connection closed');
        
        console.log('Graceful shutdown completed');
        process.exit(0);
    } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
    }
};

// Handle various shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2')); // nodemon restart

// Handle uncaught exceptions and rejections
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    gracefulShutdown('unhandledRejection');
});

// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => { console.log(`Server is running at ${PORT}`); })

export const handler = serverless(app);