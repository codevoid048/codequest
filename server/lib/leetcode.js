import axios from "axios";

export const fetchLeetCodeProfile = async (username) => {
  const query = `
  {
    matchedUser(username: "${username}") {
      username
    }
    recentSubmissionList(username: "${username}", limit: 20) {
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
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user data from LeetCode:', error);
    return null;
  }
};

  

export const fetchCodeforcesProfile = async (username) => {
  try {
    const response = await axios.get(`https://codeforces.com/api/user.status?handle=${username}&from=1&count=50`);
    const submissions = response.data.result;
    //  console.log(submissions)


    return submissions;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

