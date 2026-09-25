import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import "./AuthPage.css";
import "../components/AuthModal.css";

function AuthPage({ initialMode = "login" }) {
  const navigate = useNavigate();
  const {
    user,
    loginWithEmail,
    signupWithEmail,
    resetPassword,
    isFirebaseConfigured,
  } = useAuth();

  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Status state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user, navigate]);

  // Clean error message mapper
  const formatErrorMessage = (err) => {
    const msg = err.message || err.toString();
    if (msg.includes("auth/invalid-credential") || msg.includes("auth/wrong-password")) {
      return "Incorrect email or password. Please try again.";
    }
    if (msg.includes("auth/user-not-found")) {
      return "No account found with this email. Please sign up.";
    }
    if (msg.includes("auth/email-already-in-use")) {
      return "An account already exists with this email. Please log in.";
    }
    if (msg.includes("auth/weak-password")) {
      return "Password should be at least 6 characters long.";
    }
    return msg.replace("Firebase: ", "");
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (mode === "forgot") {
        if (!email) throw new Error("Please enter your email address.");
        await resetPassword(email);
        setSuccess("Password reset instructions sent to your email!");
        setTimeout(() => setMode("login"), 2500);
      } else if (mode === "signup") {
        if (!email || !password) throw new Error("Please fill in all fields.");
        if (password.length < 6) throw new Error("Password must be at least 6 characters.");
        await signupWithEmail(email, password, displayName);
        navigate("/admin");
      } else {
        if (!email || !password) throw new Error("Please enter both email and password.");
        await loginWithEmail(email, password);
        navigate("/admin");
      }
    } catch (err) {
      setError(formatErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-page-card">
        <div style={{ textAlign: "left" }}>
          <Link to="/" className="back-to-home-link">
            ← Back to Home
          </Link>
        </div>

        <div className="auth-modal-header">
          <span className="auth-badge">🎓 BiharBoardStudy Portal</span>
          <h2>
            {mode === "forgot"
              ? "Reset Password"
              : mode === "signup"
              ? "Create Admin/Student Account"
              : "Admin & Student Login"}
          </h2>
          <p>
            {mode === "forgot"
              ? "Enter your email to receive password reset link."
              : mode === "signup"
              ? "Sign up using email and password."
              : "Sign in using your email and password."}
          </p>
        </div>

        {!isFirebaseConfigured && (
          <div className="auth-demo-notice">
            <span>💡</span>
            <span>
              <strong>Demo Mode:</strong> Live preview enabled.
            </span>
          </div>
        )}

        {error && (
          <div className="auth-alert error">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="auth-alert success">
            <span>✅</span>
            <span>{success}</span>
          </div>
        )}

        <div className="auth-body">
          <form onSubmit={handleEmailSubmit} className="auth-form">
            {mode === "signup" && (
              <div className="auth-field">
                <label htmlFor="page-auth-name">Full Name</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">👤</span>
                  <input
                    id="page-auth-name"
                    type="text"
                    className="auth-input"
                    placeholder="e.g. Rahul Kumar"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="auth-field">
              <label htmlFor="page-auth-email">Email Address</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">📧</span>
                <input
                  id="page-auth-email"
                  type="email"
                  required
                  className="auth-input"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {mode !== "forgot" && (
              <div className="auth-field">
                <label htmlFor="page-auth-password">Password</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">🔒</span>
                  <input
                    id="page-auth-password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="auth-input"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? "👁️" : "🙈"}
                  </button>
                </div>
              </div>
            )}

            {mode === "login" && (
              <div className="auth-row-actions">
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => {
                    setMode("forgot");
                    setError("");
                  }}
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading && <div className="auth-spinner"></div>}
              {mode === "forgot"
                ? "Send Password Reset Link"
                : mode === "signup"
                ? "Create Account"
                : "Sign In"}
            </button>
          </form>

          <div className="auth-footer">
            {mode === "forgot" ? (
              <p>
                Remembered your password?
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError("");
                  }}
                >
                  Back to Sign In
                </button>
              </p>
            ) : mode === "signup" ? (
              <p>
                Already have an account?
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError("");
                  }}
                >
                  Sign In
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setError("");
                  }}
                >
                  Sign Up
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
