import { User } from "../models/User.js";
import { calculatePoints } from "../utils/pointsCalculator.js"; // Adjust the path
import { updateRanks, getCachedLeaderboard } from "../utils/leaderBoardCache.js";

export const setDummyData = async (req, res) => {
    try {
        const dummyUsers = req.body;
        const insertedUsers = await User.insertMany(dummyUsers);

        res.status(201).json({
            message: "Dummy users inserted successfully",
            data: insertedUsers,
        });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

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
        // console.error("Error updating user points:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getLeaderboardData = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    let leaderboard = getCachedLeaderboard();
    if (!leaderboard) {
      leaderboard = await updateRanks();
    }

    // Filter based on search query, if any
    let filteredLeaderboard = leaderboard;
    if (search.trim() !== "") {
      const searchLower = search.toLowerCase();
      filteredLeaderboard = leaderboard.filter(user =>
        user.username.toLowerCase().includes(searchLower)
      );
    }

    // Pagination logic
    const totalUsers = filteredLeaderboard.length;
    const totalPages = Math.ceil(totalUsers / limit);
    const currentPage = Math.min(Math.max(parseInt(page), 1), totalPages);

    const startIndex = (currentPage - 1) * limit;
    const pagedUsers = filteredLeaderboard.slice(startIndex, startIndex + parseInt(limit));

    res.json({
      users: pagedUsers,
      totalUsers,
      currentPage,
      totalPages,
    });
  } catch (error) {
    // console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


