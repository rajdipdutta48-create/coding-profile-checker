const express = require("express");

const { checkProfiles } = require("../controllers/profileController");

const router = express.Router();

router.post("/check", checkProfiles);

module.exports = router;  