import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    github: { type: String },
    leetCode: { type: String },
    gfg: { type: String },
    otherLinks: [String],
    points: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
    solveChallenges: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge'
    }],
    createAt: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
})

userSchema.pre('save', async (next) => {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async (enteredPassword) => {
    return await bcrypt.compare(enteredPassword, this.password);
}

export const User = mongoose.model('User', userSchema);