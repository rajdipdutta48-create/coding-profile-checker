const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function prepareCodeforcesData(profile) {
  if (!profile) {
    return null;
  }

  const analytics = profile.analytics || {};

  return {
    platform: "Codeforces",
    username: profile.username,
    rating: profile.rating,
    maxRating: profile.maxRating,
    rank: profile.rank,
    maxRank: profile.maxRank,
    contribution: profile.contribution,

    analytics: {
      submissionsFetched: analytics.submissionsFetched,
      acceptedSubmissions: analytics.acceptedSubmissions,
      uniqueProblemsSolved: analytics.uniqueProblemsSolved,
      ratingDistribution: analytics.ratingDistribution,
    },
  };
}

function prepareLeetcodeData(profile) {
  if (!profile) {
    return null;
  }

  const recentSubmissions = (profile.recentSubmissions || [])
    .slice(0, 10)
    .map((submission) => ({
      title: submission.title,
      language: submission.language,
      status: submission.status,
      topics: (submission.topics || []).map(
        (topic) => topic.name
      ),
    }));

  return {
    platform: "LeetCode",
    username: profile.username,
    ranking: profile.ranking,
    reputation: profile.reputation,

    solved: profile.solved,

    contest: profile.contest
      ? {
          attendedContestsCount:
            profile.contest.attendedContestsCount,
          rating: profile.contest.rating,
          globalRanking: profile.contest.globalRanking,
          totalParticipants: profile.contest.totalParticipants,
          topPercentage: profile.contest.topPercentage,
          badge: profile.contest.badge,
        }
      : null,

    topicFrequency: profile.topicFrequency,

    recentSubmissions,
  };
}

function prepareGithubData(profile) {
  if (!profile) {
    return null;
  }

  const activity = profile.activity || {};

  const dates = Object.keys(activity);

  const activeDays = dates.filter(
    (date) => activity[date] > 0
  );

  const recentActivity = {};

  const today = new Date();

  for (let i = 0; i < 90; i++) {
    const date = new Date(today);

    date.setDate(today.getDate() - i);

    const dateString = date.toISOString().split("T")[0];

    if (activity[dateString] !== undefined) {
      recentActivity[dateString] = activity[dateString];
    }
  }

  return {
    platform: "GitHub",
    username: profile.username,
    name: profile.name,
    bio: profile.bio,

    publicRepos: profile.publicRepos,
    followers: profile.followers,
    following: profile.following,

    totalContributions: profile.totalContributions,

    activitySummary: {
      totalDaysTracked: dates.length,
      activeDays: activeDays.length,
      recent90DayContributions: Object.values(
        recentActivity
      ).reduce(
        (total, count) => total + count,
        0
      ),
    },
  };
}

function prepareProfileData(profileData) {
  return {
    codeforces: prepareCodeforcesData(
      profileData.codeforces
    ),

    leetcode: prepareLeetcodeData(
      profileData.leetcode
    ),

    github: prepareGithubData(
      profileData.github
    ),
  };
}

async function generateProfileAnalysis(profileData) {
  const preparedData = prepareProfileData(profileData);

  const availablePlatforms = Object.entries(preparedData)
    .filter(([, value]) => value !== null)
    .map(([platform]) => platform);

  if (availablePlatforms.length === 0) {
    throw new Error("No profile data available for analysis");
  }

  const prompt = `
You are an expert competitive programming and software development mentor.

You are analyzing a developer's coding profile across multiple platforms.

AVAILABLE PLATFORMS:
${availablePlatforms.join(", ")}

You MUST analyze EVERY available platform.

If Codeforces is available:
- Analyze rating, max rating, rank, solved problems, submissions, acceptance, and rating distribution.

If LeetCode is available:
- Analyze total solved problems.
- Analyze Easy/Medium/Hard distribution.
- Analyze contest performance.
- Analyze topic frequency.
- Analyze recent submission topics.

If GitHub is available:
- Analyze public repositories.
- Analyze contribution activity.
- Analyze total contributions.
- Analyze active days.
- Consider the developer's GitHub activity separately from competitive programming performance.

IMPORTANT:
- Do not ignore any available platform.
- Do not focus only on the platform with the most data.
- Clearly connect insights across platforms when useful.
- If a platform is missing, do not mention it as a weakness.
- Only make claims supported by the supplied data.
- Never invent statistics.
- Do not assume GitHub popularity from follower count alone.
- Do not claim that a Codeforces rating is "stuck" unless historical rating data is actually provided.
- Do not infer skills that cannot reasonably be supported by the data.
- Give practical recommendations suitable for a student preparing for software engineering placements.

Return ONLY valid JSON.

Use exactly this structure:

{
  "overallAssessment": "",
  "strengths": [],
  "weaknesses": [],
  "recommendedTopics": [],
  "practiceStrategy": [],
  "roadmap": []
}

The response should be concise enough for a web dashboard.

PROFILE DATA:

${JSON.stringify(preparedData, null, 2)}
`;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",

    messages: [
      {
        role: "system",
        content:
          "You are a precise coding mentor. Analyze every available platform and return only valid JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],

    temperature: 0.3,
    max_tokens: 2000,
  });

  const content =
    completion.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("AI returned an empty response");
  }

  try {
    return JSON.parse(content);
  } catch {
    console.error("AI raw response:", content);

    throw new Error("AI returned invalid JSON");
  }
}

module.exports = {
  generateProfileAnalysis,
};