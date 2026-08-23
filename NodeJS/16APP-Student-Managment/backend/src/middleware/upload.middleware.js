import multer from "multer";
import path from "path";
import { config } from "../config/env.js";
import { ApiError } from "../utils/apiError.js";

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.fileUpload.uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter for images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        400,
        "Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed",
      ),
      false,
    );
  }
};

// Create multer instance
export const upload = multer({
  storage,
  limits: {
    fileSize: config.fileUpload.maxSize,
  },
  fileFilter,
});

// Single file upload middleware
export const uploadSingle = (fieldName) => {
  return (req, res, next) => {
    const uploadMiddleware = upload.single(fieldName);

    uploadMiddleware(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return next(
            new ApiError(
              413,
              `File too large. Max size: ${config.fileUpload.maxSize / (1024 * 1024)}MB`,
            ),
          );
        }
        return next(new ApiError(400, `Upload error: ${err.message}`));
      }
      if (err) {
        return next(err);
      }
      next();
    });
  };
};
