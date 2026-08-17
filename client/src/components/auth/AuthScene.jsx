import { useState } from "react";

import Login from "./Login";
import Register from "./Register";

function AuthScene({ onAuthenticated }) {
  const [mode, setMode] = useState("login");
  const [scene, setScene] = useState("idle");
  const [dialogue, setDialogue] = useState(
    "Hello, coder! Welcome to Coding Profile Checker."
  );

  function handleAuthError(message) {
    setScene("error");
    setDialogue(
      message || "Oops! That key doesn't work. Try again, coder!"
    );
  }

  function handleLoginSuccess(user) {
    setScene("unlocking");
    setDialogue("That's it! You found the right key! Let me open the door.");

    setTimeout(() => {
      onAuthenticated(user);
    }, 3200);
  }

  function handleRegisterSuccess() {
    setScene("success");
    setDialogue("Your key is ready! Now use it to enter the coding universe.");

    setTimeout(() => {
      setScene("idle");
      setMode("login");
      setDialogue("Nice! Please enter your key to get inside.");
    }, 1800);
  }

  function switchToRegister() {
    setScene("idle");
    setMode("register");
    setDialogue("New here? Let me prepare a key for you.");
  }

  function switchToLogin() {
    setScene("idle");
    setMode("login");
    setDialogue("Welcome back, coder! Enter your key to get inside.");
  }

  return (
    <section className={`auth-scene ${scene}`}>
      <div className="auth-stars"></div>

      <div className="auth-gate-background">
        <div className="gate-wall gate-wall-left"></div>
        <div className="gate-wall gate-wall-right"></div>

        <div className="gate-lamp gate-lamp-left">✦</div>
        <div className="gate-lamp gate-lamp-right">✦</div>

        <div className="gate">
          <div className="gate-door gate-door-left"></div>
          <div className="gate-door gate-door-right"></div>

          <div className="gate-lock">
            <div className="lock-body"></div>
            <div className="lock-hole"></div>
          </div>
        </div>
      </div>

      <div className="bird-area">
        <div className="speech-cloud">
          <span>{dialogue}</span>
        </div>

        <div className="bird">
          <div className="bird-body">
            <div className="bird-eye bird-eye-left"></div>
            <div className="bird-eye bird-eye-right"></div>

            <div className="bird-beak"></div>

            <div className="bird-wing bird-wing-left"></div>

            <div className="bird-wing bird-wing-right">
              <span className="bird-key">🔑</span>
            </div>

            <div className="bird-foot bird-foot-left"></div>
            <div className="bird-foot bird-foot-right"></div>
          </div>
        </div>
      </div>

      <div className="auth-form-wrapper">
        {mode === "login" ? (
          <Login
            onLoginSuccess={handleLoginSuccess}
            onAuthError={handleAuthError}
            onSwitchToRegister={switchToRegister}
          />
        ) : (
          <Register
            onRegisterSuccess={handleRegisterSuccess}
            onAuthError={handleAuthError}
            onSwitchToLogin={switchToLogin}
          />
        )}
      </div>

      {scene === "unlocking" && (
        <div className="flying-key">🔑</div>
      )}

      {scene === "unlocking" && (
        <div className="unlock-message">
          <span>Access granted</span>
        </div>
      )}
    </section>
  );
}

export default AuthScene;