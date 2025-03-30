import { User } from "../models/User.js";
import { Activity } from "../models/Activity.js";

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

        const user = await User.findById(req.user._id);
        
        if (user) {
            // Personal Information
            user.name = req.body.name || user.name;
            user.username =user.username;
            user.email =  user.email;
            
            // Academic Information
            user.registerNumber = req.body.registerNumber || user.registerNumber;
            user.branch = req.body.branch || user.branch;
            user.collegeName = req.body.college || user.collegeName;
            
            // Coding Profiles
            user.leetcode = req.body.leetcode || user.leetcode;
            user.codeforces = req.body.codeforces || user.codeforces;
            user.geeksforgeeks = req.body.geeksforgeeks || user.geeksforgeeks;
            user.codechef = req.body.codechef || user.codechef;
            
            // Affiliate Status
            user.isAffiliate = req.body.isAffiliate || false;
            
            // Profile Picture
            if (req.file) {
                user.profilePicture = req.file.filename;
            }
            
            
            
            const updatedUser = await user.save();
            
            // Generate response excluding sensitive information
            res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                username: updatedUser.username,
                email: updatedUser.email,
                registerNumber: updatedUser.registerNumber,
                branch: updatedUser.branch,
                collegeName: updatedUser.collegeName,
                leetcode: updatedUser.leetcode,
                codeforces: updatedUser.codeforces,
                geeksforgeeks: updatedUser.geeksforgeeks,
                codechef: updatedUser.codechef,
                isAffiliate: updatedUser.isAffiliate,
                profilePicture: updatedUser.profilePicture,
              
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
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