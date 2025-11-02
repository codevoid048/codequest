import express from "express";
import { User } from "../models/User.js";
import auditService from "../services/auditService.js";
const router = express.Router();

router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password -gfg -codechef -otp -otpExpires -isVerified -createdAt -updatedAt -resetPasswordToken -resetPasswordExpires -googleId -githubId");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    auditService.error("Get user profile failed", error, {
      requestId: req.auditContext?.requestId,
      username: req.params.username
    });
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/:username/update-platforms", async (req, res) => {
  try {
    const { username } = req.params;
    const updatedUser = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if platforms data is stale (older than 1 hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago
    const isStale = !user.platformsUpdatedAt || user.platformsUpdatedAt < oneHourAgo;

    if (!isStale) {
      return res.status(429).json({
        message: "Platform data was updated recently. Please wait before updating again.",
        nextUpdateTime: new Date(user.platformsUpdatedAt.getTime() + 60 * 60 * 1000) // 1 hour from last update
      });
    }

    // Update platform data
    if(updatedUser.leetCode?.username) {
      user.leetCode.solved = updatedUser.leetCode.solved || user.leetCode.solved || 0;
      user.leetCode.rank = updatedUser.leetCode.rank || user.leetCode.rank || 0;
      user.leetCode.rating = updatedUser.leetCode.rating || user.leetCode.rating || 0;
    }

    if(updatedUser.codeforces?.username) {
      user.codeforces.solved = updatedUser.codeforces.solved || user.codeforces.solved || 0;
      user.codeforces.rank = updatedUser.codeforces.rank || user.codeforces.rank || "";
      user.codeforces.rating = updatedUser.codeforces.rating || user.codeforces.rating || 0;
    }

    // Set the timestamp for when platforms were last updated
    user.platformsUpdatedAt = new Date();

    await user.save();

    console.log(`Platforms data updated for ${username} at ${user.platformsUpdatedAt}`);
    res.status(200).json({
      message: "Platform data updated successfully",
      updatedAt: user.platformsUpdatedAt,
      nextUpdateTime: new Date(user.platformsUpdatedAt.getTime() + 60 * 60 * 1000)
    });

  } catch (error) {
    console.error("Error updating platforms:", error);
    auditService.error("Update platforms failed", error, {
      requestId: req.auditContext?.requestId,
      username: req.params.username
    });
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
