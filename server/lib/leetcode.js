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
  const mockdata = {
    "status": "OK",
    "result": [
      {
        "id": 313321875,
        "contestId": 1237,
        "creationTimeSeconds": 1743811211,
        "relativeTimeSeconds": 2147483647,
        "problem": {
          "contestId": 1237,
          "index": "B",
          "name": "Unit Array",
          "type": "PROGRAMMING",
          "points": 750,
          "rating": 1300,
          "tags": [
            "data structures",
            "sortings",
            "two pointers"
          ]
        },
        "author": {
          "contestId": 1237,
          "members": [
            {
              "handle": "code__void"
            }
          ],
          "participantType": "PRACTICE",
          "ghost": false,
          "startTimeSeconds": 1571236500
        },
        "programmingLanguage": "C++20 (GCC 13-64)",
        "verdict": "OK",
        "testset": "TESTS",
        "passedTestCount": 20,
        "timeConsumedMillis": 281,
        "memoryConsumedBytes": 2355200
      },
    ],
  };
  try {
    const response = await axios.get(`https://codeforces.com/api/user.status?handle=${username}`);
    const submissions = response.data;
    //  console.log(submissions)


    return submissions;
    //  return mockdata;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

