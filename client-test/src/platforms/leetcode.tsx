import axios from "axios";
 
 export const fetchLeetCodeProfile = async (username: string) => {
   try {
    //  const res = await axios.post("http://localhost:5000/platforms/leetcode", {
    //    username,
    //  });
     const res = await axios.get(`https://alfa-leetcode-api.onrender.com/userProfile/${username}/`);
    //  console.log(res.data.recentSubmissions)
    const mockdata = {
      "totalSolved": 158,
      "totalSubmissions": [
        {
          "difficulty": "All",
          "count": 184,
          "submissions": 526
        },
        {
          "difficulty": "Easy",
          "count": 86,
          "submissions": 218
        },
        {
          "difficulty": "Medium",
          "count": 91,
          "submissions": 287
        },
        {
          "difficulty": "Hard",
          "count": 7,
          "submissions": 21
        }
      ],
      "totalQuestions": 3506,
      "easySolved": 80,
      "totalEasy": 870,
      "mediumSolved": 72,
      "totalMedium": 1819,
      "hardSolved": 6,
      "totalHard": 817,
      "ranking": 749542,
      "contributionPoint": 1376,
      "reputation": 0,
      "submissionCalendar": {
        "1712966400": 1,
        "1713052800": 5,
        "1719100800": 7,
        "1719705600": 4,
        "1719792000": 10,
        "1719964800": 1,
        "1720224000": 1,
        "1720310400": 10,
        "1720396800": 13,
        "1720483200": 2,
        "1720569600": 4,
        "1720656000": 5,
        "1720742400": 3,
        "1720828800": 4,
        "1720915200": 16,
        "1721001600": 2,
        "1721088000": 1,
        "1721174400": 11,
        "1721260800": 1,
        "1721347200": 1,
        "1721433600": 12,
        "1721520000": 7,
        "1721606400": 1,
        "1721692800": 7,
        "1721779200": 2,
        "1721865600": 1,
        "1722124800": 13,
        "1722211200": 4,
        "1722297600": 6,
        "1722384000": 5,
        "1722470400": 2,
        "1722556800": 2,
        "1722643200": 2,
        "1722729600": 1,
        "1722816000": 1,
        "1722902400": 6,
        "1722988800": 3,
        "1723334400": 4,
        "1726963200": 11,
        "1727481600": 12,
        "1727568000": 6,
        "1728950400": 1,
        "1729382400": 1,
        "1729468800": 2,
        "1729555200": 4,
        "1729641600": 1,
        "1729728000": 1,
        "1729814400": 5,
        "1729900800": 3,
        "1729987200": 1,
        "1730073600": 2,
        "1730419200": 1,
        "1730592000": 2,
        "1730764800": 1,
        "1731110400": 1,
        "1731974400": 1,
        "1732406400": 2,
        "1733011200": 3,
        "1733097600": 3,
        "1733184000": 1,
        "1733270400": 4,
        "1733443200": 1,
        "1735948800": 3,
        "1736035200": 1,
        "1737849600": 4,
        "1738281600": 1,
        "1738368000": 1,
        "1738627200": 4,
        "1738713600": 6,
        "1739145600": 1,
        "1739232000": 1,
        "1739318400": 2,
        "1739404800": 2,
        "1740873600": 1,
        "1740960000": 3,
        "1741046400": 2,
        "1741132800": 2,
        "1741219200": 1,
        "1741392000": 1,
        "1741478400": 1,
        "1741737600": 1,
        "1743033600": 2
      },
      "recentSubmissions": [
        {
          "title": "Kadane's Algorithm",
          "titleSlug": "delete-node-in-a-linked-list",
          "timestamp": String(Math.floor(Date.now() / 1000)),
          "statusDisplay": "Accepted",
          "lang": "cpp",
          "__typename": "SubmissionDumpNode"
        },
        {
          "title": "Remove Linked List Elements",
          "titleSlug": "remove-linked-list-elements",
          "timestamp": "1743044130",
          "statusDisplay": "Accepted",
          "lang": "cpp",
          "__typename": "SubmissionDumpNode"
        },
        {
          "title": "Maximum Count of Positive Integer and Negative Integer",
          "titleSlug": "maximum-count-of-positive-integer-and-negative-integer",
          "timestamp": "1741761390",
          "statusDisplay": "Accepted",
          "lang": "cpp",
          "__typename": "SubmissionDumpNode"
        },
        {
          "title": "Alternating Groups II",
          "titleSlug": "alternating-groups-ii",
          "timestamp": "1741493255",
          "statusDisplay": "Time Limit Exceeded",
          "lang": "cpp",
          "__typename": "SubmissionDumpNode"
        },
        {
          "title": "Minimum Recolors to Get K Consecutive Black Blocks",
          "titleSlug": "minimum-recolors-to-get-k-consecutive-black-blocks",
          "timestamp": "1741445153",
          "statusDisplay": "Accepted",
          "lang": "cpp",
          "__typename": "SubmissionDumpNode"
        },
        {
          "title": "Find Missing and Repeated Values",
          "titleSlug": "find-missing-and-repeated-values",
          "timestamp": "1741267805",
          "statusDisplay": "Accepted",
          "lang": "cpp",
          "__typename": "SubmissionDumpNode"
        },
        {
          "title": "Count Total Number of Colored Cells",
          "titleSlug": "count-total-number-of-colored-cells",
          "timestamp": "1741189053",
          "statusDisplay": "Accepted",
          "lang": "cpp",
          "__typename": "SubmissionDumpNode"
        },
        {
          "title": "Count Total Number of Colored Cells",
          "titleSlug": "count-total-number-of-colored-cells",
          "timestamp": "1741189023",
          "statusDisplay": "Runtime Error",
          "lang": "cpp",
          "__typename": "SubmissionDumpNode"
        },
        {
          "title": "Check if Number is a Sum of Powers of Three",
          "titleSlug": "check-if-number-is-a-sum-of-powers-of-three",
          "timestamp": "1741093862",
          "statusDisplay": "Accepted",
          "lang": "cpp",
          "__typename": "SubmissionDumpNode"
        },
        {
          "title": "Partition Array According to Given Pivot",
          "titleSlug": "partition-array-according-to-given-pivot",
          "timestamp": "1741073864",
          "statusDisplay": "Accepted",
          "lang": "cpp",
          "__typename": "SubmissionDumpNode"
        },
        {
          "title": "Minimum Size Subarray Sum",
          "titleSlug": "minimum-size-subarray-sum",
          "timestamp": "1740996251",
          "statusDisplay": "Accepted",
          "lang": "cpp",
          "__typename": "SubmissionDumpNode"
        },
        {
          "title": "Minimum Size Subarray Sum",
          "titleSlug": "minimum-size-subarray-sum",
          "timestamp": "1740996116",
          "statusDisplay": "Wrong Answer",
          "lang": "cpp",
          "__typename": "SubmissionDumpNode"
        },
        {
          "title": "Merge Sorted Array",
          "titleSlug": "merge-sorted-array",
          "timestamp": "1740984653",
          "statusDisplay": "Accepted",
          "lang": "cpp",
          "__typename": "SubmissionDumpNode"
        },
        {
          "title": "Merge Two 2D Arrays by Summing Values",
          "titleSlug": "merge-two-2d-arrays-by-summing-values",
          "timestamp": "1740920424",
          "statusDisplay": "Accepted",
          "lang": "cpp",
          "__typename": "SubmissionDumpNode"
        },
        {
          "title": "Minimum Operations to Exceed Threshold Value II",
          "titleSlug": "minimum-operations-to-exceed-threshold-value-ii",
          "timestamp": "1739412213",
          "statusDisplay": "Accepted",
          "lang": "cpp",
          "__typename": "SubmissionDumpNode"
        },
        {
          "title": "Minimum Operations to Exceed Threshold Value II",
          "titleSlug": "minimum-operations-to-exceed-threshold-value-ii",
          "timestamp": "1739412132",
          "statusDisplay": "Runtime Error",
          "lang": "cpp",
          "__typename": "SubmissionDumpNode"
        },
        {
          "title": "Max Sum of a Pair With Equal Sum of Digits",
          "titleSlug": "max-sum-of-a-pair-with-equal-sum-of-digits",
          "timestamp": "1739326031",
          "statusDisplay": "Accepted",
          "lang": "cpp",
          "__typename": "SubmissionDumpNode"
        },
        {
          "title": "Max Sum of a Pair With Equal Sum of Digits",
          "titleSlug": "max-sum-of-a-pair-with-equal-sum-of-digits",
          "timestamp": "1739325483",
          "statusDisplay": "Wrong Answer",
          "lang": "cpp",
          "__typename": "SubmissionDumpNode"
        },
        {
          "title": "Remove All Occurrences of a Substring",
          "titleSlug": "remove-all-occurrences-of-a-substring",
          "timestamp": "1739276531",
          "statusDisplay": "Accepted",
          "lang": "cpp",
          "__typename": "SubmissionDumpNode"
        },
        {
          "title": "Clear Digits",
          "titleSlug": "clear-digits",
          "timestamp": "1739209530",
          "statusDisplay": "Accepted",
          "lang": "cpp",
          "__typename": "SubmissionDumpNode"
        }
      ],
      "matchedUserStats": {
        "acSubmissionNum": [
          {
            "difficulty": "All",
            "count": 158,
            "submissions": 193
          },
          {
            "difficulty": "Easy",
            "count": 80,
            "submissions": 98
          },
          {
            "difficulty": "Medium",
            "count": 72,
            "submissions": 86
          },
          {
            "difficulty": "Hard",
            "count": 6,
            "submissions": 9
          }
        ],
        "totalSubmissionNum": [
          {
            "difficulty": "All",
            "count": 184,
            "submissions": 526
          },
          {
            "difficulty": "Easy",
            "count": 86,
            "submissions": 218
          },
          {
            "difficulty": "Medium",
            "count": 91,
            "submissions": 287
          },
          {
            "difficulty": "Hard",
            "count": 7,
            "submissions": 21
          }
        ]
      }
    };
    // Add rate limiting
    // await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds between requests
     return mockdata;
    //  return res.data;
   } catch (error) {
     console.error("Error fetching LeetCode data:", (error as Error).message);
     return null;
   }
 };
 
 export const fetchCodeforcesProfile = async (username: string) => {
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
     const submissions= response.data;
    //  console.log(submissions)

 
     return submissions;
    //  return mockdata;
   } catch (error) {
     console.error('Error fetching user data:', error);
   }
 };

 
 
 
