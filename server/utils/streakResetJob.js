import cron from 'node-cron';
import { User } from '../models/User.js';

const getLastSolvedDate = (challenges = []) => {
    if (!challenges.length) return null;
    const lastEntry = challenges[challenges.length - 1];
    return lastEntry.timestamp?.split(" ")[0] || null;
};

// Add locking mechanism to prevent concurrent streak resets
let isResettingStreaks = false;

const resetUserStreaks = async () => {
  // Prevent concurrent executions
  if (isResettingStreaks) {
    console.log('Streak reset already in progress, skipping...');
    return;
  }

  isResettingStreaks = true;
  
  try {
    // Use IST timezone for consistent date calculation
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istNow = new Date(now.getTime() + istOffset);
    
    const yesterday = new Date(istNow);
    yesterday.setDate(istNow.getDate() - 1);
    const yesterStr = yesterday.toISOString().split("T")[0];

    console.log(`Starting streak reset for date: ${yesterStr}`);

    // Use aggregation pipeline for better performance and atomicity
    const streakResetUpdates = await User.aggregate([
      { $match: { isVerified: true, streak: { $gt: 0 } } },
      {
        $addFields: {
          lastSolvedDates: [
            { $arrayElemAt: [{ $split: [{ $arrayElemAt: ["$solveChallenges.easy.timestamp", -1] }, " "] }, 0] },
            { $arrayElemAt: [{ $split: [{ $arrayElemAt: ["$solveChallenges.medium.timestamp", -1] }, " "] }, 0] },
            { $arrayElemAt: [{ $split: [{ $arrayElemAt: ["$solveChallenges.hard.timestamp", -1] }, " "] }, 0] }
          ]
        }
      },
      {
        $addFields: {
          solvedYesterday: { $in: [yesterStr, "$lastSolvedDates"] }
        }
      },
      { $match: { solvedYesterday: false } },
      { $project: { _id: 1, username: 1 } }
    ]);

    if (streakResetUpdates.length > 0) {
      // Bulk update streaks to 0
      const bulkOps = streakResetUpdates.map(user => ({
        updateOne: {
          filter: { _id: user._id },
          update: { $set: { streak: 0 } }
        }
      }));

      const result = await User.bulkWrite(bulkOps, { ordered: false });
      
      console.log(`Streak reset completed: ${result.modifiedCount} users affected on ${yesterStr}`);
      streakResetUpdates.forEach(user => {
        console.log(`Streak reset for ${user.username}`);
      });
    } else {
      console.log(`No streaks to reset on ${yesterStr}`);
    }

  } catch (err) {
    console.error("Error resetting streaks:", err.message);
  } finally {
    isResettingStreaks = false;
  }
};
let streakCronJob = null;

export const startStreakCronJob = () => {
  console.log('Streak reset cron job scheduled for midnight IST');
  
  // Store reference for cleanup
  streakCronJob = cron.schedule('0 0 * * *', async () => {
    try {
      await resetUserStreaks();
      // Force garbage collection after heavy operation if available
      if (global.gc) {
        global.gc();
      }
    } catch (error) {
      console.error('Streak reset cron job failed:', error);
    }
  }, { 
    timezone: "Asia/Kolkata",
    scheduled: true
  });
};

// Cleanup function for graceful shutdown
export const stopStreakCronJob = () => {
  if (streakCronJob) {
    streakCronJob.stop();
    streakCronJob = null;
    console.log('Streak cron job stopped');
  }
};
