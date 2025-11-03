import { Challenge } from "../models/Challenge.js";
import { User } from "../models/User.js";
import mongoose from "mongoose";
import auditService from "../services/auditService.js";
import { formatISTDateString, isWithinYesterdayIST } from './timezone.js';

export const postPotdChallenge = async (userId, timestamp, challengeId, difficulty) => {
    const session = await mongoose.startSession();
    
    try {
        return await session.withTransaction(async () => {
            if (!userId || !timestamp || !challengeId || !difficulty) {
                return { success: false, message: 'Missing required fields' };
            }

            const dateOnly = timestamp.date;
            const difficultyKey = difficulty.toLowerCase();
            const scoreMap = { easy: 5, medium: 10, hard: 20 };
            const points = scoreMap[difficultyKey] || 0;

            // Single atomic operation to check and update user
            const updateResult = await User.findOneAndUpdate(
                {
                    _id: userId,
                    // Ensure challenge isn't already solved
                    [`solveChallenges.${difficultyKey}.challenge`]: { $ne: challengeId }
                },
                {
                    // Add the solved challenge
                    $push: {
                        [`solveChallenges.${difficultyKey}`]: {
                            challenge: challengeId,
                            timestamp: `${timestamp.date} ${timestamp.time}`
                        }
                    },
                    // Increment points
                    $inc: { points: points }
                },
                { 
                    new: true, 
                    session,
                    select: 'solveChallenges points streak'
                }
            );

            if (!updateResult) {
                // Either user not found or challenge already solved
                const user = await User.findById(userId).session(session);
                if (!user) {
                    return { success: false, message: 'User not found' };
                }
                
                // Check if already solved
                const alreadySolved = user.solveChallenges?.[difficultyKey]?.some(
                    entry => entry.challenge?.toString() === challengeId.toString()
                );
                
                if (alreadySolved) {
                    return { success: true, message: 'Challenge already solved' };
                }
                
                return { success: false, message: 'Update failed' };
            }

            // Calculate streak update - check if any challenge solved today in other difficulties
            const anyChallengeToday = ['easy', 'medium', 'hard']
                .filter(diff => diff !== difficultyKey)
                .some(diff =>
                    updateResult.solveChallenges[diff]?.some(entry => {
                        const entryDateStr = entry.timestamp?.split(' ')[0];
                        return entryDateStr === dateOnly;
                    })
                );

            // Only update streak if no other challenge was solved today
            if (!anyChallengeToday) {
                // Check if any challenge was solved yesterday using IST date boundaries
                const anyYesterday = ['easy', 'medium', 'hard'].some(diff =>
                    updateResult.solveChallenges[diff]?.some(entry => {
                        // Parse the stored timestamp and check if it's within yesterday's IST bounds
                        const entryTimestamp = new Date(entry.timestamp);
                        return isWithinYesterdayIST(entryTimestamp);
                    })
                );

                // Update streak
                const newStreak = anyYesterday ? (updateResult.streak || 0) + 1 : 1;

                await User.updateOne(
                    { _id: userId },
                    { $set: { streak: newStreak } },
                    { session }
                );

                updateResult.streak = newStreak;
            }

            // Update challenge's solvedUsers atomically
            await Challenge.updateOne(
                { 
                    _id: challengeId,
                    solvedUsers: { $ne: userId }
                },
                { 
                    $addToSet: { solvedUsers: userId }
                },
                { session }
            );

            // Set the isPOTDSolvedToday flag to true
            await User.updateOne(
                { _id: userId },
                { $set: { isPOTDSolvedToday: true } },
                { session }
            );

            return {
                success: true,
                message: 'POTD challenge recorded successfully',
                points: updateResult.points,
                streak: updateResult.streak
            };
        });

    } catch (error) {
        auditService.error('potd_challenge_error', { error: error.message });
        return {
            success: false,
            message: error.message === 'Missing required fields' ? error.message : 'Server error',
            error: error.message
        };
    } finally {
        await session.endSession();
    }
};