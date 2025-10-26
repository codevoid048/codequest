import app, { cleanup } from "./app.js"
import dotenv from "dotenv"
import connectDB from "./lib/db.js";
import serverless from "serverless-http";
import mongoose from "mongoose";
import { cleanupRateLimiter } from "./middleware/rateLimiter.js";
import auditService from "./services/auditService.js";

dotenv.config();

connectDB();

// Graceful shutdown handler to prevent memory leaks
const gracefulShutdown = async (signal) => {
    auditService.systemEvent('graceful_shutdown_started', { 
        signal,
        environment: process.env.NODE_ENV 
    });
    
    try {
        await cleanup();
        cleanupRateLimiter();
        
        await mongoose.connection.close();
        auditService.systemEvent('database_connection_closed', { signal });
        
        auditService.systemEvent('graceful_shutdown_completed', { signal });
        
        // Allow audit service to flush logs before exit
        await auditService.shutdown();
        process.exit(0);
    } catch (error) {
        auditService.critical('Graceful shutdown failed', { 
            signal, 
            error: error.message 
        });
        process.exit(1);
    }
};

// Handle various shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2')); // nodemon restart

// Handle uncaught exceptions and rejections
process.on('uncaughtException', (error) => {
    auditService.critical('Uncaught exception occurred', { 
        error: error.message,
        stack: error.stack 
    });
    gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
    auditService.critical('Unhandled promise rejection', { 
        reason: reason?.toString(),
        promise: promise?.toString()
    });
    gracefulShutdown('unhandledRejection');
});

// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => { console.log(`Server is running at ${PORT}`); })

export const handler = serverless(app);