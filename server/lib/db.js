import mongoose from "mongoose"
import { setupDatabase } from "./dbIndexes.js"
// import { setupMongoChangeStream } from "../typesense/liveSync.js"

const connectDB = async () => {
    try {
        // Connection options with resource limits
        const connectionOptions = {
            maxPoolSize: 10, // Limit connection pool size
            serverSelectionTimeoutMS: 5000, // How long to try selecting a server
            socketTimeoutMS: 45000, // How long to wait for a response
            bufferMaxEntries: 0, // Disable mongoose buffering
            bufferCommands: false, // Disable mongoose buffering
        };

        const conn = await mongoose.connect(process.env.MONGO_URI, connectionOptions);
        console.log(`MongoDB connected: ${conn.connection.host}`);
        
        // Monitor connection events for memory management
        mongoose.connection.on('connected', () => {
            console.log('MongoDB connection established');
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB connection disconnected');
        });
        
        mongoose.connection.on('error', (error) => {
            console.error('MongoDB connection error:', error);
        });
        
        // Setup indexes for performance and race condition prevention
        await setupDatabase();
        
        //setupMongoChangeStream();
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;