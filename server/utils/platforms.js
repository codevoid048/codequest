import axios from "axios";

export const fetchLeetCodeProfile = async (username) => {
    try {
        await axios.get("http://localhost:5000/platforms/leetcode");
    } catch (error) {
        console.error("Error fetching LeetCode data:", error.message);
    }
};

export const fetchCodeforcesProfile = async (username) => {
    try {
        await axios.get("http://localhost:5000/platforms/codeforces");
    } catch (error) {
        console.error("Error fetching LeetCode data:", error.message);
    }
};

export const fetchgfgProfile = async (username) => {
    try {
        await axios.get("http://localhost:5000/platforms/gfg");
    } catch (error) {
        console.error("Error fetching LeetCode data:", error.message);
    }
};

export const fetchCodeChefProfile = async (username) => {
    try {
        await axios.get("http://localhost:5000/platforms/codechef");
    } catch (error) {
        console.error("Error fetching LeetCode data:", error.message);
    }
};