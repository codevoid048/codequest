import { client } from "../utils/typesenseClient.js";
import { userSchema } from "./schemas/users.js";
import { challengeSchema } from "./schemas/challenges.js";

const createCollection = async (schema) => {
  try {
    // Delete if exists
    const collections = await client.collections().retrieve();
    const exists = collections.find((c) => c.name === schema.name);
    if (exists) {
      await client.collections(schema.name).delete();
      console.log(` Deleted old collection: ${schema.name}`);
    }

    // Create fresh
    await client.collections().create(schema);
    console.log(` Collection created: ${schema.name}`);
  } catch (err) {
    console.error(` Error (collection: ${schema.name}):`, err.message);
  }
};

const setup = async () => {
  try {
    await createCollection(userSchema);
    await createCollection(challengeSchema);
  } catch (err) {
    console.error(" Error:", err);
  }
};

setup();
