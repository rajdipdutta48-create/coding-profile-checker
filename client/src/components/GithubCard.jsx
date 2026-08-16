import { useMemo, useState } from "react";
import "./GithubCard.css";
function GithubCard({ profile }) {
  const [maxActivity, setMaxActivity] = useState(10);

  const activityEntries = useMemo(() => {
    return Object.entries(profile.activity || {}).sort(
      ([dateA], [dateB]) => new Date(dateA) - new Date(dateB)
    );
  }, [profile.activity]);

  const getIntensity = (count) => {
    if (count === 0) {
      return 0;
    }

    return Math.min(
      Math.ceil((count / maxActivity) * 4),
      4
    );
  };

  const weeks = useMemo(() => {
    const result = [];

    for (let i = 0; i < activityEntries.length; i += 7) {
      result.push(activityEntries.slice(i, i + 7));
    }

    return result;
  }, [activityEntries]);

  return (
    <article className="platform-card github-card">
      {/* HEADER */}

      <div className="platform-header">
        <div className="platform-brand">
          <img
            className="github-avatar"
            src={profile.avatarUrl}
            alt={`${profile.username} avatar`}
          />

          <div>
            <h3>GitHub</h3>
            <p>@{profile.username}</p>
          </div>
        </div>

        <a
          href={profile.profileUrl}
          target="_blank"
          rel="noreferrer"
        >
          View Profile ↗
        </a>
      </div>

      {/* BIO */}

      {profile.bio && (
        <p className="github-bio">{profile.bio}</p>
      )}

      {/* BASIC STATISTICS */}

      <div className="stats-grid">
        <div className="stat-box">
          <span>📦 Repositories</span>
          <strong>{profile.publicRepos}</strong>
        </div>

        <div className="stat-box">
          <span>👥 Followers</span>
          <strong>{profile.followers}</strong>
        </div>

        <div className="stat-box">
          <span>👤 Following</span>
          <strong>{profile.following}</strong>
        </div>

        <div className="stat-box">
          <span>🔥 Contributions</span>
          <strong>
            {profile.totalContributions ?? 0}
          </strong>
        </div>
      </div>

      {/* CONTRIBUTION HEATMAP */}

      <div className="github-activity">
        <div className="analytics-title">
          <h4>🔥 Contribution Activity</h4>

          <span>
            {profile.totalContributions ?? 0} contributions
          </span>
        </div>

        {/* MAXIMUM SELECTOR */}

        <div className="github-heatmap-controls">
          <label htmlFor="github-max-activity">
            Maximum activity
          </label>

          <select
            id="github-max-activity"
            value={maxActivity}
            onChange={(event) =>
              setMaxActivity(Number(event.target.value))
            }
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* HEATMAP */}

        {activityEntries.length > 0 ? (
          <div className="github-heatmap-wrapper">
            <div className="github-heatmap">
              {weeks.map((week, weekIndex) => (
                <div
                  className="github-week"
                  key={weekIndex}
                >
                  {week.map(([date, count]) => (
                    <div
                      key={date}
                      className={`github-day github-level-${getIntensity(
                        count
                      )}`}
                      title={`${date}: ${count} contribution${
                        count === 1 ? "" : "s"
                      }`}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="empty-state">
            No contribution data available.
          </p>
        )}

        {/* LEGEND */}

        <div className="github-heatmap-footer">
          <span>Less</span>

          <div className="github-legend">
            <span className="github-day github-level-0"></span>
            <span className="github-day github-level-1"></span>
            <span className="github-day github-level-2"></span>
            <span className="github-day github-level-3"></span>
            <span className="github-day github-level-4"></span>
          </div>

          <span>More</span>
        </div>

        <p className="github-heatmap-info">
          💡 A day with {maxActivity} or more contributions is
          shown at maximum intensity.
        </p>
      </div>

      {/* DISCLAIMER */}

      <p className="github-disclaimer">
        GitHub contribution data is provided by GitHub's
        contribution calendar.
      </p>
    </article>
  );
}

export default GithubCard;