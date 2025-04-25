import { User } from "../models/User.js";
import { Challenge } from "../models/Challenge.js";
import { Solution } from "../models/solution.js";
// import moment from "moment-timezone";
export const getUsers = async(req, res) => {
    try{
        const users = await User.find({}).select("-password");
        console.log(users)
        res.json(users);
    }catch(err){
        console.error(err);
        res.status(500).json({ error: "error in getting users", details: err.message });
    }
}



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
            solution
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
