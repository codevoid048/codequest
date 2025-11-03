import cron from 'node-cron';
import { User } from '../models/User.js';
import auditService from '../services/auditService.js';
import { getISTNow, formatISTDateString } from './timezone.js';

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
    auditService.warn('Streak reset already in progress, skipping');
    return;
  }

  const audit = auditService.startTrace('streak_reset_job');
  isResettingStreaks = true;
  
  try {
    // Use IST timezone for consistent date calculation
    const istNow = getISTNow();
    
    const yesterday = new Date(istNow);
    yesterday.setDate(istNow.getDate() - 1);
    const yesterStr = formatISTDateString(yesterday);

    auditService.systemEvent('streak_reset_started', { 
      targetDate: yesterStr,
      timezone: 'Asia/Kolkata'
    });

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
          update: { $set: { streak: 0, isPOTDSolvedToday: false } }
        }
      }));

      const result = await User.bulkWrite(bulkOps, { ordered: false });
      
      auditService.systemEvent('streak_reset_completed', {
        targetDate: yesterStr,
        usersAffected: result.modifiedCount,
        usernames: streakResetUpdates.map(u => u.username)
      });

      audit.complete({ 
        usersAffected: result.modifiedCount,
        targetDate: yesterStr 
      });
    } else {
      auditService.systemEvent('streak_reset_no_changes', { 
        targetDate: yesterStr 
      });
      audit.complete({ usersAffected: 0, targetDate: yesterStr });
    }

  } catch (err) {
    auditService.error('Streak reset job failed', err, { 
      targetDate: yesterStr 
    });
    audit.error(err);
  } finally {
    isResettingStreaks = false;
  }
};
let streakCronJob = null;

export const startStreakCronJob = () => {
  auditService.systemEvent('streak_cron_job_scheduled', {
    schedule: '0 0 * * *',
    timezone: 'Asia/Kolkata'
  });
  
  // Store reference for cleanup
  streakCronJob = cron.schedule('0 0 * * *', async () => {
    try {
      await resetUserStreaks();
      // Force garbage collection after heavy operation if available
      if (global.gc) {
        global.gc();
      }
    } catch (error) {
      auditService.error('Streak reset cron job execution failed', error);
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
    auditService.systemEvent('streak_cron_job_stopped');
  }
};
