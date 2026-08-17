import { useState } from "react";
import "./Auth.css";

function Login({
  onLoginSuccess,
  onAuthError,
  onSwitchToRegister,
}) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.email.trim() || !form.password) {
      onAuthError("Oops! The bird needs both pieces of the key.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email.trim(),
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authUser", JSON.stringify(data.user));

      onLoginSuccess(data.user);
    } catch {
      onAuthError("Oops! That key doesn't work. Try again, coder!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-heading">
        <span className="card-badge">THE GATE</span>

        <h2>Welcome back</h2>

        <p>
          Enter your credentials and let the gatekeeper check your key.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login-email">Email</label>

          <input
            id="login-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="login-password">Password</label>

          <input
            id="login-password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Checking the key..." : "🔑 Open the Gate"}
        </button>
      </form>

      <p className="auth-switch">
        New to the coding universe?{" "}
        <button
          type="button"
          className="auth-switch-button"
          onClick={onSwitchToRegister}
        >
          Create your key
        </button>
      </p>
    </div>
  );
}

export default Login;