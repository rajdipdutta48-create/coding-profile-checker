const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

const USER_PROFILE_QUERY = `
  query userPublicProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
        realName
        aboutMe
        countryName
        reputation
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

async function fetchLeetcodeProfile(username) {
  const response = await fetch(LEETCODE_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: USER_PROFILE_QUERY,
      variables: {
        username,
      },
      operationName: "userPublicProfile",
    }),
  });

  if (!response.ok) {
    throw new Error("LeetCode API request failed");
  }

  const data = await response.json();

  if (data.errors?.length) {
    throw new Error("LeetCode profile request failed");
  }

  const user = data.data?.matchedUser;

  if (!user) {
    throw new Error("LeetCode user not found");
  }

  const solved = {
    all: 0,
    easy: 0,
    medium: 0,
    hard: 0,
  };

  for (const item of user.submitStatsGlobal?.acSubmissionNum ?? []) {
    if (item.difficulty === "All") {
      solved.all = item.count;
    } else if (item.difficulty === "Easy") {
      solved.easy = item.count;
    } else if (item.difficulty === "Medium") {
      solved.medium = item.count;
    } else if (item.difficulty === "Hard") {
      solved.hard = item.count;
    }
  }

  return {
    username: user.username,
    ranking: user.profile?.ranking ?? null,
    realName: user.profile?.realName ?? null,
    country: user.profile?.countryName ?? null,
    reputation: user.profile?.reputation ?? 0,
    solved,
  };
}

module.exports = {
  fetchLeetcodeProfile,
};