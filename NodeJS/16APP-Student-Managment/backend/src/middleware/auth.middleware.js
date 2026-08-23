import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { config } from "../config/env.js";
import { ApiError } from "../utils/apiError.js";

export const authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(
        401,
        "Authentication required. Please provide a valid token",
      );
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt.secret);
    } catch (error) {
      throw new ApiError(401, "Invalid or expired token");
    }

    // Find user
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      throw new ApiError(401, "User not found");
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Authentication required"));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "Insufficient permissions"));
    }

    next();
  };
};
