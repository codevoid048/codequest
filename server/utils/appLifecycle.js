import { warmupLeaderboardCache } from "./leaderBoardCache.js";
import { stopStreakCronJob } from "./streakResetJob.js";
import { cleanupRateLimiter } from "../middleware/rateLimiter.js";
import auditService from "../services/auditService.js";

// Application lifecycle management
class AppLifecycle {
    constructor() {
        this.leaderboardUpdateInterval = null;
    }

    // Initialize all background services
    initialize() {
        auditService.systemEvent('app_lifecycle_initializing');
        this.startLeaderboardUpdates();
        auditService.systemEvent('app_lifecycle_initialized');
    }

    // Start periodic leaderboard updates
    startLeaderboardUpdates() {
        if (this.leaderboardUpdateInterval) {
            clearInterval(this.leaderboardUpdateInterval);
        }
        
        auditService.systemEvent('app_lifecycle_leaderboard_scheduler_started');
        
        this.leaderboardUpdateInterval = setInterval(async () => {
            try {
                auditService.cacheEvent('scheduled_leaderboard_update_started');
                await warmupLeaderboardCache();
                auditService.cacheEvent('scheduled_leaderboard_update_completed');
            } catch (error) {
                auditService.error('scheduled_leaderboard_update_failed', { error: error.message });
            }
        }, 10 * 60 * 1000); // 10 minutes
    }

    // Cleanup all resources for graceful shutdown
    async cleanup() {
        auditService.systemEvent('app_lifecycle_cleanup_starting');
        
        try {
            // Stop intervals
            if (this.leaderboardUpdateInterval) {
                clearInterval(this.leaderboardUpdateInterval);
                this.leaderboardUpdateInterval = null;
                auditService.systemEvent('app_lifecycle_interval_stopped', { interval: 'leaderboard_update' });
            }
            
            // Stop cron jobs
            stopStreakCronJob();
            auditService.systemEvent('app_lifecycle_cronjob_stopped', { job: 'streak_reset' });
            
            // Cleanup rate limiter
            cleanupRateLimiter();
            auditService.systemEvent('app_lifecycle_ratelimiter_cleaned');
            
            auditService.systemEvent('app_lifecycle_cleanup_completed');
        } catch (error) {
            auditService.error('app_lifecycle_cleanup_failed', { error: error.message });
        }
    }
}

// Export singleton instance
export const appLifecycle = new AppLifecycle();