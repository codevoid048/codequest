import { User } from "../models/User.js"
import auditService from "../services/auditService.js"
import cacheService from "../services/cacheService.js"

const CACHE_NAMESPACE = 'leaderboard';
const LEADERBOARD_TTL = 300; // 5 minutes

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

        // Store in Redis cache
        await cacheService.set(CACHE_NAMESPACE, 'full_leaderboard', formattedLeaderboard, LEADERBOARD_TTL);

        auditService.cacheEvent('leaderboard_cache_updated', {
          userCount: formattedLeaderboard.length,
          cacheStats: cacheService.getStats()
        });

        return formattedLeaderboard;
    } catch (error) {
        console.error('Leaderboard update failed:', error.message);
        throw error;
    }
};

export const getCachedLeaderboard = async () => {
    return await cacheService.get(CACHE_NAMESPACE, 'full_leaderboard');
};

// Get cached leaderboard with pagination
export const getLeaderBoard = async (page = 1, limit = 10) => {
    // Try to get from cache first
    const cacheKey = `paginated_${page}_${limit}`;
    let paginatedResult = await cacheService.get(CACHE_NAMESPACE, cacheKey);
    
    if (paginatedResult) {
        return paginatedResult;
    }

    // Get full leaderboard from cache
    let cacheLeaderBoard = await getCachedLeaderboard();
    
    // If no cached data, update ranks
    if (!cacheLeaderBoard) {
        cacheLeaderBoard = await updateRanks();
    }

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const result = {
        users: cacheLeaderBoard.slice(startIndex, endIndex),
        totalUsers: cacheLeaderBoard.length,
        currentPage: page,
        totalPages: Math.ceil(cacheLeaderBoard.length / limit)
    };

    // Cache paginated result for shorter time
    await cacheService.set(CACHE_NAMESPACE, cacheKey, result, 120); // 2 minutes
    
    return result;
}

// Add a mutex to prevent concurrent leaderboard updates
let isUpdatingLeaderboard = false;
let updateQueue = [];

export const warmupLeaderboardCache = async (maxRetries = 3) => {
    // If already updating, wait for current update to complete
    if (isUpdatingLeaderboard) {
        auditService.cacheEvent('leaderboard_warmup_queued', {
          queuedRequests: updateQueue.length
        });
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
                auditService.cacheEvent('leaderboard_warmup_attempt', {
                  attempt: attempts,
                  maxRetries
                });
                
                const result = await updateRanks();
                
                auditService.cacheEvent('leaderboard_warmup_successful', {
                  attempts,
                  userCount: result.length,
                  queuedRequests: updateQueue.length
                });
                
                // Resolve all queued requests
                updateQueue.forEach(({ resolve }) => resolve(result));
                updateQueue = [];
                
                return result;
            } catch (error) {
                console.warn(`Leaderboard warmup attempt ${attempts}/${maxRetries} failed:`, error.message);
                
                if (attempts >= maxRetries) {
                    throw error; // Final attempt failed
                }
                await new Promise(resolve => setTimeout(resolve, 2000 * attempts));
            }
        }
    } catch (error) {
        auditService.error('Leaderboard warmup failed completely', error, {
          attempts,
          queuedRequests: updateQueue.length
        });
        
        // Reject all queued requests
        updateQueue.forEach(({ reject }) => reject(error));
        updateQueue = [];
        
        audit.error(error);
        throw error;
    } finally {
        isUpdatingLeaderboard = false;
    }
};