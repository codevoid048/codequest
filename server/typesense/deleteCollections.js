import { client } from "../utils/typesenseClient.js";

async function deleteCollections() {
  try {
    const collections = await client.collections().retrieve();
    for (const col of collections) {
      await client.collections(col.name).delete();
      console.log(`🗑️ Deleted collection: ${col.name}`);
    }
    console.log("🔥 All collections deleted.");
  } catch (err) {
    console.error("❌ Error wiping collections:", err.message);
  }
}

deleteCollections();
