import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [
        function () {
          return this.authProvider === "local";
        },
        "Password is required",
      ],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    googleId: {
      type: String,
      default: null,
    },

    verificationOtp: {
      hash: { type: String, select: false },
      expiresAt: { type: Date, select: false },
      attempts: { type: Number, default: 0, select: false },
      lastSentAt: { type: Date, select: false },
    },

    resetOtp: {
      hash: { type: String, select: false },
      expiresAt: { type: Date, select: false },
      attempts: { type: Number, default: 0, select: false },
      lastSentAt: { type: Date, select: false },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.password || !this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);
});

export const User = mongoose.model("User", userSchema);
