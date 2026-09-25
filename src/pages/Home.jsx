import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // ================= SUBJECT NAVIGATION =================
  const openSubject = (subject) => {
    navigate(`/class-10/${encodeURIComponent(subject)}`);
  };

  return (
    <div className="home-page">

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

          <button className="view-all-button">
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

            <a href="#">
              Class 12
            </a>

            <a href="#">
              PYQ
            </a>

          </div>


          {/* ================= RESOURCES ================= */}
          <div className="footer-column">

            <h3>
              Resources
            </h3>

            <a href="#">
              Notes
            </a>

            <a href="#">
              Model Papers
            </a>

            <a href="#">
              Important Questions
            </a>

            <a href="#">
              About
            </a>

          </div>


          {/* ================= SOCIAL ================= */}
          <div className="footer-column">

            <h3>
              Follow Us
            </h3>

            <div className="social-icons">

              <button>
                📸
              </button>

              <button>
                ▶️
              </button>

              <button>
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