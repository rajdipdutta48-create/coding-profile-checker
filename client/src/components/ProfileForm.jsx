import { useState } from "react";

function ProfileForm({ profiles, setProfiles }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setProfiles((currentProfiles) => ({
      ...currentProfiles,
      [name]: value,
    }));

    if (error) {
      setError("");
    }

    if (result) {
      setResult(null);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const hasProfile = Object.values(profiles).some(
      (username) => username.trim() !== ""
    );

    if (!hasProfile) {
      setError("Please enter at least one coding profile username.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/api/profile/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profiles),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with the server.");
      }

      const data = await response.json();

      setResult(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="codeforces">Codeforces Username</label>

        <input
          id="codeforces"
          name="codeforces"
          type="text"
          value={profiles.codeforces}
          onChange={handleChange}
          placeholder="Enter Codeforces username"
        />
      </div>

      <div>
        <label htmlFor="leetcode">LeetCode Username</label>

        <input
          id="leetcode"
          name="leetcode"
          type="text"
          value={profiles.leetcode}
          onChange={handleChange}
          placeholder="Enter LeetCode username"
        />
      </div>

      <div>
        <label htmlFor="github">GitHub Username</label>

        <input
          id="github"
          name="github"
          type="text"
          value={profiles.github}
          onChange={handleChange}
          placeholder="Enter GitHub username"
        />
      </div>

      {error && <p role="alert">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Checking..." : "Check Profiles"}
      </button>

      {result && (
        <pre>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </form>
  );
}

export default ProfileForm;