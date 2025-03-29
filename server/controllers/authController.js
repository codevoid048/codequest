import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import { User } from "../models/User.js"
import { Activity } from "../models/Activity.js"
import { sendVerificationEmail } from "../utils/emailService.js"
import { isEmailValid } from "../utils/isEmailValid.js";
// Generate JWT token function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

export const registerUser = async (req, res) => {
  try {
   {/* const { name, email, password, rank, streak, solveChallenges, points } = req.body;*/}
   const { 
    name, email, password, rank, streak, solveChallenges, points, username, 
    mobile, profilePicture, RegistrationNumber, branch, collegeName, 
    gfg, leetCode, codeforces, codechef, otherLinks 
  } = req.body;

    console.log(name);
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const { valid, reason, validators } = await isEmailValid(email);

    console.log("Email Validation Response:", { valid, reason, validators });

    if (!valid) return res.status(400).send({ message: "Please provide a valid email address.", reason: validators[reason].reason })

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      rank: rank || 0,
      streak: streak || 0,
      points: points || 0,
      solveChallenges: solveChallenges || [],
      username: username || "",
      mobile: mobile || "",
      profilePicture: profilePicture || "",
      RegistrationNumber: RegistrationNumber || "",
      branch: branch || "",
      collegeName: collegeName || "",
      gfg: gfg || {  rating: 0 },
      leetCode: leetCode || { rating: 0 },
      codeforces: codeforces || { rating: 0 },
      codechef: codechef || { rating: 0 },
      otherLinks: otherLinks || [],
    });
    


    {/*const newUser = new User({
      name,
      email,
      password: hashedPassword,
      rank,
      streak,
      points,
      solveChallenges,

    });*/}

    await newUser.save();

    // Send verification email

    res.status(201).json({ message: "User registered. Check your email for verification." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    const { valid } = await isEmailValid(email);
    if (!valid) return res.status(400).send({ message: "Please provide a valid email address." });

    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ error: "No user found" });
    console.log("done");
    console.log("User Data:", user);  // Check isVerified status in logs

    if (!user.isVerified) return res.status(400).json({ error: "Email not verified" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Wrong Password" });

    jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, {}, (err, token) => {
      if (err) throw err;
      console.log("login done");
      res.cookie('token', token).json({ token, user });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decoded.email });
    if (!user) return res.status(400).json({ error: "Invalid token" });

    // Check if the token has expired
    if (user.verificationTokenExpires && user.verificationTokenExpires < Date.now()) {
      return res.status(400).json({ error: "Token expired. Request a new verification email." });
    }

    console.log("Before Verification:", user);

    // Update isVerified field and remove verification fields
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    console.log("After Verification:", user);

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
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
};