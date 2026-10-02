import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // ================= SUBJECT NAVIGATION =================
  const openSubject = (subject) => {
    navigate(`/class-10/${encodeURIComponent(subject)}`);
  };

  return (
    <div className="home-page">

      {/* =========================================================
          MOBILE RESPONSIVE CSS
          Desktop design ko disturb nahi karega.
      ========================================================= */}
      <style>{`
        /* Prevent horizontal scrolling */
        .home-page {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }

        /* ================= MOBILE ================= */
        @media (max-width: 768px) {

          /* ---------- GENERAL ---------- */
          .home-page,
          .home-page * {
            box-sizing: border-box;
          }

          .home-page img {
            max-width: 100%;
            height: auto;
          }

          /* ---------- HERO ---------- */
          .hero-section {
            width: 100% !important;
            overflow: hidden !important;
          }

          .hero-container {
            width: 100% !important;
            max-width: 100% !important;
            padding: 20px 18px !important;
            margin: 0 auto !important;
          }

          .hero-left {
            width: 100% !important;
            max-width: 100% !important;
            text-align: center !important;
          }

          .student-badge {
            display: inline-flex !important;
            max-width: 100% !important;
            font-size: 13px !important;
            padding: 8px 14px !important;
          }

          .hero-left h1 {
            font-size: clamp(30px, 8vw, 42px) !important;
            line-height: 1.15 !important;
            margin: 18px 0 14px !important;
            word-break: normal !important;
          }

          .hero-description {
            width: 100% !important;
            max-width: 100% !important;
            font-size: 15px !important;
            line-height: 1.6 !important;
            padding: 0 !important;
            margin: 0 auto !important;
          }

          .creator-credit {
            width: 100% !important;
            font-size: 13px !important;
            text-align: center !important;
            margin-top: 18px !important;
          }

          /* ---------- CHOOSE YOUR CLASS ---------- */
          .classes-section {
            width: 100% !important;
            padding: 35px 16px !important;
            margin: 0 !important;
            overflow: hidden !important;
          }

          .section-heading {
            width: 100% !important;
            max-width: 100% !important;
            text-align: center !important;
            padding: 0 5px !important;
          }

          .section-heading h2 {
            font-size: 30px !important;
            line-height: 1.2 !important;
            margin-bottom: 10px !important;
          }

          .section-heading p {
            font-size: 15px !important;
            line-height: 1.5 !important;
            margin: 0 auto !important;
          }

          /* ---------- CLASS CARDS ---------- */
          .class-cards {
            width: 100% !important;
            max-width: 520px !important;
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 22px !important;
            margin: 28px auto 0 !important;
            padding: 0 !important;
          }

          .class-card {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            margin: 0 !important;
            padding: 28px 20px 30px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            overflow: hidden !important;
          }

          .class-icon {
            width: 120px !important;
            height: 120px !important;
            max-width: 100% !important;
            margin: 0 auto 22px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 62px !important;
          }

          .class-card h3 {
            width: 100% !important;
            font-size: 27px !important;
            line-height: 1.2 !important;
            margin: 0 0 10px !important;
          }

          .class-card p {
            width: 100% !important;
            font-size: 15px !important;
            line-height: 1.5 !important;
            margin: 0 0 20px !important;
          }

          .class-button {
            width: 100% !important;
            max-width: 280px !important;
            min-height: 52px !important;
            height: auto !important;
            padding: 13px 18px !important;
            margin: 0 auto !important;
            font-size: 16px !important;
            line-height: 1.25 !important;
            white-space: normal !important;
            text-align: center !important;
            border-radius: 30px !important;
          }

          /* ---------- SUBJECT SECTIONS ---------- */
          .subjects-section {
            width: 100% !important;
            max-width: 100% !important;
            padding: 45px 16px !important;
            margin: 0 !important;
            overflow: hidden !important;
          }

          .section-title-row {
            width: 100% !important;
            max-width: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 18px !important;
            margin-bottom: 25px !important;
          }

          .section-title-row > div {
            width: 100% !important;
            max-width: 100% !important;
          }

          .section-title-row h2 {
            width: 100% !important;
            font-size: 28px !important;
            line-height: 1.25 !important;
            margin: 0 0 8px !important;
          }

          .section-title-row p {
            width: 100% !important;
            font-size: 15px !important;
            line-height: 1.5 !important;
            margin: 0 !important;
          }

          .view-all-button {
            width: auto !important;
            max-width: 100% !important;
            min-height: 44px !important;
            padding: 10px 18px !important;
            font-size: 14px !important;
            white-space: nowrap !important;
            align-self: flex-start !important;
          }

          /* ---------- SUBJECT GRID ---------- */
          .subjects-grid {
            width: 100% !important;
            max-width: 100% !important;
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 18px !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .subject-card {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            min-height: 170px !important;
            margin: 0 !important;
            padding: 25px 22px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            overflow: hidden !important;
          }

          .subject-icon {
            width: 72px !important;
            height: 72px !important;
            flex-shrink: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            margin: 0 auto 15px !important;
            font-size: 34px !important;
          }

          .subject-card h3 {
            width: 100% !important;
            font-size: 20px !important;
            line-height: 1.3 !important;
            margin: 0 0 8px !important;
            overflow-wrap: break-word !important;
            word-break: normal !important;
          }

          .subject-card span {
            width: 100% !important;
            font-size: 14px !important;
            line-height: 1.45 !important;
            overflow-wrap: break-word !important;
          }

          /* ---------- CLASS 12 ---------- */
          .class12-subjects {
            width: 100% !important;
          }

          /* ---------- QUOTE ---------- */
          .quote-section {
            width: 100% !important;
            padding: 45px 18px !important;
            overflow: hidden !important;
          }

          .quote-content {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            text-align: center !important;
          }

          .quote-mark {
            font-size: 55px !important;
            line-height: 1 !important;
          }

          .quote-content p {
            width: 100% !important;
            font-size: 17px !important;
            line-height: 1.6 !important;
            margin: 10px auto 14px !important;
          }

          .quote-content span {
            font-size: 14px !important;
            line-height: 1.4 !important;
          }

          /* ---------- CREATOR ---------- */
          .creator-section {
            width: 100% !important;
            padding: 40px 16px !important;
            overflow: hidden !important;
          }

          .creator-card {
            width: 100% !important;
            max-width: 520px !important;
            margin: 0 auto !important;
            padding: 25px 20px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            gap: 16px !important;
          }

          .creator-logo {
            flex-shrink: 0 !important;
          }

          .creator-card > div:last-child {
            width: 100% !important;
            min-width: 0 !important;
          }

          .creator-card h2 {
            font-size: 27px !important;
            line-height: 1.2 !important;
            margin: 5px 0 !important;
          }

          .creator-card p {
            font-size: 14px !important;
            line-height: 1.5 !important;
          }

          .creator-instagram {
            display: inline-block !important;
            max-width: 100% !important;
            overflow-wrap: break-word !important;
            word-break: break-word !important;
          }

          /* ---------- FOOTER ---------- */
          .footer {
            width: 100% !important;
            overflow: hidden !important;
          }

          .footer-container {
            width: 100% !important;
            max-width: 100% !important;
            padding: 40px 20px !important;
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }

          .footer-brand,
          .footer-column {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
          }

          .footer-brand h2 {
            font-size: 25px !important;
          }

          .footer-brand p {
            font-size: 14px !important;
            line-height: 1.6 !important;
            max-width: 100% !important;
          }

          .footer-column h3 {
            font-size: 17px !important;
            margin-bottom: 12px !important;
          }

          .footer-column a {
            display: block !important;
            width: fit-content !important;
            max-width: 100% !important;
            font-size: 14px !important;
            margin-bottom: 9px !important;
          }

          .social-icons {
            display: flex !important;
            gap: 12px !important;
          }

          .social-icons button {
            flex-shrink: 0 !important;
          }

          .footer-bottom {
            width: 100% !important;
            padding: 20px 16px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 8px !important;
            text-align: center !important;
          }

          .footer-bottom span {
            width: 100% !important;
            font-size: 12px !important;
            line-height: 1.5 !important;
          }
        }

        /* ================= SMALL PHONES ================= */
        @media (max-width: 480px) {

          .hero-container {
            padding: 16px 14px !important;
          }

          .hero-left h1 {
            font-size: 29px !important;
          }

          .hero-description {
            font-size: 14px !important;
          }

          .classes-section,
          .subjects-section {
            padding-left: 14px !important;
            padding-right: 14px !important;
          }

          .section-heading h2,
          .section-title-row h2 {
            font-size: 26px !important;
          }

          .class-cards {
            gap: 18px !important;
          }

          .class-card {
            padding: 24px 17px 26px !important;
          }

          .class-icon {
            width: 105px !important;
            height: 105px !important;
            font-size: 54px !important;
            margin-bottom: 18px !important;
          }

          .class-card h3 {
            font-size: 25px !important;
          }

          .class-button {
            max-width: 100% !important;
            font-size: 15px !important;
          }

          .subject-card {
            min-height: 155px !important;
            padding: 22px 17px !important;
          }

          .subject-icon {
            width: 65px !important;
            height: 65px !important;
            font-size: 30px !important;
          }

          .subject-card h3 {
            font-size: 19px !important;
          }

          .subject-card span {
            font-size: 13px !important;
          }

          .creator-section {
            padding-left: 14px !important;
            padding-right: 14px !important;
          }

          .footer-container {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }
        }
          

      `}</style>
      

      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">

        <div className="hero-container">

          {/* ================= HERO CONTENT ================= */}
          <div className="hero-left">

            <div className="student-badge">
              🎓 Bihar Board Students
            </div>

            <h1>
              Bihar Board Exam
              <br />
              <span>Preparation Made Easy</span>
            </h1>

            <p className="hero-description">
              Class 10 & 12 Bihar Board students ke liye Previous Year
              Questions, Model Papers, Important Questions aur Study
              Resources — sab kuch ek jagah.
            </p>

            {/* KRISHNA CREDIT */}
            <div className="creator-credit">
              Created & Managed by <strong>KRISHNA</strong>
            </div>

          </div>

        </div>

        {/* ================= CHOOSE YOUR CLASS ================= */}
        <section className="classes-section">

          <div className="section-heading">

            <h2>Choose Your Class</h2>

            <p>
              Apni class select karke Bihar Board preparation start karein.
            </p>

          </div>

          <div className="class-cards">

            {/* ================= CLASS 10 ================= */}
            <div
              className="class-card class-ten"
              onClick={() => navigate("/class-10")}
            >

              <div className="class-icon">
                📘
              </div>

              <h3>
                Class 10
              </h3>

              <p>
                Matric Bihar Board
              </p>

              <button
                className="class-button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/class-10");
                }}
              >
                Explore Now →
              </button>

            </div>

            {/* ================= CLASS 12 ================= */}
            <div
              className="class-card class-twelve"
              onClick={() => navigate("/class-12")}
            >

              <div className="class-icon">
                🎓
              </div>

              <h3>
                Class 12
              </h3>

              <p>
                Intermediate Bihar Board
              </p>

              <button
                className="class-button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/class-12");
                }}
              >
                Explore Now →
              </button>

            </div>

          </div>

        </section>

      </section>

      {/* ================================================= */}
      {/* ================= POPULAR SUBJECTS CLASS 10 ==== */}
      {/* ================================================= */}

      <section className="subjects-section">

        <div className="section-title-row">

          <div>
            <h2>
              Popular Subjects — Class 10
            </h2>

            <p>
              Important study resources explore karein.
            </p>
          </div>

          <button
            className="view-all-button"
            onClick={() => navigate("/class-10")}
          >
            View All →
          </button>

        </div>

        <div className="subjects-grid">

          {/* ================= MATHEMATICS ================= */}
          <div
            className="subject-card"
            onClick={() => openSubject("Mathematics")}
          >

            <div className="subject-icon">
              🔢
            </div>

            <h3>
              Mathematics
            </h3>

            <span>
              Important Questions
            </span>

          </div>

          {/* ================= SCIENCE ================= */}
          <div
            className="subject-card"
            onClick={() => openSubject("Science")}
          >

            <div className="subject-icon">
              🔬
            </div>

            <h3>
              Science
            </h3>

            <span>
              Important Questions
            </span>

          </div>

          {/* ================= SOCIAL SCIENCE ================= */}
          <div
            className="subject-card"
            onClick={() => openSubject("Social Science")}
          >

            <div className="subject-icon">
              🌍
            </div>

            <h3>
              Social Science
            </h3>

            <span>
              Important Questions
            </span>

          </div>

          {/* ================= HINDI ================= */}
          <div
            className="subject-card"
            onClick={() => openSubject("Hindi")}
          >

            <div className="subject-icon">
              📖
            </div>

            <h3>
              Hindi
            </h3>

            <span>
              Study Resources
            </span>

          </div>

          {/* ================= ENGLISH ================= */}
          <div
            className="subject-card"
            onClick={() => openSubject("English")}
          >

            <div className="subject-icon">
              🔤
            </div>

            <h3>
              English
            </h3>

            <span>
              Study Resources
            </span>

          </div>

          {/* ================= SANSKRIT ================= */}
          <div
            className="subject-card"
            onClick={() => openSubject("Sanskrit")}
          >

            <div className="subject-icon">
              🪔
            </div>

            <h3>
              Sanskrit
            </h3>

            <span>
              Study Resources
            </span>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* ================= CLASS 12 SUBJECTS ============= */}
      {/* ================================================= */}

      <section className="subjects-section class12-subjects">

        <div className="section-title-row">

          <div>

            <h2>
              Popular Subjects — Class 12
            </h2>

            <p>
              Science, Commerce aur Arts ke resources.
            </p>

          </div>

          <button
            className="view-all-button"
            onClick={() => navigate("/class-12")}
          >
            View All →
          </button>

        </div>

        <div className="subjects-grid">

          {/* ================= PHYSICS ================= */}
          <div
            className="subject-card"
            onClick={() => navigate("/class-12/science/physics")}
          >
            <div className="subject-icon">
              ⚛️
            </div>

            <h3>Physics</h3>

            <span>
              Study Resources
            </span>
          </div>

          {/* ================= CHEMISTRY ================= */}
          <div
            className="subject-card"
            onClick={() => navigate("/class-12/science/chemistry")}
          >
            <div className="subject-icon">
              🧪
            </div>

            <h3>Chemistry</h3>

            <span>
              Study Resources
            </span>
          </div>

          {/* ================= MATHEMATICS ================= */}
          <div
            className="subject-card"
            onClick={() => navigate("/class-12/science/mathematics")}
          >
            <div className="subject-icon">
              📐
            </div>

            <h3>Mathematics</h3>

            <span>
              Study Resources
            </span>
          </div>

          {/* ================= BIOLOGY ================= */}
          <div
            className="subject-card"
            onClick={() => navigate("/class-12/science/biology")}
          >
            <div className="subject-icon">
              🌱
            </div>

            <h3>Biology</h3>

            <span>
              Study Resources
            </span>
          </div>

          {/* ================= ACCOUNTANCY ================= */}
          <div
            className="subject-card"
            onClick={() => navigate("/class-12/commerce/accountancy")}
          >
            <div className="subject-icon">
              📊
            </div>

            <h3>Accountancy</h3>

            <span>
              Study Resources
            </span>
          </div>

          {/* ================= BUSINESS STUDIES ================= */}
          <div
            className="subject-card"
            onClick={() =>
              navigate("/class-12/commerce/business-studies")
            }
          >
            <div className="subject-icon">
              💼
            </div>

            <h3>Business Studies</h3>

            <span>
              Study Resources
            </span>
          </div>

          {/* ================= ECONOMICS ================= */}
          <div
            className="subject-card"
            onClick={() =>
              navigate("/class-12/commerce/economics")
            }
          >
            <div className="subject-icon">
              📈
            </div>

            <h3>Economics</h3>

            <span>
              Study Resources
            </span>
          </div>

        </div>

      </section>

      {/* ================= QUOTE SECTION ================= */}
      <section className="quote-section">

        <div className="quote-content">

          <div className="quote-mark">
            “
          </div>

          <p>
            Dream, dream, dream. Dreams transform into thoughts
            and thoughts result in action.
          </p>

          <span>
            — Dr. A. P. J. Abdul Kalam
          </span>

        </div>

      </section>

      {/* ================= CREATOR SECTION ================= */}
      <section className="creator-section">

        <div className="creator-card">

          <div className="creator-logo">
            K
          </div>

          <div>

            <span>
              Website Created & Managed By
            </span>

            <h2>
              KRISHNA
            </h2>

            <p>
              Bihar Board Study Portal
            </p>

            <a
              href="https://www.instagram.com/krishna_2026h/"
              target="_blank"
              rel="noopener noreferrer"
              className="creator-instagram"
            >
              @krishna_2026h
            </a>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">

        <div className="footer-container">

          {/* ================= FOOTER BRAND ================= */}
          <div className="footer-brand">

            <h2>
              <span>BiharBoard</span>Study
            </h2>

            <p>
              Bihar Board Class 10 & 12 students ke liye
              simple aur useful study platform.
            </p>

            <strong>
              © 2026 BiharBoardStudy
            </strong>

          </div>

          {/* ================= QUICK LINKS ================= */}
          <div className="footer-column">

            <h3>
              Quick Links
            </h3>

            <a href="/">
              Home
            </a>

            <a href="/class-10">
              Class 10
            </a>

            <a href="/class-12">
              Class 12
            </a>

            <a href="/class-10">
              PYQ
            </a>

          </div>

          {/* ================= RESOURCES ================= */}
          <div className="footer-column">

            <h3>
              Resources
            </h3>

            <a href="/class-10">
              Notes
            </a>

            <a href="/class-10">
              Model Papers
            </a>

            <a href="/class-10">
              Important Questions
            </a>

            <a href="/">
              About
            </a>

          </div>

          {/* ================= SOCIAL ================= */}
          <div className="footer-column">

            <h3>
              Follow Us
            </h3>

            <div className="social-icons">

              <button
                type="button"
                aria-label="Instagram"
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/krishna_2026h/",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                📸
              </button>

              <button
                type="button"
                aria-label="YouTube"
              >
                ▶️
              </button>

              <button
                type="button"
                aria-label="Contact"
              >
                💬
              </button>

            </div>

          </div>

        </div>

        {/* ================= FOOTER BOTTOM ================= */}
        <div className="footer-bottom">

          <span>
            Made with ❤️ for Bihar Board Students
          </span>

          <span>
            Designed & Managed by <strong>KRISHNA</strong>
          </span>

        </div>

      </footer>

    </div>
  );
}

export default Home;