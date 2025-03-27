import { User } from "../models/User.js"
import NodeCache from "node-cache"

const leaderBoardCache = new NodeCache({ stdTTL: 600 });

export const updateRanks = async () => {
    try {
        console.log('Updating leaderboard ranks.....');
        const users = await User.find()
                                .select('_id points streak solveChallenges name')
                                .sort({ points: -1 })
                                .lean();
        
        const bulkOps = users.map((user, index) => ({
            updateOne: {
                filter: { _id: user._id },
                update: { rank: index + 1 }
            }
        }));

        await User.bulkWrite(bulkOps);

        leaderBoardCache.set('leaderboard', users.map((user, index) => ({
            ...user,
            rank: index + 1
        })));

        console.log('Ranks updated successfully');
    } catch (error) {
        console.error('Error updating ranks : ', error);
    }
}

// Get cached leaderboard with pagination
export const getLeaderBoard = async (page = 1, limit = 10) => {
    const cacheLeaderBoard = leaderBoardCache.get('leaderboard');

    if(cacheLeaderBoard) {
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