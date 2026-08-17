import { useState } from "react";

import Header from "./components/Header";
import ProfileForm from "./components/ProfileForm";
import ProfileResults from "./components/ProfileResults";
import AuthScene from "./components/auth/AuthScene";

import "./App.css";

function App() {
  const [profiles, setProfiles] = useState({
    codeforces: "",
    leetcode: "",
    github: "",
  });

  const [profileData, setProfileData] = useState(null);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("authUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  function handleAuthenticated(authenticatedUser) {
    setUser(authenticatedUser);
  }

  function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");

    setUser(null);
    setProfileData(null);
  }

  return (
    <div className="app">
      <div className="background-glow background-glow-one"></div>
      <div className="background-glow background-glow-two"></div>

      <div className="container">
        <Header
          title="Coding Profile Checker"
          description="Track and analyze your competitive programming profiles in one place."
        />

        {!user ? (
          <AuthScene onAuthenticated={handleAuthenticated} />
        ) : (
          <>
            <div className="user-bar">
              <span>
                Welcome, <strong>{user.name}</strong>
              </span>

              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>

            <section className="profile-card">
              <div className="card-heading">
                <span className="card-badge">PROFILE ANALYZER</span>

                <h2>Connect your coding profiles</h2>

                <p>
                  Enter your usernames and get your coding activity from
                  multiple platforms in one place.
                </p>
              </div>

              <ProfileForm
                profiles={profiles}
                setProfiles={setProfiles}
                onResult={setProfileData}
              />
            </section>

            <ProfileResults data={profileData} />
          </>
        )}

        <footer>
          <p>Built with React + Express</p>
        </footer>
      </div>
    </div>
  );
}

export default App;