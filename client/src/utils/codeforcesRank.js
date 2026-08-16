const RANKS = [
  {
    name: "newbie",
    label: "Newbie",
    minRating: 0,
    colorClass: "rank-newbie",
  },
  {
    name: "pupil",
    label: "Pupil",
    minRating: 1200,
    colorClass: "rank-pupil",
  },
  {
    name: "specialist",
    label: "Specialist",
    minRating: 1400,
    colorClass: "rank-specialist",
  },
  {
    name: "expert",
    label: "Expert",
    minRating: 1600,
    colorClass: "rank-expert",
  },
  {
    name: "candidate master",
    label: "Candidate Master",
    minRating: 1900,
    colorClass: "rank-candidate-master",
  },
  {
    name: "master",
    label: "Master",
    minRating: 2100,
    colorClass: "rank-master",
  },
  {
    name: "international master",
    label: "International Master",
    minRating: 2300,
    colorClass: "rank-international-master",
  },
  {
    name: "grandmaster",
    label: "Grandmaster",
    minRating: 2400,
    colorClass: "rank-grandmaster",
  },
  {
    name: "international grandmaster",
    label: "International Grandmaster",
    minRating: 2600,
    colorClass: "rank-international-grandmaster",
  },
  {
    name: "legendary grandmaster",
    label: "Legendary Grandmaster",
    minRating: 3000,
    colorClass: "rank-legendary-grandmaster",
  },
];

function getCodeforcesRankInfo(rating) {
  const numericRating = Number(rating) || 0;

  let currentRank = RANKS[0];

  for (const rank of RANKS) {
    if (numericRating >= rank.minRating) {
      currentRank = rank;
    } else {
      break;
    }
  }

  const currentIndex = RANKS.findIndex(
    (rank) => rank.name === currentRank.name
  );

  const nextRank = RANKS[currentIndex + 1] || null;

  let progress = 100;

  if (nextRank) {
    const currentMinimum = currentRank.minRating;
    const nextMinimum = nextRank.minRating;

    progress =
      ((numericRating - currentMinimum) /
        (nextMinimum - currentMinimum)) *
      100;

    progress = Math.max(0, Math.min(progress, 100));
  }

  return {
    currentRank,
    nextRank,
    progress: Math.round(progress),
    pointsNeeded: nextRank
      ? Math.max(0, nextRank.minRating - numericRating)
      : 0,
  };
}

export default getCodeforcesRankInfo;