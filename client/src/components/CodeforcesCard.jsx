function CodeforcesCard({ profile }) {
  const ratingEntries = Object.entries(
    profile.analytics?.ratingDistribution || {}
  ).sort((a, b) => Number(a[0]) - Number(b[0]));

  return (
    <article className="platform-card codeforces-card">
      <div className="platform-header">
        <div className="platform-brand">
          <div className="platform-logo codeforces-logo">
            CF
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

      <div className="stats-grid">
        <div className="stat-box">
          <span>Rating</span>
          <strong>{profile.rating ?? "—"}</strong>
        </div>

        <div className="stat-box">
          <span>Max Rating</span>
          <strong>{profile.maxRating ?? "—"}</strong>
        </div>

        <div className="stat-box">
          <span>Rank</span>
          <strong className="capitalize">
            {profile.rank ?? "—"}
          </strong>
        </div>

        <div className="stat-box">
          <span>Problems Solved</span>
          <strong>
            {profile.analytics?.uniqueProblemsSolved ?? 0}
          </strong>
        </div>
      </div>

      <div className="analytics-block">
        <div className="analytics-title">
          <h4>Problem rating distribution</h4>
          <span>
            {profile.analytics?.acceptedSubmissions ?? 0} accepted
          </span>
        </div>

        {ratingEntries.length === 0 ? (
          <p className="empty-state">
            No rated problems found in the fetched submissions.
          </p>
        ) : (
          <div className="rating-bars">
            {ratingEntries.map(([rating, count]) => {
              const maxCount = Math.max(
                ...ratingEntries.map(([, value]) => value)
              );

              const width = (count / maxCount) * 100;

              return (
                <div className="rating-row" key={rating}>
                  <span>{rating}</span>

                  <div className="rating-track">
                    <div
                      className="rating-fill"
                      style={{ width: `${width}%` }}
                    ></div>
                  </div>

                  <strong>{count}</strong>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="recent-submissions">
        <div className="analytics-title">
          <h4>Recent submissions</h4>
          <span>
            {profile.analytics?.submissionsFetched ?? 0} fetched
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
                      {submission.problemIndex}.{" "}
                      {submission.problemName}
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
                    {submission.verdict}
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