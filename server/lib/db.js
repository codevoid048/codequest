import mongoose from "mongoose"
const { default: cacheService } = await import("../services/cacheService.js");
const { warmupLeaderboardCache } = await import("../utils/leaderBoardCache.js");

const connectDB = async () => {
    try {
        const connectionOptions = {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            bufferCommands: false,
        };

        const conn = await mongoose.connect(process.env.MONGO_URI, connectionOptions);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Simple error handling
        mongoose.connection.on('error', (error) => {
            console.error('Database connection error:', error.message);
        });
                
        async function waitForRedisAndWarmup(attempt = 1) {
            const maxAttempts = 5;
            const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000); // exponential backoff, max 10s
            
            if (cacheService.isRedisConnected()) {
                try {
                    await warmupLeaderboardCache();
                } catch (error) {
                    console.error('Failed to warmup leaderboard cache:', error.message);
                }
            } else if (attempt < maxAttempts) {
                setTimeout(() => waitForRedisAndWarmup(attempt + 1), delay);
            } else {
                console.error('Redis was not ready after maximum attempts. Skipping leaderboard cache warmup.');
            }
        }
        
        waitForRedisAndWarmup();
        
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
}

export default connectDB;