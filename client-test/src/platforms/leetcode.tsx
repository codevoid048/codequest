import axios from "axios";
//  export const fetchLeetCodeProfile = async (username: string) => {
//    try {
//     //  const res = await axios.post("http://localhost:5000/platforms/leetcode", {
//     //    username,
//     //  });
//      const res = await axios.get(`https://alfa-leetcode-api.onrender.com/userProfile/${username}/`);
//     // Add rate limiting
//     // await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds between requests
//     //  return mockdata;
//      return res.data;
//    } catch (error) {
//      console.error("Error fetching LeetCode data:", (error as Error).message);
//      return null;
//    }
//  };
 
 export const fetchCodeforcesProfile = async (username: string) => {
   try {
     const response = await axios.get(`https://codeforces.com/api/user.status?handle=${username}`);
     const submissions= response.data;
    //  console.log(submissions)

 
     return submissions;
    //  return mockdata;
   } catch (error) {
     console.error('Error fetching user data:', error);
   }
 };

 export const fetchLeetCodeProfile = async (username: string) => {
  try {
    console.log("username",username);
    const response = await axios.post('http://localhost:5000/platforms/leetcode/graphql', { username });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
    return null;
  }
 };

//   export const slovedChallenges = async () => {
//   try {
//       const response = await axios.get(`http://localhost:5000/platforms/solvedChallenges`, {
//         withCredentials: true
//       });
//       console.log("response",response.data);
//       return response.data;
//   } catch (error) {
//       console.error("Error fetching LeetCode data:", error);
//   }
// };
