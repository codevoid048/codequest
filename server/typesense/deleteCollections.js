// import { client } from "../utils/typesenseClient.js";

// async function deleteCollections() {
//   let retries = 5; // Retry up to 5 times
//   while (retries > 0) {
//     try {
//       const collections = await client.collections().retrieve();
//       for (const col of collections) {
//         await client.collections(col.name).delete();
//         console.log(` Deleted collection: ${col.name}`);
//       }
//       console.log("All collections deleted.");
//       return;
//     } catch (err) {
//       if (retries === 1) {
//         console.error(" Error wiping collections:", err.message);
//         return;
//       }
//       console.log(`Retrying... (${5 - retries + 1})`);
//       retries--;
//       await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying
//     }
//   }
// }

// deleteCollections();
