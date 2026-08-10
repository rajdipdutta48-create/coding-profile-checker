import { useState } from "react";

function ProfileForm() {
  const [codeforces, setCodeforces] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [github, setGithub] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log({
      codeforces,
      leetcode,
      github,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="codeforces">Codeforces Username</label>
        <input
          id="codeforces"
          type="text"
          value={codeforces}
          onChange={(event) => setCodeforces(event.target.value)}
          placeholder="Enter Codeforces username"
        />
      </div>

      <div>
        <label htmlFor="leetcode">LeetCode Username</label>
        <input
          id="leetcode"
          type="text"
          value={leetcode}
          onChange={(event) => setLeetcode(event.target.value)}
          placeholder="Enter LeetCode username"
        />
      </div>

      <div>
        <label htmlFor="github">GitHub Username</label>
        <input
          id="github"
          type="text"
          value={github}
          onChange={(event) => setGithub(event.target.value)}
          placeholder="Enter GitHub username"
        />
      </div>

      <button type="submit">Check Profiles</button>
    </form>
  );
}

export default ProfileForm;