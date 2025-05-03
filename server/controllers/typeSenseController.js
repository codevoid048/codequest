import { client } from "../utils/typesenseClient.js";

export const test = async () => {
    try {
        const res = await client.health.retrieve();
        console.log("Typesense is alive 🚀:", res);
    } catch (err) {
        console.error("Connection failed ❌:", err);
    }
};

export const search = async (req, res) => {
    const { q } = req.query;

    if (!q) return res.status(400).json({ error: "Missing search query" });

    try {
        // Search users
        const userResults = await client.collections("users").documents().search({
            q,
            query_by: "name,username,profilePicture,collegeName,branch,points,rank", // adjust as per your schema
            per_page: 5,
        });

        // Search challenges
        const challengeResults = await client
            .collections("challenges")
            .documents()
            .search({
                q,
                query_by: "title,description,category,difficulty,problemLink", // adjust as per your schema
                per_page: 5,
            });

        // Add type labels
        const users = userResults.hits.map(hit => ({
            ...hit.document,
            type: "user",
        }));

        const challenges = challengeResults.hits.map(hit => ({
            ...hit.document,
            type: "challenge",
        }));

        // Merge & send
        res.json([...users, ...challenges]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Search failed" });
    }
};

export const searchUser = async (req, res) => {
    const { q } = req.query;

    if (!q) return res.status(400).json({ error: "Missing search query" });

    try {
        // Search users
        const userResults = await client.collections("users").documents().search({
            q,
            query_by: "name,username,profilePicture,collegeName,branch,points,rank",
        });

        // Add type labels
        const users = userResults.hits.map(hit => ({
            ...hit.document,
            type: "user",
        }));
        // Merge & send
        res.json([...users]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Search failed" });
    }
};
