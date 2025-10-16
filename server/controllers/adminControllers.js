import { User } from "../models/User.js";
import { Challenge } from "../models/Challenge.js";
import { Solution } from "../models/Solution.js";

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

        res.json({
            users,
            pagination: {
                currentPage: pageNumber,
                totalPages,
                totalUsers,
                limit: pageLimit,
                hasNextPage: pageNumber < totalPages,
                hasPrevPage: pageNumber > 1
            },
            filters: {
                colleges: uniqueColleges,
                branches: uniqueBranches
            }
        });

    } catch (err) {
        console.error("Error in getUsers:", err);
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

        // Validate required fields
        if (!title || !description || !category || !difficulty || !points || !problemLink || !platform) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Ensure category is an array of strings
        if (!Array.isArray(category)) {
            return res.status(400).json({ success: false, message: "Category must be an array of strings" });
        }

        // Convert current time to IST and store
        const utcOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in ms
        const istDate = new Date(Date.now() + utcOffset);

        // Create and save Challenge
        const newChallenge = new Challenge({
            title,
            description,
            category,
            difficulty,
            points,
            problemLink,
            createdAt: createdAt ? new Date(createdAt).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }).split('/').reverse().join('-') : new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }).split('/').reverse().join('-'),
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
        console.error("Error in addChallenge:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error",
            error: error.message 
        });
    }
};