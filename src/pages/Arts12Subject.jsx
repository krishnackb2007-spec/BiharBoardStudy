import { useNavigate, useParams } from "react-router-dom";
import "./Arts12Subject.css";

function Arts12Subject() {
  const navigate = useNavigate();
  const { subject } = useParams();

  const subjectName = subject
    ?.split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

  const subjectIcons = {
    history: "🏛️",
    geography: "🌍",
    "political-science": "⚖️",
    economics: "📈",
    sociology: "👥",
    psychology: "🧠",
    philosophy: "💭",
    "home-science": "🏠",
  };

  const icon =
    subjectIcons[subject?.toLowerCase()] || "📚";

  const openResource = (type) => {
    navigate(
      `/class-12/arts/${subject}/${type}`
    );
  };

  return (
    <div className="arts12-subject-page">

      {/* ================= HEADER ================= */}

      <section className="arts12-subject-header">

        <button
          className="arts12-subject-back"
          onClick={() => navigate("/class-12/arts")}
        >
          ← Back to Arts
        </button>

        <div className="arts12-subject-badge">
          {icon} BIHAR BOARD • CLASS 12 • ARTS
        </div>

        <h1>
          {subjectName}
          <span> Exam Preparation</span>
        </h1>

        <p>
          Class 12 Bihar Board {subjectName} ke liye
          Previous Year Questions, Model Papers aur
          Important Questions — sab ek jagah.
        </p>

      </section>


      {/* ================= RESOURCES ================= */}

      <section className="arts12-resource-section">

        <div className="arts12-section-heading">

          <span>
            CLASS 12 • ARTS • {subjectName?.toUpperCase()}
          </span>

          <h2>
            {subjectName} Study Resources
          </h2>

          <p>
            Apni preparation ke liye resource select karein.
          </p>

        </div>


        <div className="arts12-resource-grid">

          {/* PYQ */}

          <div
            className="arts12-resource-card arts-pyq"
            onClick={() => openResource("pyq")}
          >

            <div className="arts-resource-icon">
              📄
            </div>

            <strong>
              10
            </strong>

            <h3>
              10 Years PYQ
            </h3>

            <p>
              Previous Year Questions
            </p>

            <span>
              Explore →
            </span>

          </div>


          {/* MODEL */}

          <div
            className="arts12-resource-card arts-model"
            onClick={() =>
              openResource("model-papers")
            }
          >

            <div className="arts-resource-icon">
              📑
            </div>

            <strong>
              5
            </strong>

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


          {/* OBJECTIVE */}

          <div
            className="arts12-resource-card arts-objective"
            onClick={() =>
              openResource("objective")
            }
          >

            <div className="arts-resource-icon">
              🎯
            </div>

            <strong>
              200
            </strong>

            <h3>
              Objective Questions
            </h3>

            <p>
              Important MCQ Questions
            </p>

            <span>
              Explore →
            </span>

          </div>


          {/* SUBJECTIVE */}

          <div
            className="arts12-resource-card arts-subjective"
            onClick={() =>
              openResource("subjective")
            }
          >

            <div className="arts-resource-icon">
              ✍️
            </div>

            <strong>
              50
            </strong>

            <h3>
              Subjective Questions
            </h3>

            <p>
              Important Questions
            </p>

            <span>
              Explore →
            </span>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Arts12Subject;