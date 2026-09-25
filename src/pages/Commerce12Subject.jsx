import { useNavigate, useParams } from "react-router-dom";
import "./Commerce12Subject.css";

function Commerce12Subject() {
  const navigate = useNavigate();
  const { subject } = useParams();

  const subjectData = {
    accountancy: {
      hindi: "लेखांकन",
      english: "Accountancy",
      icon: "📊",
      color: "accountancy",
      description:
        "Accounting concepts, financial statements और important exam questions की तैयारी करें।",
    },

    "business-studies": {
      hindi: "व्यवसाय अध्ययन",
      english: "Business Studies / BST",
      icon: "💼",
      color: "business",
      description:
        "Business organization, management और important theoretical questions की तैयारी करें।",
    },

    economics: {
      hindi: "अर्थशास्त्र",
      english: "Economics",
      icon: "📈",
      color: "economics",
      description:
        "Economics concepts, development और important exam questions की तैयारी करें।",
    },
  };

  const currentSubject =
    subjectData[subject] || subjectData.accountancy;

  const openResource = (type) => {
    navigate(`/class-12/commerce/${subject}/${type}`);
  };

  const resources = [
    {
      type: "pyq",
      icon: "📄",
      title: "10 Years PYQ",
      subtitle: "Previous Year Questions",
      count: "10 Papers",
      color: "pyq",
    },
    {
      type: "model-papers",
      icon: "📑",
      title: "5 Model Papers",
      subtitle: "Practice Model Papers",
      count: "5 Papers",
      color: "model",
    },
    {
      type: "objective",
      icon: "🎯",
      title: "200 Objective Questions",
      subtitle: "Important Objective Questions",
      count: "200 Questions",
      color: "objective",
    },
    {
      type: "subjective",
      icon: "✍️",
      title: "50 Subjective Questions",
      subtitle: "Important Subjective Questions",
      count: "50 Questions",
      color: "subjective",
    },
  ];

  return (
    <div className="commerce12-subject-page">

      {/* ================= HEADER ================= */}
      <section className="commerce12-subject-header">

        <button
          className="commerce12-subject-back"
          onClick={() => navigate("/class-12/commerce")}
        >
          ← Back to Commerce
        </button>

        <div className="commerce12-subject-badge">
          {currentSubject.icon} BIHAR BOARD • CLASS 12 • COMMERCE
        </div>

        <div className="commerce12-subject-big-icon">
          {currentSubject.icon}
        </div>

        {/* English - BIG */}
        <h1 className="commerce-subject-english">
          {currentSubject.english}
        </h1>

        {/* Hindi - SMALL */}
        <h2 className="commerce-subject-hindi">
          {currentSubject.hindi}
        </h2>

        <p className="commerce-subject-description">
          {currentSubject.description}
        </p>

      </section>

      {/* ================= RESOURCES ================= */}
      <section className="commerce12-resource-section">

        <div className="commerce12-resource-heading">
          <span>📚 STUDY RESOURCES</span>

          <h2>
            {currentSubject.english} Resources
          </h2>

          <p>
            Exam preparation के लिए resource select करें।
          </p>
        </div>

        <div className="commerce12-resource-cards">

          {resources.map((resource) => (

            <div
              key={resource.type}
              className={`commerce12-resource-card ${resource.color}`}
              onClick={() => openResource(resource.type)}
            >

              <div className="commerce12-resource-icon">
                {resource.icon}
              </div>

              <div className="commerce12-resource-content">

                <span>{resource.count}</span>

                <h3>{resource.title}</h3>

                <p>{resource.subtitle}</p>

              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openResource(resource.type);
                }}
              >
                Open →
              </button>

            </div>

          ))}

        </div>

      </section>

      {/* ================= PREPARATION TIP ================= */}
      <section className="commerce12-subject-tip">

        <div className="commerce12-tip-icon">
          💡
        </div>

        <div>
          <h3>Preparation Tip</h3>

          <p>
            पहले PYQ solve करें, फिर Model Papers की practice
            करें और Objective तथा Subjective Questions को
            regularly revise करें।
          </p>
        </div>

      </section>

    </div>
  );
}

export default Commerce12Subject;