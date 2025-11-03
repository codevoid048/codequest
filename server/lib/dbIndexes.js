import mongoose from "mongoose";

export const createOptimalIndexes = async () => {
    try {
        
        const usersCollection = mongoose.connection.db.collection('users');
        const challengesCollection = mongoose.connection.db.collection('challenges');
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create essential user indexes with explicit names
        await usersCollection.createIndex({ email: 1 }, { unique: true, sparse: true, name: 'email_unique_idx' });
        await usersCollection.createIndex({ username: 1 }, { unique: true, sparse: true, name: 'username_unique_idx' });
        await usersCollection.createIndex({ registrationNumber: 1 }, { unique: true, sparse: true, name: 'regno_unique_idx' });
        
        // Performance indexes for leaderboard
        await usersCollection.createIndex({ points: -1, rank: 1 }, { name: 'leaderboard_sort_idx' });
        await usersCollection.createIndex({ isVerified: 1, points: -1 }, { name: 'verified_points_idx' });
        
        // Streak tracking indexes
        await usersCollection.createIndex({ 'solveChallenges.easy.timestamp': -1 }, { name: 'easy_streak_idx' });
        await usersCollection.createIndex({ 'solveChallenges.medium.timestamp': -1 }, { name: 'medium_streak_idx' });
        await usersCollection.createIndex({ 'solveChallenges.hard.timestamp': -1 }, { name: 'hard_streak_idx' });
        
        // Platform data indexes
        await usersCollection.createIndex({ 'leetCode.username': 1 }, { sparse: true, name: 'leetcode_username_idx' });
        await usersCollection.createIndex({ 'gfg.username': 1 }, { sparse: true, name: 'gfg_username_idx' });
        await usersCollection.createIndex({ 'codeforces.username': 1 }, { sparse: true, name: 'cf_username_idx' });
        await usersCollection.createIndex({ 'codechef.username': 1 }, { sparse: true, name: 'cc_username_idx' });
        
        // Challenge indexes
        await challengesCollection.createIndex({ category: 1, difficulty: 1, createdAt: -1 }, { name: 'challenge_filter_idx' });
        await challengesCollection.createIndex({ createdAt: -1 }, { name: 'challenge_date_idx' });
        await challengesCollection.createIndex({ title: 'text', category: 'text' }, { name: 'challenge_search_idx' });
        await challengesCollection.createIndex({ solvedUsers: 1 }, { sparse: true, name: 'solved_users_idx' });
        
        
    } catch (error) {
        console.error('Error setting up database indexes:', error);
    }
};

export const setupDatabase = async () => {
    if (mongoose.connection.readyState === 1) {
        await createOptimalIndexes();
    } else {
        mongoose.connection.once('open', createOptimalIndexes);
    }
};