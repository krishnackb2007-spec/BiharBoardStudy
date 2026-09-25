import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import "./NavbarUser.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, openAuthModal, logout } = useAuth();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Display name
  const displayName =
    user?.displayName ||
    (user?.email ? user.email.split("@")[0] : null) ||
    (user?.phoneNumber
      ? `Student ${user.phoneNumber.slice(-4)}`
      : "Student");

  const initial = displayName.charAt(0).toUpperCase();

  const providerName =
    user?.providerData?.[0]?.providerId ||
    user?.providerId ||
    "Student";

  const formattedProvider = providerName.includes("google")
    ? "Google / Gmail"
    : providerName.includes("phone")
    ? "Mobile OTP"
    : "Email Account";

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* =========================
            BRAND
        ========================== */}
        <a
          href="#home"
          className="brand"
          onClick={closeMenu}
        >
          <div className="brand-logo-wrapper">
            <img
              src="/logo.png"
              alt="BiharBoardStudy Logo"
              className="brand-logo"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />

            <div className="brand-fallback">
              <span>BB</span>
            </div>
          </div>

          <div className="brand-text">
            <div className="brand-main">
              BiharBoard<span>Study</span>
            </div>

            <div className="brand-owner">
              BY KRISHNA
            </div>
          </div>
        </a>

        {/* =========================
            DESKTOP / MOBILE NAVIGATION
        ========================== */}
        <nav
          className={`nav-links ${
            menuOpen ? "mobile-open" : ""
          }`}
        >

          {/* HOME */}
          <a
            href="#home"
            onClick={closeMenu}
          >
            Home
          </a>

          {/* CLASS 10 */}
          <a
            href="#class10"
            onClick={closeMenu}
          >
            Class 10
          </a>

          {/* CLASS 12 */}
          <a
            href="#class12"
            onClick={closeMenu}
          >
            Class 12
          </a>

          {/* 
            PYQ / NOTES / ABOUT REMOVED
          */}

          {/* =========================
              MOBILE AUTH
          ========================== */}
          <div className="mobile-auth-section">

            {user ? (

              <div style={{ textAlign: "center" }}>

                <p
                  style={{
                    fontWeight: 700,
                    marginBottom: 4,
                    color: "#0f172a",
                  }}
                >
                  👤 {displayName}
                </p>

                <p
                  style={{
                    fontSize: 12,
                    color: "#64748b",
                    marginBottom: 12,
                  }}
                >
                  {user.email ||
                    user.phoneNumber ||
                    "Bihar Board Student"}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >

                  <button
                    type="button"
                    className="auth-submit-btn"
                    style={{
                      background: "#3b82f6",
                      fontSize: 13,
                      padding: "8px 16px",
                      width: "100%",
                    }}
                    onClick={() => {
                      closeMenu();
                      window.location.href = "/admin";
                    }}
                  >
                    Go to Dashboard
                  </button>

                  <button
                    type="button"
                    className="auth-submit-btn"
                    style={{
                      background: "#ef4444",
                      fontSize: 13,
                      padding: "8px 16px",
                      width: "100%",
                    }}
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                  >
                    Log Out
                  </button>

                </div>
              </div>

            ) : (

              <button
                type="button"
                className="auth-submit-btn"
                style={{
                  fontSize: 13,
                  padding: "10px 16px",
                }}
                onClick={() => {
                  closeMenu();
                  openAuthModal("login");
                }}
              >
                Sign In / Register
              </button>

            )}

          </div>

        </nav>

        {/* =========================
            DESKTOP LOGIN / PROFILE
        ========================== */}
        {user ? (

          <div
            className="user-profile-container desktop-only"
            ref={dropdownRef}
          >

            <button
              className="user-profile-btn"
              onClick={() =>
                setProfileOpen(!profileOpen)
              }
              type="button"
              aria-label="User profile options"
            >

              {user.photoURL ? (

                <img
                  src={user.photoURL}
                  alt={displayName}
                  className="user-avatar"
                  referrerPolicy="no-referrer"
                />

              ) : (

                <div className="user-avatar-placeholder">
                  {initial}
                </div>

              )}

              <span className="user-name-short">
                {displayName}
              </span>

              <span
                className={`user-dropdown-caret ${
                  profileOpen ? "open" : ""
                }`}
              >
                ▼
              </span>

            </button>

            {/* PROFILE DROPDOWN */}
            {profileOpen && (

              <div className="user-dropdown-menu">

                <div className="user-dropdown-header">

                  <div className="user-full-name">
                    {displayName}
                  </div>

                  <div className="user-email-phone">
                    {user.email ||
                      user.phoneNumber ||
                      "Student Account"}
                  </div>

                  <span className="user-provider-badge">
                    {formattedProvider}
                  </span>

                </div>

                <div className="user-dropdown-actions">

                  <button
                    className="user-dropdown-item"
                    type="button"
                    style={{
                      color: "#3b82f6",
                      marginBottom: "4px",
                    }}
                    onClick={() => {
                      setProfileOpen(false);
                      window.location.href = "/admin";
                    }}
                  >
                    <span>📊</span>
                    <span>Admin Dashboard</span>
                  </button>

                  <button
                    className="user-dropdown-item"
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      logout();
                    }}
                  >
                    <span>🚪</span>
                    <span>Sign Out</span>
                  </button>

                </div>

              </div>

            )}

          </div>

        ) : (

          <button
            className="nav-login desktop-only"
            type="button"
            onClick={() => openAuthModal("login")}
          >
            Login
          </button>

        )}

        {/* =========================
            MOBILE MENU BUTTON
        ========================== */}
        <button
          className={`menu-button ${
            menuOpen ? "active" : ""
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  );
}

export default Navbar;