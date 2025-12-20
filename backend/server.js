import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import skillRoutes from "./routes/skills.js";
import chatRoutes from "./routes/chat.js";
import profileRoutes from "./routes/profile.js";

dotenv.config();

// Connect Database
connectDB();

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: "*", // allow all origins for development
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// JSON middleware
app.use(express.json({ limit: "20mb" }));

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5000;

// IMPORTANT: Mobile devices need 0.0.0.0
//app.listen(PORT, "0.0.0.0", () => {
  //console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
//});"

// ✅ DEFAULT EXPORT (ES MODULE)
export default app;
  