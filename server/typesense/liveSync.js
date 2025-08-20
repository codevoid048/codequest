// import mongoose from "mongoose";
// import { client } from "../utils/typesenseClient.js";
// import { getResumeToken, saveResumeToken } from "../utils/resumeTokenStore.js";

// const withRetry = async (fn, retries = 5, delay = 2000) => {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await fn();
//     } catch (err) {
//       const is503 = err.message.includes("Not Ready or Lagging") || err.message.includes("503");
//       if (i === retries - 1 || !is503) throw err;
//       await new Promise((res) => setTimeout(res, delay * (i + 1)));
//     }
//   }
// };

// export const setupMongoChangeStream = async () => {
//   const db = mongoose.connection;

//   // USERS
//   //const userToken = await getResumeToken("users");
//   const userChangeStream = db.collection("users").watch([], {
//     fullDocument: "updateLookup",
//     //...(userToken && { resumeAfter: userToken }),
//   });

//   userChangeStream.on("change", async (change) => {
//     const { operationType, documentKey, fullDocument, _id } = change;
//     try {
//       if (!fullDocument) return;

//       if (["insert", "update", "replace"].includes(operationType)) {
//         await withRetry(() =>
//           client.collections("users").documents().upsert({
//             id: fullDocument._id.toString(),
//             name: fullDocument.name,
//             username: fullDocument.username,
//             profilePicture: fullDocument.profilePicture || "",
//             collegeName: fullDocument.collegeName || "",
//             branch: fullDocument.branch || "",
//             points: fullDocument.points?.toString() || "0",
//             rank: fullDocument.rank?.toString() || "0",
//           })
//         );
//       } else if (operationType === "delete") {
//         await withRetry(() =>
//           client.collections("users").documents(documentKey._id.toString()).delete()
//         );
//         console.log(" Deleted user from Typesense");
//       }

//       //await saveResumeToken("users", _id);
//       await new Promise((res) => setTimeout(res, 100));
//     } catch (err) {
//       //console.error(" User ChangeStream Error:", err.message);
//     }
//   });

//   // CHALLENGES
//   //const challengeToken = await getResumeToken("challenges");
//   const challengeChangeStream = db.collection("challenges").watch([], {
//     fullDocument: "updateLookup",
//     //...(challengeToken && { resumeAfter: challengeToken }),
//   });

//   challengeChangeStream.on("change", async (change) => {
//     const { operationType, documentKey, fullDocument, _id } = change;
//     try {
//       if (!fullDocument) return;

//       if (["insert", "update", "replace"].includes(operationType)) {
//         await withRetry(() =>
//           client.collections("challenges").documents().upsert({
//             id: fullDocument._id.toString(),
//             title: fullDocument.title || "",
//             description: fullDocument.description || "",
//             category: Array.isArray(fullDocument.category) ? fullDocument.category : [],
//             difficulty: fullDocument.difficulty || "",
//             problemLink: fullDocument.problemLink || "",
//           })
//         );
//       } else if (operationType === "delete") {
//         await withRetry(() =>
//           client.collections("challenges").documents(documentKey._id.toString()).delete()
//         );
//         console.log(" Deleted challenge from Typesense");
//       }

//       //await saveResumeToken("challenges", _id);
//       await new Promise((res) => setTimeout(res, 100));
//     } catch (err) {
//       //console.error(" Challenge ChangeStream Error:", err.message);
//     }
//   });

//   console.log("Listening to MongoDB changes with resume tokens and retry logic...");
// };
