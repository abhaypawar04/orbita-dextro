import app from "./app.js";
import { config } from "./config/env.js";
import { connectDB } from "./config/db.js";

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start server
    const server = app.listen(config.port, () => {
      console.log(
        `🚀 Server running in ${config.nodeEnv} mode on port ${config.port}`,
      );
      console.log(`📡 API available at http://localhost:${config.port}/api/v1`);
      console.log(`❤️  Health check at http://localhost:${config.port}/health`);
    });

    // Handle graceful shutdown
    const shutdown = async (signal) => {
      console.log(`\nReceived ${signal}. Starting graceful shutdown...`);

      server.close(async () => {
        console.log("HTTP server closed");
        // Close MongoDB connection
        await mongoose.connection.close();
        console.log("MongoDB connection closed");
        process.exit(0);
      });

      // Force shutdown after timeout
      setTimeout(() => {
        console.error(
          "Could not close connections in time, forcefully shutting down",
        );
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
