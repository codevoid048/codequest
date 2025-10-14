import { User } from "../models/User.js";
import { Challenge } from "../models/Challenge.js";

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

        res.status(200).json({
            usersCount: formatCount(usersCount),
            challengesCount: formatCount(challengesCount),
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
