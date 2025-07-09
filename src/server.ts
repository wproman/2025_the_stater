/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import { config } from "./config";
let server: ReturnType<typeof app.listen>;
// Connect DB & Start Server
mongoose
  .connect(config.database_url as string)
  .then(() => {
    console.log("✅ MongoDB connected");
    server = app.listen(config.port, () => {
      console.log(`✅ Server running on http://localhost:${config.port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

/**
 * Graceful Shutdown & Error Handling
 */

// Uncaught Exceptions (e.g. syntax error)
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});

// Unhandled Promise Rejections
// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on("unhandledRejection", (reason: any) => {
  console.error("❌ Unhandled Rejection:", reason);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

// SIGTERM (e.g. Docker stop / Vercel)
process.on("SIGTERM", () => {
  console.log("📴 SIGTERM received, shutting down gracefully...");
  if (server) {
    server.close(() => {
      console.log("🚪 Server closed");
      process.exit(0);
    });
  }
});
