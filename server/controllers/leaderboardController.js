
import { getLeaderBoard, } from "../utils/leaderBoardCache.js";
import { User } from "../models/User.js";

export const setDummyData = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8;
        const skip = (page - 1) * limit;

        // Find total number of users
        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);

        // Fetch users sorted by points in descending order
        const users = await User.find({})
            .sort({ points: -1 })
            .select('name points rank streak solveChallenges')
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            users,
            totalUsers,
            totalPages
        });
    } catch (error) {
        console.error('Leaderboard fetch error:', error);
        res.status(500).json({ message: 'Server error fetching leaderboard' });
    }
}

// Optional: Add a route to update user points dynamically
export const updateUserPoints = async (req, res) => {
    try {
        const { userId, pointsToAdd } = req.body;
        
        // Update user points
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { $inc: { points: pointsToAdd } }, 
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Points update error:', error);
        res.status(500).json({ message: 'Server error updating points' });
    }
}

export const getLeaderboardData = async (req, res) => {
try {
    const users = await User.find({ isVerified: true })
    .sort({ points: -1 })
    .select("name points solveChallenges streak");

    res.json(users);
} catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Internal server error" });
}
};
// export const getLeaderboardData = async (req, res) => {
//     try {
//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 10;

//         const leaderboard = await getLeaderBoard(page, limit);
        
//         // If user is authenticated, find their rank
//         if (req.user) {
//             const userData = await User.findById(req.user._id)
//                                         .select('rank points');

//             return res.status(200).json({
//                 ...leaderboard,
//                 userRank: userData.rank,
//                 userPoints: userData.points
//             })
//         }

//         res.status(200).json(leaderboard);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// }