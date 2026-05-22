import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const setAuthView = useAuthStore((state) => state.setAuthView);

  useEffect(() => {
    setAuthView("login");
  }, [setAuthView]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    try {
      await login({ email, password });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to authenticate. Please try again.",
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-blob"></div>
        <div className="login-blob-2"></div>
      </div>

      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
              <path d="M17.6 6.32c-1.57-1.57-3.66-2.44-5.88-2.44-4.59 0-8.32 3.73-8.32 8.32 0 1.47.37 2.91 1.08 4.19L2.63 21.37l4.56-1.46c1.23.68 2.62 1.03 4.05 1.03 4.59 0 8.32-3.73 8.32-8.32 0-2.22-.87-4.31-2.44-5.88zm-5.88 15.27c-1.26 0-2.5-.32-3.6-.92l-.26-.15-2.66.85.86-2.65-.17-.27c-.64-1.12-.98-2.4-.98-3.71 0-3.82 3.11-6.93 6.93-6.93 1.85 0 3.59.72 4.9 2.03 1.31 1.31 2.03 3.05 2.03 4.9 0 3.82-3.11 6.93-6.93 6.93z" />
            </svg>
          </div>
          <h1>Welcome to ChatHub</h1>
          <p>Sign in to continue messaging</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="login-button">
            {loading ? (
              <>
                <span className="spinner"></span>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Not an user ?</p>
          <div
            style={{ display: "flex", gap: "8px", justifyContent: "center" }}
          >
            <button
              type="button"
              onClick={() => setAuthView("register")}
              className="demo-button"
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
