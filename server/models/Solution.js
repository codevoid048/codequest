import mongoose from "mongoose";
import { Challenge } from "./Challenge.js";

const solutionSchema = new mongoose.Schema({
    explanation: { type: String},
    cpp: { type: String },
    python: { type: String },
    java: { type: String },
    timeComplexity: { type: String },
    spaceComplexity: { type: String },
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge",
        required: true,
    },
})

export const Solution = mongoose.model("Solution", solutionSchema);