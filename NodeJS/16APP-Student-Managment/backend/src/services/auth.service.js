import { OAuth2Client } from "google-auth-library";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { ApiError } from "../utils/apiError.js";
import { config } from "../config/env.js";
import { generateOtp, hashOtp, verifyOtpHash } from "../utils/otp.js";
import { EmailService } from "./email.service.js";

const googleClient = new OAuth2Client(config.google.clientId);

export class AuthService {
  /**
   * Register a new user with pending/unverified state & send OTP email.
   */
  static async register(userData) {
    const existingUser = await User.findOne({ email: userData.email.toLowerCase() });

    if (existingUser) {
      if (existingUser.isEmailVerified) {
        throw new ApiError(409, "Email already registered. Please log in.");
      }

      // If user exists but is unverified, update their details & re-send OTP
      const otp = generateOtp();
      const otpHash = hashOtp(otp);
      const expiresAt = new Date(Date.now() + config.otp.expireMinutes * 60 * 1000);

      existingUser.name = userData.name;
      existingUser.password = userData.password;
      existingUser.verificationOtp = {
        hash: otpHash,
        expiresAt,
        attempts: 0,
        lastSentAt: new Date(),
      };

      await existingUser.save();
      await EmailService.sendVerificationEmail(existingUser.email, otp);

      return {
        email: existingUser.email,
        requiresVerification: true,
        message: "Registration updated. Please verify the OTP sent to your email.",
      };
    }

    // Create new unverified user
    const otp = generateOtp();
    const otpHash = hashOtp(otp);
    const expiresAt = new Date(Date.now() + config.otp.expireMinutes * 60 * 1000);

    const user = await User.create({
      ...userData,
      email: userData.email.toLowerCase(),
      isEmailVerified: false,
      authProvider: "local",
      verificationOtp: {
        hash: otpHash,
        expiresAt,
        attempts: 0,
        lastSentAt: new Date(),
      },
    });

    await EmailService.sendVerificationEmail(user.email, otp);

    return {
      email: user.email,
      requiresVerification: true,
      message: "User registered successfully. Please verify the OTP sent to your email.",
    };
  }

  /**
   * Verify email using OTP.
   */
  static async verifyEmail(email, otp) {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select(
      "+verificationOtp.hash +verificationOtp.expiresAt +verificationOtp.attempts +verificationOtp.lastSentAt",
    );

    if (!user) {
      throw new ApiError(404, "User account not found");
    }

    if (user.isEmailVerified) {
      const token = generateToken(user._id);
      return { user, token, message: "Email is already verified." };
    }

    if (!user.verificationOtp || !user.verificationOtp.hash) {
      throw new ApiError(400, "No OTP verification active. Please request a new OTP.");
    }

    if (new Date() > new Date(user.verificationOtp.expiresAt)) {
      throw new ApiError(400, "OTP has expired. Please request a new OTP.");
    }

    if (user.verificationOtp.attempts >= config.otp.maxAttempts) {
      throw new ApiError(
        429,
        "Maximum OTP attempts exceeded. Please request a new OTP.",
      );
    }

    const isValid = verifyOtpHash(otp, user.verificationOtp.hash);
    if (!isValid) {
      user.verificationOtp.attempts += 1;
      await user.save();
      const attemptsLeft = config.otp.maxAttempts - user.verificationOtp.attempts;
      throw new ApiError(
        400,
        `Invalid OTP. ${attemptsLeft > 0 ? `${attemptsLeft} attempt(s) remaining.` : "Maximum attempts reached. Request a new OTP."}`,
      );
    }

    // Mark email as verified and clear verification OTP
    user.isEmailVerified = true;
    user.verificationOtp = undefined;
    await user.save();

    const token = generateToken(user._id);
    return { user, token };
  }

  /**
   * Resend Verification OTP.
   */
  static async resendVerificationOtp(email) {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select(
      "+verificationOtp.lastSentAt",
    );

    if (!user) {
      throw new ApiError(404, "User account not found");
    }

    if (user.isEmailVerified) {
      throw new ApiError(400, "Email is already verified. You can log in.");
    }

    // Check resend cooldown
    if (user.verificationOtp && user.verificationOtp.lastSentAt) {
      const secondsSinceLastSent =
        (Date.now() - new Date(user.verificationOtp.lastSentAt).getTime()) / 1000;
      if (secondsSinceLastSent < config.otp.resendCooldownSeconds) {
        const waitTime = Math.ceil(
          config.otp.resendCooldownSeconds - secondsSinceLastSent,
        );
        throw new ApiError(
          429,
          `Please wait ${waitTime} second(s) before requesting another OTP.`,
        );
      }
    }

    const otp = generateOtp();
    const otpHash = hashOtp(otp);
    const expiresAt = new Date(Date.now() + config.otp.expireMinutes * 60 * 1000);

    user.verificationOtp = {
      hash: otpHash,
      expiresAt,
      attempts: 0,
      lastSentAt: new Date(),
    };

    await user.save();
    await EmailService.sendVerificationEmail(user.email, otp);

    return { message: "Verification OTP has been resent to your email." };
  }

  /**
   * Login user with password & verification check.
   */
  static async login(email, password) {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select("+password");
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    // Check if account email is verified
    if (!user.isEmailVerified) {
      // Auto-trigger an OTP resend if no active OTP
      try {
        const otp = generateOtp();
        const otpHash = hashOtp(otp);
        const expiresAt = new Date(Date.now() + config.otp.expireMinutes * 60 * 1000);

        user.verificationOtp = {
          hash: otpHash,
          expiresAt,
          attempts: 0,
          lastSentAt: new Date(),
        };
        await user.save();
        await EmailService.sendVerificationEmail(user.email, otp);
      } catch (err) {
        // Silently continue if auto-resend encounters cooldown
      }

      throw new ApiError(
        403,
        "Email is not verified. A verification OTP has been sent to your email.",
        { requiresVerification: true, email: user.email },
      );
    }

    const token = generateToken(user._id);
    return { user, token };
  }

  /**
   * Forgot Password - Request Reset OTP.
   */
  static async forgotPassword(email) {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select(
      "+resetOtp.lastSentAt",
    );

    // Generic secure message to prevent email enumeration
    const genericResponse = {
      message: "If an account with that email exists, a password reset OTP has been sent.",
    };

    if (!user || user.authProvider !== "local") {
      return genericResponse;
    }

    // Check resend cooldown
    if (user.resetOtp && user.resetOtp.lastSentAt) {
      const secondsSinceLastSent =
        (Date.now() - new Date(user.resetOtp.lastSentAt).getTime()) / 1000;
      if (secondsSinceLastSent < config.otp.resendCooldownSeconds) {
        const waitTime = Math.ceil(
          config.otp.resendCooldownSeconds - secondsSinceLastSent,
        );
        throw new ApiError(
          429,
          `Please wait ${waitTime} second(s) before requesting another OTP.`,
        );
      }
    }

    const otp = generateOtp();
    const otpHash = hashOtp(otp);
    const expiresAt = new Date(Date.now() + config.otp.expireMinutes * 60 * 1000);

    user.resetOtp = {
      hash: otpHash,
      expiresAt,
      attempts: 0,
      lastSentAt: new Date(),
    };

    await user.save();
    await EmailService.sendPasswordResetEmail(user.email, otp);

    return genericResponse;
  }

  /**
   * Verify Reset OTP.
   */
  static async verifyResetOtp(email, otp) {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select(
      "+resetOtp.hash +resetOtp.expiresAt +resetOtp.attempts",
    );

    if (!user || !user.resetOtp || !user.resetOtp.hash) {
      throw new ApiError(400, "Invalid or expired password reset request.");
    }

    if (new Date() > new Date(user.resetOtp.expiresAt)) {
      throw new ApiError(400, "Reset OTP has expired. Please request a new one.");
    }

    if (user.resetOtp.attempts >= config.otp.maxAttempts) {
      throw new ApiError(
        429,
        "Maximum OTP attempts exceeded. Please request a new OTP.",
      );
    }

    const isValid = verifyOtpHash(otp, user.resetOtp.hash);
    if (!isValid) {
      user.resetOtp.attempts += 1;
      await user.save();
      const attemptsLeft = config.otp.maxAttempts - user.resetOtp.attempts;
      throw new ApiError(
        400,
        `Invalid OTP. ${attemptsLeft > 0 ? `${attemptsLeft} attempt(s) remaining.` : "Maximum attempts reached. Request a new OTP."}`,
      );
    }

    return { email: user.email, otpVerified: true, message: "Reset OTP verified successfully." };
  }

  /**
   * Reset Password with OTP verification.
   */
  static async resetPassword(email, otp, newPassword) {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select(
      "+password +resetOtp.hash +resetOtp.expiresAt +resetOtp.attempts",
    );

    if (!user || !user.resetOtp || !user.resetOtp.hash) {
      throw new ApiError(400, "Invalid or expired password reset request.");
    }

    if (new Date() > new Date(user.resetOtp.expiresAt)) {
      throw new ApiError(400, "Reset OTP has expired. Please request a new one.");
    }

    const isValid = verifyOtpHash(otp, user.resetOtp.hash);
    if (!isValid) {
      throw new ApiError(400, "Invalid OTP or reset request expired.");
    }

    // Update password and invalidate reset OTP
    user.password = newPassword;
    user.resetOtp = undefined;
    await user.save();

    return { message: "Password reset successful! You can now log in with your new password." };
  }

  /**
   * Google OAuth Login / Signup.
   */
  static async googleAuth(credential) {
    let payload;
    try {
      if (config.google.clientId) {
        const ticket = await googleClient.verifyIdToken({
          idToken: credential,
          audience: config.google.clientId,
        });
        payload = ticket.getPayload();
      } else {
        // Fallback for development if GOOGLE_CLIENT_ID isn't set yet: decode JSON payload safely
        const base64Url = credential.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join(""),
        );
        payload = JSON.parse(jsonPayload);
      }
    } catch (err) {
      throw new ApiError(401, "Google authentication failed. Invalid token.");
    }

    if (!payload || !payload.email) {
      throw new ApiError(401, "Google token did not provide a valid email address.");
    }

    const email = payload.email.toLowerCase();
    const name = payload.name || email.split("@")[0];
    const googleId = payload.sub;

    let user = await User.findOne({ email });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
      }
      user.isEmailVerified = true;
      await user.save();
    } else {
      user = await User.create({
        name,
        email,
        authProvider: "google",
        googleId,
        isEmailVerified: true,
      });
    }

    const token = generateToken(user._id);
    return { user, token };
  }

  static async getCurrentUser(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return user;
  }
}
