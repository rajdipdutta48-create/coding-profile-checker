function LeetcodeCard({ profile }) {
  return (
    <article className="platform-card leetcode-card">
      <div className="platform-header">
        <div className="platform-brand">
          <div className="platform-logo leetcode-logo">
            LC
          </div>

          <div>
            <h3>LeetCode</h3>
            <p>@{profile.username}</p>
          </div>
        </div>

        <a
          href={`https://leetcode.com/u/${profile.username}/`}
          target="_blank"
          rel="noreferrer"
        >
          View Profile ↗
        </a>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <span>Total Solved</span>
          <strong>{profile.solved?.all ?? 0}</strong>
        </div>

        <div className="stat-box">
          <span>Ranking</span>
          <strong>{profile.ranking ?? "—"}</strong>
        </div>

        <div className="stat-box">
          <span>Easy</span>
          <strong>{profile.solved?.easy ?? 0}</strong>
        </div>

        <div className="stat-box">
          <span>Medium</span>
          <strong>{profile.solved?.medium ?? 0}</strong>
        </div>

        <div className="stat-box">
          <span>Hard</span>
          <strong>{profile.solved?.hard ?? 0}</strong>
        </div>

        <div className="stat-box">
          <span>Reputation</span>
          <strong>{profile.reputation ?? 0}</strong>
        </div>
      </div>

      <div className="difficulty-bars">
        <div>
          <div className="difficulty-label">
            <span>Easy</span>
            <strong>{profile.solved?.easy ?? 0}</strong>
          </div>

          <div className="difficulty-track">
            <div
              className="difficulty-fill easy-fill"
              style={{
                width: `${Math.min(
                  ((profile.solved?.easy ?? 0) /
                    Math.max(profile.solved?.all ?? 1, 1)) *
                    100,
                  100
                )}%`,
              }}
            ></div>
          </div>
        </div>

        <div>
          <div className="difficulty-label">
            <span>Medium</span>
            <strong>{profile.solved?.medium ?? 0}</strong>
          </div>

          <div className="difficulty-track">
            <div
              className="difficulty-fill medium-fill"
              style={{
                width: `${Math.min(
                  ((profile.solved?.medium ?? 0) /
                    Math.max(profile.solved?.all ?? 1, 1)) *
                    100,
                  100
                )}%`,
              }}
            ></div>
          </div>
        </div>

        <div>
          <div className="difficulty-label">
            <span>Hard</span>
            <strong>{profile.solved?.hard ?? 0}</strong>
          </div>

          <div className="difficulty-track">
            <div
              className="difficulty-fill hard-fill"
              style={{
                width: `${Math.min(
                  ((profile.solved?.hard ?? 0) /
                    Math.max(profile.solved?.all ?? 1, 1)) *
                    100,
                  100
                )}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default LeetcodeCard;