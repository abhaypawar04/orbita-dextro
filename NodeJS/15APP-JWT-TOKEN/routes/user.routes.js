import express from "express";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// ============================================================
// REGISTER
// ============================================================

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required",
      });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username or email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    // Don't send password back to client
    const userResponse = {
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
    };

    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
    });
  } catch (err) {
    console.error("Register error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// ============================================================
// LOGIN
// ============================================================

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check required fields
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ username });

    // IMPORTANT: check user, not username
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Check JWT secret
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT_SECRET is not configured",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error("Login error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// ============================================================
// LOGOUT
// ============================================================

router.post("/logout", async (req, res) => {
  try {
    // If you're storing JWT in localStorage on the frontend,
    // logout is normally handled by removing the token there.
    //
    // If you're using cookies, you should clear the cookie here.

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;
