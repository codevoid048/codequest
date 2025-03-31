import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: false, unique: true, trim: true, lowercase: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String },
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
    gfg: { username: { type: String }, solved: { type: Number },rank:{type:Number},rating:{type:Number,default:0} },
    leetCode: { username: { type: String }, solved: { type: Number },rank:{type:Number} ,rating:{type:Number,default:0} },
    codeforces: { username: { type: String }, solved: { type: Number },rank:{type:Number} ,rating:{type:Number,default:0}},
    codechef: { username: { type: String }, solved: { type: Number },rank:{type:Number},rating:{type:Number,default:0} },

    
    //reset password tokens
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },

    // Verification flag
    isVerified: { type: Boolean, default: true },
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date },

    // Progress/Stats
    points: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    location:{ type: String },

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
