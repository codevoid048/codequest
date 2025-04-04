import axios from "axios";

const cacheData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
};

const getCachedData = (key: string, expiry = 300000) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  const { data, timestamp } = JSON.parse(cached);
  return Date.now() - timestamp < expiry ? data : null;
};

export const fetchLeetCodeProfile = async (username: string, signal?: AbortSignal) => {
  const CACHE_KEY = `leetcode-${username}`;
  const cached = getCachedData(CACHE_KEY);
  if (cached) return cached;

  try {
    const res = await axios.post("http://localhost:5000/platforms/leetcode", { username }, { signal });
    cacheData(CACHE_KEY, res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching LeetCode data:", error);
    return cached ?? null;
  }
};

export const fetchCodeforcesProfile = async (username: string, signal?: AbortSignal) => {
  const CACHE_KEY = `codeforces-${username}`;
  const cached = getCachedData(CACHE_KEY);
  if (cached) return cached;

  try {
    const response = await axios.get(`https://codeforces.com/api/user.status?handle=${username}`, { signal });
    const submissions = response.data.result;
    let solvedProblems = new Set();

    submissions.forEach((submission : any) => {
      if (submission.verdict === "OK") {
        let problemId = `${submission.problem.contestId}-${submission.problem.index}`;
        solvedProblems.add(problemId);
      }
    });
    
    const result = solvedProblems.size;
    cacheData(CACHE_KEY, result);
    return result;
  } catch (error) {
    console.error("Error fetching Codeforces data:", error);
    return cached ?? 0;
  }
};

export const fetchgfgProfile = async (username: string, signal?: AbortSignal) => {
  const CACHE_KEY = `gfg-${username}`;
  const cached = getCachedData(CACHE_KEY);
  if (cached) return cached;

  try {
    const res = await axios.get(`http://localhost:5000/geeksforgeeks-profile/${username}`, { signal });
    cacheData(CACHE_KEY, res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching GFG data:", error);
    return cached ?? null;
  }
};

export const fetchCodeChefProfile = async (username: string, signal?: AbortSignal) => {
  const CACHE_KEY = `codechef-${username}`;
  const cached = getCachedData(CACHE_KEY);
  if (cached) return cached;

  try {
    const res = await axios.get(`https://codechef-api.vercel.app/handle/${username}`, { signal });
    cacheData(CACHE_KEY, res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching CodeChef data:", error);
    return cached ?? null;
  }
};
