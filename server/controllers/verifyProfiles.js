import axios from 'axios';
import { getGFGName } from '../utils/gfgService.js';
import { User } from '../models/User.js';

export const verifyProfiles = async (req, res) => {
    try {
        const { platform, username, verificationString, userId } = req.body;
        if (!platform || !username || !userId || !verificationString) {
            return res.status(400).json({ error: 'Platform, username, userId, and verificationString are required' });
        }
        console.log('Received data:', { platform, username, verificationString, userId });
        const normalizedPlatform = platform.trim().toLowerCase();

        if (normalizedPlatform === 'gfg') {
            //const response = await axios.get(`https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=${username}`);
            const response = await getGFGName(username);
            if (response.data.message === 'User not found!') {
                return res.status(400).json({ error: 'User not found on GFG' });
            }
    
            const { name, total_problems_solved, institute_rank, rating } = response;
    
            if (!name) {
                return res.status(400).json({ error: 'Name not found in GFG profile' });
            }
            if (name.trim() !== verificationString.trim()) {
                return res.status(400).json({ error: 'Verification string does not match' });
            }
    
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            await user.updateOne({ $set: { 'gfg.username': username, 'gfg.solved': total_problems_solved, 'gfg.rating': rating } });
            return res.status(200).json({ message: 'GFG Profile verified successfully' });
        }
        else if (normalizedPlatform === 'codeforces') {
            console.log("You got here man");
            const response = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
            if (response.data.status !== 'OK') {
                return res.status(400).json({ error: 'Invalid Codeforces username' });
            }
            const name = response.data.result[0].firstName;
            if (name.trim() !== verificationString.trim()) {
                return res.status(400).json({ error: 'Verification string does not match' });
            }
            const rating = response.data.result[0].rating || 0;
            const rank = response.data.result[0].rank || 0;
            const user = await User.findById(userId);
            console.log("codeforce data:", username, rating, rank);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            await user.updateOne({ $set: { 'codeforces.username': username, 'codeforces.rating': rating, 'codeforces.rank': rank } });
            return res.status(200).json({ message: 'Profile verified successfully' });
        }
        else if (normalizedPlatform === 'leetcode') {
            const url = `https://leetcode.com/graphql`;
            const query = {
                query: `query getUserData($username: String!) {
                    matchedUser(username: $username) {
                        profile {
                        realName
                        ranking
                        starRating
                        }
                        submitStats: submitStatsGlobal {
                            acSubmissionNum {
                            difficulty
                            count
                            submissions
                            }
                        }
                    }
                    userContestRanking(username: $username) {
                        rating
                    }
                    }`,
                variables: { username }
            };
            const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' };
            const response = await axios.post(url, query, { headers});

            if (!response.data.data.matchedUser) {
                return res.status(400).json({ error: 'Invalid LeetCode username' });
            }
            const responseData = response.data.data;
            const name = responseData?.matchedUser?.profile?.realName;
            if (name.trim() !== verificationString.trim()) {
                return res.status(400).json({ error: 'Verification string does not match' });
            }
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const rating = Math.floor(responseData?.userContestRanking?.rating) || 0;
            const rank = responseData?.matchedUser?.profile?.ranking || 0;
            const stats = responseData?.matchedUser?.submitStatsGlobal?.acSubmissionNum || [];
            const totalSolved = stats.find((item) => item.difficulty === "All")?.count || 0;
            console.log("LeetCode data:", username, rating, rank, totalSolved);
            await user.updateOne({ $set: { 'leetCode.username': username, 'leetCode.rating': rating, 'leetCode.rank': rank, 'leetCode.solved': totalSolved } });
            return res.status(200).json({ message: 'Profile verified successfully' });
        }
        else if (normalizedPlatform === 'codechef') {
            const response = await axios.get(`https://codechef-api.vercel.app/handle/${username}`)
            if (response.error) {
                return res.status(400).json({ error: response.error });
            }
            const { name, currentRating, globalRank, stars } = response.data;
            if (name.trim() !== verificationString.trim()) {
                return res.status(400).json({ error: 'Verification string does not match' });
            }
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            await user.updateOne({ $set: { 'codechef.username': username, 'codechef.rating': currentRating, 'codechef.rank': globalRank, 'codechef.stars': stars } });
            return res.status(200).json({ message: 'Profile verified successfully' });
        }
        else {
            return res.status(400).json({ error: 'Unsupported platform. Supported platforms are: GeeksForGeeks, CodeForces, LeetCode, CodeChef.' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};