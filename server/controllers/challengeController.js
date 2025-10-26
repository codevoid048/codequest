import { Challenge } from "../models/Challenge.js";
import { Solution } from "../models/Solution.js";
import { User } from "../models/User.js";
import { fetchLeetCodeStatus, fetchCodeforcesStatus } from "./platformsController.js";
import { postPotdChallenge } from "../utils/postPOTD.js";
import e from "express";

export const getChallenges = async (req, res) => {
    try {
        const {
            category,
            difficulty,
            status,
            search,
            userId,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const filter = {};
        const authenticatedUser = req.user;

        let targetUser = null;

        if (userId) {
            try {
                targetUser = await User.findById(userId).select('solveChallenges _id');
                if (!targetUser) {
                    return res.status(404).json({ message: 'User not found' });
                }
            } catch (error) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
        } else if (authenticatedUser) {
            targetUser = authenticatedUser;
        }

        if (category && category !== 'all') {
            filter.category = { $in: category.split(',') };
        }

        if (difficulty && difficulty !== 'all') {
            filter.difficulty = { $in: difficulty.split(',') };
        }

        if (search && search.trim()) {
            filter.$or = [
                { title: { $regex: search.trim(), $options: 'i' } },
                { category: { $regex: search.trim(), $options: 'i' } }
            ];
        }

        if (targetUser && status) {
            const solvedChallengeIds = [
                ...(targetUser.solveChallenges?.easy || []).map(item => item.challenge),
                ...(targetUser.solveChallenges?.medium || []).map(item => item.challenge),
                ...(targetUser.solveChallenges?.hard || []).map(item => item.challenge)
            ];

            if (status === 'solved') {
                filter._id = { $in: solvedChallengeIds };
            } else if (status === 'unsolved') {
                filter._id = { $nin: solvedChallengeIds };
            }
        }

        const startIndex = (page - 1) * limit;

        // Build sort object
        const sortObj = {};
        sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const now = new Date();
        const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
        const istNow = new Date(now.getTime() + istOffset);
        
        const today = new Date(istNow);
        today.setHours(0, 0, 0, 0);
        
        const todayUTC = new Date(today.getTime() - istOffset);
        filter.createdAt = { $lt: todayUTC };


        const challenges = await Challenge.find(filter)
            .limit(limit)
            .skip(startIndex)
            .sort(sortObj);

        const total = await Challenge.countDocuments(filter);

        return res.status(200).json({
            challenges,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            totalChallenges: total,
            hasMore: page < Math.ceil(total / limit)
        });

    } catch (error) {
        console.error("Get challenges error:", error);
        res.status(error.statusCode || 500).json({ message: 'Server error' });
    }
}

// New endpoint for daily challenge
export const getDailyChallenge = async (req, res) => {
    try {
        const { userId } = req.query;
        const authenticatedUser = req.user;

        // Create today's date in IST timezone
        const now = new Date();
        const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
        const istNow = new Date(now.getTime() + istOffset);
        
        const today = new Date(istNow);
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Convert back to UTC for database query
        const todayUTC = new Date(today.getTime() - istOffset);
        const tomorrowUTC = new Date(tomorrow.getTime() - istOffset);

        let dailyChallenge = await Challenge.findOne({
            createdAt: {
                $gte: todayUTC,
                $lt: tomorrowUTC
            }
        }).sort({ createdAt: -1 });

        // If no challenge found for today, return 404 instead of fallback to most recent
        if (!dailyChallenge) {
            return res.status(404).json({ message: 'No challenge posted for today' });
        }

        let targetUser = null;
        let isSolved = false;

        if (userId) {
            try {
                targetUser = await User.findById(userId).select('solveChallenges _id');
                if (targetUser) {
                    isSolved = dailyChallenge.solvedUsers?.includes(targetUser._id) || false;
                }
            } catch (error) {
                // Invalid user ID, continue without user context
            }
        } else if (authenticatedUser) {
            targetUser = authenticatedUser;
            isSolved = dailyChallenge.solvedUsers?.includes(authenticatedUser._id) || false;
        }

        // Return challenge with solved status
        const response = {
            _id: dailyChallenge._id,
            title: dailyChallenge.title,
            description: dailyChallenge.description,
            category: dailyChallenge.category,
            problemLink: dailyChallenge.problemLink,
            points: dailyChallenge.points,
            categories: dailyChallenge.categories,
            difficulty: dailyChallenge.difficulty,
            createdAt: dailyChallenge.createdAt,
            platform: dailyChallenge.platform,
            isSolved
        };

        return res.status(200).json(response);

    } catch (error) {
        console.error("Get daily challenge error:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Get unique categories for filter options
export const getFilterOptions = async (req, res) => {
    try {
        const categories = await Challenge.distinct('category');
        const difficulties = await Challenge.distinct('difficulty');
        const platforms = await Challenge.distinct('platform');

        return res.status(200).json({
            categories: categories.flat().filter((cat, index, arr) => arr.indexOf(cat) === index),
            difficulties,
            platforms
        });

    } catch (error) {
        console.error("Get filter options error:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getChallengeById = async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);

        if (challenge) {
            res.status(200).json(challenge);
        } else {
            res.status(404).json({ message: 'Challenge not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getSolutionByChallengeId = async (req, res) => {
    try {
        const { id } = req.params;
        const authenticatedUser = req.user;

        const solution = await Solution.findOne({ challenge: id })
            .populate('challenge', 'title description category problemLink')
            .select('-_id -__v');

        if (solution) {
            // Check if user has solved this challenge
            let isSolved = false;
            if (authenticatedUser) {
                const solvedChallengeIds = [
                    ...(authenticatedUser.solveChallenges?.easy || []).map(item => item.challenge?.toString()),
                    ...(authenticatedUser.solveChallenges?.medium || []).map(item => item.challenge?.toString()),
                    ...(authenticatedUser.solveChallenges?.hard || []).map(item => item.challenge?.toString())
                ].filter(Boolean);

                isSolved = solvedChallengeIds.includes(id);
            }

            const formattedSolution = {
                title: solution.challenge.title,
                description: solution.challenge.description,
                category: solution.challenge.category,
                problemLink: solution.challenge.problemLink,
                solved: isSolved,
                codeSnippets: {
                    explanation: solution.explanation,
                    python: solution.python,
                    cpp: solution.cpp,
                    java: solution.java,
                    timeComplexity: solution.timeComplexity,
                    spaceComplexity: solution.spaceComplexity
                }
            };

            res.status(200).json(formattedSolution);
        } else {
            res.status(404).json({ message: 'Solution not found' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


export const checkPOTDStatus = async (req, res) => {
    try {
        const { dailyChallengeId } = req.body;
        const user = req.user;
        const userId = req.user._id;

        const dailyChallenge = await Challenge.findById(dailyChallengeId);
        if (!dailyChallenge) {
            return res.status(404).json({ message: 'Daily challenge not found', isSolved: false });
        }

        let isSolved = dailyChallenge.solvedUsers?.includes(userId) || false;

        if (isSolved) {
            return res.status(200).json({ message: "Daily challenge already solved", isSolved });
        }

        let responseStatus;

        if (dailyChallenge.platform === 'LeetCode') {
            responseStatus = await fetchLeetCodeStatus(user?.leetCode?.username, dailyChallenge.title);
        }

        if (dailyChallenge.platform === 'Codeforces') {
            responseStatus = await fetchCodeforcesStatus(user?.codeforces?.username, dailyChallenge.title);
        }

        if (responseStatus && responseStatus.success) {
            const now = new Intl.DateTimeFormat("en-IN", {
                timeZone: "Asia/Kolkata",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            }).formatToParts(new Date());
            
            let year = "", month = "", day = "", hour = "", minute = "", second = "";
            
            now.forEach(part => {
                if (part.type === "year") year = part.value;
                if (part.type === "month") month = part.value;
                if (part.type === "day") day = part.value;
                if (part.type === "hour") hour = part.value;
                if (part.type === "minute") minute = part.value;
                if (part.type === "second") second = part.value;
            });
            
            const timestamp = {
                date: `${year}-${month}-${day}`,
                time: `${hour}:${minute}:${second}`
            };

            const postresponse = await postPotdChallenge(userId, timestamp, dailyChallengeId, dailyChallenge.difficulty);
            if (postresponse.success) {
                isSolved = true;
                return res.status(200).json({ message: "POTD challenge posted successfully", isSolved });
            } else {
                return res.status(400).json({ message: "Failed to post POTD challenge", isSolved: false });
            }
        } else {
            const platformName = dailyChallenge.platform;
            const errorMessage = responseStatus ? responseStatus.message : `Failed to fetch ${platformName} data`;
            return res.status(400).json({ message: errorMessage, isSolved: false });
        }

    } catch (error) {
        console.error("Check POTD status error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};