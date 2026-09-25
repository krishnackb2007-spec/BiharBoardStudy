import { useNavigate } from "react-router-dom";
import "./Science12.css";

function Science12() {
  const navigate = useNavigate();

  const openSubject = (subject) => {
    navigate(`/class-12/science/${subject.toLowerCase()}`);
  };

  return (
    <div className="science12-page">

      {/* ================= HEADER ================= */}
      <section className="science12-header">

        <button
          className="science12-back"
          onClick={() => navigate("/class-12")}
        >
          ← Back to Class 12
        </button>

        <div className="science12-badge">
          🔬 BIHAR BOARD • CLASS 12 • SCIENCE
        </div>

        <h1>
          Science <span>Stream</span>
        </h1>

        <p>
          Class 12 Science students ke liye Physics, Chemistry,
          Mathematics aur Biology ke complete study resources.
        </p>

      </section>


      {/* ================= SUBJECTS ================= */}
      <section className="science12-subject-section">

        <div className="science12-section-heading">

          <h2>
            Choose Your Subject
          </h2>

          <p>
            Apna subject select karke exam preparation start karein.
          </p>

        </div>


        <div className="science12-subject-grid">


          {/* ================= PHYSICS ================= */}
          <div
            className="science12-subject-card physics-card"
            onClick={() => openSubject("Physics")}
          >

            <div className="science12-subject-icon">
              ⚛️
            </div>

            <div className="science12-subject-content">

              <span>
                SCIENCE • CLASS 12
              </span>

              <h3>
                Physics
              </h3>

              <p>
                Physics ke important chapters,
                questions aur exam preparation resources.
              </p>

            </div>

            <div className="science12-arrow">
              Explore →
            </div>

          </div>


          {/* ================= CHEMISTRY ================= */}
          <div
            className="science12-subject-card chemistry-card"
            onClick={() => openSubject("Chemistry")}
          >

            <div className="science12-subject-icon">
              🧪
            </div>

            <div className="science12-subject-content">

              <span>
                SCIENCE • CLASS 12
              </span>

              <h3>
                Chemistry
              </h3>

              <p>
                Chemistry ke important questions,
                papers aur study resources.
              </p>

            </div>

            <div className="science12-arrow">
              Explore →
            </div>

          </div>


          {/* ================= MATHEMATICS ================= */}
          <div
            className="science12-subject-card mathematics-card"
            onClick={() => openSubject("Mathematics")}
          >

            <div className="science12-subject-icon">
              📐
            </div>

            <div className="science12-subject-content">

              <span>
                SCIENCE • CLASS 12
              </span>

              <h3>
                Mathematics
              </h3>

              <p>
                Mathematics ke important questions,
                PYQ aur exam preparation resources.
              </p>

            </div>

            <div className="science12-arrow">
              Explore →
            </div>

          </div>


          {/* ================= BIOLOGY ================= */}
          <div
            className="science12-subject-card biology-card"
            onClick={() => openSubject("Biology")}
          >

            <div className="science12-subject-icon">
              🌱
            </div>

            <div className="science12-subject-content">

              <span>
                SCIENCE • CLASS 12
              </span>

              <h3>
                Biology
              </h3>

              <p>
                Biology ke important chapters,
                questions aur study resources.
              </p>

            </div>

            <div className="science12-arrow">
              Explore →
            </div>

          </div>


        </div>

      </section>


      {/* ================= RESOURCES ================= */}
      <section className="science12-resource-info">

        <div className="science12-resource-header">

          <div className="science12-resource-icon">
            📚
          </div>

          <div>
            <h2>
              Complete Science Resources
            </h2>

            <p>
              Har subject ke liye Bihar Board exam preparation material.
            </p>
          </div>

        </div>


        <div className="science12-resource-grid">

          <div className="science12-resource-card">
            <strong>10</strong>
            <span>Years PYQ</span>
          </div>

          <div className="science12-resource-card">
            <strong>5</strong>
            <span>Model Papers</span>
          </div>

          <div className="science12-resource-card">
            <strong>200</strong>
            <span>Objective Questions</span>
          </div>

          <div className="science12-resource-card">
            <strong>50</strong>
            <span>Subjective Questions</span>
          </div>

        </div>

      </section>


      {/* ================= NOTE ================= */}
      <section className="science12-note">

        <span>
          💡
        </span>

        <p>
          Physics, Chemistry, Mathematics ya Biology select karein
          aur apni Class 12 Science preparation start karein.
        </p>

      </section>

    </div>
  );
}

export default Science12;