import express from "express";
import fetch from "node-fetch";
import axios from "axios";
import { User } from "../models/User.js";
import { fetchCodeforcesProfile, fetchLeetCodeProfile } from "../lib/leetcode.js";
import { Challenge } from "../models/Challenge.js";
import { getGFGName } from "../utils/gfgService.js";
export const leetcodeData = async (req, res) => {
  try {
    const username = req.body.username; // Get username from request body
    const user = await User.findOne({ 'leetCode.username': username });
    console.log(req.body.username);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const query = JSON.stringify({
      query: `
        {
          matchedUser(username: "${username}") {
            profile {
              realName
              ranking
              starRating
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

    return res.json({ success: true, message: "LeetCode data updated successfully" });
  } catch (error) {
    console.error("LeetCode API Error:", error.message);
    return res.status(500).json({ error: `Failed to fetch data` });
  }
};

export const geeksforgeeksData = async (req, res) => {
  try {
    const username = req.body.username; // Get username from request body
    const user = await User.findOne({ 'gfg.username': username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

      const response = await getGFGName(username);
      if (response.error) {
        console.error(`Error fetching GFG data for user ${username}: ${response.error}`);
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

    return res.json({ success: true, message: "GFG data updated successfully" });
  } catch (error) {
    console.error("GFG API Error:", error.message);
    return res.status(500).json({ error: `Failed to fetch data` });
  }
};

export const codeforcesData = async (req, res) => {
  try {
    const username = req.body.username; // Get username from request body
    const user = await User.findOne({ 'codeforces.username': username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const response = await axios.get(`https://codeforces.com/api/user.status?handle=${username}`);
    const submissions = response.data.result;
    const userInfoResponse = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
    const userInfo = userInfoResponse.data.result[0];

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

    return res.json({ success: true, message: "Codeforces data updated successfully" });
  } catch (error) {
    console.error("Codeforces API Error:", error.message);
    return res.status(500).json({ error: `Failed to fetch data` });
  }
};

export const codechefData = async (req, res) => {
  try {
    const username = req.body.username; // Get username from request body
    const user = await User.findOne({ 'codechef.username': username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

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

    return res.json({ success: true, message: "Codechef data updated successfully" });
  } catch (error) {
    console.error("Codechef API Error:", error.message);
    return res.status(500).json({ error: `Failed to fetch data` });  
  }
};

export const solvedChallenges = async (req, res) => {
  try {
    const username = req.body.username;
    const user = await User.findOne({ 'username': username });
    // console.log(user , "user");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch Leetcode data
    const leetcoderesponse = await fetchLeetCodeProfile(user.leetCode.username);
    const leetcodeChallenges = leetcoderesponse.recentSubmissionList.map(submission => ({
      title: submission.title,
      timestamp: submission.timestamp,
      status: submission.statusDisplay
    }));

    const challenges = await Challenge.find();

    // Find common challenges between fetched data and database
    const commonChallenges = challenges.filter(challenge =>
      leetcodeChallenges.some(lc => lc.title.toLowerCase() === challenge.title.toLowerCase())
    );

    // Create purified_one object for Leetcode
    const purified_one = leetcodeChallenges.filter(lc =>
      commonChallenges.some(challenge => challenge.title.toLowerCase() === lc.title.toLowerCase())
    );

    // Update heatmap for Leetcode
    purified_one.forEach(lc => {
      if (!user.heatmap.find(entry => String(entry.timestamp) == String(lc.timestamp))) {
        console.log(String(lc.timestamp), "lc.timestamp");
        user.heatmap.push({ timestamp: String(lc.timestamp) });
      }
    });

    // Update solved challenges for Leetcode
    for (const lc of purified_one) {
      if (lc.status === "Accepted") {
        const challenge = commonChallenges.find(ch => ch.title.toLowerCase() === lc.title.toLowerCase());
        const challengeExists = user.solveChallenges.some(solve => solve.challengeId.equals(challenge._id));
        if (!challengeExists) {
          await User.findByIdAndUpdate(
            user._id,
            {
              $addToSet: {
                'solveChallenges': {
                  challengeId: challenge._id,
                  timestamp: lc.timestamp
                }
              }
            }
          );
        } else {
          console.log("already solved");
        }
      }
    }

    

    // Fetch Codeforces data
    const codeforcesresponse = await fetchCodeforcesProfile(user.codeforces.username);
    const codeforcesChallenges = codeforcesresponse.result.map(submission => ({
      title: submission.problem.name,
      timestamp: submission.creationTimeSeconds,
      status: submission.verdict // Store the verdict for status checking
    })).filter(Boolean); // Filter out undefined values

    // Find common challenges for Codeforces
    const commonCodeforcesChallenges = challenges.filter(challenge =>
      codeforcesChallenges.some(cf => cf.title.toLowerCase() === challenge.title.toLowerCase())
    );

    // Create purified_one object for Codeforces
    const purified_codeforces = codeforcesChallenges.filter(cf =>
      commonCodeforcesChallenges.some(challenge => challenge.title.toLowerCase() === cf.title.toLowerCase())
    );

    // Update heatmap and solved challenges for Codeforces
    for (const cf of purified_codeforces) {
      if (!user.heatmap.find(entry => String(entry.timestamp) == String(cf.timestamp))) {
        user.heatmap.push({ timestamp: cf.timestamp });
      }
      if (cf.status === "OK") { // Check if the challenge was solved
        const challenge = commonCodeforcesChallenges.find(ch => ch.title.toLowerCase() === cf.title.toLowerCase());
        const existingChallenge = user.solveChallenges.find(solvedChallenge => {
          return solvedChallenge.challengeId.equals(challenge._id);
        });

        if (!existingChallenge) {
          await User.findByIdAndUpdate(
            user._id,
            {
              $addToSet: {
                'solveChallenges': {
                  challengeId: challenge._id,
                  timestamp: cf.timestamp
                }
              }
            }
          );
        }
      }
    }

    // Points calculation for Leetcode
    const solvedChallenges = user.solveChallenges.map(solve => solve.challengeId);
    const solvedProblemsleetcode = await Challenge.find({ _id: { $in: solvedChallenges } }).populate('difficulty');
    let easy = 0, medium = 0, hard = 0;
    for (const problem of solvedProblemsleetcode) {
      if (problem.difficulty === "Easy") {
        easy++;
      } else if (problem.difficulty === "Medium") {
        medium++;
      } else if (problem.difficulty === "Hard") {
        hard++;
      }
    }

    const points = easy * 5 + medium * 10 + hard * 20;
    await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          'points': points
        }
      }
    );
    await user.save();
    res.json({ success: true, message: "Data Added Successfully" });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: `Failed to fetch data` });
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


export const heatmap = async (req, res) => {
  try {
    const username = req.body.username;
    const user = await User.findOne({ 'username': username });
    console.log(user.heatmap , "heatmap");
    // console.log(solvedChallenges , "solvedChallenges");
    return res.status(200).json({ message: "Heatmap fetched successfully", heatmap: user.heatmap });
  } catch (error) {
    console.error('Error fetching heatmap:', error);
    return res.status(500).json({ error: `Failed to fetch heatmap` });
  }
}









