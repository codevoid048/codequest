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
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.github = req.body.github || user.github;
            user.leetcode = req.body.leetcode || user.leetcode;
            user.gfg = req.body.gfg || user.gfg;
            user.otherLinks = req.body.otherLinks || user.otherLinks;
            if (req.body.password) {
                user.password = req.body.password;
            }
            if (req.file) {
                user.profilePicture = req.file.filename;
            }

            const updatedUser = await user.save();

            res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                github: updatedUser.github,
                leetcode: updatedUser.leetcode,
                gfg: updatedUser.gfg,
                otherLinks: updatedUser.otherLinks,
                points: updatedUser.points,
                rank: updatedUser.rank,
                token: generateToken(updatedUser._id)
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
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