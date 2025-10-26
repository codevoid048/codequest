import { User } from "../models/User.js"
import NodeCache from "node-cache"

// Cache with memory limits to prevent unbounded growth
const leaderBoardCache = new NodeCache({ 
  stdTTL: 300, // 5 minutes
  checkperiod: 60, // Check for expired keys every minute
  maxKeys: 100, // Limit number of cached items
  useClones: false // Prevent memory duplication
});

// Monitor cache memory usage
leaderBoardCache.on('set', (key, value) => {
  const stats = leaderBoardCache.getStats();
  if (stats.keys > 50) {
    console.log(`Cache stats - Keys: ${stats.keys}, Hits: ${stats.hits}, Misses: ${stats.misses}`);
  }
});

const formatLeaderboardUser = (user) => {
    const easy = user.solveChallenges?.easy?.length || 0;
    const medium = user.solveChallenges?.medium?.length || 0;
    const hard = user.solveChallenges?.hard?.length || 0;

    return {
        ...user,
        solveChallenges: {
            easy,
            medium,
            hard,
            total: easy + medium + hard
        }
    };
};

export const updateRanks = async () => {
    try {
        // Use MongoDB aggregation pipeline instead of JavaScript processing
        const leaderboardData = await User.aggregate([
            // Match only verified users
            { $match: { isVerified: true } },
            
            // Add computed fields for challenge counts and latest timestamp
            { 
                $addFields: {
                    easyCount: { $size: { $ifNull: ["$solveChallenges.easy", []] } },
                    mediumCount: { $size: { $ifNull: ["$solveChallenges.medium", []] } },
                    hardCount: { $size: { $ifNull: ["$solveChallenges.hard", []] } },
                    
                    // Find latest timestamp across all difficulties
                    latestTimestamp: {
                        $max: {
                            $concatArrays: [
                                { $ifNull: [{ $map: { input: "$solveChallenges.easy", as: "item", in: "$$item.timestamp" } }, []] },
                                { $ifNull: [{ $map: { input: "$solveChallenges.medium", as: "item", in: "$$item.timestamp" } }, []] },
                                { $ifNull: [{ $map: { input: "$solveChallenges.hard", as: "item", in: "$$item.timestamp" } }, []] }
                            ]
                        }
                    }
                }
            },
            
            // Convert timestamp to date for sorting
            {
                $addFields: {
                    totalSolved: { $add: ["$easyCount", "$mediumCount", "$hardCount"] },
                    lastSolvedDate: {
                        $cond: {
                            if: { $eq: ["$latestTimestamp", null] },
                            then: new Date('9999-12-31'),
                            else: { $dateFromString: { dateString: "$latestTimestamp" } }
                        }
                    }
                }
            },
            
            // Sort by points (desc), then by last solved date (asc for tiebreaker)
            { 
                $sort: { 
                    points: -1, 
                    lastSolvedDate: 1 
                } 
            },
            
            // Project only needed fields
            {
                $project: {
                    _id: 1,
                    username: 1,
                    points: 1,
                    streak: 1,
                    solveChallenges: {
                        easy: "$easyCount",
                        medium: "$mediumCount", 
                        hard: "$hardCount",
                        total: "$totalSolved"
                    }
                }
            }
        ]);

        // Bulk update ranks in single operation
        const bulkOps = leaderboardData.map((user, index) => ({
            updateOne: {
                filter: { _id: user._id },
                update: { $set: { rank: index + 1 } }
            }
        }));

        if (bulkOps.length > 0) {
            await User.bulkWrite(bulkOps, { ordered: false });
        }

        // Add rank to each user and format for caching
        const formattedLeaderboard = leaderboardData.map((user, index) => ({
            ...user,
            rank: index + 1
        }));

        leaderBoardCache.set('leaderboard', formattedLeaderboard);
        return formattedLeaderboard;
    } catch (error) {
        console.error('Error updating ranks:', error);
        throw error;
    }
};

export const getCachedLeaderboard = () => {
    return leaderBoardCache.get('leaderboard');
};


// Get cached leaderboard with pagination
export const getLeaderBoard = async (page = 1, limit = 10) => {
    const cacheLeaderBoard = leaderBoardCache.get('leaderboard');

    if (cacheLeaderBoard) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        return {
            users: cacheLeaderBoard.slice(startIndex, endIndex),
            totalUsers: cacheLeaderBoard.length,
            currentPage: page,
            totalPages: Math.ceil(cacheLeaderBoard.length / limit)
        };
    }

    await updateRanks();
    return getLeaderBoard(page, limit);
}

// Add a mutex to prevent concurrent leaderboard updates
let isUpdatingLeaderboard = false;
let updateQueue = [];

export const warmupLeaderboardCache = async (maxRetries = 3) => {
    // If already updating, wait for current update to complete
    if (isUpdatingLeaderboard) {
        return new Promise((resolve, reject) => {
            updateQueue.push({ resolve, reject });
        });
    }

    isUpdatingLeaderboard = true;
    let attempts = 0;
    
    try {
        while (attempts < maxRetries) {
            try {
                attempts++;
                console.log(`Leaderboard update attempt ${attempts}/${maxRetries}`);
                const result = await updateRanks();
                console.log('Leaderboard cache warmed up successfully');
                
                // Resolve all queued requests
                updateQueue.forEach(({ resolve }) => resolve(result));
                updateQueue = [];
                
                return result;
            } catch (error) {
                console.error(`Attempt ${attempts} failed:`, error);
                if (attempts >= maxRetries) {
                    throw error; // Final attempt failed
                }
                await new Promise(resolve => setTimeout(resolve, 2000 * attempts));
            }
        }
    } catch (error) {
        // Reject all queued requests
        updateQueue.forEach(({ reject }) => reject(error));
        updateQueue = [];
        throw error;
    } finally {
        isUpdatingLeaderboard = false;
    }
};