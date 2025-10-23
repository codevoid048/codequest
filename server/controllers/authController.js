import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import crypto from "crypto"; // For generating OTP
import { User } from "../models/User.js"
import { Activity } from "../models/Activity.js"
import { sendOTPEmail, deleteConfirmationMail, sendResetPassEmail } from "../utils/emailService.js"
import { isEmailValid } from "../utils/isEmailValid.js";
import mongoose from "mongoose";
// import { client } from "../utils/typesenseClient.js";
import { warmupLeaderboardCache } from "../utils/leaderBoardCache.js";
import dotenv from "dotenv";

dotenv.config();

// Generate JWT token function
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const setAuthCookies = (res, user, token) => {
  // Store JWT in HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  // Store user ID and email in HTTP-only cookie
  res.cookie("user", JSON.stringify({ id: user._id, email: user.email }), {
    httpOnly: true, // Prevent JavaScript access
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};


export const registerUser = async (req, res) => {
  try {
    const { email, name, password, username, registrationNumber, branch, collegeName, isAffiliate } = req.body;

    if (!name || !email || !password || !username || !registrationNumber || !branch || !collegeName) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Trim and validate input fields
    const trimmedName = name.trim();
    const trimmedUsername = username.trim().toLowerCase();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedRegNo = registrationNumber.trim().toUpperCase();
    const trimmedBranch = branch.trim();
    const trimmedCollege = collegeName.trim();

    // Basic validation for registration number (alphanumeric, 6-20 characters)
    const regNoRegex = /^[A-Z0-9]{6,20}$/;
    if (!regNoRegex.test(trimmedRegNo)) {
      return res.status(400).json({ error: "Registration number must be 6-20 alphanumeric characters" });
    }

    const result = await isEmailValid(trimmedEmail);

    if (!result.valid) return res.status(400).json({ message: `Please provide a valid email address, ${result.reason}` });

    const usernameRegex = /^[a-z][a-z0-9_]*$/;
    if (!usernameRegex.test(trimmedUsername)) {
      return res.status(400).json({ error: "Username must start with letters and contain only lowercase letters, numbers, and underscores" });
    }

    const user = await User.findOne({ email: trimmedEmail });
    if (user && user.isVerified) return res.status(400).json({ error: "Account already exists, please login" });

    const existingUsername = await User.findOne({ username: trimmedUsername });
    if (existingUsername && existingUsername.isVerified) return res.status(400).json({ error: "Username already exists, please choose another" });

    // Check for duplicate registration number
    const existingRegNo = await User.findOne({ RegistrationNumber: trimmedRegNo });
    if (existingRegNo && existingRegNo.isVerified) {
      return res.status(400).json({ error: "Registration number already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const nowIST = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const otpExpires = nowIST.getTime() + 5 * 60 * 1000; // OTP expires in 5 minutes

    if (!user) {
      await User.create({
        email: trimmedEmail,
        name: trimmedName,
        username: trimmedUsername,
        password: hashedPassword,
        RegistrationNumber: trimmedRegNo,
        branch: trimmedBranch,
        collegeName: trimmedCollege,
        isAffiliate: isAffiliate || false,
        otp,
        otpExpires,
        isVerified: false,
      });
    }
    else {
      user.name = trimmedName;
      user.username = trimmedUsername;
      user.password = hashedPassword;
      user.RegistrationNumber = trimmedRegNo;
      user.branch = trimmedBranch;
      user.collegeName = trimmedCollege;
      user.isAffiliate = isAffiliate || false;
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    }

    // Send OTP to user's email
    await sendOTPEmail(trimmedEmail, otp);

    res.status(201).json({ message: "OTP sent to email. Verify to complete registration." });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: "Email already verified, Please login" });
    }

    const nowIST = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    if (user.otpExpires < nowIST.getTime()) {
      await User.findByIdAndDelete(user._id);
      await warmupLeaderboardCache();
      return res.status(400).json({ error: "OTP has expired. Please request a new one." });
    }
    console.log("OTP:", typeof (user.otp), "Provided OTP:", typeof (parseInt(otp)));
    if (user.otp === parseInt(otp)) {
        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;
    } else {
      throw new Error("Invalid OTP");
    }

    await user.save();

    res.status(200).json({ message: "Email verified and user registered successfully!" });
  } catch (error) {
    //console.error("Verification error:", error);
    res.status(500).json({ error: error.message });
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    // console.log("Login successful for user:", user.username);
    setAuthCookies(res, user, token);
    return res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    // console.error("Server Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const googleAuthCallback = (req, res) => {
  const { user, token } = req.user;
  setAuthCookies(res, user, token);
  res.redirect(`${process.env.CLIENT_URL}/challenges`);
};

export const githubAuthCallback = (req, res) => {
  const { user, token } = req.user;
  setAuthCookies(res, user, token);
  res.redirect(`${process.env.CLIENT_URL}/challenges`);
};


export const logoutUser = async (req, res) => {
  // console.log("Logout API hit"); // Debugging log

  // Clear JWT cookie
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });

  // Clear user cookie
  res.clearCookie("user", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
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
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    // Save Token & Expiry in DB
    user.resetPasswordToken = resetToken;
    const nowIST = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    user.resetPasswordExpires = nowIST.getTime() + 15 * 60 * 1000;
    await user.save();

    // Send Reset Link via Email
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await sendResetPassEmail(user.email, resetLink);

    res.status(200).json({ message: "Reset link sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Server Error1", error });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  // console.log(token);

  try {
    // Verify JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    const nowIST = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    if (!user || user.resetPasswordToken !== token || user.resetPasswordExpires < nowIST.getTime()) {
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

export const getCurrentUser = async (req, res) => {
  try {
    // Fetch full user data from database
    const user = req.user;
    const token = req.token;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    res.json({ user, token });
  } catch (error) {
    // console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const requestingUserId = req.user._id;

    // Authorization check
    if (id !== requestingUserId.toString()) {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({ error: 'Unauthorized to delete this account' });
    }

    // Verify user exists
    const user = await User.findById(id);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: 'User not found' });
    }

    // try {
    //   await client.collections("users").documents(id.toString()).delete();
    //   console.log(`Deleted user ${id} from Typesense`);
    // } catch (typesenseError) {
    //   // Only ignore "Not Found" errors
    //   if (!typesenseError.message.includes("Not Found")) {
    //     await session.abortTransaction();
    //     session.endSession();
    //     throw typesenseError;
    //   }
    //   console.log(`User ${id} already removed from Typesense`);
    // }

    const mail = user.email;
    // Perform deletion
    await User.findByIdAndDelete(id).session(session);

    await session.commitTransaction();
    await session.endSession();

    await warmupLeaderboardCache();

    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    res.clearCookie('user', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    deleteConfirmationMail(mail);

    return res.status(204).end(); // Proper status code for deletions

  } catch (error) {
    await session.abortTransaction().catch(abortError => {
      // console.error('Abort transaction failed:', abortError);
    });
    session.endSession();
    // console.error('Error deleting user:', error);
    return res.status(500).json({
      error: 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};