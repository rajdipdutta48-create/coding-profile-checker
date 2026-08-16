const GITHUB_API_URL = "https://api.github.com";
const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

async function githubRequest(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2026-03-10",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("GitHub user not found");
    }

    throw new Error("GitHub API request failed");
  }

  return response.json();
}

async function githubGraphQLRequest(query, variables) {
  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error("GitHub GraphQL API request failed");
  }

  const data = await response.json();

  if (data.errors?.length) {
    console.error("GitHub GraphQL error:", data.errors);

    throw new Error(
      data.errors[0]?.message ||
        "GitHub contribution data request failed"
    );
  }

  return data.data;
}

const CONTRIBUTION_QUERY = `
  query GetContributionCalendar($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

async function fetchGithubActivity(username) {
  const data = await githubGraphQLRequest(
    CONTRIBUTION_QUERY,
    {
      username,
    }
  );

  const user = data.user;

  if (!user) {
    throw new Error("GitHub user not found");
  }

  const calendar =
    user.contributionsCollection?.contributionCalendar;

  if (!calendar) {
    throw new Error(
      "GitHub contribution calendar not available"
    );
  }

  const activity = {};

  for (const week of calendar.weeks ?? []) {
    for (const day of week.contributionDays ?? []) {
      activity[day.date] = day.contributionCount;
    }
  }

  return {
    activity,
    totalContributions:
      calendar.totalContributions ?? 0,
  };
}

async function fetchGithubProfile(username) {
  const user = await githubRequest(
    `${GITHUB_API_URL}/users/${encodeURIComponent(username)}`
  );

  const contributionData =
    await fetchGithubActivity(username);

  return {
    username: user.login,
    name: user.name,
    avatarUrl: user.avatar_url,
    profileUrl: user.html_url,
    bio: user.bio,
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,

    activity: contributionData.activity,

    totalContributions:
      contributionData.totalContributions,
  };
}

module.exports = {
  fetchGithubProfile,
};