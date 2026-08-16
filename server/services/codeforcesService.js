async function fetchCodeforcesProfile(username) {
  const url = `https://codeforces.com/api/user.info?handles=${encodeURIComponent(
    username
  )}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Codeforces API request failed");
  }

  const data = await response.json();

  if (data.status !== "OK" || !data.result?.length) {
    throw new Error("Codeforces user not found");
  }

  const user = data.result[0];

  return {
    username: user.handle,
    rating: user.rating ?? null,
    maxRating: user.maxRating ?? null,
    rank: user.rank ?? null,
    maxRank: user.maxRank ?? null,
    contribution: user.contribution ?? 0,
  };
}

module.exports = {
  fetchCodeforcesProfile,
};