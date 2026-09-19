import express from "express";
import rateLimit from "express-rate-limit";
import { AuthController } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

// Specific rate limiter for OTP endpoints to protect against brute force
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 15 OTP attempts per 15 minutes
  message: {
    status: "fail",
    message: "Too many OTP requests from this IP, please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user (creates pending/unverified state and sends OTP)
 * @access  Public
 */
router.post("/register", AuthController.register);

/**
 * @route   POST /api/v1/auth/verify-email
 * @desc    Verify email address using OTP
 * @access  Public
 */
router.post("/verify-email", otpLimiter, AuthController.verifyEmail);

/**
 * @route   POST /api/v1/auth/resend-verification-otp
 * @desc    Resend registration verification OTP
 * @access  Public
 */
router.post(
  "/resend-verification-otp",
  otpLimiter,
  AuthController.resendVerificationOtp,
);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post("/login", AuthController.login);

/**
 * @route   POST /api/v1/auth/forgot-password
 * @desc    Request password reset OTP
 * @access  Public
 */
router.post("/forgot-password", otpLimiter, AuthController.forgotPassword);

/**
 * @route   POST /api/v1/auth/verify-reset-otp
 * @desc    Verify password reset OTP
 * @access  Public
 */
router.post("/verify-reset-otp", otpLimiter, AuthController.verifyResetOtp);

/**
 * @route   POST /api/v1/auth/reset-password
 * @desc    Reset password using verified OTP
 * @access  Public
 */
router.post("/reset-password", otpLimiter, AuthController.resetPassword);

/**
 * @route   POST /api/v1/auth/google
 * @desc    Authenticate via Google OAuth ID Token
 * @access  Public
 */
router.post("/google", AuthController.googleAuth);

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get("/me", authenticate, AuthController.getMe);

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post("/logout", authenticate, AuthController.logout);

export default router;
