import cron from 'node-cron';
import { User } from '../models/User.js';

const getLastSolvedDate = (challenges = []) => {
    if (!challenges.length) return null;
    const lastEntry = challenges[challenges.length - 1];
    return lastEntry.timestamp?.split(" ")[0] || null;
};

const resetUserStreaks = async () => {
  try {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
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

    console.log("Streak check completed");
  } catch (err) {
    // console.error("Error resetting streaks:", err.message);
  }
};
export const startStreakCronJob = () => {
  cron.schedule('01 0 * * *', resetUserStreaks, {
    timezone: "Asia/Kolkata"
  });
};
