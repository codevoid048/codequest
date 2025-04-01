import axios from "axios";

export const fetchLeetCodeProfile = async (username: string) => {
  try {
    const res = await axios.post("http://localhost:5000/platforms/leetcode", {
      username,
    });
    // const res = await axios.get(`https://alfa-leetcode-api.onrender.com/userProfile/${username}/`);
    // console.log(res.data)
    return res.data;
  } catch (error) {
    console.error("Error fetching LeetCode data:", (error as Error).message);
    return null;
  }
};

export const fetchCodeforcesProfile = async (username: string) => {
  try {
    const response = await axios.get(`https://codeforces.com/api/user.status?handle=${username}`);
    const submissions: { verdict: string; problem: { contestId: number; index: string } }[] = response.data.result;

    let solvedProblems = new Set();

    submissions.forEach((submission) => {
      if (submission.verdict === "OK") {
        let problemId = `${submission.problem.contestId}-${submission.problem.index}`;
        solvedProblems.add(problemId);
      }
    });

    return solvedProblems.size;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};


export const fetchgfgProfile = async (username: string) => {
  try {

    const res = await axios.get(`http://localhost:5000/geeksforgeeks-profile/${username}`);
    // const res = await axios.get(`https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=${username}`);
    // console.log(res.data);
    return res.data;  
  } catch (error) {
    console.error("Error fetching LeetCode data:", (error as Error).message);
    return null;
  }
};

export const fetchCodeChefProfile = async (username: string) => {
  try {

    const res = await axios.get( `https://codechef-api.vercel.app/handle/${username}`);
    return res.data;  
  } catch (error) {
    console.error("Error fetching LeetCode data:", (error as Error).message);
    return null;
  }
};