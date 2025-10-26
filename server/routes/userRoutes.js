import express from "express";
import { User } from "../models/User.js";
import auditService from "../services/auditService.js";
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

    await user.save();
    console.log(`Platforms data updated for ${username}`);
    if (!user) {
      console.log("User not found");
    }

  } catch (error) {
    console.error(error);
  }
});

export default router;
