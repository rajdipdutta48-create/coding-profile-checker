const express = require("express");

const { analyzeProfile } = require("../controllers/aiController");

const router = express.Router();

router.post("/analyze", analyzeProfile);

module.exports = router;