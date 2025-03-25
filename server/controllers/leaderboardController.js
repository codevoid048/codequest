import { getLeaderBoard, } from "../utils/leaderBoardCache.js";
import { User } from "../models/User.js";

export const setDummyData = async (req, res) => {
    try {
        const dummyUsers = req.body;
        const insertedUsers = await User.insertMany(dummyUsers);

        res.status(201).json({
        message: "Dummy users inserted successfully",
        data: insertedUsers,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
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