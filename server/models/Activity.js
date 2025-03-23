import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Submission', 'challenge_attempt']
    },
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge'
    },
    date: {
        type: Date, 
        default: Date.now
    }
})

export const Activity = mongoose.model('Activity', activitySchema);