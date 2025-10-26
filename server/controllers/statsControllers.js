import { User } from "../models/User.js";
import { Challenge } from "../models/Challenge.js";
import auditService from "../services/auditService.js";

const formatCount = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M+";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k+";
    if (num >= 100) return Math.floor(num / 100) * 100 + "+"; // 128 → 100+, 875 → 800+
    return num.toString(); // keep exact if < 100
};

export const getCounts = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const challengesCount = await Challenge.countDocuments();
    const collegesCount = await User.distinct("college").then(colleges => colleges.length);
    const affiliatesCount = await User.countDocuments({ isAffiliate: true });
    const solvedChallenges = await Challenge.countDocuments({
      solvedUsers: { $exists: true, $not: { $size: 0 } }
    });

    // 🔹 Count challenges by difficulty (Easy, Medium, Hard)
    const difficulties = await Challenge.aggregate([
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $eq: [{ $toLower: "$difficulty" }, "easy"] }, then: "Easy" },
                { case: { $eq: [{ $toLower: "$difficulty" }, "medium"] }, then: "Medium" },
                { case: { $eq: [{ $toLower: "$difficulty" }, "hard"] }, then: "Hard" }
              ],
              default: "Unknown"
            }
          },
          count: { $sum: 1 }
        }
      }
    ]);

    // 🔹 Format difficulty data into a consistent structure
    const difficultyMap = { Easy: 0, Medium: 0, Hard: 0 };
    difficulties.forEach(d => {
      if (difficultyMap[d._id] !== undefined) {
        difficultyMap[d._id] = d.count;
      }
    });

    const difficultyData = [
      { name: "Easy", value: difficultyMap.Easy, color: "#10b981" },
      { name: "Medium", value: difficultyMap.Medium, color: "#f59e0b" },
      { name: "Hard", value: difficultyMap.Hard, color: "#ef4444" }
    ];

    // 🔹 Send all counts + difficulty data
    res.status(200).json({
      usersCount: formatCount(usersCount),
      challengesCount: formatCount(challengesCount),
      collegesCount: formatCount(collegesCount),
      affiliatesCount: formatCount(affiliatesCount),
      solvedChallenges: formatCount(solvedChallenges),
      difficultyDistribution: difficultyData
    });
  } catch (error) {
    auditService.error("Get stats counts failed", error, {
      requestId: req.auditContext?.requestId
    });
    res.status(500).json({ message: "Internal server error" });
  }
};
