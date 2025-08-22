import express from "express";
import { User } from "../models/User.js";
const router = express.Router();

router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password -gfg -codechef -otp -otpExpires -isVerified -createdAt -updatedAt -resetPasswordToken -resetPasswordExpires -googleId -githubId"); // Exclude sensitive fields
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
