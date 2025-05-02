
import { getLeaderBoard, } from "../utils/leaderBoardCache.js";
import { User } from "../models/User.js";
import { calculatePoints } from "../utils/pointsCalculator.js"; // Adjust the path
import { updateRanks } from "../utils/leaderBoardCache.js";

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

// export const updateUserPoints = async (req, res) => {
//     try {
//         const { userId, problemId, difficulty } = req.body;

//         // Find the user by ID
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         // Calculate points based on difficulty
//         const pointsEarned = calculatePoints(difficulty);

//         // Update user points and solved challenges
//         user.points += pointsEarned;
//         user.solveChallenges.push({ problemId, difficulty, pointsEarned });

//         // Save the updated user data
//         await user.save();

//         res.json({ message: "User points updated successfully", user });
//     } catch (error) {
//         console.error("Error updating user points:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };



export const updateUserPoints = async (req, res) => {
    try {
        const { userId, problemId, difficulty } = req.body;

        // Validate input
        if (!userId || !problemId || !difficulty) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the problem is already solved
        const alreadySolved = user.solveChallenges.some(challenge => challenge.problemId === problemId);
        if (alreadySolved) {
            return res.status(400).json({ error: "Problem already solved" });
        }

        // Calculate points based on difficulty
        const pointsEarned = calculatePoints(difficulty);

        // Update user points and solved challenges
        user.points += pointsEarned;
        user.solveChallenges.push({ problemId, difficulty, pointsEarned, solvedAt: new Date() });

        // Save the updated user data
        await user.save();

        res.json({ message: "User points updated successfully", user });
    } catch (error) {
        console.error("Error updating user points:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


// export const getLeaderboardData = async (req, res) => {
//     try {
//         const dummyUsers = req.body;
//         const insertedUsers = await User.insertMany(dummyUsers);

//         res.status(201).json({
//         message: "Dummy users inserted successfully",
//         data: insertedUsers,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// }

export const getLeaderboardData = async (req, res) => {
    try {
        const users = await User.find({ isVerified: true })
            .sort({ points: -1 })
            .select("username points solveChallenges streak rank");

        await updateRanks(); // Update ranks before sending data

        const leaderboard = users.map(user => {
            const easy = user.solveChallenges?.easy?.length || 0;
            const medium = user.solveChallenges?.medium?.length || 0;
            const hard = user.solveChallenges?.hard?.length || 0;

            return {
                username: user.username,
                points: user.points,
                streak: user.streak,
                solveChallenges: {
                    easy,
                    medium,
                    hard,
                    total: easy + medium + hard
                },
                rank: user.rank
            };
        });

        console.log("Leaderboard data:", leaderboard);

        res.json(leaderboard);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


