import cron from 'node-cron';
import { User } from '../models/User.js';

const getLastSolvedDate = (challenges = []) => {
    if (!challenges.length) return null;
    const lastEntry = challenges[challenges.length - 1];
    return lastEntry.timestamp?.split(" ")[0] || null;
};

const resetUserStreaks = async () => {
  try {
    // Use IST timezone for consistent date calculation
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istNow = new Date(now.getTime() + istOffset);
    
    const yesterday = new Date(istNow);
    yesterday.setDate(istNow.getDate() - 1);
    const yesterStr = yesterday.toISOString().split("T")[0];

    const users = await User.find({ isVerified: true });

    for (const user of users) {
        const lastDates = [
            getLastSolvedDate(user.solveChallenges?.easy),
            getLastSolvedDate(user.solveChallenges?.medium),
            getLastSolvedDate(user.solveChallenges?.hard),
        ];
        
        const solvedYesterday = lastDates.some(date => date === yesterStr);
        
        if (!solvedYesterday && user.streak !== 0) {
            user.streak = 0;
            await user.save();
            console.log(`Streak reset for ${user.username}`);
        }
    }

    console.log(`Streak check completed for ${users.length} users on ${yesterStr}`);
  } catch (err) {
    console.error("Error resetting streaks:", err.message);
  }
};
export const startStreakCronJob = () => {
  console.log('Streak reset cron job scheduled for midnight IST');
  cron.schedule('0 0 * * *', resetUserStreaks, { // At midnight every day
    timezone: "Asia/Kolkata"
  });
};
