import mongoose from "mongoose";

const resumeTokenSchema = new mongoose.Schema({
  collectionName: { type: String, required: true, unique: true },
  token: { type: Object, required: true },
});

export const ResumeToken = mongoose.model("ResumeToken", resumeTokenSchema);
