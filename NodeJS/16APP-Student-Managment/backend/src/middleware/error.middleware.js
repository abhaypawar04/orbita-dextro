import { ApiError } from "../utils/apiError.js";

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error("Error:", error);

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with id: ${err.value}`;
    error = new ApiError(404, message);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    const message = `Duplicate value for field: ${field}`;
    error = new ApiError(409, message);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error = new ApiError(400, message);
  }

  // Multer errors
  if (err.name === "MulterError") {
    const message = err.message || "File upload error";
    error = new ApiError(400, message);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token. Please log in again.";
    error = new ApiError(401, message);
  }

  if (err.name === "TokenExpiredError") {
    const message = "Token expired. Please log in again.";
    error = new ApiError(401, message);
  }

  // Default error response
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  // If error is not operational, send generic message in production
  const isDevelopment = process.env.NODE_ENV === "development";
  const responseMessage =
    isDevelopment || error.isOperational ? message : "Something went wrong";

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: responseMessage,
    ...(isDevelopment && { stack: err.stack }),
    ...(error.errors && { errors: JSON.parse(error.errors) }),
  });
};

// 404 handler for undefined routes
export const notFoundHandler = (req, res, next) => {
  const error = new ApiError(404, `Route ${req.originalUrl} not found`);
  next(error);
};
