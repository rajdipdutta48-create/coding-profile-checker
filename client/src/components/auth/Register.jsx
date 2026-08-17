import { useState } from "react";
import "./Auth.css";

function Register({
  onRegisterSuccess,
  onAuthError,
  onSwitchToLogin,
}) {
  const [form, setForm] = useState({
    name: "",
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

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      onAuthError("The bird needs all three pieces of information.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setForm({
        name: "",
        email: "",
        password: "",
      });

      onRegisterSuccess();
    } catch (error) {
      onAuthError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-heading">
        <span className="card-badge">GET YOUR KEY</span>

        <h2>Join the coding universe</h2>

        <p>
          Create your account and receive your key to the gate.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="register-name">Name</label>

          <input
            id="register-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="register-email">Email</label>

          <input
            id="register-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="register-password">Password</label>

          <input
            id="register-password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create your key"
            autoComplete="new-password"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Forging your key..." : "✨ Create My Key"}
        </button>
      </form>

      <p className="auth-switch">
        Already have a key?{" "}
        <button
          type="button"
          className="auth-switch-button"
          onClick={onSwitchToLogin}
        >
          Enter the gate
        </button>
      </p>
    </div>
  );
}

export default Register;