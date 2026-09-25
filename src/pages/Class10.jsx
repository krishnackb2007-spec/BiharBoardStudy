import { useNavigate } from "react-router-dom";
import "./Class10.css";

function Class10() {
  const navigate = useNavigate();

  const subjects = [
    {
      name: "Hindi",
      icon: "📚",
      description: "Hindi literature, grammar & writing",
    },
    {
      name: "English",
      icon: "📖",
      description: "English literature, grammar & writing",
    },
    {
      name: "Mathematics",
      icon: "📐",
      description: "Algebra, geometry & important formulas",
    },
    {
      name: "Science",
      icon: "🔬",
      description: "Physics, Chemistry & Biology",
    },
    {
      name: "Social Science",
      icon: "🌍",
      description: "History, Geography, Civics & Economics",
    },
    {
      name: "Sanskrit",
      icon: "🕉️",
      description: "Sanskrit grammar & literature",
    },
  ];

  const openSubject = (subject) => {
    navigate(`/class-10/${subject.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <main className="class10-page">

      {/* HERO */}

      <section className="class10-hero">

        <div className="class10-hero-content">

          <span className="class10-badge">
            BIHAR BOARD • CLASS 10
          </span>

          <h1>
            Class 10
            <span> Exam Preparation</span>
          </h1>

          <p>
            Bihar Board Class 10 ke liye
            Previous Year Questions, Model Papers,
            Objective Questions aur Subjective Questions
            ek hi jagah par.
          </p>

          <div className="class10-hero-buttons">
            <button
              onClick={() =>
                document
                  .getElementById("subjects")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Subjects →
            </button>

            <button
              className="outline-btn"
              onClick={() => navigate("/pyq")}
            >
              Previous Year Questions
            </button>
          </div>

        </div>

        <div className="class10-hero-visual">

          <div className="hero-book-card">
            <div className="book-icon">📚</div>
            <h3>Class 10</h3>
            <p>Bihar Board</p>
          </div>

          <div className="floating-mini-card card-one">
            <strong>10 Years</strong>
            <span>PYQ</span>
          </div>

          <div className="floating-mini-card card-two">
            <strong>200+</strong>
            <span>Important Questions</span>
          </div>

        </div>

      </section>


      {/* SUBJECTS */}

      <section className="subjects-section" id="subjects">

        <div className="section-heading">

          <span>CLASS 10 SUBJECTS</span>

          <h2>
            Choose Your <strong>Subject</strong>
          </h2>

          <p>
            Apne subject ko select karo aur complete
            exam preparation resources access karo.
          </p>

        </div>


        <div className="class10-subject-grid">

          {subjects.map((subject) => (

            <div
              className="class10-subject-card"
              key={subject.name}
              onClick={() => openSubject(subject.name)}
            >

              <div className="subject-icon">
                {subject.icon}
              </div>

              <div className="subject-info">

                <h3>{subject.name}</h3>

                <p>{subject.description}</p>

              </div>

              <div className="subject-arrow">
                →
              </div>

            </div>

          ))}

        </div>

      </section>


      {/* RESOURCE INFO */}

      <section className="class10-resource-section">

        <div className="resource-heading">

          <span>SMART PREPARATION</span>

          <h2>
            Everything You Need To
            <strong> Prepare Better</strong>
          </h2>

        </div>


        <div className="resource-mini-grid">

          <div className="resource-mini-card">
            <div>📄</div>
            <h3>10 Years PYQ</h3>
            <p>2015–2024 previous year papers.</p>
          </div>

          <div className="resource-mini-card">
            <div>📝</div>
            <h3>5 Model Papers</h3>
            <p>Practice with exam-style papers.</p>
          </div>

          <div className="resource-mini-card">
            <div>🎯</div>
            <h3>200 Objective</h3>
            <p>Most important objective questions.</p>
          </div>

          <div className="resource-mini-card">
            <div>✍️</div>
            <h3>50 Subjective</h3>
            <p>Important long & short questions.</p>
          </div>

        </div>

      </section>

    </main>
  );
}

export default Class10;