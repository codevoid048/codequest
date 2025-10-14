import { Challenge } from "../models/Challenge.js";
import { User } from "../models/User.js";

export const postPotdChallenge = async (userId, timestamp, challengeId, difficulty) => {
    try {
        // console.log("Request received:", { userId, timestamp, challengeId, difficulty });

        if (!userId || !timestamp || !challengeId || !difficulty) {
            return { success: false, message: 'Missing required fields' };
        }
        // Extract date from timestamp object
        const dateOnly = timestamp.date;

        const user = await User.findById(userId);
        const challenge = await Challenge.findById(challengeId);

        if (!user) return { success: false, message: 'User not found' };
        if (!challenge) return { success: false, message: 'Challenge not found' };

        const difficultyKey = difficulty.toLowerCase();
        
        // Ensure solveChallenges structure exists
        if (!user.solveChallenges) {
            user.solveChallenges = {
                easy: [],
                medium: [],
                hard: []
            };
        }

        // Ensure all arrays exist
        if (!user.solveChallenges.easy) user.solveChallenges.easy = [];
        if (!user.solveChallenges.medium) user.solveChallenges.medium = [];
        if (!user.solveChallenges.hard) user.solveChallenges.hard = [];

        // Check if challenge is already solved
        const solvedList = user.solveChallenges[difficultyKey];
        const alreadySolved = solvedList && solvedList.some(entry =>
            entry.challenge?.toString() === challengeId.toString()
        );
        
        // console.log("Already solved:", alreadySolved);
        
        if (!alreadySolved) {
            // Push the solved challenge
            user.solveChallenges[difficultyKey].push({
                challenge: challengeId,
                timestamp: `${timestamp.date} ${timestamp.time}`
            });

            // Update points
            const scoreMap = { easy: 5, medium: 10, hard: 20 };
            user.points += scoreMap[difficultyKey] || 0;

            // Check if any challenge was solved today across all difficulties
            const anyChallengeToday = ['easy', 'medium', 'hard']
                .some(diff =>
                    diff !== difficultyKey && user.solveChallenges[diff]?.some(entry => {
                        const entryDateStr = entry.timestamp?.split(' ')[0];
                        return entryDateStr === dateOnly;
                    })
                );

            // console.log("Any challenge solved today in other difficulties:", anyChallengeToday);

            // Only update streak if no other challenge was solved today
            if (!anyChallengeToday) {
                // Calculate yesterday's date in YYYY-MM-DD format using Intl.DateTimeFormat
                const yesterday = new Date(dateOnly);
                yesterday.setDate(yesterday.getDate() - 1);
                
                const yesterdayStr = new Intl.DateTimeFormat("en-IN", {
                    timeZone: "Asia/Kolkata",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                }).format(yesterday).split('/').reverse().join('-');
                
                // console.log("Yesterday's date for streak check:", yesterdayStr);

                // Check if any challenge was solved yesterday across all difficulties
                const anyYesterday = ['easy', 'medium', 'hard']
                    .some(diff => 
                        user.solveChallenges[diff]?.some(entry => {
                            const entryDateStr = entry.timestamp?.split(' ')[0];
                            // console.log(entryDateStr, "===", yesterdayStr);
                            return entryDateStr === yesterdayStr;
                        })
                    );
                
                // console.log("Any challenge solved yesterday:", anyYesterday);
                
                // Update streak based on yesterday's activity
                if (anyYesterday) {
                    user.streak = (user.streak || 0) + 1;
                    // console.log(`Streak continued and updated to ${user.streak}`);
                } else {
                    user.streak = 1;
                    // console.log(`Streak reset to 1`);
                }
            } else {
                // console.log("Already solved a challenge today in another difficulty, streak not updated");
            }

            // Save user
            await user.save();

            // Avoid duplicates in solvedUsers for the challenge
            const solvedUserIds = challenge.solvedUsers?.map(id => id.toString()) || [];
            if (!solvedUserIds.includes(user._id.toString())) {
                challenge.solvedUsers = challenge.solvedUsers || [];
                challenge.solvedUsers.push(user._id);
                await challenge.save();
                // console.log("User added to challenge's solvedUsers");
            } else {
                // console.log("User already in challenge's solvedUsers");
            }

            // console.log("POTD challenge recorded successfully");
            return { 
                success: true,
                message: 'POTD challenge recorded successfully',
                points: user.points,
                streak: user.streak
            };
        } else {
            // console.log("Challenge already solved");
            return { success: true, message: 'Challenge already solved' };
        }
    } catch (error) {
        // console.error('POTD challenge update error:', error);
        return {
            success: false,
            message: 'Server error',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        };
    }
};