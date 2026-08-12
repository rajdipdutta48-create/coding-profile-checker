const express = require("express");
const cors = require("cors");

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

app.post("/api/profile/check", (req, res) => {
  const { codeforces, leetcode, github } = req.body;

  res.json({
    success: true,
    message: "Profile data received successfully",
    profiles: {
      codeforces: codeforces || "",
      leetcode: leetcode || "",
      github: github || "",
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});