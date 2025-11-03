// Standardized error handling system

import auditService from '../services/auditService.js';

export class AppError extends Error {
    constructor(message, statusCode, errorCode = null, details = null) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.details = details;
        this.isOperational = true; 
        
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    constructor(message, details = null) {
        super(message, 400, 'VALIDATION_ERROR', details);
    }
}

export class NotFoundError extends AppError {
    constructor(resource = 'Resource') {
        super(`${resource} not found`, 404, 'NOT_FOUND');
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized access') {
        super(message, 401, 'UNAUTHORIZED');
    }
}

export class ForbiddenError extends AppError {
    constructor(message = 'Forbidden access') {
        super(message, 403, 'FORBIDDEN');
    }
}

export class ConflictError extends AppError {
    constructor(message) {
        super(message, 409, 'CONFLICT');
    }
}

export class ExternalServiceError extends AppError {
    constructor(service, originalError = null) {
        super(`External service error: ${service}`, 503, 'EXTERNAL_SERVICE_ERROR', originalError?.message);
    }
}

export const globalErrorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    const auditMetadata = {
        requestId: req.auditContext?.requestId,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        userId: req.user?._id?.toString(),
        errorCode: error.errorCode,
        statusCode: error.statusCode,
        isOperational: error.isOperational
    };

    if (error.statusCode >= 500) {
        auditService.error('Server error occurred', error, auditMetadata);
    } else if (error.statusCode >= 400) {
        auditService.warn('Client error occurred', auditMetadata);
    } else {
        auditService.info('Error handled', auditMetadata);
    }

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        error = new ValidationError(message);
        auditService.dbOperation('validation_error', {
            ...auditMetadata,
            validationErrors: Object.keys(err.errors)
        });
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const message = `${field} already exists`;
        error = new ConflictError(message);
        auditService.dbOperation('duplicate_key_error', {
            ...auditMetadata,
            field,
            value: err.keyValue[field]
        });
    }

    if (err.name === 'JsonWebTokenError') {
        error = new UnauthorizedError('Invalid token');
        auditService.security('invalid_jwt_token', auditMetadata);
    }

    if (err.name === 'TokenExpiredError') {
        error = new UnauthorizedError('Token expired');
        auditService.security('expired_jwt_token', auditMetadata);
    }

    
    if (err.name === 'CastError') {
        error = new ValidationError('Invalid ID format');
        auditService.dbOperation('cast_error', {
            ...auditMetadata,
            field: err.path,
            value: err.value
        });
    }

    if (err.status === 429) {
        error = new AppError('Too many requests, please try again later', 429, 'RATE_LIMIT_EXCEEDED');
        auditService.security('rate_limit_error_response', auditMetadata);
    }

    if (!error.isOperational) {
        error = new AppError('Something went wrong', 500, 'INTERNAL_SERVER_ERROR');
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: {
            message: error.message,
            code: error.errorCode,
            ...(error.details && { details: error.details }),
            ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
        },
        timestamp: new Date().toISOString()
    });
};

export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export const sendSuccess = (res, data = null, message = 'Success', statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        message,
        data,
        timestamp: new Date().toISOString()
    });
};

export const sendPaginatedResponse = (res, data, pagination, message = 'Success') => {
    res.status(200).json({
        success: true,
        message,
        data,
        pagination: {
            currentPage: pagination.currentPage,
            totalPages: pagination.totalPages,
            totalItems: pagination.totalItems,
            hasMore: pagination.hasMore,
            limit: pagination.limit
        },
        timestamp: new Date().toISOString()
    });
};