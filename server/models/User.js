import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String }, // For email/password signups
    profilePicture: { type: String },
    RegistrationNumber: { type: String},
    branch: { type: String },
    mobile: { type: String },
    collegeName: { type: String },
    isAffiliate: { type: Boolean, default: false },
    // OAuth fields
    googleId: { type: String },
    githubId: { type: String },

    // External Account Links (for verification)
    gfg: { type: String },
    leetCode: { type: String },
    codeforces: { type: String },
    linkedin: { type: String },

    // Verification flag
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date },

    // Progress/Stats
    points: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
<<<<<<< HEAD
    streak: { type: Number, default: 0 },
=======
    streak: {type: Number, default: 0},
>>>>>>> 62828ba4ee57a926d171bbdb4b727307abeac6e9

    // All challenges solved (non-POTD)
    solveChallenges: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge",
    },
    ],

    // POTD solved: store dates (unique per day)
    potdSolved: [
    {
        type: Date, // or String if you prefer ISO strings
    },
    ],

    otherLinks: [String],
  },
  { timestamps: true }
);

// Compare entered password with stored password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);