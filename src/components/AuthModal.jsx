import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import "./AuthModal.css";

const ADMIN_EMAIL = "krishnackb2007@gmail.com";

function AuthModal() {
  const navigate = useNavigate();

  const {
    isAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    closeAuthModal,
    loginWithEmail,
    resetPassword,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // CHANGE MODE
  // ==========================================

  const changeMode = (newMode) => {
    setError("");
    setSuccess("");
    setAuthModalMode(newMode);
  };

  // ==========================================
  // ESC KEY
  // ==========================================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isAuthModalOpen) {
        closeAuthModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) {
    return null;
  }

  // ==========================================
  // ERROR MESSAGE
  // ==========================================

  const formatErrorMessage = (err) => {
    const msg =
      err?.message || err?.toString() || "Login failed.";

    if (
      msg.includes("Invalid login credentials") ||
      msg.includes("invalid-credential") ||
      msg.includes("wrong-password")
    ) {
      return "Incorrect email or password. Please try again.";
    }

    if (
      msg.includes("user-not-found") ||
      msg.includes("User not found")
    ) {
      return "Admin account not found.";
    }

    if (
      msg.includes("Email not confirmed") ||
      msg.includes("email_not_confirmed")
    ) {
      return "Please confirm your email before signing in.";
    }

    if (
      msg.includes("Too many requests") ||
      msg.includes("rate limit")
    ) {
      return "Too many attempts. Please try again later.";
    }

    return msg.replace("Firebase: ", "");
  };

  // ==========================================
  // EMAIL SUBMIT
  // LOGIN + FORGOT PASSWORD ONLY
  // ==========================================

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const cleanEmail =
        email.trim().toLowerCase();

      // ========================================
      // FORGOT PASSWORD
      // ========================================

      if (authModalMode === "forgot") {
        if (!cleanEmail) {
          throw new Error(
            "Please enter your email address."
          );
        }

        // Only admin password reset
        if (
          cleanEmail !==
          ADMIN_EMAIL.toLowerCase()
        ) {
          throw new Error(
            "Password reset is available only for the admin account."
          );
        }

        await resetPassword(cleanEmail);

        setSuccess(
          "Password reset instructions sent to the admin email."
        );

        setTimeout(() => {
          changeMode("login");
        }, 2500);

        return;
      }

      // ========================================
      // LOGIN
      // ========================================

      if (!cleanEmail || !password) {
        throw new Error(
          "Please enter both email and password."
        );
      }

      // ========================================
      // ADMIN EMAIL CHECK
      // ========================================

      if (
        cleanEmail !==
        ADMIN_EMAIL.toLowerCase()
      ) {
        throw new Error(
          "Only the admin account can sign in here."
        );
      }

      // ========================================
      // SUPABASE LOGIN
      // ========================================

      await loginWithEmail(
        cleanEmail,
        password
      );

      setSuccess(
        "Admin login successful!"
      );

      setTimeout(() => {
        closeAuthModal();
        navigate("/admin");
      }, 700);
    } catch (err) {
      console.error("Auth Error:", err);

      setError(
        formatErrorMessage(err)
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div
      className="auth-overlay"
      onClick={closeAuthModal}
    >
      <div
        className="auth-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        {/* CLOSE BUTTON */}

        <button
          className="auth-close-btn"
          onClick={closeAuthModal}
          aria-label="Close modal"
          type="button"
        >
          ✕
        </button>

        {/* HEADER */}

        <div className="auth-modal-header">
          <span className="auth-badge">
            🎓 BiharBoardStudy Portal
          </span>

          <h2>
            {authModalMode === "forgot"
              ? "Reset Admin Password"
              : "Admin Login"}
          </h2>

          <p>
            {authModalMode === "forgot"
              ? "Enter the admin email to receive a password reset link."
              : "Sign in with your authorized admin account."}
          </p>
        </div>

        {/* SECURITY NOTICE */}

        <div className="auth-demo-notice">
          <span>🔐</span>

          <span>
            <strong>Admin Access Only:</strong>{" "}
            New student or public accounts
            cannot be created here.
          </span>
        </div>

        {/* ERROR */}

        {error && (
          <div className="auth-alert error">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="auth-alert success">
            <span>✅</span>
            <span>{success}</span>
          </div>
        )}

        <div className="auth-body">
          <form
            onSubmit={handleEmailSubmit}
            className="auth-form"
          >
            {/* EMAIL */}

            <div className="auth-field">
              <label htmlFor="auth-email">
                Admin Email Address
              </label>

              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  📧
                </span>

                <input
                  id="auth-email"
                  type="email"
                  required
                  className="auth-input"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            {/* PASSWORD */}

            {authModalMode !== "forgot" && (
              <div className="auth-field">
                <label htmlFor="auth-password">
                  Password
                </label>

                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">
                    🔒
                  </span>

                  <input
                    id="auth-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    required
                    className="auth-input"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                  />

                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    aria-label="Toggle password visibility"
                  >
                    {showPassword
                      ? "👁️"
                      : "🙈"}
                  </button>
                </div>
              </div>
            )}

            {/* FORGOT PASSWORD */}

            {authModalMode === "login" && (
              <div className="auth-row-actions">
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() =>
                    changeMode("forgot")
                  }
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading && (
                <div className="auth-spinner"></div>
              )}

              {authModalMode === "forgot"
                ? "Send Password Reset Link"
                : "Sign In"}
            </button>
          </form>

          {/* FOOTER */}

          <div className="auth-footer">
            {authModalMode === "forgot" ? (
              <p>
                Remembered your password?

                <button
                  type="button"
                  onClick={() =>
                    changeMode("login")
                  }
                >
                  Back to Sign In
                </button>
              </p>
            ) : (
              <p>
                🔒 Admin access only
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
