async function checkProfilesService(profiles) {
  return {
    codeforces: profiles.codeforces || "",
    leetcode: profiles.leetcode || "",
    github: profiles.github || "",
  };
}

module.exports = {
  checkProfilesService,
};