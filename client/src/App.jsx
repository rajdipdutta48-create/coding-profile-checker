import { useState } from "react";
import Header from "./components/Header";
import ProfileForm from "./components/ProfileForm";

function App() {
  const [profiles, setProfiles] = useState({
    codeforces: "",
    leetcode: "",
    github: "",
  });

  return (
    <main>
      <Header
        title="Coding Profile Checker"
        description="Track and analyze all your coding profiles in one place."
      />

      <ProfileForm
        profiles={profiles}
        setProfiles={setProfiles}
      />
    </main>
  );
}

export default App;