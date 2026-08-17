require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./authentication/authRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const API_PREFIX = process.env.VERCEL ? "" : "/api";

app.get(`${API_PREFIX}/health`, (req, res) => {
  res.json({
    success: true,
    message: "Coding Profile Checker API is running",
  });
});

app.use(`${API_PREFIX}/profile`, profileRoutes);
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/ai`, aiRoutes);

let mongoConnectionPromise;

function connectToMongoDB() {
  if (!mongoConnectionPromise) {
    mongoConnectionPromise = mongoose.connect(process.env.MONGODB_URI);
  }

  return mongoConnectionPromise;
}

app.use(async (req, res, next) => {
  try {
    await connectToMongoDB();
    next();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

if (!process.env.VERCEL) {
  connectToMongoDB()
    .then(() => {
      const PORT = process.env.PORT || 5000;

      app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("MongoDB connection failed:", error.message);
    });
}

module.exports = app;