import getCodeforcesRankInfo from "../utils/codeforcesRank";
import "./CodeforcesRank.css";

function getPracticeRange(rating) {
  const numericRating = Number(rating) || 0;

  // Legendary Grandmaster
  if (numericRating >= 3000) {
    return null;
  }

  const floorRating = Math.floor(numericRating / 100) * 100;

  return {
    min: Math.max(0, floorRating - 100),
    max: Math.min(3500, floorRating + 300),
  };
}

function getRatingColorClass(rating) {
  const numericRating = Number(rating) || 0;

  // 4000+ gets black
  if (numericRating >= 4000) {
    return "rating-legendary-plus";
  }

  return getCodeforcesRankInfo(numericRating).currentRank.colorClass;
}

function CodeforcesCard({ profile }) {
  const ratingEntries = Object.entries(
    profile.analytics?.ratingDistribution || {},
  ).sort((a, b) => Number(a[0]) - Number(b[0]));

  const rankInfo = getCodeforcesRankInfo(profile.rating);

  const practiceRange = getPracticeRange(profile.rating);

  const ratingColorClass = getRatingColorClass(profile.rating);

  const maxRatingColorClass = getRatingColorClass(profile.maxRating);

  return (
    <article className="platform-card codeforces-card">
      <div className="platform-header">
        <div className="platform-brand">
          <div className="platform-logo codeforces-logo">
            <img src="/images/codeforces.png" alt="Codeforces" />
          </div>

          <div>
            <h3>Codeforces</h3>
            <p>@{profile.username}</p>
          </div>
        </div>

        <a
          href={`https://codeforces.com/profile/${profile.username}`}
          target="_blank"
          rel="noreferrer"
        >
          View Profile ↗
        </a>
      </div>

      {/* RANK SECTION */}

      <div className="cf-rank-section">
        <div className="cf-rank-header">
          <div>
            <span className="section-label">🏆 CURRENT RANK</span>

            <div
              className={`cf-rank-badge ${rankInfo.currentRank.colorClass}`}
            >
              {rankInfo.currentRank.label}
            </div>
          </div>

          {rankInfo.nextRank && (
            <div className="next-rank">
              <span className="section-label">🎯 NEXT TARGET</span>

              <strong className={rankInfo.nextRank.colorClass}>
                {rankInfo.nextRank.label}
              </strong>
            </div>
          )}
        </div>

        {rankInfo.nextRank && (
          <>
            <div className="rank-progress-info">
              <span>
                📈 Rating Progress: {profile.rating} /{" "}
                {rankInfo.nextRank.minRating}
              </span>

              <strong>🔥 {rankInfo.pointsNeeded} points needed</strong>
            </div>

            <div className="rank-progress-track">
              <div
                className={`rank-progress-fill ${rankInfo.currentRank.colorClass}`}
                style={{
                  width: `${rankInfo.progress}%`,
                }}
              ></div>
            </div>
          </>
        )}

        {!rankInfo.nextRank && (
          <p className="max-rank-message">
            🏆 You have reached the highest Codeforces rank!
          </p>
        )}
      </div>

      {/* PRACTICE RECOMMENDATION */}

      <div className="cf-practice-recommendation">
        <div className="cf-practice-header">
          <div>
            <span className="section-label">
              🧠 PRACTICE RECOMMENDATION
            </span>

            <h4>
              {practiceRange
                ? "Practice problems around your rating"
                : "You've reached the top"}
            </h4>
          </div>

          <strong className={`practice-rating ${ratingColorClass}`}>
            {profile.rating}
          </strong>
        </div>

        {practiceRange ? (
          <p>
            Based on your current rating{" "}
            <strong className={ratingColorClass}>{profile.rating}</strong>,
            try solving problems in the{" "}
            <strong>
              {practiceRange.min}–{practiceRange.max}
            </strong>{" "}
            rating range.
          </p>
        ) : (
          <p className="lgm-message">
            🏆 Legendary Grandmaster — you've conquered the rating ladder.
            Now the challenge isn't finding harder problems, it's finding new
            ways to break the limits.
          </p>
        )}
      </div>

      {/* BASIC STATISTICS */}

      <div className="stats-grid">
        <div className="stat-box">
          <span>⭐ Rating</span>
          <strong className={ratingColorClass}>
            {profile.rating ?? "—"}
          </strong>
        </div>

        <div className="stat-box">
          <span>🚀 Max Rating</span>
          <strong className={maxRatingColorClass}>
            {profile.maxRating ?? "—"}
          </strong>
        </div>

        <div className="stat-box">
          <span>🧩 Problems Solved</span>
          <strong>{profile.analytics?.uniqueProblemsSolved ?? 0}</strong>
        </div>

        <div className="stat-box">
          <span>✅ Accepted</span>
          <strong>{profile.analytics?.acceptedSubmissions ?? 0}</strong>
        </div>
      </div>

      {/* RATING DISTRIBUTION */}

      <div className="analytics-block">
        <div className="analytics-title">
          <h4>📊 Problem Rating Distribution</h4>

          <span>
            {profile.analytics?.submissionsFetched ?? 0} submissions analyzed
          </span>
        </div>

        {ratingEntries.length === 0 ? (
          <p className="empty-state">No rated problems found.</p>
        ) : (
          <div className="rating-bars">
            {ratingEntries.map(([rating, count]) => {
              const maxCount = Math.max(
                ...ratingEntries.map(([, value]) => value),
              );

              const width = (count / maxCount) * 100;

              return (
                <div className="rating-row" key={rating}>
                  <span>{rating}</span>

                  <div className="rating-track">
                    <div
                      className={`rating-fill ${rankInfo.currentRank.colorClass}`}
                      style={{
                        width: `${width}%`,
                      }}
                    ></div>
                  </div>

                  <strong>{count}</strong>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* RECENT SUBMISSIONS */}

      <div className="recent-submissions">
        <div className="analytics-title">
          <h4>⚡ Recent Submissions</h4>

          <span>
            {profile.analytics?.recentSubmissions?.length ?? 0}
          </span>
        </div>

        {profile.analytics?.recentSubmissions?.length ? (
          <div className="submission-list">
            {profile.analytics.recentSubmissions
              .slice(0, 5)
              .map((submission) => (
                <div className="submission-row" key={submission.id}>
                  <div>
                    <strong>
                      {submission.problemIndex}. {submission.problemName}
                    </strong>

                    <span>{submission.programmingLanguage}</span>
                  </div>

                  <span
                    className={
                      submission.verdict === "OK"
                        ? "verdict accepted"
                        : "verdict"
                    }
                  >
                    {submission.verdict === "OK"
                      ? "✓ ACCEPTED"
                      : submission.verdict}
                  </span>
                </div>
              ))}
          </div>
        ) : (
          <p className="empty-state">No recent submissions.</p>
        )}
      </div>
    </article>
  );
}

export default CodeforcesCard;