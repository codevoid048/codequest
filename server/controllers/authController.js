import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
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

    if (!valid) return res.status(400).json({ message: "Please provide a valid email address", reason: validators[reason].reason })

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "Email already exists" });
    const exist = await User.findOne({ username });
    if (exist) return res.status(400).json({ error: "Useranme already exists, please choose another" });
    const usernameRegex = /^[a-z][a-z0-9_]*$/;
    if(!usernameRegex.test(username)) return res.status(400).json({ error: "Username must start with letters and contain only lowercase letters, numbers, and underscores" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const newUser = new User({
      name,
      email,
      username,
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

export const getCurrentUser = (req, res) => {
  const userCookie = req.cookies.user;
  if (!userCookie) return res.status(401).json({ message: "Unauthorized" });

  res.json({ user: JSON.parse(userCookie) });
};
