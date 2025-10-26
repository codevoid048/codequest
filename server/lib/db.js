import mongoose from "mongoose"
import { setupDatabase } from "./dbIndexes.js"
import auditService from "../services/auditService.js"
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
        
        auditService.systemEvent('database_connected', {
            host: conn.connection.host,
            database: conn.connection.name,
            connectionPoolSize: connectionOptions.maxPoolSize
        });
        
        // Monitor connection events for memory management
        mongoose.connection.on('connected', () => {
            auditService.systemEvent('database_connection_established', {
                readyState: mongoose.connection.readyState
            });
        });
        
        mongoose.connection.on('disconnected', () => {
            auditService.systemEvent('database_disconnected', {
                reason: 'connection_lost'
            });
        });
        
        mongoose.connection.on('error', (error) => {
            auditService.error('Database connection error', error, {
                host: conn.connection.host,
                readyState: mongoose.connection.readyState
            });
        });
        
        // Setup indexes for performance and race condition prevention
        const audit = auditService.startTrace('database_setup');
        await setupDatabase();
        audit.complete({ indexesSetup: true });
        
        //setupMongoChangeStream();
        
        auditService.systemEvent('database_initialization_complete', {
            environment: process.env.NODE_ENV
        });
        
    } catch (error) {
        auditService.critical('Database connection failed', {
            error: error.message,
            mongoUri: process.env.MONGO_URI ? 'configured' : 'missing',
            environment: process.env.NODE_ENV
        });
        process.exit(1);
    }
}

export default connectDB;