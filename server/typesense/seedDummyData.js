// import { client } from "../utils/typesenseClient.js";
// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const users = [
// {
//     id: "1",
//     username: "codevoid",
//     fullName: "Code Void",
//     platforms: ["leetcode", "codeforces", "github"]
// },
// {
//     id: "2",
//     username: "devgalaxy",
//     fullName: "Dev Galaxy",
//     platforms: ["leetcode", "gfg", "github"]
// }
// ];

// const challenges = [
// {
//     id: "1",
//     title: "30 Days of DSA",
//     description: "Solve one DSA problem daily for 30 days.",
//     tags: ["dsa", "coding", "daily"],
//     difficulty: "easy"
// },
// {
//     id: "2",
//     title: "Fullstack Bootcamp",
//     description: "Build and deploy 3 fullstack apps.",
//     tags: ["mern", "project", "webdev"],
//     difficulty: "medium"
// }
// ];

// const seedData = async () => {
//   try {
//     // Index users
//     await client.collections("users").documents().import(users, {
//       action: "upsert", // inserts or updates if already present
//       batch_size: 100
//     });

//     // Index challenges
//     await client.collections("challenges").documents().import(challenges, {
//       action: "upsert",
//       batch_size: 100
//     });

//     console.log("Successfully seeded data to Typesense");
//   } catch (err) {
//     //console.error("Failed to seed data:", err);
//     console.log("Detailed Import Errors:", err.importResults);
//   }
// };

// const start = async () => {
// console.log("Waiting for Typesense to be ready...");
// await sleep(8000); // wait 8 seconds
// await seedData();
// };

// start(); // Call the start function to initiate the seeding process();
