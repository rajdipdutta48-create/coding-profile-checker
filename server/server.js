require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./authentication/authRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Coding Profile Checker API is running",
  });
});

app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Atlas connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });