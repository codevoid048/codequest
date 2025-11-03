import cacheService from "../services/cacheService.js";
import auditService from "../services/auditService.js";
import { formatISTDateString } from "../utils/timezone.js";

const CACHE_NAMESPACE = 'challenges';
const CHALLENGE_TTL = 3600; // 1 hour
const POTD_TTL = 7200; // 2 hours for POTD

class ChallengeCacheService {
    
    // Cache today's challenge (POTD)
    async cacheTodaysChallenge(challengeData) {
        try {
            const today = formatISTDateString();
            await cacheService.set(CACHE_NAMESPACE, `potd_${today}`, challengeData, POTD_TTL);
            await cacheService.set(CACHE_NAMESPACE, 'potd_latest', challengeData, POTD_TTL);
            auditService.cacheEvent('potd_cached', { date: today });
        } catch (error) {
            auditService.error('potd_cache_error', { error: error.message });
        }
    }

    // Get cached today's challenge
    async getCachedTodaysChallenge() {
        try {
            const today = formatISTDateString();
            let potd = await cacheService.get(CACHE_NAMESPACE, `potd_${today}`);
            
            if (!potd) {
                // Fallback to latest POTD cache
                potd = await cacheService.get(CACHE_NAMESPACE, 'potd_latest');
            }
            
            return potd;
        } catch (error) {
            auditService.error('potd_cache_get_error', { error: error.message });
            return null;
        }
    }

    // Cache challenge by ID
    async cacheChallenge(challengeId, challengeData) {
        try {
            await cacheService.set(CACHE_NAMESPACE, `challenge_${challengeId}`, challengeData, CHALLENGE_TTL);
            auditService.cacheEvent('challenge_cached', { challengeId });
        } catch (error) {
            auditService.error('challenge_cache_error', { challengeId, error: error.message });
        }
    }

    // Get cached challenge by ID
    async getCachedChallenge(challengeId) {
        try {
            return await cacheService.get(CACHE_NAMESPACE, `challenge_${challengeId}`);
        } catch (error) {
            auditService.error('challenge_cache_get_error', { challengeId, error: error.message });
            return null;
        }
    }

    // Cache challenges list with pagination
    async cacheChallengesList(page, limit, filters, challengesData) {
        try {
            const filterKey = JSON.stringify(filters || {});
            const cacheKey = `list_${page}_${limit}_${Buffer.from(filterKey).toString('base64').substring(0, 20)}`;
            await cacheService.set(CACHE_NAMESPACE, cacheKey, challengesData, 600); // 10 minutes
            auditService.cacheEvent('challenges_list_cached', { page, limit });
        } catch (error) {
            auditService.error('challenges_list_cache_error', { page, limit, error: error.message });
        }
    }

    // Get cached challenges list
    async getCachedChallengesList(page, limit, filters) {
        try {
            const filterKey = JSON.stringify(filters || {});
            const cacheKey = `list_${page}_${limit}_${Buffer.from(filterKey).toString('base64').substring(0, 20)}`;
            return await cacheService.get(CACHE_NAMESPACE, cacheKey);
        } catch (error) {
            auditService.error('challenges_list_cache_get_error', { page, limit, error: error.message });
            return null;
        }
    }

    // Cache challenge statistics
    async cacheChallengeStats(stats) {
        try {
            await cacheService.set(CACHE_NAMESPACE, 'global_stats', stats, 1800); // 30 minutes
            auditService.cacheEvent('challenge_stats_cached');
        } catch (error) {
            auditService.error('challenge_stats_cache_error', { error: error.message });
        }
    }

    // Get cached challenge statistics
    async getCachedChallengeStats() {
        try {
            return await cacheService.get(CACHE_NAMESPACE, 'global_stats');
        } catch (error) {
            auditService.error('challenge_stats_cache_get_error', { error: error.message });
            return null;
        }
    }

    // Cache user's solved challenges
    async cacheUserSolvedChallenges(userId, solvedChallenges) {
        try {
            await cacheService.set(CACHE_NAMESPACE, `user_solved_${userId}`, solvedChallenges, 900); // 15 minutes
            auditService.cacheEvent('user_solved_challenges_cached', { userId });
        } catch (error) {
            auditService.error('user_solved_challenges_cache_error', { userId, error: error.message });
        }
    }

    // Get cached user's solved challenges
    async getCachedUserSolvedChallenges(userId) {
        try {
            return await cacheService.get(CACHE_NAMESPACE, `user_solved_${userId}`);
        } catch (error) {
            auditService.error('user_solved_challenges_cache_get_error', { userId, error: error.message });
            return null;
        }
    }

    // Invalidate challenge caches when new challenge is added
    async invalidateChallengeListCaches() {
        try {
            // Clear all list caches by pattern
            const stats = cacheService.getStats();
            auditService.cacheEvent('challenge_list_caches_invalidated');
        } catch (error) {
            auditService.error('challenge_cache_invalidation_error', { error: error.message });
        }
    }

    // Invalidate user's solved challenges when they submit a solution
    async invalidateUserSolvedChallenges(userId) {
        try {
            await cacheService.del(CACHE_NAMESPACE, `user_solved_${userId}`);
            auditService.cacheEvent('user_solved_challenges_invalidated', { userId });
        } catch (error) {
            auditService.error('user_solved_challenges_invalidation_error', { userId, error: error.message });
        }
    }

    // Clear all challenge caches (admin operation)
    async clearAllChallengeCaches() {
        try {
            await cacheService.clearNamespace(CACHE_NAMESPACE);
            auditService.cacheEvent('all_challenge_caches_cleared');
        } catch (error) {
            auditService.error('clear_challenge_caches_error', { error: error.message });
        }
    }

    // Get cache health and statistics
    getCacheStats() {
        return cacheService.getStats();
    }
}

export default new ChallengeCacheService();