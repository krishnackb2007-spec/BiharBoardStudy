import { useNavigate, useParams } from "react-router-dom";
import "./Subject.css";

function Subject() {
  const { subject } = useParams();
  const navigate = useNavigate();

  const subjectData = {
    hindi: {
      name: "Hindi",
      icon: "📚",
      description:
        "Hindi literature, grammar, writing aur Bihar Board exam preparation.",
    },

    english: {
      name: "English",
      icon: "📖",
      description:
        "English literature, grammar, writing aur important exam questions.",
    },

    mathematics: {
      name: "Mathematics",
      icon: "📐",
      description:
        "Algebra, geometry, trigonometry aur important mathematical concepts.",
    },

    science: {
      name: "Science",
      icon: "🔬",
      description:
        "Physics, Chemistry aur Biology ke important exam preparation resources.",
    },

    "social-science": {
      name: "Social Science",
      icon: "🌍",
      description:
        "History, Geography, Civics aur Economics ke important questions.",
    },

    sanskrit: {
      name: "Sanskrit",
      icon: "🕉️",
      description:
        "Sanskrit grammar, literature aur Bihar Board important questions.",
    },
  };

  const currentSubject = subjectData[subject] || {
    name: "Subject",
    icon: "📚",
    description: "Bihar Board Class 10 exam preparation resources.",
  };

  const resources = [
    {
      number: "10",
      title: "10 Years",
      subtitle: "Previous Year Questions",
      description:
        "2015 se 2024 tak ke Bihar Board previous year questions.",
      icon: "📄",
      path: `/class-10/${subject}/pyq`,
    },

    {
      number: "5",
      title: "5 Model Papers",
      subtitle: "Exam Practice Papers",
      description:
        "Exam pattern ke according 5 important model papers.",
      icon: "📝",
      path: `/class-10/${subject}/model-papers`,
    },

    {
      number: "200",
      title: "200 Objective",
      subtitle: "Most Important Questions",
      description:
        "Exam ke liye carefully selected 200 important objective questions.",
      icon: "🎯",
      path: `/class-10/${subject}/objective`,
    },

    {
      number: "50",
      title: "50 Subjective",
      subtitle: "Most Important Questions",
      description:
        "Short aur long answer ke 50 important subjective questions.",
      icon: "✍️",
      path: `/class-10/${subject}/subjective`,
    },
  ];

  return (
    <main className="subject-page">

      {/* ================= HERO ================= */}

      <section className="subject-hero">

        <div className="subject-hero-content">

          <button
            className="back-button"
            onClick={() => navigate("/class-10")}
          >
            ← Back to Class 10
          </button>

          <div className="subject-icon-large">
            {currentSubject.icon}
          </div>

          <span className="subject-badge">
            BIHAR BOARD • CLASS 10
          </span>

          <h1>
            {currentSubject.name}
            <span> Exam Preparation</span>
          </h1>

          <p>
            {currentSubject.description}
          </p>

        </div>


        <div className="subject-hero-card">

          <div className="hero-card-icon">
            {currentSubject.icon}
          </div>

          <span>CLASS 10</span>

          <h2>{currentSubject.name}</h2>

          <p>Bihar Board Study</p>

          <div className="hero-card-bottom">
            <strong>4</strong>
            <span>Complete Resources</span>
          </div>

        </div>

      </section>


      {/* ================= RESOURCES ================= */}

      <section className="subject-resources">

        <div className="subject-section-heading">

          <span>COMPLETE STUDY MATERIAL</span>

          <h2>
            Prepare <strong>{currentSubject.name}</strong> Better
          </h2>

          <p>
            Exam preparation ke liye sabhi important resources
            ek hi jagah par.
          </p>

        </div>


        <div className="resource-card-grid">

          {resources.map((resource) => (

            <div
              className="resource-card"
              key={resource.title}
              onClick={() => navigate(resource.path)}
            >

              <div className="resource-top">

                <div className="resource-icon">
                  {resource.icon}
                </div>

                <div className="resource-number">
                  {resource.number}
                </div>

              </div>

              <h3>{resource.title}</h3>

              <h4>{resource.subtitle}</h4>

              <p>{resource.description}</p>

              <button>
                Explore →
              </button>

            </div>

          ))}

        </div>

      </section>


      {/* ================= PREPARATION TIP ================= */}

      <section className="preparation-section">

        <div className="preparation-card">

          <div className="preparation-icon">
            💡
          </div>

          <div>
            <span>SMART PREPARATION TIP</span>

            <h2>
              Practice Previous Questions Regularly
            </h2>

            <p>
              Previous year questions solve karne se exam pattern,
              important topics aur question style ko samajhne mein
              help milti hai.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}

export default Subject;