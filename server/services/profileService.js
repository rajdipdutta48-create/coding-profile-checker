const { fetchCodeforcesProfile } = require("./codeforcesService");
const { fetchGithubProfile } = require("./githubService");
const { fetchLeetcodeProfile } = require("./leetcodeService");

async function checkProfilesService(profiles) {
  const results = {
    codeforces: null,
    leetcode: null,
    github: null,
  };

  const errors = {
    codeforces: null,
    leetcode: null,
    github: null,
  };

  const requests = [];

  if (profiles.codeforces?.trim()) {
    requests.push(
      fetchCodeforcesProfile(profiles.codeforces.trim())
        .then((data) => {
          results.codeforces = data;
        })
        .catch((error) => {
          errors.codeforces = error.message;
        })
    );
  }

  if (profiles.leetcode?.trim()) {
    requests.push(
      fetchLeetcodeProfile(profiles.leetcode.trim())
        .then((data) => {
          results.leetcode = data;
        })
        .catch((error) => {
          errors.leetcode = error.message;
        })
    );
  }

  if (profiles.github?.trim()) {
    requests.push(
      fetchGithubProfile(profiles.github.trim())
        .then((data) => {
          results.github = data;
        })
        .catch((error) => {
          errors.github = error.message;
        })
    );
  }

  await Promise.all(requests);

  return {
    results,
    errors,
  };
}

module.exports = {
  checkProfilesService,
};