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

    recentAcSubmissionList(username: $username, limit: 20) {
      id
      title
      titleSlug
      timestamp
      lang
      statusDisplay
    }
  }
`;

const PROBLEM_TOPIC_QUERY = `
  query questionData($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      title
      titleSlug

      topicTags {
        name
        slug
      }
    }
  }
`;

async function fetchProblemTopics(titleSlug) {
  try {
    const response = await fetch(LEETCODE_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: PROBLEM_TOPIC_QUERY,
        variables: {
          titleSlug,
        },
        operationName: "questionData",
      }),
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    if (data.errors?.length) {
      return [];
    }

    return data.data?.question?.topicTags ?? [];
  } catch {
    return [];
  }
}

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

  const recentSubmissions =
    data.data?.recentAcSubmissionList ?? [];

  const submissionsWithTopics = await Promise.all(
    recentSubmissions.map(async (submission) => {
      const topics = await fetchProblemTopics(
        submission.titleSlug
      );

      return {
        id: submission.id,
        title: submission.title,
        titleSlug: submission.titleSlug,
        language: submission.lang,
        status: submission.statusDisplay,
        timestamp: submission.timestamp,
        topics,
      };
    })
  );

  const topicFrequency = {};

  for (const submission of submissionsWithTopics) {
    for (const topic of submission.topics) {
      topicFrequency[topic.name] =
        (topicFrequency[topic.name] || 0) + 1;
    }
  }

  return {
    username: user.username,
    ranking: user.profile?.ranking ?? null,
    realName: user.profile?.realName ?? null,
    country: user.profile?.countryName ?? null,
    reputation: user.profile?.reputation ?? 0,

    solved,

    recentSubmissions: submissionsWithTopics,

    topicFrequency,
  };
}

module.exports = {
  fetchLeetcodeProfile,
};