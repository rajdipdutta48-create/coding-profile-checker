async function fetchGithubProfile(username) {
  const url = `https://api.github.com/users/${encodeURIComponent(username)}`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2026-03-10",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("GitHub user not found");
    }

    throw new Error("GitHub API request failed");
  }

  const user = await response.json();

  return {
    username: user.login,
    name: user.name,
    avatarUrl: user.avatar_url,
    profileUrl: user.html_url,
    bio: user.bio,
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
  };
}

module.exports = {
  fetchGithubProfile,
};