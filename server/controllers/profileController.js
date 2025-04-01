import { User } from "../models/User.js";
import { Activity } from "../models/Activity.js";
// import generateToken from '../controllers/authController.js'; // Ensure the file extension is correct
import {Challenge} from "../models/Challenge.js";

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
export const updateUserProfile = async (req, res) => {
    try {

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update basic fields
        if (req.body.name) user.name = req.body.name;
        // Don't update email and username as you mentioned
        
        // Update additional fields
        if (req.body.registerNumber) user.RegistrationNumber = req.body.registerNumber;
        if (req.body.branch) user.branch = req.body.branch;
        if (req.body.college) user.collegeName = req.body.college;
        if (req.body.isAffiliate !== undefined) user.isAffiliate = req.body.isAffiliate;
        
        // Handle profile picture
        if (req.body.image) {
            user.profilePicture = req.body.image;
        }
        
        // Handle coding profiles - map to the correct schema structure
        if (req.body.otherLinks && Array.isArray(req.body.otherLinks)) {
            // Store any non-coding platform links to otherLinks
            const otherPlatforms = req.body.otherLinks.filter(
                link => !['leetcode', 'codeforces', 'github', 'codechef', 'gfg'].includes(link.platform.toLowerCase())
            );
            
            if (otherPlatforms.length > 0) {
                user.otherLinks = otherPlatforms;
            }
            
            // Map specific coding platforms to their dedicated fields
            req.body.otherLinks.forEach(link => {
                const platform = link.platform.toLowerCase();
                const url = link.url;
                
                if (platform === 'leetcode' && url) {
                    user.leetCode = { ...user.leetCode, username: url };
                } else if (platform === 'codeforces' && url) {
                    user.codeforces = { ...user.codeforces, username: url };
                } else if (platform === 'github' && url) {
                    // For GitHub, you might want to store it differently
                    user.otherLinks.push({ platform: 'github', url });
                } else if (platform === 'codechef' && url) {
                    user.codechef = { ...user.codechef, username: url };
                } else if (platform === 'gfg' && url) {
                    user.gfg = { ...user.gfg, username: url };
                } else if (platform === 'hackerrank' && url) {
                    // HackerRank doesn't have a dedicated field, so add to otherLinks
                    user.otherLinks.push({ platform: 'hackerrank', url });
                }
            });
        }
        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            username: updatedUser.username,
            RegistrationNumber: updatedUser.RegistrationNumber,
            branch: updatedUser.branch,
            collegeName: updatedUser.collegeName,
            profilePicture: updatedUser.profilePicture,
            isAffiliate: updatedUser.isAffiliate,
            leetCode: updatedUser.leetCode,
            codeforces: updatedUser.codeforces,
            codechef: updatedUser.codechef,
            gfg: updatedUser.gfg,
            otherLinks: updatedUser.otherLinks,
            points: updatedUser.points,
            rank: updatedUser.rank
        });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};
export const getUserActivity = async (req, res) => {
    try {
        const activities = await Activity.aggregate([
            { $match: { user: req.user._id }},
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$date' }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 }}
        ])

        res.status(200).json(activities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
export const solvedChallenges = async (req, res) => {
    console.log("Request Body:", req.body); 
    const { problemId } = req.body;
    const userId = req.user.id;


    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Adding problemId to solvedChallenges if not already present
        if (!user.solveChallenges.includes(problemId)) {
            user.solveChallenges.push(problemId);
        }

        const problem = await Challenge.findById(problemId);
        console.log("Problem found:", problem);
        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }

        const problemDate = new Date(problem.createdAt);
        problemDate.setHours(0, 0, 0, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (problemDate.getTime() === today.getTime()) {
            const solvedDates = user.potdSolved.map(date => 
                new Date(date).setHours(0, 0, 0, 0)
            );

            if (!solvedDates.includes(today.getTime())) {
                user.potdSolved.push(today);
            }
        }

        // Save the user document
        await user.save();

        res.status(200).json({ message: "Problem marked as solved and stored in DB" });
    } catch (err) {
        console.error("Error in solvedChallenges:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
