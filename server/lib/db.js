import mongoose from "mongoose"

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
        
        // Warmup leaderboard cache after DB is ready (with delay for Redis connection)
        setTimeout(async () => {
            try {
                const { warmupLeaderboardCache } = await import("../utils/leaderBoardCache.js");
                warmupLeaderboardCache();
            } catch (error) {
                console.error('Failed to warmup leaderboard cache:', error.message);
            }
        }, 2000); // 2 second delay
        
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
}

export default connectDB;