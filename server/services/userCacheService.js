import cacheService from "../services/cacheService.js";
import auditService from "../services/auditService.js";

const CACHE_NAMESPACE = 'user_profiles';
const PROFILE_TTL = 600; // 10 minutes
const PLATFORM_DATA_TTL = 1800; // 30 minutes

class UserCacheService {
    
    // Cache user profile data
    async cacheUserProfile(userId, profileData) {
        try {
            await cacheService.set(CACHE_NAMESPACE, `profile_${userId}`, profileData, PROFILE_TTL);
            auditService.cacheEvent('user_profile_cached', { userId });
        } catch (error) {
            auditService.error('user_profile_cache_error', { userId, error: error.message });
        }
    }

    // Get cached user profile
    async getCachedUserProfile(userId) {
        try {
            return await cacheService.get(CACHE_NAMESPACE, `profile_${userId}`);
        } catch (error) {
            auditService.error('user_profile_cache_get_error', { userId, error: error.message });
            return null;
        }
    }

    // Cache platform data (LeetCode, Codeforces, etc.)
    async cachePlatformData(username, platform, data) {
        try {
            const cacheKey = `platform_${platform}_${username}`;
            await cacheService.set(CACHE_NAMESPACE, cacheKey, data, PLATFORM_DATA_TTL);
            auditService.cacheEvent('platform_data_cached', { username, platform });
        } catch (error) {
            auditService.error('platform_data_cache_error', { username, platform, error: error.message });
        }
    }

    // Get cached platform data
    async getCachedPlatformData(username, platform) {
        try {
            const cacheKey = `platform_${platform}_${username}`;
            return await cacheService.get(CACHE_NAMESPACE, cacheKey);
        } catch (error) {
            auditService.error('platform_data_cache_get_error', { username, platform, error: error.message });
            return null;
        }
    }

    // Cache user activity data
    async cacheUserActivity(userId, activityData) {
        try {
            await cacheService.set(CACHE_NAMESPACE, `activity_${userId}`, activityData, 900); // 15 minutes
            auditService.cacheEvent('user_activity_cached', { userId });
        } catch (error) {
            auditService.error('user_activity_cache_error', { userId, error: error.message });
        }
    }

    // Get cached user activity
    async getCachedUserActivity(userId) {
        try {
            return await cacheService.get(CACHE_NAMESPACE, `activity_${userId}`);
        } catch (error) {
            auditService.error('user_activity_cache_get_error', { userId, error: error.message });
            return null;
        }
    }

    // Invalidate user cache when profile is updated
    async invalidateUserCache(userId) {
        try {
            await cacheService.del(CACHE_NAMESPACE, `profile_${userId}`);
            await cacheService.del(CACHE_NAMESPACE, `activity_${userId}`);
            auditService.cacheEvent('user_cache_invalidated', { userId });
        } catch (error) {
            auditService.error('user_cache_invalidation_error', { userId, error: error.message });
        }
    }

    // Cache user by username for public profiles
    async cacheUserByUsername(username, userData) {
        try {
            await cacheService.set(CACHE_NAMESPACE, `username_${username}`, userData, PROFILE_TTL);
            auditService.cacheEvent('username_profile_cached', { username });
        } catch (error) {
            auditService.error('username_profile_cache_error', { username, error: error.message });
        }
    }

    // Get cached user by username
    async getCachedUserByUsername(username) {
        try {
            return await cacheService.get(CACHE_NAMESPACE, `username_${username}`);
        } catch (error) {
            auditService.error('username_profile_cache_get_error', { username, error: error.message });
            return null;
        }
    }

    // Cache user statistics
    async cacheUserStats(userId, stats) {
        try {
            await cacheService.set(CACHE_NAMESPACE, `stats_${userId}`, stats, 1200); // 20 minutes
            auditService.cacheEvent('user_stats_cached', { userId });
        } catch (error) {
            auditService.error('user_stats_cache_error', { userId, error: error.message });
        }
    }

    // Get cached user statistics
    async getCachedUserStats(userId) {
        try {
            return await cacheService.get(CACHE_NAMESPACE, `stats_${userId}`);
        } catch (error) {
            auditService.error('user_stats_cache_get_error', { userId, error: error.message });
            return null;
        }
    }

    // Clear all user-related caches (useful for admin operations)
    async clearAllUserCaches() {
        try {
            await cacheService.clearNamespace(CACHE_NAMESPACE);
            auditService.cacheEvent('all_user_caches_cleared');
        } catch (error) {
            auditService.error('clear_user_caches_error', { error: error.message });
        }
    }

    // Get cache statistics
    getCacheStats() {
        return cacheService.getStats();
    }
}

export default new UserCacheService();