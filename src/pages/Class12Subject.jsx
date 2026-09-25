import { useNavigate, useParams } from "react-router-dom";
import "./Class12Subject.css";

function Class12Subject() {
  const navigate = useNavigate();
  const { subject } = useParams();

  const subjectName =
    subject?.charAt(0).toUpperCase() + subject?.slice(1);

  const subjectIcons = {
    physics: "⚛️",
    chemistry: "🧪",
    mathematics: "📐",
    biology: "🌱",
  };

  const icon = subjectIcons[subject?.toLowerCase()] || "📚";

  const openResource = (type) => {
    navigate(`/class-12/science/${subject}/${type}`);
  };

  return (
    <div className="class12-subject-page">

      {/* ================= HEADER ================= */}
      <section className="class12-subject-header">

        <button
          className="class12-subject-back"
          onClick={() => navigate("/class-12/science")}
        >
          ← Back to Science
        </button>

        <div className="class12-subject-badge">
          {icon} BIHAR BOARD • CLASS 12 • SCIENCE
        </div>

        <h1>
          {subjectName}
          <span> Exam Preparation</span>
        </h1>

        <p>
          Class 12 Bihar Board {subjectName} ke liye
          Previous Year Questions, Model Papers aur Important
          Questions — sab kuch ek jagah.
        </p>

      </section>


      {/* ================= SUBJECT INTRO ================= */}
      <section className="class12-subject-intro">

        <div className="class12-subject-icon">
          {icon}
        </div>

        <div>

          <span>
            CLASS 12 • SCIENCE • {subjectName?.toUpperCase()}
          </span>

          <h2>
            Prepare {subjectName} Better
          </h2>

          <p>
            Important exam resources ko ek jagah access karein
            aur apni {subjectName} preparation strong banayein.
          </p>

        </div>

      </section>


      {/* ================= RESOURCES ================= */}
      <section className="class12-subject-resources">

        <div className="class12-subject-section-heading">

          <h2>
            {subjectName} Study Resources
          </h2>

          <p>
            Apni preparation ke liye resource select karein.
          </p>

        </div>


        <div className="class12-subject-resource-grid">


          {/* ================= PYQ ================= */}
          <div
            className="class12-subject-resource-card pyq-resource"
            onClick={() => openResource("pyq")}
          >

            <div className="class12-resource-icon">
              📄
            </div>

            <div className="class12-resource-number">
              10
            </div>

            <h3>
              10 Years
            </h3>

            <p>
              Previous Year Questions
            </p>

            <span>
              Explore →
            </span>

          </div>


          {/* ================= MODEL PAPERS ================= */}
          <div
            className="class12-subject-resource-card model-resource"
            onClick={() => openResource("model-papers")}
          >

            <div className="class12-resource-icon">
              📑
            </div>

            <div className="class12-resource-number">
              5
            </div>

            <h3>
              Model Papers
            </h3>

            <p>
              Practice Model Papers
            </p>

            <span>
              Explore →
            </span>

          </div>


          {/* ================= OBJECTIVE ================= */}
          <div
            className="class12-subject-resource-card objective-resource"
            onClick={() => openResource("objective")}
          >

            <div className="class12-resource-icon">
              🎯
            </div>

            <div className="class12-resource-number">
              200
            </div>

            <h3>
              Objective Questions
            </h3>

            <p>
              Most Important Questions
            </p>

            <span>
              Explore →
            </span>

          </div>


          {/* ================= SUBJECTIVE ================= */}
          <div
            className="class12-subject-resource-card subjective-resource"
            onClick={() => openResource("subjective")}
          >

            <div className="class12-resource-icon">
              ✍️
            </div>

            <div className="class12-resource-number">
              50
            </div>

            <h3>
              Subjective Questions
            </h3>

            <p>
              Most Important Questions
            </p>

            <span>
              Explore →
            </span>

          </div>


        </div>

      </section>


      {/* ================= NOTE ================= */}
      <section className="class12-subject-note">

        <div className="class12-note-icon">
          💡
        </div>

        <div>

          <h3>
            Preparation Tip
          </h3>

          <p>
            Pehle Previous Year Questions solve karein,
            phir Model Papers aur Important Questions se
            practice karein.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Class12Subject;