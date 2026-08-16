function GithubCard({ profile }) {
  return (
    <article className="platform-card github-card">
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

      {profile.bio && (
        <p className="github-bio">{profile.bio}</p>
      )}

      <div className="stats-grid">
        <div className="stat-box">
          <span>Repositories</span>
          <strong>{profile.publicRepos}</strong>
        </div>

        <div className="stat-box">
          <span>Followers</span>
          <strong>{profile.followers}</strong>
        </div>

        <div className="stat-box">
          <span>Following</span>
          <strong>{profile.following}</strong>
        </div>
      </div>
    </article>
  );
}

export default GithubCard;