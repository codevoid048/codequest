import axios from 'axios';
import { getGFGName } from '../utils/gfgService.js';
import { User } from '../models/User.js';

export const verifyProfiles = async (req, res) => {
    try {
        const { platform, username, verificationString, userId } = req.body;
        //console.log('Received data:', { platform, username, verificationString, userId });
        if (!platform || !username || !userId || !verificationString) {
            return res.status(400).json({ error: 'Platform, username, userId, and verificationString are required' });
        }
        console.log('Received data:', { platform, username, verificationString, userId });
        const normalizedPlatform = platform.trim().toLowerCase();

        if (normalizedPlatform === 'gfg') {
            const response = await axios.get(`https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=${username}`);
            
            if (response.data.message === 'User not found!') {
                return res.status(400).json({ error: 'User not found on GFG' });
            }
    
            const profile = response.data.data;
    
            if (!profile || !profile.name) {
                return res.status(400).json({ error: 'Name not found in GFG profile' });
            }
    
            //console.log("GFG Name:", profile.name, "Expected:", verificationString);
    
            if (profile.name.trim() !== verificationString.trim()) {
                return res.status(400).json({ error: 'Verification string does not match' });
            }
    
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            await user.updateOne({ $set: { 'gfg.username': username } });
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
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            await user.updateOne({ $set: { 'codeforces.username': username } });
            return res.status(200).json({ message: 'Profile verified successfully' });
        } 
        else if (normalizedPlatform === 'leetcode') {
            const url = `https://leetcode.com/graphql`;
            const query = {
                query: `query getName($username: String!) { matchedUser(username: $username) { profile { realName } } }`,
                variables: { username }
            };
            const response = await axios.post(url, query, { headers: { 'Content-Type': 'application/json' } });

            if (!response.data.data.matchedUser) {
                return res.status(400).json({ error: 'Invalid LeetCode username' });
            }

            const name = response.data.data.matchedUser.profile.realName;
            if (name.trim() !== verificationString.trim()) {
                return res.status(400).json({ error: 'Verification string does not match' });
            }
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            await user.updateOne({ $set: { 'leetCode.username': username } });
            return res.status(200).json({ message: 'Profile verified successfully' });
        } 
        else if (normalizedPlatform === 'code chef') {
            const response = await axios.get(`https://codechef-api.vercel.app/handle/${username}`)
            if (response.error) {
                return res.status(400).json({ error: response.error });
            }
            const name = response.data.name;
            if (name.trim() !== verificationString.trim()) {
                return res.status(400).json({ error: 'Verification string does not match' });
            }
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            await user.updateOne({ $set: { 'codechef.username': username } });
            return res.status(200).json({ message: 'Profile verified successfully' });
        } 
        else {
            return res.status(400).json({ error: 'Unsupported platform. Supported platforms are: GeeksForGeeks, CodeForces, LeetCode, CodeChef.' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};