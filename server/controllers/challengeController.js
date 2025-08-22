import { Challenge } from "../models/Challenge.js";
import { Solution } from "../models/Solution.js";

export const getChallenges = async (req, res) => {
    try {
        const { category, difficulty, status } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const filter = {};

        if (category) filter.category = category;
        if (difficulty) filter.difficulty = difficulty;

        const startIndex = (page - 1) * limit;

        const challenges = await Challenge.find(filter)
            .limit(limit)
            .skip(startIndex)
            .sort({ createdAt: -1 });

        const total = await Challenge.countDocuments(filter);

        return res.status(200).json({
            challenges,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            totalChallenges: total
        });

    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getChallengeById = async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);

        if (challenge) {
            // Record challenge attempt activity
            // await Activity.create({
            //     user: req.user._id,
            //     type: 'challenge_attempt',
            //     challenge: challenge._id
            // });
            
            res.status(200).json(challenge);
        } else {
            res.status(404).json({ message: 'Challenge not found' });
        }
    } catch (error) {
        // console.error(error);
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
      // console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
