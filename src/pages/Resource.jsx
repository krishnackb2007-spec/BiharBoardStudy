import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./Resource.css";

function Resource() {
  const { subject, type } = useParams();
  const navigate = useNavigate();

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const resourceData = {
    pyq: {
      badge: "PREVIOUS YEAR QUESTIONS",
      title: "10 Years PYQ",
      subtitle: "Previous Year Questions",
      description:
        "2015 se 2024 tak ke Bihar Board previous year question papers.",
      icon: "📄",
      dbType: "10 Years PYQ",
    },

    "model-papers": {
      badge: "MODEL PAPERS",
      title: "5 Model Papers",
      subtitle: "Exam Practice Papers",
      description:
        "Bihar Board exam pattern ke according 5 important model papers.",
      icon: "📝",
      dbType: "5 Model Papers",
    },

    objective: {
      badge: "OBJECTIVE QUESTIONS",
      title: "200 Objective Questions",
      subtitle: "Most Important Questions",
      description:
        "Exam preparation ke liye 200 carefully selected important objective questions.",
      icon: "🎯",
      dbType: "Objective Questions",
    },

    subjective: {
      badge: "SUBJECTIVE QUESTIONS",
      title: "50 Subjective Questions",
      subtitle: "Important Short & Long Questions",
      description:
        "Bihar Board exam ke liye 50 important subjective questions with answers.",
      icon: "✍️",
      dbType: "Subjective Questions",
    },
  };

  const currentResource =
    resourceData[type] || resourceData.pyq;

  // Subject name
  const fallbackSubjectName = subject
    ? subject
        .split("-")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ")
    : "Subject";

  const [subjectName, setSubjectName] = useState(
    fallbackSubjectName
  );

  // ----------------------------------------
  // LOAD PDF RESOURCES FROM SUPABASE
  // ----------------------------------------

  useEffect(() => {
    const loadResources = async () => {
      setLoading(true);
      setError("");

      try {
        // 1. Get Class 10
        const { data: classData, error: classError } =
          await supabase
            .from("classes")
            .select("id")
            .eq("name", "Class 10")
            .single();

        if (classError) {
          throw classError;
        }

        // 2. Find subject
        const { data: subjectData, error: subjectError } =
          await supabase
            .from("subjects")
            .select("id, name")
            .eq("class_id", classData.id)
            .eq("slug", subject)
            .single();

        if (subjectError) {
          throw subjectError;
        }

        setSubjectName(subjectData.name);

        // 3. Get uploaded PDFs
        const { data: resourceData, error: resourceError } =
          await supabase
            .from("resources")
            .select(
              "id, title, description, resource_type, file_url, created_at"
            )
            .eq("subject_id", subjectData.id)
            .eq(
              "resource_type",
              currentResource.dbType
            )
            .order("created_at", {
              ascending: false,
            });

        if (resourceError) {
          throw resourceError;
        }

        setResources(resourceData || []);
      } catch (err) {
        console.error("Resource loading error:", err);
        setError(
          err.message || "Resources load nahi ho paaye."
        );
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, [subject, type, currentResource.dbType]);

  // ----------------------------------------
  // OPEN PDF
  // ----------------------------------------

  const openPDF = (url) => {
    if (!url) {
      alert("PDF URL available nahi hai.");
      return;
    }

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ----------------------------------------
  // DOWNLOAD PDF
  // ----------------------------------------

  const downloadPDF = (url, title) => {
    if (!url) {
      alert("PDF URL available nahi hai.");
      return;
    }

    const downloadUrl = `${url}?download=${encodeURIComponent(
      title || "BiharBoardStudy-PDF"
    )}.pdf`;

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${title || "BiharBoardStudy-PDF"}.pdf`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="resource-page">

      {/* HERO */}
      <section className="resource-hero">

        <div className="resource-hero-content">

          <button
            className="resource-back"
            onClick={() =>
              navigate(`/class-10/${subject}`)
            }
          >
            ← Back to {subjectName}
          </button>

          <span className="resource-badge">
            {currentResource.badge}
          </span>

          <h1>
            {subjectName}
            <span>{currentResource.title}</span>
          </h1>

          <p>
            {currentResource.description}
          </p>

        </div>

        <div className="resource-hero-icon">
          {currentResource.icon}
        </div>

      </section>

      {/* RESOURCE CONTENT */}
      <section className="resource-content">

        <div className="resource-heading">

          <span>
            {subjectName.toUpperCase()}
          </span>

          <h2>
            {currentResource.title}
          </h2>

          <p>
            Study material select karo aur
            preparation start karo.
          </p>

        </div>

        {/* LOADING */}
        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "50px 20px",
            }}
          >
            <h3>⏳ Loading PDFs...</h3>
            <p>
              Study material load ho raha hai.
            </p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div
            style={{
              background: "#fff1f2",
              color: "#be123c",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            ❌ {error}
          </div>
        )}

        {/* NO PDF */}
        {!loading &&
          !error &&
          resources.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "50px 20px",
              }}
            >
              <div
                style={{
                  fontSize: "50px",
                  marginBottom: "15px",
                }}
              >
                📂
              </div>

              <h3>
                Abhi PDF available nahi hai
              </h3>

              <p>
                Is subject ke liye study material
                jaldi upload kiya jayega.
              </p>
            </div>
          )}

        {/* REAL PDF LIST */}
        {!loading &&
          !error &&
          resources.length > 0 && (
            <div className="resource-list">

              {resources.map((resource) => (
                <div
                  className="pdf-card"
                  key={resource.id}
                >

                  <div className="pdf-icon">
                    {currentResource.icon}
                  </div>

                  <div className="pdf-info">

                    <span>
                      {resource.resource_type}
                    </span>

                    <h3>
                      {resource.title}
                    </h3>

                    <p>
                      {resource.description ||
                        `Class 10 • ${subjectName}`}
                    </p>

                  </div>

                  <div className="pdf-actions">

                    {/* VIEW PDF */}
                    <button
                      onClick={() =>
                        openPDF(resource.file_url)
                      }
                    >
                      View PDF
                    </button>

                    {/* DOWNLOAD */}
                    <button
                      className="download-btn"
                      onClick={() =>
                        downloadPDF(
                          resource.file_url,
                          resource.title
                        )
                      }
                    >
                      Download
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

      </section>

    </main>
  );
}

export default Resource;