import { Challenge } from "../models/Challenge.js";
import { Solution } from "../models/Solution.js";
import { User } from "../models/User.js";

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
                { description: { $regex: search.trim(), $options: 'i' } },
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

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        let dailyChallenge = await Challenge.findOne({
            createdAt: {
                $gte: today,
                $lt: tomorrow
            }
        }).sort({ createdAt: -1 }).select("-__v");

        if (!dailyChallenge) {
            dailyChallenge = await Challenge.findOne().sort({ createdAt: -1 }).select("-__v");
        }

        if (!dailyChallenge) {
            return res.status(404).json({ message: 'No daily challenge found' });
        }

        let isSolved = false;
        if (userId) {
            console.log(dailyChallenge.solvedUsers);
            isSolved = dailyChallenge.solvedUsers?.includes(userId) || false;
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

        const solution = await Solution.findOne({ challenge: id })
            .populate('challenge', 'title description category problemLink')
            .select('-_id -__v');

        if (solution) {
            const formattedSolution = {
                title: solution.challenge.title,
                description: solution.challenge.description,
                category: solution.challenge.category,
                problemLink: solution.challenge.problemLink,
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