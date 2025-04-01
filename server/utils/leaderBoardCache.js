import { User } from "../models/User.js"
import NodeCache from "node-cache"
const leaderBoardCache = new NodeCache({ stdTTL: 600 });

export const updateRanks = async () => {
    try {
        console.log('Updating leaderboard ranks..t');

        // Fetch users sorted by points
        const users = await User.find({ isVerified: true })
            .select('_id points rank streak solveChallenges username')
            .sort({ points: -1 })
            .lean();

         
        // Prepare bulk update operations
        const bulkOps = users.map((user, index) => ({
            updateOne: {
                filter: { _id: user._id },
                update: { $set: { rank: index + 1 } } // ✅ Ensure $set is used
            }
        
        }));
        // console.log("Bulk operations prepared:", users); // ✅ Debug log

        // Execute bulk update
        if (bulkOps.length > 0) {
            const result = await User.bulkWrite(bulkOps);
            // ✅ Check if MongoDB updates
        }

        // Update cache
        leaderBoardCache.set('leaderboard', users.map((user, index) => ({
            ...user,
            rank: index + 1
        })));

    } catch (error) {
        console.error('Error updating ranks:', error);
    }
};

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

//streak
export const updateUserStreak = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return { success: false, message: "User not found" };
        }

        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        // Convert `potdSolved` dates to string format for easy comparison
        const solvedDates = user.potdSolved.map(date => new Date(date).toISOString().split('T')[0]);

        if (solvedDates.includes(today)) {
            return { success: false, message: "Already solved today's POTD" };
        }

        // Check if yesterday's problem was solved
        if (solvedDates.includes(yesterdayStr)) {
            user.streak += 1; // Continue streak
        } else {
            user.streak = 1; // Reset streak (new streak start)
        }

        // Store today's solved date
        user.potdSolved.push(new Date());

        await user.save();

        // Update leaderboard
        await updateRanks();

        return { success: true, streak: user.streak, message: "Streak updated successfully" };

    } catch (error) {
        console.error("Error updating streak:", error);
        return { success: false, message: "An error occurred" };
    }
};
