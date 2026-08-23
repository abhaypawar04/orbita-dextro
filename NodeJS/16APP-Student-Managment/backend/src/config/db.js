import mongoose from "mongoose";
import { config } from "./env.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri, {
      // These are the new recommended options for Mongoose 7+
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Handle MongoDB connection events
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err.message}`);
});
