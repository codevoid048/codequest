import mongoose from "mongoose";
const challengeSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    category: [{ type: String, required: true }], // Change: Now an array of strings
    difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] },
    points: { type: Number, required: true },
    problemLink: { type: String, required: true },
    platform: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    solvedUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }]
});

challengeSchema.index(
  {
    title: "text",
    description: "text",
    category: "text",
    platform: "text",
    difficulty: "text",
  },
  {
    weights: {
      title: 5,
      category: 4,
      platform: 3,
      difficulty: 2,
      description: 1,
    },
    name: "ChallengeTextIndex",
  }
);

export const Challenge = mongoose.model('Challenge', challengeSchema);