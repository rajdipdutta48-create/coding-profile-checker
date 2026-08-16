import "./LeetCodeAnalytics.css";

function LeetcodeCard({ profile }) {
  const total = profile.solved?.all ?? 0;
  const easy = profile.solved?.easy ?? 0;
  const medium = profile.solved?.medium ?? 0;
  const hard = profile.solved?.hard ?? 0;

  const easyPercentage = total ? (easy / total) * 100 : 0;
  const mediumPercentage = total ? (medium / total) * 100 : 0;
  const hardPercentage = total ? (hard / total) * 100 : 0;

  // Progressive difficulty targets

  const minimumEasy = 50;
  const targetMedium = easy * 2;
  const targetHard = Math.floor(easy / 3);

  let recommendation;

  if (easy < minimumEasy) {
    const remainingEasy = minimumEasy - easy;

    recommendation = {
      title: "🟢 Next Focus: Easy Problems",
      text: (
        <>
          Build your problem-solving fundamentals first.
          <br />
          You currently have <strong>{easy} Easy</strong> problems.
          <br />
          Try to reach around <strong>{minimumEasy} Easy</strong>{" "}
          problems before moving heavily into Medium problems.
          <br />
          You need approximately{" "}
          <strong>{remainingEasy} more Easy</strong> problems.
        </>
      ),
    };
  } else if (medium < targetMedium) {
    const remainingMedium = targetMedium - medium;

    recommendation = {
      title: "🟡 Next Focus: Medium Problems",
      text: (
        <>
          Your Easy foundation is strong with{" "}
          <strong>{easy} Easy</strong> problems.
          <br />
          A good next target is around{" "}
          <strong>{targetMedium} Medium</strong> problems.
          <br />
          You currently have <strong>{medium} Medium</strong>{" "}
          problems.
          <br />
          Try to solve approximately{" "}
          <strong>{remainingMedium} more Medium</strong> problems
          before heavily increasing Hard practice.
        </>
      ),
    };
  } else if (hard < targetHard) {
    const remainingHard = targetHard - hard;

    recommendation = {
      title: "🔴 Next Focus: Hard Problems",
      text: (
        <>
          Your Easy and Medium foundation is strong.
          <br />
          A good target is around <strong>{targetHard} Hard</strong>{" "}
          problems.
          <br />
          You currently have <strong>{hard} Hard</strong> problems.
          <br />
          Try to solve approximately{" "}
          <strong>{remainingHard} more Hard</strong> problems while
          continuing Medium practice.
        </>
      ),
    };
  } else {
    recommendation = {
      title: "🚀 Great Problem Balance",
      text: (
        <>
          Your Easy, Medium, and Hard distribution is looking
          balanced.
          <br />
          Keep mixing difficulties and gradually increase the
          proportion of harder problems.
        </>
      ),
    };
  }

  // TOPIC ANALYTICS

  const topicEntries = Object.entries(
    profile.topicFrequency || {}
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const highestTopicCount =
    topicEntries.length > 0 ? topicEntries[0][1] : 1;

  return (
    <article className="platform-card leetcode-card">
      {/* HEADER */}

      <div className="platform-header">
        <div className="platform-brand">
          <div className="platform-logo leetcode-logo">
            <img
              src="/images/leetcode.webp"
              alt="LeetCode logo"
            />
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

      {/* BASIC STATISTICS */}

      <div className="stats-grid">
        <div className="stat-box">
          <span>🧩 Total Solved</span>
          <strong>{total}</strong>
        </div>

        <div className="stat-box">
          <span>🏅 Ranking</span>
          <strong>{profile.ranking ?? "—"}</strong>
        </div>

        <div className="stat-box">
          <span>🟢 Easy</span>
          <strong>{easy}</strong>
        </div>

        <div className="stat-box">
          <span>🟡 Medium</span>
          <strong>{medium}</strong>
        </div>

        <div className="stat-box">
          <span>🔴 Hard</span>
          <strong>{hard}</strong>
        </div>

        <div className="stat-box">
          <span>⭐ Reputation</span>
          <strong>{profile.reputation ?? 0}</strong>
        </div>
      </div>

      {/* DIFFICULTY ANALYTICS */}

      <div className="leetcode-analytics">
        <div className="analytics-title">
          <h4>📊 Difficulty Analysis</h4>

          <span>{total} problems analyzed</span>
        </div>

        <div className="leetcode-summary">
          <div className="leetcode-difficulty-card easy">
            <span>🟢 Easy</span>
            <strong>{easy}</strong>
          </div>

          <div className="leetcode-difficulty-card medium">
            <span>🟡 Medium</span>
            <strong>{medium}</strong>
          </div>

          <div className="leetcode-difficulty-card hard">
            <span>🔴 Hard</span>
            <strong>{hard}</strong>
          </div>
        </div>

        <div className="leetcode-progress-section">
          <div className="leetcode-progress-row">
            <div className="leetcode-progress-header">
              <span>🟢 Easy</span>
              <strong>{easyPercentage.toFixed(1)}%</strong>
            </div>

            <div className="leetcode-progress-track">
              <div
                className="leetcode-progress-fill leetcode-easy-fill"
                style={{
                  width: `${easyPercentage}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="leetcode-progress-row">
            <div className="leetcode-progress-header">
              <span>🟡 Medium</span>
              <strong>{mediumPercentage.toFixed(1)}%</strong>
            </div>

            <div className="leetcode-progress-track">
              <div
                className="leetcode-progress-fill leetcode-medium-fill"
                style={{
                  width: `${mediumPercentage}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="leetcode-progress-row">
            <div className="leetcode-progress-header">
              <span>🔴 Hard</span>
              <strong>{hardPercentage.toFixed(1)}%</strong>
            </div>

            <div className="leetcode-progress-track">
              <div
                className="leetcode-progress-fill leetcode-hard-fill"
                style={{
                  width: `${hardPercentage}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* RECOMMENDATION */}

        <div className="leetcode-recommendation">
          <h4>{recommendation.title}</h4>

          <p>{recommendation.text}</p>
        </div>

        {/* TOPIC ANALYTICS */}

        <div className="leetcode-topics">
          <div className="analytics-title">
            <h4>🧠 Recent Topic Activity</h4>

            <span>
              {profile.recentSubmissions?.length ?? 0} recent
              problems
            </span>
          </div>

          {topicEntries.length === 0 ? (
            <p className="empty-state">
              No topic data available.
            </p>
          ) : (
            <div className="leetcode-topic-list">
              {topicEntries.map(([topic, count]) => {
                const percentage =
                  (count / highestTopicCount) * 100;

                return (
                  <div
                    className="leetcode-topic-row"
                    key={topic}
                  >
                    <span className="leetcode-topic-name">
                      {topic}
                    </span>

                    <div className="leetcode-topic-track">
                      <div
                        className="leetcode-topic-fill"
                        style={{
                          width: `${percentage}%`,
                        }}
                      ></div>
                    </div>

                    <span className="leetcode-topic-count">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <p className="leetcode-topic-note">
            💡 Topic activity is calculated from your recent
            accepted submissions. It represents recent practice,
            not your complete LeetCode history.
          </p>
        </div>
      </div>
    </article>
  );
}

export default LeetcodeCard;