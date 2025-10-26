import { warmupLeaderboardCache } from "./leaderBoardCache.js";
import { stopStreakCronJob } from "./streakResetJob.js";
import { cleanupRateLimiter } from "../middleware/rateLimiter.js";

// Application lifecycle management
class AppLifecycle {
    constructor() {
        this.leaderboardUpdateInterval = null;
    }

    // Initialize all background services
    initialize() {
        this.startLeaderboardUpdates();
    }

    // Start periodic leaderboard updates
    startLeaderboardUpdates() {
        if (this.leaderboardUpdateInterval) {
            clearInterval(this.leaderboardUpdateInterval);
        }
        
        this.leaderboardUpdateInterval = setInterval(async () => {
            try {
                await warmupLeaderboardCache();
            } catch (error) {
                console.error('Scheduled leaderboard update failed:', error);
            }
        }, 10 * 60 * 1000); // 10 minutes
    }

    // Cleanup all resources for graceful shutdown
    async cleanup() {
        console.log('Starting application cleanup...');
        
        try {
            // Stop intervals
            if (this.leaderboardUpdateInterval) {
                clearInterval(this.leaderboardUpdateInterval);
                this.leaderboardUpdateInterval = null;
            }
            
            // Stop cron jobs
            stopStreakCronJob();
            
            // Cleanup rate limiter
            cleanupRateLimiter();
            
            console.log('Application cleanup completed');
        } catch (error) {
            console.error('Error during cleanup:', error);
        }
    }
}

// Export singleton instance
export const appLifecycle = new AppLifecycle();