import { User } from "../models/User.js"
import NodeCache from "node-cache"
const leaderBoardCache = new NodeCache({ stdTTL: 300 }); // 5 minutes

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
        const users = await User.find({ isVerified: true })
            .select('_id points rank streak solveChallenges username')
            .lean();

        const getLatestTimestamp = (user) => {
            const difficulties = ['easy', 'medium', 'hard'];
            let latest = null;
            
            difficulties.forEach(difficulty => {
                const lastChallenge = user.solveChallenges?.[difficulty]?.at(-1);
                if (lastChallenge?.timestamp) {
                    const timestamp = new Date(lastChallenge.timestamp);
                    if (!latest || timestamp > latest) {
                        latest = timestamp;
                    }
                }
            });

            return latest || new Date('9999-12-31');
        };

        const sortedUsers = users.map((user) => ({...user, lastSolvedAt: getLatestTimestamp(user)})).sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points; // Sort by points first
            return a.lastSolvedAt - b.lastSolvedAt; // Sort by last solved date if points are equal
        });

        const bulkOps = sortedUsers.map((user, index) => ({
            updateOne: {
                filter: { _id: user._id },
                update: { $set: { rank: index + 1 } },
            },
        }));

        if (bulkOps.length > 0) {
            await User.bulkWrite(bulkOps);
        }

        const formattedLeaderboard = sortedUsers.map((user, index) => formatLeaderboardUser({ ...user, rank: index + 1 }));

        leaderBoardCache.set('leaderboard', formattedLeaderboard);
        return formattedLeaderboard;
    } catch (error) {
        // console.error('Error updating ranks:', error);
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

export const warmupLeaderboardCache = async (maxRetries = 3) => {
    let attempts = 0;
    
    while (attempts < maxRetries) {
        try {
            attempts++;
            // console.log(`Leaderboard update attempt ${attempts}/${maxRetries}`);
            await updateRanks();
            // console.log('Leaderboard updated successfully');
            return;
        } catch (error) {
            // console.error(`Attempt ${attempts} failed:`, error);
            if (attempts >= maxRetries) {
                throw error; // Final attempt failed
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
};