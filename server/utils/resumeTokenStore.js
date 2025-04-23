import { ResumeToken } from "../models/ResumeToken.js";

export const saveResumeToken = async (collection, token) => {
  try {
    await ResumeToken.findOneAndUpdate(
      { collectionName: collection },
      { token },
      { upsert: true, new: true }
    );
  } catch (err) {
    console.error(`⚠️ Failed to save resume token for ${collection}:`, err.message);
  }
};

export const getResumeToken = async (collection) => {
  try {
    const doc = await ResumeToken.findOne({ collectionName: collection });
    return doc?.token || null;
  } catch (err) {
    console.error(`⚠️ Failed to get resume token for ${collection}:`, err.message);
    return null;
  }
};
