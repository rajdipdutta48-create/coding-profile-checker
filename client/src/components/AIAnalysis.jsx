import { useState } from "react";

function AIAnalysis({ profileData }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!profileData?.results) {
      setError("Please check your coding profiles first.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await fetch(
        "/api/ai/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData.results),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to generate AI analysis."
        );
      }

      setAnalysis(data.analysis);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="ai-analysis-section">
      <div className="ai-heading">
        <span className="card-badge">AI MENTOR</span>

        <h2>Get your personalized coding analysis</h2>

        <p>
          Let AI analyze your Codeforces, LeetCode, and GitHub
          activity and create a personalized improvement plan.
        </p>
      </div>

      <button
        type="button"
        className="ai-analyze-button"
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading ? "🤖 Analyzing your profile..." : "✨ Analyze My Profile"}
      </button>

      {error && (
        <div className="ai-error">
          {error}
        </div>
      )}

      {analysis && (
        <div className="ai-results">
          <div className="ai-result-card ai-overall">
            <h3>🎯 Overall Assessment</h3>
            <p>{analysis.overallAssessment}</p>
          </div>

          <div className="ai-result-grid">
            <div className="ai-result-card">
              <h3>💪 Strengths</h3>

              <ul>
                {analysis.strengths?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="ai-result-card">
              <h3>⚠️ Weaknesses</h3>

              <ul>
                {analysis.weaknesses?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="ai-result-card">
              <h3>📚 Recommended Topics</h3>

              <ul>
                {analysis.recommendedTopics?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="ai-result-card">
              <h3>🔥 Practice Strategy</h3>

              <ul>
                {analysis.practiceStrategy?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="ai-result-card ai-roadmap">
            <h3>🗺️ Your Roadmap</h3>

            <ol>
              {analysis.roadmap?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </section>
  );
}

export default AIAnalysis;