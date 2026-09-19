import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = [
  "PORT",
  "NODE_ENV",
  "MONGODB_URI",
  "JWT_SECRET",
  "JWT_EXPIRE",
];

// Validate required environment variables
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGODB_URI,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRE || "7d",
  },
  fileUpload: {
    maxSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 5242880, // 5MB
    uploadDir: process.env.UPLOAD_DIR || "uploads",
  },
  otp: {
    expireMinutes: parseInt(process.env.OTP_EXPIRE_MINUTES, 10) || 10,
    resendCooldownSeconds:
      parseInt(process.env.OTP_RESEND_COOLDOWN_SECONDS, 10) || 60,
    maxAttempts: parseInt(process.env.OTP_MAX_ATTEMPTS, 10) || 5,
  },
  email: {
    host: process.env.EMAIL_HOST || "",
    port: parseInt(process.env.EMAIL_PORT, 10) || 587,
    user: process.env.EMAIL_USER || "",
    password: process.env.EMAIL_PASSWORD || "",
    from: process.env.EMAIL_FROM || "Student Management <noreply@studentmanagement.com>",
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || "",
  },
};
