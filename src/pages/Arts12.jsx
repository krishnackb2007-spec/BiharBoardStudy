import { useNavigate } from "react-router-dom";
import "./Arts12.css";

function Arts12() {
  const navigate = useNavigate();

  const subjects = [
    {
      name: "History",
      icon: "🏛️",
      color: "history",
      description: "Indian & World History",
    },
    {
      name: "Geography",
      icon: "🌍",
      color: "geography",
      description: "Physical & Human Geography",
    },
    {
      name: "Political Science",
      icon: "⚖️",
      color: "political",
      description: "Politics & Constitution",
    },
    {
      name: "Economics",
      icon: "📈",
      color: "economics",
      description: "Economics & Development",
    },
    {
      name: "Sociology",
      icon: "👥",
      color: "sociology",
      description: "Society & Social Change",
    },
    {
      name: "Psychology",
      icon: "🧠",
      color: "psychology",
      description: "Human Behaviour & Mind",
    },
    {
      name: "Philosophy",
      icon: "💭",
      color: "philosophy",
      description: "Thought & Philosophy",
    },
    {
      name: "Home Science",
      icon: "🏠",
      color: "home-science",
      description: "Family & Home Science",
    },
  ];

  const openSubject = (subject) => {
    navigate(
      `/class-12/arts/${subject
        .toLowerCase()
        .replaceAll(" ", "-")}`
    );
  };

  return (
    <div className="arts12-page">

      {/* ================= HEADER ================= */}

      <section className="arts12-header">

        <button
          className="arts12-back"
          onClick={() => navigate("/class-12")}
        >
          ← Back to Class 12
        </button>

        <div className="arts12-badge">
          🎓 BIHAR BOARD • CLASS 12 • ARTS
        </div>

        <h1>
          Class 12 Arts
          <span> Exam Preparation</span>
        </h1>

        <p>
          Bihar Board Class 12 Arts ke important subjects,
          study resources aur exam preparation — sab ek jagah.
        </p>

      </section>


      {/* ================= SUBJECTS ================= */}

      <section className="arts12-subject-section">

        <div className="arts12-section-heading">

          <span>
            CLASS 12 • ARTS / HUMANITIES
          </span>

          <h2>
            Choose Your Subject
          </h2>

          <p>
            Apna subject select karke exam preparation start karein.
          </p>

        </div>


        <div className="arts12-subject-grid">

          {subjects.map((subject) => (

            <div
              key={subject.name}
              className={`arts12-subject-card ${subject.color}`}
              onClick={() => openSubject(subject.name)}
            >

              <div className="arts12-subject-icon">
                {subject.icon}
              </div>

              <div className="arts12-subject-number">
                12
              </div>

              <h3>
                {subject.name}
              </h3>

              <p>
                {subject.description}
              </p>

              <span>
                Explore →
              </span>

            </div>

          ))}

        </div>

      </section>


      {/* ================= INFO ================= */}

      <section className="arts12-info">

        <div className="arts12-info-icon">
          📚
        </div>

        <div>

          <h3>
            Complete Arts Preparation
          </h3>

          <p>
            Har subject ke andar Previous Year Questions,
            Model Papers, Objective Questions aur Subjective
            Questions available honge.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Arts12;