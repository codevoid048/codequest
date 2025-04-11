import axios from "axios";

export const fetchLeetCodeProfile = async (username) => {
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
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user data from LeetCode:', error);
    return null;
  }
};

  

export const fetchCodeforcesProfile = async (username) => {
  try {
    const response = await axios.get(`https://codeforces.com/api/user.status?handle=${username}`);
    const submissions = response.data;
    //  console.log(submissions)


    return submissions;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

