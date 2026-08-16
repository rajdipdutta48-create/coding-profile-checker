const express = require("express");
const cors = require("cors");

const profileRoutes = require("./routes/profileRoutes");

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});