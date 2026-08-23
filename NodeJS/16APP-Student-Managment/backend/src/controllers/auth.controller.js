import { AuthService } from "../services/auth.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { sanitizeUser } from "../utils/helper.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";

export class AuthController {
  static async register(req, res, next) {
    try {
      // Validate request body
      const validatedData = await registerSchema.validateAsync(req.body);

      const user = await AuthService.register(validatedData);

      res
        .status(201)
        .json(
          ApiResponse.success(
            { user: sanitizeUser(user) },
            "User registered successfully",
            201,
          ),
        );
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      // Validate request body
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
      // JWT is stateless, so logout is handled client-side
      // We just return a success response
      res
        .status(200)
        .json(ApiResponse.success(null, "Logged out successfully"));
    } catch (error) {
      next(error);
    }
  }
}
