import { User } from "../models/User.js";
import { Challenge } from "../models/Challenge.js";

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
        const { title, description, category, difficulty, points,createdAt, problemLink ,platform} = req.body;

        // Validate required fields
        if (!title || !description || !category || !difficulty || !points || !problemLink || !platform) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Ensure category is an array of strings
        if (!Array.isArray(category)) {
            return res.status(400).json({ success: false, message: "Category must be an array of strings" });
        }

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
        
        const result = await newChallenge.save();

        return res.status(201).json({
            success: true,
            message: "Challenge added successfully",
            challenge: result
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};