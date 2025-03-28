import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import { User } from "../models/User.js"
import { Activity } from "../models/Activity.js"
import { sendVerificationEmail } from "../utils/emailService.js"
import { isEmailValid } from "../utils/isEmailValid.js";
import { sendEmail } from "../utils/sendEmail.js"
// Generate JWT token function
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

export const registerUser = async (req, res) => {
    try {
      const { name, username, email, password ,rank,streak,solveChallenges,points} = req.body;

     console.log(name);
      if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const {valid, reason, validators} = await isEmailValid(email);
      if(!valid) return res.status(400).send({ message: "Please provide a valid email address.", reason: validators[reason].reason })

      const user = await User.findOne({ email });
      if (user) return res.status(400).json({ error: "Email already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);

      const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
       
      // Optional, 1 -> hour expiry
      //const verificationTokenExpires = Date.now() + 60 * 60 * 1000; 
  
      const newUser = new User({
        name,
        username,
        email,
        password: hashedPassword,
        rank,
        streak,
        points,
        solveChallenges,
        
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

        const {valid, reason, validators} = await isEmailValid(email);
        if(!valid) return res.status(400).send({ message: "Please provide a valid email address.", reason: validators[reason].reason })

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
  
  export const googleAuthCallback = (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
  
    const { user, token } = req.user;
  
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  };

  export const githubAuthCallback = (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
  
    const { user, token } = req.user;
  
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  };

  
  export const logoutUser = async (req, res) => {
    console.log("Logout API hit"); // Add this to check if API is being called

    res.clearCookie("jwt", {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
    });

    res.status(200).json({ message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });

      // Generate Reset Token (JWT)
      const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.RESET_TOKEN_EXPIRY });

      // Save Token & Expiry in DB
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 min expiry
      await user.save();

      // Send Reset Link via Email
      const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
      await sendEmail(user.email, "Password Reset Request", `Click the link to reset password: ${resetLink}`);

      res.status(200).json({ message: "Reset link sent to email" });
  } catch (error) {
      res.status(500).json({ message: "Server Error1", error });
  }
};

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    console.log(token);

    try {
        // Verify JWT Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user || user.resetPasswordToken !== token || user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }
        // Hash New Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update Password in DB
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token1", error });
    }
};

