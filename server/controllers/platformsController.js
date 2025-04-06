import express from "express";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import axios from "axios";
import {User} from "../models/User.js";
import { getGFGName } from "../utils/gfgService.js";

export const leetcodeData = async (req, res) => {
  try {
    const users = await User.find({ 'leetCode.username': { $exists: true, $ne: '' } });
    
    for (const user of users) {
      const username = user.leetCode.username;
      if (!username) continue;

      const query = JSON.stringify({
        query: `
          {
            matchedUser(username: "${username}") {
              profile {
                realName
                ranking
                starRating
              }
              submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
            userContestRanking(username: "${username}") {
              rating
            }
          }
        `,
      });

      const response = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: query,
      });

      const responseData = await response.json();
      const stats = responseData?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum || [];
      const totalSolved = stats.find((item) => item.difficulty === "All")?.count || 0;

      await User.findByIdAndUpdate(
        user._id,
        {
          $set: {
            'leetCode.solved': totalSolved,
            'leetCode.rank' : responseData?.data?.matchedUser?.profile?.ranking || -1,
            'leetCode.rating' : Math.floor(responseData?.data?.userContestRanking?.rating) || -1,
          }
        }
      );
      console.log(`LeetCode data updated for user ${username}`);
    }
    return res.json({ success: true, message: "All LeetCode data updated successfully" });
  } catch (error) {
    console.error("LeetCode API Error:", error.message);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};

export const geeksforgeeksData = async (req, res) => {
  try {
    const users = await User.find({ 'gfg.username': { $exists: true, $ne: '' } });

    for (const user of users) {
      const username = user.gfg.username;
      if (!username) continue;

      const response = await getGFGName(username);
      if (response.error) {
        console.error(`Error fetching GFG data for user ${username}: ${response.error}`);
        continue;
      }
      const totalSolved = response.total_problems_solved;
      const instituteRank = response.institute_rank || -1;
      const rating = response.rating || -1;

      await User.findByIdAndUpdate(
        user._id,
        {
          $set: {
            'gfg.solved': totalSolved,
            'gfg.rank': instituteRank,
            'gfg.rating': rating
          }
        }
      );
      console.log(`Geeksforgeeks data updated for user ${username}`);
    }
    return res.json({ success: true, message: "All GFG data updated successfully" });
  } catch (error) {
    console.error("GFG API Error:", error.message);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};

export const codeforcesData = async (req, res) => {
  try {
    const users = await User.find({ 'codeforces.username': { $exists: true, $ne: '' } });

    for (const user of users) {
      const username = user.codeforces.username;
      if (!username) continue;

      const response = await axios.get(`https://codeforces.com/api/user.status?handle=${username}`);
      const submissions = response.data.result;
      const res = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
      const userInfo = res.data.result[0];

      let solvedProblems = new Set();
      submissions.forEach((submission) => {
        if (submission.verdict === "OK") {
          let problemId = `${submission.problem.contestId}-${submission.problem.index}`;
          solvedProblems.add(problemId);
        }
      });

      const totalSolved = solvedProblems.size;

      await User.findByIdAndUpdate(
        user._id,
        {
          $set: {
            'codeforces.solved': totalSolved,
            'codeforces.rating': userInfo.rating || -1,
            'codeforces.rank': userInfo.rank || "",
          }
        }
      );
      console.log(`Codeforces data updated for user ${username}`);
    }
    return res.json({ success: true, message: "All Codeforces data updated successfully" });
  } catch (error) {
    console.error("Codeforces API Error:", error.message);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};

export const codechefData = async (req, res) => {
  try {
    const users = await User.find({ 'codechef.username': { $exists: true, $ne: '' } });

    for (const user of users) {
      const username = user.codechef.username;
      if (!username) continue;

      const response = await axios.get(`https://codechef-api.vercel.app/handle/${username}`);
      const { currentRating, globalRank, stars } = response.data;

      await User.findByIdAndUpdate(
        user._id,
        {
          $set: {
            'codechef.rating': currentRating,
            'codechef.rank': globalRank,
            'codechef.stars': stars
          }
        }
      );
      console.log(`Codechef data updated for user ${username}`);
    }
    return res.json({ success: true, message: "All Codechef data updated successfully" });
  } catch (error) {
    console.error("Codechef API Error:", error.message);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};
