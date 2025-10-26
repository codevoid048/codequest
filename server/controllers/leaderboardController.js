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

    let leaderboard = await getCachedLeaderboard();
    if (!leaderboard) {
      leaderboard = await updateRanks();
    }

    // Ensure leaderboard is an array
    if (!Array.isArray(leaderboard)) {
      console.error("Leaderboard is not an array:", typeof leaderboard, leaderboard);
      leaderboard = [];
    }

    // Handle case where leaderboard is empty
    if (leaderboard.length === 0) {
      return res.json({
        users: [],
        totalUsers: 0,
        currentPage: 1,
        totalPages: 1,
      });
    }

    // Filter based on search query, if any
    let filteredLeaderboard = leaderboard;
    if (search.trim() !== "") {
      const searchLower = search.toLowerCase();
      filteredLeaderboard = leaderboard.filter(user =>
        user.username && user.username.toLowerCase().includes(searchLower)
      );
    }

    // Ensure filtered result is also an array
    if (!Array.isArray(filteredLeaderboard)) {
      console.error("Filtered leaderboard is not an array:", typeof filteredLeaderboard);
      filteredLeaderboard = [];
    }

    // Pagination logic with proper defaults
    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit) || 10, 1), 100); // Max 100 per page
    
    const totalUsers = filteredLeaderboard.length;
    const totalPages = Math.max(Math.ceil(totalUsers / limitNum), 1);
    const currentPage = Math.min(pageNum, totalPages);

    const startIndex = (currentPage - 1) * limitNum;
    const pagedUsers = filteredLeaderboard.slice(startIndex, startIndex + limitNum);

    res.json({
      users: pagedUsers,
      totalUsers,
      currentPage,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


