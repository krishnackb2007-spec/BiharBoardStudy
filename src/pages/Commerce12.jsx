import { useNavigate } from "react-router-dom";
import "./Commerce12.css";

function Commerce12() {
  const navigate = useNavigate();

  const subjects = [
    {
      nameHindi: "लेखांकन",
      nameEnglish: "Accountancy",
      icon: "📊",
      color: "accountancy",
      description: "Accounting & Financial Statements",
      slug: "accountancy",
    },
    {
      nameHindi: "व्यवसाय अध्ययन",
      nameEnglish: "Business Studies",
      icon: "💼",
      color: "business",
      description: "Business Management & Organization",
      slug: "business-studies",
    },
    {
      nameHindi: "अर्थशास्त्र",
      nameEnglish: "Economics",
      icon: "📈",
      color: "economics",
      description: "Economics & Development",
      slug: "economics",
    },
  ];

  const openSubject = (slug) => {
    navigate(`/class-12/commerce/${slug}`);
  };

  return (
    <div className="commerce12-page">

      {/* Header */}
      <section className="commerce12-header">
        <button
          className="commerce12-back"
          onClick={() => navigate("/class-12")}
        >
          ← Back to Class 12
        </button>

        <div className="commerce12-badge">
          💼 BIHAR BOARD • CLASS 12 • COMMERCE
        </div>

        <h1>Class 12 Commerce</h1>

        <p>
          कक्षा 12 वाणिज्य के सभी महत्वपूर्ण विषयों की तैयारी
          एक ही जगह करें।
        </p>
      </section>

      {/* Subjects */}
      <section className="commerce12-subject-section">

        <div className="commerce12-section-heading">
          <span>📚 SUBJECTS</span>
          <h2>Commerce Subjects</h2>
          <p>
            अपना subject select करें और complete exam resources
            access करें।
          </p>
        </div>

        <div className="commerce12-subject-grid">

          {subjects.map((subject) => (
            <div
              key={subject.slug}
              className={`commerce12-subject-card ${subject.color}`}
              onClick={() => openSubject(subject.slug)}
            >
              <div className="commerce12-subject-icon">
                {subject.icon}
              </div>

              <div className="commerce12-subject-content">

                <span className="commerce12-subject-label">
                  CLASS 12 • COMMERCE
                </span>

                <h3>{subject.nameHindi}</h3>

                <h4>{subject.nameEnglish}</h4>

                <p>{subject.description}</p>

              </div>

              <button
                className="commerce12-subject-button"
                onClick={(e) => {
                  e.stopPropagation();
                  openSubject(subject.slug);
                }}
              >
                Explore Subject →
              </button>
            </div>
          ))}

        </div>
      </section>

      {/* Resource Information */}
      <section className="commerce12-info-section">

        <div className="commerce12-info-heading">
          <span>🎯 COMPLETE PREPARATION</span>
          <h2>All Exam Resources</h2>
          <p>
            हर Commerce subject में complete exam preparation
            resources available होंगे।
          </p>
        </div>

        <div className="commerce12-resource-grid">

          <div className="commerce12-info-card">
            <div>📄</div>
            <h3>10 Years PYQ</h3>
            <p>2025 से 2016 तक Previous Year Questions</p>
          </div>

          <div className="commerce12-info-card">
            <div>📑</div>
            <h3>5 Model Papers</h3>
            <p>Exam practice के लिए Model Papers</p>
          </div>

          <div className="commerce12-info-card">
            <div>🎯</div>
            <h3>200 Objective</h3>
            <p>4 Sets में 200 Important Questions</p>
          </div>

          <div className="commerce12-info-card">
            <div>✍️</div>
            <h3>50 Subjective</h3>
            <p>5 Sets में 50 Important Questions</p>
          </div>

        </div>
      </section>

      {/* Bottom Note */}
      <section className="commerce12-note">
        <div className="commerce12-note-icon">💡</div>

        <div>
          <h3>Smart Preparation</h3>
          <p>
            पहले PYQ से exam pattern समझें, फिर Model Papers
            solve करें और Objective तथा Subjective Questions
            से अपनी preparation मजबूत करें।
          </p>
        </div>
      </section>

    </div>
  );
}

export default Commerce12;