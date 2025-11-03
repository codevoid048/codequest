import { User } from "../models/User.js";
import { Challenge } from "../models/Challenge.js";

export const search = async (req, res) => {
    const { q } = req.query;
    if (!q || q.trim() === "") {
        return res.status(400).json({ error: "Missing search query" });
    }

    try {
        const searchTerm = q.trim();
        
        const [usersList, challengesList] = await Promise.all([
            User.find({
                $or: [
                    { name: { $regex: searchTerm, $options: "i" } },
                    { username: { $regex: searchTerm, $options: "i" } },
                    { collegeName: { $regex: searchTerm, $options: "i" } },
                    { branch: { $regex: searchTerm, $options: "i" } }
                ]
            })
            .select("name username profilePicture collegeName branch points rank")
            .limit(5)
            .lean(),

            Challenge.find({
                $or: [
                    { title: { $regex: searchTerm, $options: "i" } },
                    { description: { $regex: searchTerm, $options: "i" } },
                    { category: { $regex: searchTerm, $options: "i" } },
                    { difficulty: { $regex: searchTerm, $options: "i" } },
                    { platform: { $regex: searchTerm, $options: "i" } }
                ]
            })
            .select("title description category difficulty platform")
            .limit(5)
            .lean()
        ]);

        const users = usersList.map((u) => ({
            id: u._id?.toString(),
            name: u.name,
            username: u.username,
            profilePicture: u.profilePicture,
            collegeName: u.collegeName,
            branch: u.branch,
            points: u.points,
            rank: u.rank,
            type: "user",
        }));

        const challenges = challengesList.map((c) => ({
            id: c._id?.toString(),
            title: c.title,
            description: c.description,
            category: c.category,
            difficulty: c.difficulty,
            platform: c.platform,
            type: "challenge",
        }));

        res.json([...users, ...challenges]);
    } catch (err) {
        console.error("Search error:", err.message);
        res.status(500).json({ error: "Search failed" });
    }
};

export const searchUser = async (req, res) => {
    const { q } = req.query;

    if (!q || q.trim() === "") {
        return res.status(400).json({ error: "Missing search query" });
    }

    try {
        const searchTerm = q.trim();
        
        const users = await User.find({
            $or: [
                { name: { $regex: searchTerm, $options: "i" } },
                { username: { $regex: searchTerm, $options: "i" } },
                { collegeName: { $regex: searchTerm, $options: "i" } },
                { branch: { $regex: searchTerm, $options: "i" } }
            ]
        })
        .select("name username profilePicture collegeName branch points rank")
        .limit(10)
        .lean();

        const formattedUsers = users.map(user => ({
            id: user._id?.toString(),
            name: user.name,
            username: user.username,
            profilePicture: user.profilePicture,
            collegeName: user.collegeName,
            branch: user.branch,
            points: user.points,
            rank: user.rank,
            type: "user"
        }));

        res.json(formattedUsers);
    } catch (err) {
        console.error("Search user error:", err.message);
        res.status(500).json({ error: "Search failed" });
    }
};