function ProfileForm({ profiles, setProfiles }) {
  function handleChange(event) {
    const { name, value } = event.target;

    setProfiles((currentProfiles) => ({
      ...currentProfiles,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log(profiles);
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

      <button type="submit">Check Profiles</button>
    </form>
  );
}

export default ProfileForm;