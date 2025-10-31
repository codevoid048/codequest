import { User } from "../models/User.js";
import { Challenge } from "../models/Challenge.js";
import { Solution } from "../models/Solution.js";
import { Category } from '../models/Category.js';
import { ensureCategoriesExist } from "../utils/categoryHelper.js";
import auditService from "../services/auditService.js";

export const getUsers = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 20,
            search = "",
            collegeName = "",
            branch = "",
            sortBy = "createdAt",
            sortDirection = "desc"
        } = req.query;

        const pageNumber = parseInt(page);
        const pageLimit = parseInt(limit);
        const skip = (pageNumber - 1) * pageLimit;

        let searchQuery = {};

        if (search) {
            searchQuery.$or = [
                { username: { $regex: search, $options: 'i' } },
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { collegeName: { $regex: search, $options: 'i' } },
                { branch: { $regex: search, $options: 'i' } }
            ];
        }

        if (collegeName) {
            const colleges = Array.isArray(collegeName) ? collegeName : collegeName.split(',');
            searchQuery.collegeName = { $in: colleges };
        }

        if (branch) {
            const branches = Array.isArray(branch) ? branch : branch.split(',');
            searchQuery.branch = { $in: branches };
        }

        const sortObject = {};
        sortObject[sortBy] = sortDirection === 'asc' ? 1 : -1;

        const totalUsers = await User.countDocuments();

        const users = await User.find(searchQuery)
            .select("-password -resetPasswordToken -resetPasswordExpires -googleId -githubId -otp -otpExpires -gfg -leetCode -codechef -codeforces -otherLinks -solveChallenges")
            .sort(sortObject)
            .skip(skip)
            .limit(pageLimit);

        const uniqueColleges = await User.distinct('collegeName', { collegeName: { $exists: true, $ne: "" } });
        const uniqueBranches = await User.distinct('branch', { branch: { $exists: true, $ne: "" } });

        const totalPages = Math.ceil(totalUsers / pageLimit);

        return res.status(200).json({
            success: true,
            users,
            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(totalUsers / pageLimit),
                totalUsers: totalUsers,
                hasNextPage: pageNumber * pageLimit < totalUsers,
                hasPrevPage: pageNumber > 1
            },
            filters: {
                colleges: uniqueColleges,
                branches: uniqueBranches
            }
        });

    } catch (err) {
        auditService.error('admin_get_users_error', { error: err.message });
        res.status(500).json({
            error: "Error in getting users",
            details: err.message
        });
    }
};

export const addChallenge = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            difficulty,
            points,
            problemLink,
            createdAt,
            platform,
            solution,
        } = req.body;

        // Convert createdAt to midnight IST (18:30 UTC of previous day)
        let scheduleDate;
        if (createdAt) {
            const date = new Date(createdAt);
            // Set to 18:30:00 UTC of the previous day (00:00 IST of selected day)
            date.setUTCHours(18, 30, 0, 0);
            scheduleDate = date;
        } else {
            // If no date provided, use next day midnight IST
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setUTCHours(18, 30, 0, 0);
            scheduleDate = tomorrow;
        }

        // Validate required fields
        if (!title || !description || !category || !difficulty || !points || !problemLink || !platform) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Ensure category is an array of strings
        if (!Array.isArray(category)) {
            return res.status(400).json({ success: false, message: "Category must be an array of strings" });
        }

        // Ensure categories exist in database (create if they don't)
        await ensureCategoriesExist(category);

        // Create and save Challenge
        const newChallenge = new Challenge({
            title,
            description,
            category,
            difficulty,
            points,
            problemLink,
            createdAt: scheduleDate,
            platform
        });

        const savedChallenge = await newChallenge.save();

        let savedSolution = null;
        if (solution) {
            // Create solution with all fields, including explanation
            const newSolution = new Solution({
                explanation: solution.explanation || "No explanation provided",
                cpp: solution.cpp || "",
                python: solution.python || "",
                java: solution.java || "",
                timeComplexity: solution.timeComplexity || "",
                spaceComplexity: solution.spaceComplexity || "",
                challenge: savedChallenge._id
            });

            savedSolution = await newSolution.save();
        }

        return res.status(201).json({
            success: true,
            message: "Challenge and solution added successfully",
            challenge: savedChallenge,
            solution: savedSolution
        });

    } catch (error) {
        auditService.error('admin_add_challenge_error', { error: error.message });
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export const updateChallenge = async (req, res) => {
    try {
        const {
            challengeId,
            title,
            description,
            category,
            difficulty,
            points,
            problemLink,
            platform,
            createdAt,
            solution,
        } = req.body;

        // Convert createdAt to midnight IST if provided
        let scheduleDate;
        if (createdAt) {
            const date = new Date(createdAt);
            // Set to 18:30:00 UTC of the previous day (00:00 IST of selected day)
            date.setUTCHours(18, 30, 0, 0);
            scheduleDate = date;
        }
        if (!challengeId) {
            return res.status(400).json({ success: false, message: "Challenge ID is required" });
        }
        const challenge = await Challenge.findById(challengeId);
        if (!challenge) {
            return res.status(404).json({ success: false, message: "Challenge not found" });
        }
        // Update challenge fields if provided
        if (title) challenge.title = title;
        if (description) challenge.description = description;
        if (category) {
            // Ensure new categories exist (create if they don't)
            await ensureCategoriesExist(category);
            challenge.category = category;
        }
        if (difficulty) challenge.difficulty = difficulty;
        if (points) challenge.points = points;
        if (problemLink) challenge.problemLink = problemLink;
        if (platform) challenge.platform = platform;

        if (scheduleDate) {
            challenge.createdAt = scheduleDate;
        }

        const updatedChallenge = await challenge.save();

        let updatedSolution = null;
        if (solution) {
            let existingSolution = await Solution.findOne({ challenge: challengeId });
            if (existingSolution) {
                // Update existing solution fields if provided
                if (solution.explanation) existingSolution.explanation = solution.explanation;
                if (solution.cpp) existingSolution.cpp = solution.cpp;
                if (solution.python) existingSolution.python = solution.python;
                if (solution.java) existingSolution.java = solution.java;
                if (solution.timeComplexity) existingSolution.timeComplexity = solution.timeComplexity;
                if (solution.spaceComplexity) existingSolution.spaceComplexity = solution.spaceComplexity;
                updatedSolution = await existingSolution.save();
            } else {
                // Create new solution if none exists
                const newSolution = new Solution({
                    explanation: solution.explanation || "No explanation provided",
                    cpp: solution.cpp || "",
                    python: solution.python || "",
                    java: solution.java || "",
                    timeComplexity: solution.timeComplexity || "",
                    spaceComplexity: solution.spaceComplexity || "",
                    challenge: challengeId
                });
                updatedSolution = await newSolution.save();
            }
        }

        return res.status(200).json({
            success: true,
            message: "Challenge and solution updated successfully",
            challenge: updatedChallenge,
            solution: updatedSolution
        });
    } catch (error) {
        auditService.error('admin_update_challenge_error', { error: error.message });
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// Example: GET /admin/getchallenge
export const getTodayChallenge = async (req, res) => {
    try {
        // Get current time in UTC
        const now = new Date();

        // Calculate today's and tomorrow's midnight in IST (18:30 UTC of previous day)
        const todayIST = new Date(now);
        todayIST.setUTCHours(18, 30, 0, 0);
        if (now < todayIST) {
            // If current time is before today's IST midnight, adjust to previous day
            todayIST.setDate(todayIST.getDate() - 1);
        }

        const tomorrowIST = new Date(todayIST);
        tomorrowIST.setDate(tomorrowIST.getDate() + 1);

        // Find today's challenge using createdAt
        // The dates are already in UTC since we set them using setUTCHours
        const challenge = await Challenge.findOne({
            createdAt: {
                $gte: todayIST,
                $lt: tomorrowIST
            }
        }).sort({ createdAt: -1 });

        if (!challenge) {
            return res.status(404).json({
                success: false,
                message: "No challenge found for today",
            });
        }

        // Manually fetch related solution (since challenge schema has no `solution` field)
        const solution = await Solution.findOne({ challenge: challenge._id });

        return res.status(200).json({
            success: true,
            challenge,
            solution: solution || null,
        });
    } catch (error) {
        auditService.error('admin_get_today_challenge_error', { error: error.message });
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).select('name').sort({ name: 1 });
        res.status(200).json({
            success: true,
            categories: categories.map(cat => cat.name)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching categories',
            error: error.message
        });
    }
};


export const getChallenges = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = "",
            difficulty = "",
            category = "",
            sortBy = "createdAt",
            sortDirection = "desc",
        } = req.query

        const pageNumber = Number.parseInt(page)
        const pageLimit = Number.parseInt(limit)
        const skip = (pageNumber - 1) * pageLimit

        const searchQuery = {}

        // Search by title or description
        if (search) {
            searchQuery.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ]
        }

        // Filter by difficulty
        if (difficulty) {
            searchQuery.difficulty = difficulty
        }

        // Filter by category
        if (category) {
            searchQuery.category = { $in: [category] }
        }

        const sortObject = {}
        sortObject[sortBy] = sortDirection === "asc" ? 1 : -1

        const totalChallenges = await Challenge.countDocuments(searchQuery)

        const challenges = await Challenge.find(searchQuery).sort(sortObject).skip(skip).limit(pageLimit)

        const totalPages = Math.ceil(totalChallenges / pageLimit)

        return res.status(200).json({
            success: true,
            challenges,
            pagination: {
                currentPage: pageNumber,
                totalPages,
                totalChallenges,
                hasNextPage: pageNumber * pageLimit < totalChallenges,
                hasPrevPage: pageNumber > 1,
                limit: pageLimit,
            },
        })
    } catch (error) {
        auditService.error("admin_get_challenges_error", { error: error.message })
        res.status(500).json({
            success: false,
            message: "Error fetching challenges",
            error: error.message,
        })
    }
}

export const getChallengeById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ 
                success: false, 
                message: "Challenge ID is required" 
            });
        }

        const challenge = await Challenge.findById(id);
        if (!challenge) {
            return res.status(404).json({ 
                success: false, 
                message: "Challenge not found" 
            });
        }

        // Fetch the associated solution
        const solution = await Solution.findOne({ challenge: id });

        return res.status(200).json({
            success: true,
            challenge,
            solution: solution || null
        });

    } catch (error) {
        auditService.error('admin_get_challenge_by_id_error', { error: error.message });
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export const deleteChallenge = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ success: false, message: "Challenge ID is required" })
        }

        const challenge = await Challenge.findById(id)
        if (!challenge) {
            return res.status(404).json({ success: false, message: "Challenge not found" })
        }

        // Delete associated solution
        await Solution.deleteOne({ challenge: id })

        // Delete the challenge
        await Challenge.findByIdAndDelete(id)

        auditService.info("admin_delete_challenge", { challengeId: id, title: challenge.title })

        return res.status(200).json({
            success: true,
            message: "Challenge deleted successfully",
        })
    } catch (error) {
        auditService.error("admin_delete_challenge_error", { error: error.message })
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }
}