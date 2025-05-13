const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const rateLimitRouter = require("./routes/rateLimitRoute");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api", rateLimitRouter);

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
