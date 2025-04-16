import mongoose from "mongoose";
const challengeSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: [{ type: String, required: true }], // Change: Now an array of strings
    difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] },
    points: { type: Number, required: true },
    problemLink: { type: String, required: true },
    platform: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) },
    solvedUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            unique: true
        }]
});


export const Challenge = mongoose.model('Challenge', challengeSchema);