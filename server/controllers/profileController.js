const { checkProfilesService } = require("../services/profileService");

async function checkProfiles(req, res) {
  try {
    const { codeforces, leetcode, github } = req.body;

    const profiles = await checkProfilesService({
      codeforces,
      leetcode,
      github,
    });

    res.status(200).json({
      success: true,
      ...profiles,
    });
  } catch (error) {
    console.error("Profile controller error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to check profiles",
    });
  }
}

module.exports = {
  checkProfiles,
};