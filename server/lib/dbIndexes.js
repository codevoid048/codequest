import mongoose from "mongoose";

// Database indexes to prevent race conditions and improve performance
export const createOptimalIndexes = async () => {
    try {
        console.log('Creating database indexes for race condition prevention...');
        
        // User model indexes
        await mongoose.connection.db.collection('users').createIndexes([
            // Unique constraints to prevent duplicate registrations
            { key: { email: 1 }, unique: true, partialFilterExpression: { isVerified: true } },
            { key: { username: 1 }, unique: true, partialFilterExpression: { isVerified: true } },
            { key: { RegistrationNumber: 1 }, unique: true, partialFilterExpression: { isVerified: true } },
            
            // Performance indexes
            { key: { points: -1, rank: 1 }, name: 'leaderboard_sort' },
            { key: { isVerified: 1, points: -1 }, name: 'leaderboard_filter' },
            { key: { 'solveChallenges.easy.timestamp': -1 }, name: 'streak_easy' },
            { key: { 'solveChallenges.medium.timestamp': -1 }, name: 'streak_medium' },
            { key: { 'solveChallenges.hard.timestamp': -1 }, name: 'streak_hard' },
            
            // Platform data indexes
            { key: { 'leetCode.username': 1 }, sparse: true },
            { key: { 'gfg.username': 1 }, sparse: true },
            { key: { 'codeforces.username': 1 }, sparse: true },
            { key: { 'codechef.username': 1 }, sparse: true }
        ]);

        // Challenge model indexes
        await mongoose.connection.db.collection('challenges').createIndexes([
            // Query performance indexes
            { key: { category: 1, difficulty: 1, createdAt: -1 }, name: 'challenge_filter' },
            { key: { createdAt: -1 }, name: 'daily_challenge' },
            { key: { title: 'text', category: 'text' }, name: 'challenge_search' },
            
            // Solved users index
            { key: { solvedUsers: 1 }, sparse: true }
        ]);

        console.log('Database indexes created successfully');
        
    } catch (error) {
        console.error('Error creating database indexes:', error);
    }
};

// Call this during application startup
export const setupDatabase = async () => {
    // Wait for MongoDB connection to be ready
    if (mongoose.connection.readyState === 1) {
        await createOptimalIndexes();
    } else {
        mongoose.connection.once('open', createOptimalIndexes);
    }
};