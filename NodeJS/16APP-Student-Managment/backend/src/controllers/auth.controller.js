import { AuthService } from "../services/auth.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { sanitizeUser } from "../utils/helper.js";
import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  resendOtpSchema,
  forgotPasswordSchema,
  verifyResetOtpSchema,
  resetPasswordSchema,
  googleAuthSchema,
} from "../validators/auth.validator.js";

export class AuthController {
  static async register(req, res, next) {
    try {
      const validatedData = await registerSchema.validateAsync(req.body);
      const result = await AuthService.register(validatedData);

      res
        .status(201)
        .json(
          ApiResponse.success(
            result,
            result.message || "Registration successful. Please verify your OTP.",
            201,
          ),
        );
    } catch (error) {
      next(error);
    }
  }

  static async verifyEmail(req, res, next) {
    try {
      const { email, otp } = await verifyEmailSchema.validateAsync(req.body);
      const { user, token, message } = await AuthService.verifyEmail(email, otp);

      res.status(200).json(
        ApiResponse.success(
          { user: sanitizeUser(user), token },
          message || "Email verified successfully",
        ),
      );
    } catch (error) {
      next(error);
    }
  }

  static async resendVerificationOtp(req, res, next) {
    try {
      const { email } = await resendOtpSchema.validateAsync(req.body);
      const result = await AuthService.resendVerificationOtp(email);

      res.status(200).json(ApiResponse.success(result, result.message));
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = await loginSchema.validateAsync(req.body);
      const { user, token } = await AuthService.login(email, password);

      res
        .status(200)
        .json(
          ApiResponse.success(
            { user: sanitizeUser(user), token },
            "Login successful",
          ),
        );
    } catch (error) {
      next(error);
    }
  }

  static async forgotPassword(req, res, next) {
    try {
      const { email } = await forgotPasswordSchema.validateAsync(req.body);
      const result = await AuthService.forgotPassword(email);

      res.status(200).json(ApiResponse.success(result, result.message));
    } catch (error) {
      next(error);
    }
  }

  static async verifyResetOtp(req, res, next) {
    try {
      const { email, otp } = await verifyResetOtpSchema.validateAsync(req.body);
      const result = await AuthService.verifyResetOtp(email, otp);

      res.status(200).json(ApiResponse.success(result, result.message));
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const { email, otp, newPassword, confirmNewPassword } =
        await resetPasswordSchema.validateAsync(req.body);
      const result = await AuthService.resetPassword(email, otp, newPassword);

      res.status(200).json(ApiResponse.success(result, result.message));
    } catch (error) {
      next(error);
    }
  }

  static async googleAuth(req, res, next) {
    try {
      const { credential } = await googleAuthSchema.validateAsync(req.body);
      const { user, token } = await AuthService.googleAuth(credential);

      res.status(200).json(
        ApiResponse.success(
          { user: sanitizeUser(user), token },
          "Google authentication successful",
        ),
      );
    } catch (error) {
      next(error);
    }
  }

  static async getMe(req, res, next) {
    try {
      const user = await AuthService.getCurrentUser(req.user._id);

      res
        .status(200)
        .json(
          ApiResponse.success(
            { user: sanitizeUser(user) },
            "User profile retrieved successfully",
          ),
        );
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      res
        .status(200)
        .json(ApiResponse.success(null, "Logged out successfully"));
    } catch (error) {
      next(error);
    }
  }
}
