// Rate limiting middleware for preventing race conditions through excessive concurrent requests

import auditService from "../services/auditService.js";

const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;
const MAX_ENTRIES = 10000; // Prevent unbounded memory growth

let cleanupInterval = null;

// Clean up old entries periodically with memory limits
const startCleanup = () => {
    if (cleanupInterval) clearInterval(cleanupInterval);
    
    cleanupInterval = setInterval(() => {
        const now = Date.now();
        let deletedCount = 0;
        
        // Clean expired entries
        for (const [key, data] of requestCounts.entries()) {
            if (now - data.firstRequest > RATE_LIMIT_WINDOW) {
                requestCounts.delete(key);
                deletedCount++;
            }
        }
        
        // If still too many entries, remove oldest ones
        if (requestCounts.size > MAX_ENTRIES) {
            const entries = Array.from(requestCounts.entries())
                .sort((a, b) => a[1].firstRequest - b[1].firstRequest);
            
            const toDelete = entries.slice(0, requestCounts.size - MAX_ENTRIES);
            toDelete.forEach(([key]) => {
                requestCounts.delete(key);
                deletedCount++;
            });
        }
        
        if (deletedCount > 0) {
            auditService.cacheEvent('rate_limiter_cleanup', {
              removedEntries: deletedCount,
              currentSize: requestCounts.size,
              memoryOptimization: true
            });
        }
    }, RATE_LIMIT_WINDOW);
};

startCleanup();

// Export cleanup function for graceful shutdown
export const cleanupRateLimiter = () => {
    if (cleanupInterval) {
        clearInterval(cleanupInterval);
        cleanupInterval = null;
    }
    requestCounts.clear();
    auditService.systemEvent('rate_limiter_shutdown', {
      action: 'cleanup_completed'
    });
};

export const rateLimitMiddleware = (maxRequests = MAX_REQUESTS_PER_WINDOW, windowMs = RATE_LIMIT_WINDOW) => {
    return (req, res, next) => {
        // Use user ID if authenticated, otherwise fall back to IP
        const identifier = req.user?._id?.toString() || req.ip;
        const now = Date.now();
        
        const userRequests = requestCounts.get(identifier);
        
        if (!userRequests) {
            requestCounts.set(identifier, {
                count: 1,
                firstRequest: now
            });
            return next();
        }
        
        // Reset if window has passed
        if (now - userRequests.firstRequest > windowMs) {
            requestCounts.set(identifier, {
                count: 1,
                firstRequest: now
            });
            return next();
        }
        
        // Check if limit exceeded
        if (userRequests.count >= maxRequests) {
            auditService.security('rate_limit_exceeded', {
              identifier,
              limit: maxRequests,
              current: userRequests.count,
              windowMs,
              ip: req.ip,
              url: req.originalUrl,
              method: req.method
            });
            
            return res.status(429).json({
                error: 'Too many requests',
                message: `Maximum ${maxRequests} requests per ${windowMs / 1000} seconds`,
                retryAfter: Math.ceil((userRequests.firstRequest + windowMs - now) / 1000)
            });
        }
        
        // Increment counter
        userRequests.count++;
        
        // Log rate limiting activity for monitoring
        if (userRequests.count > maxRequests * 0.8) { // Warn when approaching limit
            auditService.warn('Rate limit approaching', {
              identifier,
              current: userRequests.count,
              limit: maxRequests,
              remaining: maxRequests - userRequests.count,
              url: req.originalUrl
            });
        }
        
        next();
    };
};

// Specific rate limiters for different operations
export const challengeUpdateRateLimit = rateLimitMiddleware(5, 60000); // 5 requests per minute for challenge updates
export const platformUpdateRateLimit = rateLimitMiddleware(3, 120000); // 3 requests per 2 minutes for platform updates
export const registrationRateLimit = rateLimitMiddleware(5, 60000); // 5 registrations per minute (per IP/user) - prevents spam but allows legitimate usage