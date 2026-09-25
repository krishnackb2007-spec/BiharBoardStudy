import { useNavigate } from "react-router-dom";
import "./Class12.css";

function Class12() {
  const navigate = useNavigate();

  return (
    <div className="class12-page">

      {/* ================= HEADER ================= */}
      <section className="class12-header">

        <button
          className="class12-back"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

        <div className="class12-badge">
          🎓 BIHAR BOARD • CLASS 12
        </div>

        <h1>
          Class 12 <span>Exam Preparation</span>
        </h1>

        <p>
          Science, Commerce aur Arts students ke liye
          Bihar Board study resources ek jagah.
        </p>

      </section>


      {/* ================= STREAMS ================= */}
      <section className="streams-section">

        <div className="streams-heading">
          <h2>Choose Your Stream</h2>

          <p>
            Apni stream select karke preparation start karein.
          </p>
        </div>


        <div className="streams-grid">


          {/* ================= SCIENCE ================= */}
          <div
            className="stream-card science-card"
            onClick={() => navigate("/class-12/science")}
          >

            <div className="stream-icon">
              🔬
            </div>

            <div className="stream-content">

              <span className="stream-label">
                CLASS 12
              </span>

              <h3>
                Science
              </h3>

              <p>
                Physics, Chemistry, Mathematics, Biology
                aur Science stream ke study resources.
              </p>

            </div>

            <div className="stream-arrow">
              Explore →
            </div>

          </div>


          {/* ================= COMMERCE ================= */}
          <div
            className="stream-card commerce-card"
            onClick={() => navigate("/class-12/commerce")}
          >

            <div className="stream-icon">
              📊
            </div>

            <div className="stream-content">

              <span className="stream-label">
                CLASS 12
              </span>

              <h3>
                Commerce
              </h3>

              <p>
                Accountancy, Business Studies, Economics
                aur Commerce stream ke study resources.
              </p>

            </div>

            <div className="stream-arrow">
              Explore →
            </div>

          </div>


          {/* ================= ARTS ================= */}
          <div
            className="stream-card arts-card"
            onClick={() => navigate("/class-12/arts")}
          >

            <div className="stream-icon">
              🎨
            </div>

            <div className="stream-content">

              <span className="stream-label">
                CLASS 12
              </span>

              <h3>
                Arts
              </h3>

              <p>
                History, Political Science, Geography
                aur Arts stream ke study resources.
              </p>

            </div>

            <div className="stream-arrow">
              Explore →
            </div>

          </div>


        </div>

      </section>


      {/* ================= RESOURCES ================= */}
      <section className="class12-resources">

        <div className="resources-heading">

          <span>
            📚
          </span>

          <div>
            <h2>
              Complete Exam Resources
            </h2>

            <p>
              Har stream ke subjects ke liye important
              Bihar Board preparation material.
            </p>
          </div>

        </div>


        <div className="resource-mini-grid">

          <div className="resource-mini-card">
            <strong>10 Years</strong>
            <span>Previous Year Questions</span>
          </div>

          <div className="resource-mini-card">
            <strong>5</strong>
            <span>Model Papers</span>
          </div>

          <div className="resource-mini-card">
            <strong>200</strong>
            <span>Objective Questions</span>
          </div>

          <div className="resource-mini-card">
            <strong>50</strong>
            <span>Subjective Questions</span>
          </div>

        </div>

      </section>


      {/* ================= FOOTER NOTE ================= */}
      <section className="class12-note">

        <div>
          <span>💡</span>

          <p>
            Apni stream select karein aur Bihar Board
            Class 12 preparation ko systematically start karein.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Class12;