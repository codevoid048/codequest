import { Challenge } from "../models/Challenge.js";
import { Solution } from "../models/Solution.js";
import { User } from "../models/User.js";
import { fetchLeetCodeStatus, fetchCodeforcesStatus } from "./platformsController.js";
import { postPotdChallenge } from "../utils/postPOTD.js";
import auditService from "../services/auditService.js";
import { Category } from '../models/Category.js';
import { getISTDateBounds, formatISTDateTimeString } from '../utils/timezone.js';

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

        // Date filter for challenges (exclude today's POTD)
        const { start: todayUTC } = getISTDateBounds();
        filter.createdAt = { $lt: todayUTC };

        // Build aggregation pipeline for better performance
        const pipeline = [
            { $match: filter }
        ];

        // Add user-specific solved status if needed
        if (targetUser && status) {
            pipeline.push(
                {
                    $addFields: {
                        isSolved: {
                            $or: [
                                { $in: ["$_id", targetUser.solveChallenges?.easy?.map(item => item.challenge) || []] },
                                { $in: ["$_id", targetUser.solveChallenges?.medium?.map(item => item.challenge) || []] },
                                { $in: ["$_id", targetUser.solveChallenges?.hard?.map(item => item.challenge) || []] }
                            ]
                        }
                    }
                }
            );

            // Filter by solved status
            if (status === 'solved') {
                pipeline.push({ $match: { isSolved: true } });
            } else if (status === 'unsolved') {
                pipeline.push({ $match: { isSolved: false } });
            }
        }

        // Add sorting
        const sortObj = {};
        sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;
        pipeline.push({ $sort: sortObj });

        // Execute aggregation for both data and count
        const [challenges, countResult] = await Promise.all([
            Challenge.aggregate([
                ...pipeline,
                { $skip: (page - 1) * limit },
                { $limit: limit },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        description: 1,
                        category: 1,
                        difficulty: 1,
                        problemLink: 1,
                        points: 1,
                        platform: 1,
                        createdAt: 1,
                        categories: 1
                    }
                }
            ]),
            Challenge.aggregate([
                ...pipeline,
                { $count: "total" }
            ])
        ]);

        const total = countResult[0]?.total || 0;

        return res.status(200).json({
            challenges,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            totalChallenges: total,
            hasMore: page < Math.ceil(total / limit)
        });

    } catch (error) {
        auditService.error("Get challenges failed", error, {
            requestId: req.auditContext?.requestId,
            userId: req.user?._id?.toString(),
            query: req.query
        });
        res.status(error.statusCode || 500).json({ message: 'Server error' });
    }
}

// New endpoint for daily challenge
export const getDailyChallenge = async (req, res) => {
    try {
        const { userId } = req.query;
        const authenticatedUser = req.user;

        // Get today's IST date boundaries (returns UTC dates for database query)
        const { start: todayUTC, end: tomorrowUTC } = getISTDateBounds();

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
                targetUser = await User.findById(userId).select('isPOTDSolvedToday _id');
                if (targetUser) {
                    isSolved = targetUser.isPOTDSolvedToday || false;
                }
            } catch (error) {
                // Invalid user ID, continue without user context
            }
        } else if (authenticatedUser) {
            targetUser = authenticatedUser;
            isSolved = authenticatedUser.isPOTDSolvedToday || false;
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
        auditService.error("Get daily challenge failed", error, {
            requestId: req.auditContext?.requestId,
            userId: req.user?._id?.toString()
        });
        res.status(500).json({ message: 'Server error' });
    }
}

// Get unique categories for filter options
export const getFilterOptions = async (req, res) => {
    try {
        const [categories, difficulties, platforms] = await Promise.all([
            Category.find({}).select('name -_id').lean(),
            Challenge.distinct('difficulty'),
            Challenge.distinct('platform')
        ]);

        return res.status(200).json({
            categories: categories.map(cat => cat.name),
            difficulties,
            platforms
        });

    } catch (error) {
        auditService.error("Get filter options failed", error, {
            requestId: req.auditContext?.requestId
        });
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

        let isSolved = user.isPOTDSolvedToday || false;

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
            // Use timezone utility to format IST timestamp
            const timestamp = formatISTDateTimeString();

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
        auditService.error("Check POTD status failed", error, {
            requestId: req.auditContext?.requestId,
            userId: req.user?._id?.toString(),
            challengeId: req.params.id
        });
        res.status(500).json({ message: 'Server error' });
    }
};