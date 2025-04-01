import express from "express";
import fetch from "node-fetch";
import * as cheerio from "cheerio";



export const leetcodeData = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  const query = JSON.stringify({
    query: `
      {
        matchedUser(username: "${username}") {
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `,
  });

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: query,
    });

    const responseData = await response.json();
    const stats = responseData?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum || [];

    // Extract required values
    const totalSolved = stats.find((item) => item.difficulty === "All")?.count || 0;
    const easy = stats.find((item) => item.difficulty === "Easy")?.count || 0;
    const medium = stats.find((item) => item.difficulty === "Medium")?.count || 0;
    const hard = stats.find((item) => item.difficulty === "Hard")?.count || 0;

    return res.json({ totalSolved, easy, medium, hard });
  } catch (error) {
    console.error("LeetCode API Error:", error.message);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};

export const geeksforgeeksData = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const response = await fetch(`https://www.geeksforgeeks.org/api/user/${username}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch GFG data");
    }
    
    const responseData = await response.json();
    
    // Extract required values
    const totalSolved = responseData?.problems_solved || 0;
    const easy = responseData?.easy_solved || 0;
    const medium = responseData?.medium_solved || 0;
    const hard = responseData?.hard_solved || 0;

    return res.json({ totalSolved, easy, medium, hard });
  } catch (error) {
    console.error("GFG API Error:", error.message);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};

