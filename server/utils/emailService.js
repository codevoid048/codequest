import nodemailer from "nodemailer";
import dotenv from "dotenv";
import auditService from "../services/auditService.js";
dotenv.config();

// Rate limiting storage
const emailSendAttempts = new Map();

// Constants for better maintainability
const EMAIL_CONFIG = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 5000,
  tls: {
    rejectUnauthorized: false
  },
};

const RATE_LIMIT = {
  MAX_ATTEMPTS: 3,
  WINDOW_MS: 3600000, // 1 hour
};

const checkRateLimit = (email) => {
  const now = Date.now();
  const attempt = emailSendAttempts.get(email);

  if (attempt) {
    // Reset count if window has expired
    if (now - attempt.firstAttempt > RATE_LIMIT.WINDOW_MS) {
      emailSendAttempts.delete(email);
      return false;
    }

    // Check if exceeded max attempts
    if (attempt.count >= RATE_LIMIT.MAX_ATTEMPTS) {
      const timeLeft = Math.ceil((RATE_LIMIT.WINDOW_MS - (now - attempt.firstAttempt)) / 60000);
      auditService.security('email_rate_limit_exceeded', { email, attempts: attempt.count });
      throw new Error(`Too many verification attempts. Please try again in ${timeLeft} minute(s).`);
    }
  }
  return false;
};

const updateRateLimit = (email) => {
  const now = Date.now();
  const attempt = emailSendAttempts.get(email);

  if (attempt) {
    attempt.count += 1;
    attempt.lastAttempt = now;
  } else {
    emailSendAttempts.set(email, {
      count: 1,
      firstAttempt: now,
      lastAttempt: now,
    });
  }

  // Schedule cleanup for this email
  setTimeout(() => {
    emailSendAttempts.delete(email);
  }, RATE_LIMIT.WINDOW_MS);
};

export const sendOTPEmail = async (email, otp) => {
  if (!email || !otp) {
    throw new Error("Email and OTP are required");
  }

  try {
    // Check rate limit before proceeding
    checkRateLimit(email);

    const transporter = nodemailer.createTransporter(EMAIL_CONFIG);
    await transporter.verify();

    const mailOptions = {
      from: `"CodeQuest" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Verification OTP",
      text: `Your verification code is: ${otp}\n\nThis code will expire in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Email Verification</h2>
          <p>Your verification code is:</p>
          <div style="font-size: 24px; font-weight: bold; margin: 20px 0;">${otp}</div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    // Update rate limit only after successful send
    updateRateLimit(email);

    return true;
  } catch (error) {
    auditService.error('otp_email_error', { email, error: error.message });
    throw error;
  }
};

export const deleteConfirmationMail = async (email) => {
  const traceId = auditService.startTrace('send_deletion_confirmation_email');
  
  if (!email) {
    auditService.error('deletion_email_validation_failed', { email, error: 'Missing email' }, traceId);
    throw new Error("Email is required");
  }

  try {
    auditService.userAction('deletion_confirmation_email_started', { email }, traceId);
    
    const transporter = nodemailer.createTransporter(EMAIL_CONFIG);
    await transporter.verify();

    const mailOptions = {
      from: `"CodeQuest" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Account Has Been Deleted",
      text: `We're sorry to see you go. Your account has been successfully deleted.\n\nIf this wasn't you, please contact our support team immediately.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Account Deletion Confirmation</h2>
          <p>We're sorry to see you go. Your account has been successfully deleted.</p>
          <p>All your data has been removed from our systems in accordance with our privacy policy.</p>
          <p>If this wasn't you, please contact our support team immediately at support@codequest.com.</p>
          <p>Thank you for being part of our community.</p>
          <p style="margin-top: 30px; color: #666;">
            <small>The CodeQuest Team</small>
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    auditService.userAction('deletion_confirmation_email_sent', { email }, traceId);

    return true;
  } catch (error) {
    auditService.error('deletion_confirmation_email_failed', { email, error: error.message }, traceId);
    throw error;
  }
};

// Optional: Cleanup old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [email, attempt] of emailSendAttempts.entries()) {
    if (now - attempt.firstAttempt > RATE_LIMIT.WINDOW_MS) {
      emailSendAttempts.delete(email);
    }
  }
}, RATE_LIMIT.WINDOW_MS);

export const sendResetPassEmail = async (email, resetLink) => {
  if (!email || !resetLink) {
    throw new Error("Email and reset link are required");
  }

  try {
    
    const transporter = nodemailer.createTransporter(EMAIL_CONFIG);
    await transporter.verify();

    const mailOptions = {
      from: `"CodeQuest" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Click the link below to reset your password:\n${resetLink}\n\nIf you didn't request this, please ignore this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Password Reset Request</h2>
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="${resetLink}" style="color: #007bff;">Reset Password</a>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    
    return true;
  } catch (error) {
    auditService.error('reset_email_error', { email, error: error.message });
    throw error;
  }
};