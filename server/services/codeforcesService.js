function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchAllCodeforcesSubmissions(username) {
  const allSubmissions = [];
  const pageSize = 1000;
  let from = 1;

  while (true) {
    const url = `https://codeforces.com/api/user.status?handle=${encodeURIComponent(
      username
    )}&from=${from}&count=${pageSize}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Codeforces submissions request failed");
    }

    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error("Codeforces submissions request failed");
    }

    const submissions = data.result || [];

    allSubmissions.push(...submissions);

    if (submissions.length < pageSize) {
      break;
    }

    from += pageSize;

    await sleep(2100);
  }

  return allSubmissions;
}

async function fetchCodeforcesProfile(username) {
  const profileUrl = `https://codeforces.com/api/user.info?handles=${encodeURIComponent(
    username
  )}`;

  const profileResponse = await fetch(profileUrl);

  if (!profileResponse.ok) {
    throw new Error("Codeforces profile request failed");
  }

  const profileData = await profileResponse.json();

  if (profileData.status !== "OK" || !profileData.result?.length) {
    throw new Error("Codeforces user not found");
  }

  const user = profileData.result[0];

  await sleep(2100);

  const submissions = await fetchAllCodeforcesSubmissions(username);

  const acceptedSubmissions = submissions.filter(
    (submission) => submission.verdict === "OK"
  );

  const uniqueSolvedProblems = new Map();

  for (const submission of acceptedSubmissions) {
    const problem = submission.problem;

    if (!problem) {
      continue;
    }

    const problemKey = `${problem.contestId}-${problem.index}`;

    if (!uniqueSolvedProblems.has(problemKey)) {
      uniqueSolvedProblems.set(problemKey, {
        contestId: problem.contestId,
        index: problem.index,
        name: problem.name,
        rating: problem.rating ?? null,
        tags: problem.tags ?? [],
      });
    }
  }

  const ratingDistribution = {};

  for (const problem of uniqueSolvedProblems.values()) {
    if (problem.rating === null) {
      continue;
    }

    ratingDistribution[problem.rating] =
      (ratingDistribution[problem.rating] || 0) + 1;
  }

  const recentSubmissions = submissions.slice(0, 10).map((submission) => ({
    id: submission.id,
    contestId: submission.contestId,
    problemName: submission.problem?.name ?? "Unknown",
    problemIndex: submission.problem?.index ?? null,
    verdict: submission.verdict ?? null,
    programmingLanguage: submission.programmingLanguage ?? null,
    timeSeconds: submission.creationTimeSeconds ?? null,
  }));

  return {
    username: user.handle,
    rating: user.rating ?? null,
    maxRating: user.maxRating ?? null,
    rank: user.rank ?? null,
    maxRank: user.maxRank ?? null,
    contribution: user.contribution ?? 0,

    analytics: {
      submissionsFetched: submissions.length,
      acceptedSubmissions: acceptedSubmissions.length,
      uniqueProblemsSolved: uniqueSolvedProblems.size,
      ratingDistribution,
      recentSubmissions,
    },
  };
}

module.exports = {
  fetchCodeforcesProfile,
};