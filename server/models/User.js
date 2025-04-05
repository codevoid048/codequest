import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String },
    profilePicture: { type: String },
    RegistrationNumber: { type: String },
    branch: { type: String },
    mobile: { type: String },
    collegeName: { type: String },
    isAffiliate: { type: Boolean, default: false },
    // OAuth fields
    googleId: { type: String },
    githubId: { type: String },

    // External Account Links (for verification)
    gfg: {
      username: { type: String, default: "",unique:true},
      solved: { type: Number, default: 0 },
      rank: { type: Number, default: 0 },
      rating: { type: Number, default: 0 }
    },
    leetCode: {
      username: { type: String, default: "",unique:true },
      solved: { type: Number, default: 0 },
      rank: { type: Number, default: 0 },
      rating: { type: Number, default: 0 }
    },
    codechef: {
      username: { type: String, default: "",unique:true },
      stars: { type: String, default: "" },
      rank: { type: Number, default: 0 },
      rating: { type: Number, default: 0 }
    },
    codeforces: {
      username: { type: String, default: "",unique:true },
      solved: { type: Number, default: 0 },
      rank: { type: String, default: "" },
      rating: { type: Number, default: 0 }
    },


    //reset password tokens
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },

    // Verification flag
    isVerified: { type: Boolean, default: false },
    otp: { type: Number },
    otpExpires: { type: Date },

    // Progress/Stats
    points: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },


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
        timestamp: { type: String }, // ISO date string format
      },
    ],

    otherLinks: [
      {
        platform: String,  // The name of the social platform, e.g., 'twitter', 'linkedin', 'github'
        url: String        // The URL of the user's profile on that platform
      }
    ],
  },
  { timestamps: true }
);

// Compare entered password with stored password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


export const User = mongoose.model("User", userSchema);
