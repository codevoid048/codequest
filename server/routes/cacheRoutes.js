import express from "express";
import cacheService from "../services/cacheService.js";
import userCacheService from "../services/userCacheService.js";
import challengeCacheService from "../services/challengeCacheService.js";
import auditService from "../services/auditService.js";

const router = express.Router();

// Get cache statistics (admin only)
router.get('/stats', async (req, res) => {
    try {
        const cacheStats = cacheService.getStats();
        const healthCheck = await cacheService.healthCheck();
        
        auditService.systemEvent('cache_stats_requested', { 
            adminId: req.user?.id,
            redisAvailable: healthCheck.redis 
        });

        res.status(200).json({
            success: true,
            stats: cacheStats,
            health: healthCheck,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        auditService.error('cache_stats_error', { error: error.message });
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching cache statistics' 
        });
    }
});

// Clear specific cache namespace (admin only)
router.delete('/clear/:namespace', async (req, res) => {
    try {
        const { namespace } = req.params;
        const adminId = req.user?.id;
        
        auditService.systemEvent('cache_clear_requested', { 
            adminId, 
            namespace 
        });

        switch (namespace) {
            case 'users':
                await userCacheService.clearAllUserCaches();
                break;
            case 'challenges':
                await challengeCacheService.clearAllChallengeCaches();
                break;
            case 'leaderboard':
                await cacheService.clearNamespace('leaderboard');
                break;
            case 'all':
                await userCacheService.clearAllUserCaches();
                await challengeCacheService.clearAllChallengeCaches();
                await cacheService.clearNamespace('leaderboard');
                break;
            default:
                return res.status(400).json({ 
                    success: false, 
                    message: 'Invalid namespace. Use: users, challenges, leaderboard, or all' 
                });
        }

        auditService.systemEvent('cache_cleared', { 
            adminId, 
            namespace 
        });

        res.status(200).json({
            success: true,
            message: `Cache namespace '${namespace}' cleared successfully`,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        auditService.error('cache_clear_error', { 
            namespace: req.params.namespace, 
            error: error.message 
        });
        res.status(500).json({ 
            success: false, 
            message: 'Error clearing cache' 
        });
    }
});

// Warm up caches (admin only)
router.post('/warmup', async (req, res) => {
    try {
        const adminId = req.user?.id;
        auditService.systemEvent('cache_warmup_requested', { adminId });

        // Import leaderboard functions
        const { warmupLeaderboardCache } = await import("../utils/leaderBoardCache.js");
        
        // Warm up leaderboard cache
        await warmupLeaderboardCache();
        
        auditService.systemEvent('cache_warmup_completed', { adminId });

        res.status(200).json({
            success: true,
            message: 'Cache warmup completed successfully',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        auditService.error('cache_warmup_error', { error: error.message });
        res.status(500).json({ 
            success: false, 
            message: 'Error warming up cache' 
        });
    }
});

// Health check endpoint
router.get('/health', async (req, res) => {
    try {
        const health = await cacheService.healthCheck();
        
        res.status(200).json({
            success: true,
            health,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        auditService.error('cache_health_check_error', { error: error.message });
        res.status(500).json({ 
            success: false, 
            message: 'Error checking cache health' 
        });
    }
});

export default router;