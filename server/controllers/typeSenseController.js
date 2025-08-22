// import { client } from "../utils/typesenseClient.js";
import { User } from "../models/User.js";
import { Challenge } from "../models/Challenge.js";

// export const test = async () => {
//     try {
//         const res = await client.health.retrieve();
//         console.log("Typesense is alive:", res);
//     } catch (err) {
//         console.error("Connection failed:", err);
//     }
// };

// export const search = async (req, res) => {
//     const { q } = req.query;

//     if (!q) return res.status(400).json({ error: "Missing search query" });

//     try {
//         // Search users
//         const userResults = await client.collections("users").documents().search({
//             q,
//             query_by: "name,username,profilePicture,collegeName,branch,points,rank", // adjust as per your schema
//             per_page: 5,
//         });

//         // Search challenges
//         const challengeResults = await client
//             .collections("challenges")
//             .documents()
//             .search({
//                 q,
//                 query_by: "title,description,category,difficulty,problemLink", // adjust as per your schema
//                 per_page: 5,
//             });

//         // Add type labels
//         const users = userResults.hits.map(hit => ({
//             ...hit.document,
//             type: "user",
//         }));

//         const challenges = challengeResults.hits.map(hit => ({
//             ...hit.document,
//             type: "challenge",
//         }));

//         // Merge & send
//         res.json([...users, ...challenges]);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Search failed" });
//     }
// };

// export const searchUser = async (req, res) => {
//     const { q } = req.query;

//     if (!q) return res.status(400).json({ error: "Missing search query" });

//     try {
//         // Search users
//         const userResults = await client.collections("users").documents().search({
//             q,
//             query_by: "name,username,profilePicture,collegeName,branch,points,rank",
//         });

//         // Add type labels
//         const users = userResults.hits.map(hit => ({
//             ...hit.document,
//             type: "user",
//         }));
//         res.json([...users]);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Search failed" });
//     }
// };

export const search = async (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ error: "Missing search query" });
    }

    try {
        const usersList = await User.find({
            $or: [
                { name: { $regex: q, $options: "i" } },
                { username: { $regex: q, $options: "i" } },
                { collegeName: { $regex: q, $options: "i" } },
                { branch: { $regex: q, $options: "i" } },
            ]
        }).limit(5).lean();

        const challengesList = await Challenge.find(
            {
                $or: [
                    { title: new RegExp(q, "i") },
                    { description: new RegExp(q, "i") },
                    { category: { $in: [new RegExp(q, "i")] } },
                    { difficulty: new RegExp(q, "i") },
                    { platform: new RegExp(q, "i") },
                ],
            }
        ).limit(5).lean();

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
        // console.error("Search error:", err);
        res.status(500).json({ error: "Search failed" });
    }
};

export const searchUser = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    const users = await User.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { username: { $regex: q, $options: "i" } },
        { collegeName: { $regex: q, $options: "i" } },
        { branch: { $regex: q, $options: "i" } }
      ]
    })
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
    // console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
};