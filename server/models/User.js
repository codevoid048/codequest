import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String }, // For email/password signups
    profilePicture: { type: String },

    // OAuth fields
    googleId: { type: String },
    githubId: { type: String },

    // External Account Links (for verification)
    gfg: { type: String },
    leetCode: { type: String },
    codeforces: { type: String },
    hackerrank: { type: String },
    linkedin: { type: String },

    // Verification flag
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date },

    // Progress/Stats
    points: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },

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

// // Hash password before saving if modified
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// Compare entered password with stored password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
