// syncChallenges.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Challenge } from "../models/Challenge.js";
import { client } from "../utils/typesenseClient.js";

dotenv.config();

const syncAllChallenges = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    const challenges = await Challenge.find();

    const formatted = challenges.map((challenge) => ({
      id: challenge._id.toString(),
      title: challenge.title || "",
      description: challenge.description || "",
      category: Array.isArray(challenge.category) ? challenge.category : [],
      difficulty: challenge.difficulty || "Easy",
      problemLink: challenge.problemLink || "",
    }));

    const result = await client.collections("challenges").documents().import(formatted, {
      action: "upsert",
    });

    console.log("✅ Synced all challenges:", result);

    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Error syncing challenges:", err);
  }
};

syncAllChallenges();
