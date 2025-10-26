import { Challenge } from "../models/Challenge.js";
import { User } from "../models/User.js";
import mongoose from "mongoose";
import auditService from "../services/auditService.js";

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
                // Calculate yesterday in IST
                const yesterday = new Date(dateOnly);
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = new Intl.DateTimeFormat("en-IN", {
                    timeZone: "Asia/Kolkata",
                    year: "numeric",
                    month: "2-digit", 
                    day: "2-digit"
                }).format(yesterday).split('/').reverse().join('-');

                // Check if any challenge was solved yesterday
                const anyYesterday = ['easy', 'medium', 'hard'].some(diff =>
                    updateResult.solveChallenges[diff]?.some(entry => {
                        const entryDateStr = entry.timestamp?.split(' ')[0];
                        return entryDateStr === yesterdayStr;
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