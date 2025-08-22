import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_BASE_URL = `${process.env.BASE_URL}/platforms`;

export const fetchLeetCodeProfile = async (username) => {
    try {
        await axios.get(`${API_BASE_URL}/leetcode`);
    } catch (error) {
        // console.error("Error fetching LeetCode data:", error.message);
    }
};

export const fetchCodeforcesProfile = async (username) => {
    try {
        await axios.get(`${API_BASE_URL}/codeforces`);
    } catch (error) {
        // console.error("Error fetching LeetCode data:", error.message);
    }
};

// export const fetchgfgProfile = async (username) => {
//     try {
//         await axios.get(`${API_BASE_URL}/gfg`);
//     } catch (error) {
//         // console.error("Error fetching LeetCode data:", error.message);
//     }
// };

// export const fetchCodeChefProfile = async (username) => {
//     try {
//         await axios.get(`${API_BASE_URL}/codechef`);
//     } catch (error) {
//         // console.error("Error fetching LeetCode data:", error.message);
//     }
// };


