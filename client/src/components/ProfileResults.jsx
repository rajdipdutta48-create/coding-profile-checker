import CodeforcesCard from "./CodeforcesCard";
import LeetcodeCard from "./LeetcodeCard";
import GithubCard from "./GithubCard";

function ProfileResults({ data }) {
  if (!data) {
    return null;
  }

  const { results, errors } = data;

  return (
    <section className="results-section">
      <div className="results-heading">
        <span className="card-badge">PROFILE RESULTS</span>

        <h2>Your coding profiles</h2>

        <p>
          Your latest statistics collected from the connected platforms.
        </p>
      </div>

      <div className="profile-grid">
        {results.codeforces && (
          <CodeforcesCard profile={results.codeforces} />
        )}

        {results.leetcode && (
          <LeetcodeCard profile={results.leetcode} />
        )}

        {results.github && (
          <GithubCard profile={results.github} />
        )}
      </div>

      {Object.values(errors).some(Boolean) && (
        <div className="profile-errors">
          {errors.codeforces && (
            <p>Codeforces: {errors.codeforces}</p>
          )}

          {errors.leetcode && (
            <p>LeetCode: {errors.leetcode}</p>
          )}

          {errors.github && (
            <p>GitHub: {errors.github}</p>
          )}
        </div>
      )}
    </section>
  );
}

export default ProfileResults;