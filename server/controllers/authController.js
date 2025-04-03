import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import crypto from "crypto"; // For generating OTP
import { User } from "../models/User.js"
import { Activity } from "../models/Activity.js"
import { sendVerificationEmail } from "../utils/emailService.js"
import { isEmailValid } from "../utils/isEmailValid.js";
import { sendEmail } from "../utils/sendEmail.js"

// Generate JWT token function
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const setAuthCookies = (res, user, token) => {
  // Store JWT in HTTP-only cookie
  res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Store full user object in HTTP-only cookie
  res.cookie("user", JSON.stringify(user), {
      httpOnly: true, // Prevent JavaScript access
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};


export const registerUser = async (req, res) => {
  try {
    const {
      name, email, password, username,
      mobile, profilePicture, RegistrationNumber, branch, collegeName,
      gfg, leetCode, codeforces, codechef, otherLinks
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const { valid, reason, validators } = await isEmailValid(email);

    console.log("Email Validation Response:", { valid, reason, validators });

    if (!valid) return res.status(400).json({ message: "Please provide a valid email address", reason: validators[reason].reason });

    const usernameRegex = /^[a-z][a-z0-9_]*$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ error: "Username must start with letters and contain only lowercase letters, numbers, and underscores" });
    }

    const user = await User.findOne({ email });
    if (user && user.isVerified) return res.status(400).json({ error: "Email already exists" });

    const exist = await User.findOne({ username });
    if (exist) return res.status(400).json({ error: "Username already exists, please choose another" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Temporarily hold user data in memory or send it back to the client
    const tempUserData = {
      name,
      email,
      username,
      password: hashedPassword,
      rank: 0,
      streak: 0,
      points: 0,
      solveChallenges: [],
      mobile: mobile || "",
      profilePicture: profilePicture || "",
      RegistrationNumber: RegistrationNumber || "",
      branch: branch || "",
      collegeName: collegeName || "",
      gfg: gfg || { rating: 0 },
      leetCode: leetCode || { rating: 0 },
      codeforces: codeforces || { rating: 0 },
      codechef: codechef || { rating: 0 },
      otherLinks: otherLinks || [],
      otp, // Include OTP for verification
    };

    // Send OTP to user's email
    await sendEmail(email, "Email Verification OTP", `Your OTP is: ${otp}`);

    res.status(201).json({ message: "OTP sent to email. Verify to complete registration.", tempUserData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email, otp, tempUserData } = req.body;

    if (!tempUserData) {
      return res.status(400).json({ error: "Temporary user data is missing" });
    }

    if (tempUserData.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP. Please try again." });
    }

    // Save user data to the database after verification
    const newUser = new User({
      ...tempUserData,
      isVerified: true,
      otp: undefined,
    });

    await newUser.save();

    res.status(200).json({ message: "Email verified and user registered successfully!" });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { valid } = await isEmailValid(email);
    if (!valid) return res.status(400).send({ message: "Please provide a valid email address." });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "No user found" });

    if (!user.isVerified) return res.status(400).json({ error: "Email not verified" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Wrong Password" });

    const token = generateToken(user);
    setAuthCookies(res, user, token);
    return res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const googleAuthCallback = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const { user, token } = req.user;
  setAuthCookies(res, user, token);
  res.redirect(`${process.env.CLIENT_URL}/challenges`);
};

export const githubAuthCallback = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const { user, token } = req.user;
  setAuthCookies(res, user, token);
  res.redirect(`${process.env.CLIENT_URL}/challenges`);
};


export const logoutUser = async (req, res) => {
  console.log("Logout API hit"); // Debugging log

  // Clear JWT cookie
  res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
  });

  // Clear user cookie
  res.clearCookie("user", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
  });

  res.status(200).json({ message: "Logged out successfully" });
};


export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });
      if (!user.isVerified) return res.status(404).json({ message: "Verify your email first" });

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

export const getCurrentUser = async(req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Decode the JWT to get the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id; 

    // Fetch full user data from database
    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user, token });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
