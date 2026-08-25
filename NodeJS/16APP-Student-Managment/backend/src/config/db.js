import dns from "node:dns";
import mongoose from "mongoose";
import { config } from "./env.js";

// Workaround for Node.js SRV DNS resolution issue on Windows
dns.setServers(["8.8.8.8", "1.1.1.1"]);

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri);

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
