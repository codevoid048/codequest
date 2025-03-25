import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import { User } from "../models/User.js"
import { Activity } from "../models/Activity.js"
import { sendVerificationEmail } from "../utils/emailService.js"

// Generate JWT token function
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

export const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;

    console.log(name);
      if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const user = await User.findOne({ email });
      if (user) return res.status(400).json({ error: "Email already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Generate verification token
      const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
      
      // Optional, 1 -> hour expiry
      const verificationTokenExpires = Date.now() + 60 * 60 * 1000; 
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpires,
      });
  
      await newUser.save();
  
      // Send verification email
      await sendVerificationEmail(email, verificationToken);
  
      res.status(201).json({ message: "User registered. Check your email for verification." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error", details: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(401).json({ error: "No user found" });
        if (!user.isVerified) return res.status(400).json({ error: "Email not verified" });
        //console.log(user.password);
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: "Wrong Password" });

        jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token).json(user)
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

export const verifyEmail = async (req, res) => {
    try {
      const { token } = req.params;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ email: decoded.email });
      if (!user) return res.status(400).json({ error: "Invalid token" });
      if (user.verificationTokenExpires && user.verificationTokenExpires < Date.now()) {
        return res.status(400).json({ error: "Token expired. Request a new verification email." });
      }
  
      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpires = undefined;
      await user.save();
  
      res.json({ message: "Email verified successfully! You can now log in." });
    } catch (error) {
      console.error("Verification error:", error);
      res.status(400).json({ error: "Invalid or expired token" });
    }
  };