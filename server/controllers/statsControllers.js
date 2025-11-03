import { User } from "../models/User.js";
import { Challenge } from "../models/Challenge.js";
import auditService from "../services/auditService.js";
import cacheService from "../services/cacheService.js";

const CACHE_NAMESPACE = 'stats';
const STATS_TTL = 600;

const formatCount = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M+";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k+";
    if (num >= 100) return Math.floor(num / 100) * 100 + "+";
    return num.toString();
};

export const getCounts = async (req, res) => {
  try {
    const cachedStats = await cacheService.get(CACHE_NAMESPACE, 'global_stats');
    if (cachedStats) {
      return res.status(200).json(cachedStats);
    }

    const usersCount = await User.countDocuments();
    const challengesCount = await Challenge.countDocuments();
    const collegesCount = await User.distinct("college").then(colleges => colleges.length);
    const affiliatesCount = await User.countDocuments({ isAffiliate: true });
    const solvedChallenges = await Challenge.countDocuments({
      solvedUsers: { $exists: true, $not: { $size: 0 } }
    });

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

    const statsData = {
      usersCount: formatCount(usersCount),
      challengesCount: formatCount(challengesCount),
      collegesCount: formatCount(collegesCount),
      affiliatesCount: formatCount(affiliatesCount),
      solvedChallenges: formatCount(solvedChallenges),
      difficultyDistribution: difficultyData
    };

    await cacheService.set(CACHE_NAMESPACE, 'global_stats', statsData, STATS_TTL);

    res.status(200).json(statsData);
  } catch (error) {
    auditService.error("Get stats counts failed", error, {
      requestId: req.auditContext?.requestId
    });
    res.status(500).json({ message: "Internal server error" });
  }
};
