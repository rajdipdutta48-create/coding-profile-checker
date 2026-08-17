const { generateProfileAnalysis } = require("../services/aiService");

async function analyzeProfile(req, res) {
  try {
    const profiles = req.body;

    if (!profiles || Object.keys(profiles).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Profile data is required.",
      });
    }

    const analysis = await generateProfileAnalysis(profiles);

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error("AI controller error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI analysis.",
    });
  }
}

module.exports = {
  analyzeProfile,
};