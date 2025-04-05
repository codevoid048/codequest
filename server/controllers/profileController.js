import { User } from "../models/User.js"
import { Activity } from "../models/Activity.js"
import cloudinary from "../config/cloudinary.js"
import { v4 as uuidv4 } from "uuid"

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password")

        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        // Update basic fields
        if (req.body.name) user.name = req.body.name
        // Don't update email and username as you mentioned

        // Update additional fields
        if (req.body.registerNumber) user.RegistrationNumber = req.body.registerNumber
        if (req.body.branch) user.branch = req.body.branch
        if (req.body.college) user.collegeName = req.body.college
        if (req.body.isAffiliate !== undefined) user.isAffiliate = req.body.isAffiliate

        // Handle profile picture (upload to Cloudinary)
        if (req.body.image) {
            // Check if it's a new image (base64) or an existing Cloudinary URL
            if (req.body.image.startsWith("data:image")) {
                try {
                    // Generate a unique folder name using user ID
                    const folderName = `profiles/${user._id}`

                    // Upload image to Cloudinary
                    const uploadResult = await cloudinary.uploader.upload(req.body.image, {
                        folder: folderName,
                        public_id: `profile_${uuidv4().slice(0, 8)}`,
                        overwrite: true,
                        transformation: [{ width: 400, height: 400, crop: "fill", gravity: "face" }],
                    })

                    // Store the Cloudinary URL in the user profile
                    user.profilePicture = uploadResult.secure_url

                    // Optionally store the public_id to manage the image later
                    user.profilePictureId = uploadResult.public_id
                } catch (cloudinaryError) {
                    console.error("Cloudinary upload error:", cloudinaryError)
                    return res.status(400).json({
                        message: "Failed to upload image to cloud storage. Please try again.",
                    })
                }
            } else if (req.body.image.includes("cloudinary")) {
                // It's already a Cloudinary URL, keep it as is
                user.profilePicture = req.body.image
            } else {
                return res.status(400).json({
                    message: "Invalid image format. Please upload a valid image.",
                })
            }
        }

        // Handle coding profiles - map to the correct schema structure
        if (req.body.otherLinks && Array.isArray(req.body.otherLinks)) {
            // Store any non-coding platform links to otherLinks
            const otherPlatforms = req.body.otherLinks.filter(
                (link) => !["leetcode", "codeforces", "github", "codechef", "gfg"].includes(link.platform.toLowerCase()),
            )

            if (otherPlatforms.length > 0) {
                user.otherLinks = otherPlatforms
            }

            // Map specific coding platforms to their dedicated fields
            req.body.otherLinks.forEach((link) => {
                const platform = link.platform.toLowerCase()
                const url = link.url

                if (platform === "leetcode" && url) {
                    user.leetCode = { ...user.leetCode, username: url }
                } else if (platform === "codeforces" && url) {
                    user.codeforces = { ...user.codeforces, username: url }
                } else if (platform === "github" && url) {
                    // For GitHub, you might want to store it differently
                    user.otherLinks.push({ platform: "github", url })
                } else if (platform === "codechef" && url) {
                    user.codechef = { ...user.codechef, username: url }
                } else if (platform === "gfg" && url) {
                    user.gfg = { ...user.gfg, username: url }
                } else if (platform === "hackerrank" && url) {
                    // HackerRank doesn't have a dedicated field, so add to otherLinks
                    user.otherLinks.push({ platform: "hackerrank", url })
                }
            })
        }

        const updatedUser = await user.save()

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
            rank: updatedUser.rank,
        })
    } catch (error) {
        console.error("Profile update error:", error)
        res.status(500).json({
            message: "Server error",
            error: error.message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        })
    }
}

// Add a function to delete profile picture
// export const deleteProfilePicture = async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id)

//         if (!user) {
//             return res.status(404).json({ message: "User not found" })
//         }

//         if (user.profilePicture) {
//             try {
//                 // Delete the image from Cloudinary
//                 await cloudinary.uploader.destroy(user.profilePictureId)
//             } catch (cloudinaryError) {
//                 console.error("Cloudinary deletion error:", cloudinaryError)
//                 // Continue even if Cloudinary deletion fails
//             }
//         }

//         // Remove the profile picture URL and ID from the user document
//         user.profilePicture = ""
//         user.profilePictureId = ""

//         await user.save()

//         res.status(200).json({ message: "Profile picture deleted successfully" })
//     } catch (error) {
//         console.error("Delete profile picture error:", error)
//         res.status(500).json({ message: "Server error" })
//     }
// }

export const getUserActivity = async (req, res) => {
    try {
        const activities = await Activity.aggregate([
            { $match: { user: req.user._id } },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$date" },
                    },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ])

        res.status(200).json(activities)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

// Get user by username (for public profiles)
export const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params

        const user = await User.findOne({ username }).select(
            "-password -resetPasswordToken -resetPasswordExpires -otp -otpExpires",
        )

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json({ user })
    } catch (error) {
        console.error("Error fetching user by username:", error)
        res.status(500).json({ message: "Server error" })
    }
}

