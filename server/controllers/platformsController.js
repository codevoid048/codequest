import express from "express";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import axios from "axios";
import { User } from "../models/User.js";
import { fetchCodeforcesProfile, fetchLeetCodeProfile } from "../lib/leetcode.js";
import { Challenge } from "../models/Challenge.js";
// import { fetchLeetCodeProfile } from "../utils/platforms.js";

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
            'leetCode.rank': responseData?.data?.matchedUser?.profile?.ranking || -1,
            'leetCode.rating': Math.floor(responseData?.data?.userContestRanking?.rating) || -1,
          }
        }
      );
      // console.log(`LeetCode data updated for user ${username}`);
    }
    return res.json({ success: true, message: "All LeetCode data updated successfully" });
  } catch (error) {
    console.error("LeetCode API Error:", error.message);
    return res.status(500).json({ error: `Failed to fetch data` });
  }
};

export const geeksforgeeksData = async (req, res) => {
  try {
    const users = await User.find({ 'gfg.username': { $exists: true, $ne: '' } });

    for (const user of users) {
      const username = user.gfg.username;
      if (!username) continue;

      const response = await axios.get(`https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=${username}`);
      const totalSolved = response.data.data;

      await User.findByIdAndUpdate(
        user._id,
        {
          $set: {
            'gfg.solved': totalSolved.total_problems_solved,
            'gfg.rank': totalSolved.institute_rank
          }
        }
      );
      // console.log(`Geeksforgeeks data updated for user ${username}`);
    }
    return res.json({ success: true, message: "All GFG data updated successfully" });
  } catch (error) {
    console.error("GFG API Error:", error.message);
    return res.status(500).json({ error: `Failed to fetch data` });
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
      // console.log(`Codeforces data updated for user ${username}`);
    }
    return res.json({ success: true, message: "All Codeforces data updated successfully" });
  } catch (error) {
    console.error("Codeforces API Error:", error.message);
    return res.status(500).json({ error: `Failed to fetch data` });
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
      // console.log(`Codechef data updated for user ${username}`);
    }
    return res.json({ success: true, message: "All Codechef data updated successfully" });
  } catch (error) {
    console.error("Codechef API Error:", error.message);
    return res.status(500).json({ error: `Failed to fetch data` });  
  }
};


export const solvedChallenges = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //Leetcode fetch and Update
    const leetcoderesponse = await fetchLeetCodeProfile(user.leetCode.username);
    const leetcodeChallenges = leetcoderesponse.recentSubmissionList
      .filter(submission => submission.statusDisplay === 'Accepted')
      .map(submission => submission.title);

    const challenges = await Challenge.find();
    const solvedChallengeIdsleetcode = challenges
      .filter(challenge => leetcodeChallenges.includes(challenge.title))
      .map(challenge => challenge._id);
      const solvedProblemsleetcode = await Challenge.find({ _id: { $in: solvedChallengeIdsleetcode } }).populate('difficulty');
      let easy=0,medium=0,hard=0;
      for(const problem of solvedProblemsleetcode){
        if(problem.difficulty==="Easy"){
          easy++;
        }
        else if(problem.difficulty==="Medium"){
          medium++;
        }
        else if(problem.difficulty==="Hard"){
          hard++;
        }
      }
    // console.log("solvedChallengeIdsleetcode",solvedChallengeIdsleetcode);

    if (solvedChallengeIdsleetcode.length > 0) {
      await User.findByIdAndUpdate(
        user._id,
        {
          $addToSet: {
            'solveChallenges': { $each: solvedChallengeIdsleetcode }
          }
        }
      );
    }

    //Codeforces fetch and Update
    const codeforcesresponse = await fetchCodeforcesProfile(user.codeforces.username);
    const codeforcesChallenges = codeforcesresponse.result.map(submission => {
      if (submission.verdict === "OK") {
        return submission.problem.name;
      }
    });

    if (codeforcesChallenges.length > 0) {
      const challenges = await Challenge.find();
      const solvedChallengeIds = challenges.filter(challenge => codeforcesChallenges.includes(challenge.title)).map(challenge => challenge._id);
      const solvedProblems = await Challenge.find({ _id: { $in: solvedChallengeIds } }).populate('difficulty');

      for(const problem of solvedProblems){
        if(problem.difficulty==="Easy"){
          easy++;
        }
        else if(problem.difficulty==="Medium"){
          medium++;
        }
        else if(problem.difficulty==="Hard"){
          hard++;
        }
      }
      const points = easy*5 + medium*10 + hard*20;

      if (solvedChallengeIds.length > 0) {
        await User.findByIdAndUpdate(
          user._id,
          {
            $addToSet: {
              'solveChallenges': { $each: solvedChallengeIds }
            }
          }
        );
      }
      await User.findByIdAndUpdate(
        user._id,
        {
          $set: {
            'points': points
          }
        }
      );
    }
    return res.json({ success: true, message: "Data Added Successfully" });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: `Failed to fetch data` });
  }
}


export const fetchLeetCodeGraphql = async (req, res) => {
  const username = req.body.username;
  const query = `
  {
    matchedUser(username: "${username}") {
      username
      profile {
        realName
        userAvatar
        ranking
        reputation
        starRating
        aboutMe
        skillTags
      }
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      badges {
        id
        displayName
        icon
        creationDate
      }
      upcomingBadges {
        name
        icon
      }
      activeBadge {
        displayName
        icon
      }
    }
    userContestRanking(username: "${username}") {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
    }
    recentSubmissionList(username: "${username}", limit: 5) {
      title
      titleSlug
      timestamp
      statusDisplay
      lang
    }
  }
`;

  try {
    const response = await axios.post('https://leetcode.com/graphql', { query });
    return res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching user data from LeetCode:', error);
    return null;
  }
};






