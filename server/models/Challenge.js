import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] },
    points: { type: Number, required: true },
    problemLink: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

export const Challenge = mongoose.model('Challenge', challengeSchema);