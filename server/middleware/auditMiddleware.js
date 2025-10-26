import morgan from 'morgan';
import auditService from '../services/auditService.js';

// Custom Morgan token definitions
morgan.token('id', (req) => req.auditContext?.requestId || 'unknown');
morgan.token('user', (req) => req.user?._id?.toString() || 'anonymous');
morgan.token('real-ip', (req) => {
  return req.headers['x-forwarded-for'] || 
         req.headers['x-real-ip'] || 
         req.connection.remoteAddress || 
         req.ip;
});

// Custom Morgan format for structured logging
const morganFormat = JSON.stringify({
  timestamp: ':date[iso]',
  requestId: ':id',
  method: ':method',
  url: ':url',
  status: ':status',
  contentLength: ':res[content-length]',
  responseTime: ':response-time',
  userAgent: ':user-agent',
  userId: ':user',
  ip: ':real-ip',
  referrer: ':referrer'
});

// Create audit-aware Morgan middleware
export const httpLogger = morgan(morganFormat, {
  stream: {
    write: (message) => {
      try {
        const logData = JSON.parse(message.trim());
        
        // Extract numeric values
        const status = parseInt(logData.status);
        const responseTime = parseFloat(logData.responseTime);
        const contentLength = parseInt(logData.contentLength) || 0;

        // Determine log level based on status code
        let level = 'info';
        if (status >= 500) level = 'error';
        else if (status >= 400) level = 'warn';
        else if (status >= 300) level = 'info';

        // Create structured log entry
        const auditData = {
          category: auditService.categories.API,
          event: 'http_request',
          requestId: logData.requestId,
          userId: logData.userId !== 'anonymous' ? logData.userId : undefined,
          duration: responseTime,
          metadata: {
            method: logData.method,
            url: logData.url,
            status,
            contentLength,
            userAgent: logData.userAgent,
            ip: logData.ip,
            referrer: logData.referrer !== '-' ? logData.referrer : undefined
          }
        };

        // Log with appropriate level
        auditService[level](`${logData.method} ${logData.url} ${status}`, auditData);

        // Track slow requests separately
        if (responseTime > 1000) {
          auditService.performance('slow_request', {
            method: logData.method,
            url: logData.url,
            duration: responseTime,
            status,
            userId: auditData.userId,
            requestId: logData.requestId
          });
        }

        // Track error patterns
        if (status >= 400) {
          auditService.apiEvent('request_error', {
            method: logData.method,
            url: logData.url,
            status,
            userId: auditData.userId,
            ip: logData.ip,
            requestId: logData.requestId
          });
        }

      } catch (error) {
        // Fallback to basic logging if JSON parsing fails
        auditService.error('Failed to parse Morgan log', error, { rawMessage: message });
      }
    }
  }
});

// Request context middleware (sets up audit context for each request)
export const auditContextMiddleware = (req, res, next) => {
  // Create audit context for this request
  req.auditContext = auditService.createRequestContext(req);
  
  // Log request start
  auditService.debug(`Request started: ${req.method} ${req.originalUrl}`, {
    requestId: req.auditContext.requestId,
    method: req.method,
    url: req.originalUrl,
    userId: req.auditContext.userId,
    ip: req.auditContext.ip,
    userAgent: req.auditContext.userAgent
  });

  // Add response logging
  const originalSend = res.send;
  res.send = function(body) {
    // Log response completion
    const duration = req.auditContext.logDuration();
    
    // Track response size if available
    const responseSize = Buffer.isBuffer(body) ? body.length : 
                        typeof body === 'string' ? Buffer.byteLength(body) : 0;

    auditService.debug(`Request completed: ${req.method} ${req.originalUrl}`, {
      requestId: req.auditContext.requestId,
      status: res.statusCode,
      duration,
      responseSize,
      userId: req.auditContext.userId
    });

    return originalSend.call(this, body);
  };

  next();
};

// Error logging middleware (should be used after routes)
export const auditErrorMiddleware = (error, req, res, next) => {
  const requestId = req.auditContext?.requestId || 'unknown';
  const userId = req.user?._id?.toString();

  auditService.error('Request error occurred', error, {
    requestId,
    userId,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    body: req.body,
    query: req.query,
    params: req.params
  });

  // Track security-related errors
  if (error.name === 'UnauthorizedError' || error.status === 401) {
    auditService.security('unauthorized_access', {
      requestId,
      userId,
      url: req.originalUrl,
      ip: req.ip,
      method: req.method
    });
  }

  if (error.status === 429) {
    auditService.security('rate_limit_exceeded', {
      requestId,
      userId,
      ip: req.ip,
      url: req.originalUrl
    });
  }

  next(error);
};

// Request body logging middleware (for sensitive operations)
export const auditSensitiveOperation = (operation) => {
  return (req, res, next) => {
    const requestId = req.auditContext?.requestId || 'unknown';
    const userId = req.user?._id?.toString();

    auditService.security(`Sensitive operation: ${operation}`, {
      requestId,
      userId,
      operation,
      url: req.originalUrl,
      ip: req.ip,
      method: req.method,
      timestamp: new Date().toISOString()
    });

    next();
  };
};

// Rate limiting audit helper
export const auditRateLimit = (identifier, limit, windowMs, current) => {
  auditService.debug('Rate limit check', {
    category: auditService.categories.SECURITY,
    event: 'rate_limit_check',
    identifier,
    limit,
    windowMs,
    current,
    remaining: Math.max(0, limit - current)
  });

  if (current >= limit) {
    auditService.warn('Rate limit exceeded', {
      category: auditService.categories.SECURITY,
      event: 'rate_limit_exceeded',
      identifier,
      limit,
      current,
      windowMs
    });
  }
};

// Performance monitoring middleware
export const performanceMonitor = (req, res, next) => {
  const start = process.hrtime.bigint();
  
  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const duration = Number(end - start) / 1000000; // Convert to milliseconds

    auditService.performance('request_performance', {
      requestId: req.auditContext?.requestId,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration,
      userId: req.user?._id?.toString()
    });
  });

  next();
};

export default {
  httpLogger,
  auditContextMiddleware,
  auditErrorMiddleware,
  auditSensitiveOperation,
  auditRateLimit,
  performanceMonitor
};