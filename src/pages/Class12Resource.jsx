import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./Class12Resource.css";

function Class12Resource() {
  const { subject, type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [subjectName, setSubjectName] = useState("Subject");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ========================================
  // FIND STREAM FROM URL
  // ========================================

  const getStreamName = () => {
    if (location.pathname.includes("/science/")) {
      return "Science";
    }

    if (location.pathname.includes("/commerce/")) {
      return "Commerce";
    }

    if (location.pathname.includes("/arts/")) {
      return "Arts";
    }

    return "";
  };

  const streamName = getStreamName();

  // ========================================
  // RESOURCE TYPES
  // ========================================

  const resourceData = {
    pyq: {
      badge: "PREVIOUS YEAR QUESTIONS",
      title: "10 Years PYQ",
      description:
        "2015 se 2024 tak ke Bihar Board previous year question papers.",
      icon: "📄",
      dbType: "10 Years PYQ",
    },

    "model-papers": {
      badge: "MODEL PAPERS",
      title: "5 Model Papers",
      description:
        "Bihar Board exam pattern ke according 5 important model papers.",
      icon: "📝",
      dbType: "5 Model Papers",
    },

    objective: {
      badge: "OBJECTIVE QUESTIONS",
      title: "200 Objective Questions",
      description:
        "Exam preparation ke liye important objective questions.",
      icon: "🎯",
      dbType: "Objective Questions",
    },

    subjective: {
      badge: "SUBJECTIVE QUESTIONS",
      title: "50 Subjective Questions",
      description:
        "Bihar Board exam ke liye important subjective questions with answers.",
      icon: "✍️",
      dbType: "Subjective Questions",
    },
  };

  const currentResource =
    resourceData[type] || resourceData.pyq;

  // ========================================
  // SUBJECT FALLBACK NAME
  // ========================================

  const fallbackSubjectName = subject
    ? subject
        .split("-")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ")
    : "Subject";

  // ========================================
  // LOAD RESOURCES
  // ========================================

  useEffect(() => {
    let cancelled = false;

    const loadResources = async () => {
      setLoading(true);
      setError("");
      setResources([]);

      try {
        // ====================================
        // 1. GET CLASS 12
        // ====================================

        const {
          data: classRows,
          error: classError,
        } = await supabase
          .from("classes")
          .select("id, name")
          .eq("name", "Class 12")
          .limit(1);

        if (classError) {
          throw classError;
        }

        const classData = classRows?.[0];

        // Class 12 nahi mila
        if (!classData) {
          if (!cancelled) {
            setSubjectName(fallbackSubjectName);
            setResources([]);
          }

          return;
        }

        // ====================================
        // 2. GET STREAM
        // ====================================

        const {
          data: streamRows,
          error: streamError,
        } = await supabase
          .from("streams")
          .select("id, name")
          .eq("name", streamName)
          .limit(1);

        if (streamError) {
          throw streamError;
        }

        const streamData = streamRows?.[0];

        // Stream nahi mila
        if (!streamData) {
          if (!cancelled) {
            setSubjectName(fallbackSubjectName);
            setResources([]);
          }

          return;
        }

        // ====================================
        // 3. GET SUBJECT
        // ====================================

        const {
          data: subjectRows,
          error: subjectError,
        } = await supabase
          .from("subjects")
          .select("id, name, slug")
          .eq("class_id", classData.id)
          .eq("stream_id", streamData.id)
          .eq("slug", subject)
          .limit(1);

        if (subjectError) {
          throw subjectError;
        }

        const subjectData = subjectRows?.[0];

        // Subject nahi mila
        if (!subjectData) {
          if (!cancelled) {
            setSubjectName(fallbackSubjectName);
            setResources([]);
          }

          return;
        }

        if (!cancelled) {
          setSubjectName(subjectData.name);
        }

        // ====================================
        // 4. GET PDF RESOURCES
        // ====================================

        const {
          data: resourceRows,
          error: resourceError,
        } = await supabase
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

        // PDF available nahi hai
        // to empty array rahega
        if (!cancelled) {
          setResources(resourceRows || []);
        }
      } catch (err) {
        console.error(
          "Class 12 Resource Error:",
          err
        );

        if (!cancelled) {
          setError(
            "Study material load nahi ho pa raha hai."
          );
          setResources([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    if (streamName && subject) {
      loadResources();
    } else {
      setLoading(false);
      setResources([]);
    }

    return () => {
      cancelled = true;
    };
  }, [
    subject,
    streamName,
    currentResource.dbType,
    fallbackSubjectName,
  ]);

  // ========================================
  // VIEW PDF
  // ========================================

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

  // ========================================
  // DOWNLOAD PDF
  // ========================================

  const downloadPDF = (url, title) => {
    if (!url) {
      alert("PDF URL available nahi hai.");
      return;
    }

    const safeTitle =
      title?.trim() || "BiharBoardStudy-PDF";

    const fileName = `${safeTitle}.pdf`;

    const downloadUrl =
      `${url}?download=${encodeURIComponent(fileName)}`;

    const link = document.createElement("a");

    link.href = downloadUrl;
    link.download = fileName;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ========================================
  // BACK URL
  // ========================================

  const backUrl =
    `/class-12/${streamName.toLowerCase()}/${subject}`;

  // ========================================
  // PAGE
  // ========================================

  return (
    <main className="class12-resource-page">

      {/* ====================================
          HEADER
      ==================================== */}

      <header className="class12-resource-header">

        <button
          className="class12-resource-back"
          onClick={() => navigate(backUrl)}
        >
          ← Back to {subjectName}
        </button>

        <div className="class12-resource-badge">
          {currentResource.badge}
        </div>

        <h1>
          {subjectName} {currentResource.title}
        </h1>

        <p>
          {currentResource.description}
        </p>

      </header>

      {/* ====================================
          INTRO
          Existing CSS hides this section
      ==================================== */}

      <section className="class12-resource-intro">

        <div className="class12-resource-main-icon">
          {currentResource.icon}
        </div>

        <div className="class12-resource-intro-content">

          <span>
            CLASS 12 • {streamName.toUpperCase()}
          </span>

          <h2>
            {currentResource.title}
          </h2>

          <p>
            {currentResource.description}
          </p>

        </div>

        <div className="class12-resource-count">

          <strong>
            {resources.length}
          </strong>

          <span>
            PDFs Available
          </span>

        </div>

      </section>

      {/* ====================================
          RESOURCE SECTION
      ==================================== */}

      <section className="class12-resource-list-section">

        <div className="class12-resource-section-title">

          <h2>
            {currentResource.title}
          </h2>

          <p>
            Study material select karo aur preparation start karo.
          </p>

        </div>

        {/* ==================================
            LOADING
        ================================== */}

        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "50px 20px",
            }}
          >
            <h3>
              ⏳ Loading PDFs...
            </h3>

            <p
              style={{
                color: "#64748b",
                marginTop: "8px",
              }}
            >
              Study material load ho raha hai.
            </p>
          </div>
        )}

        {/* ==================================
            REAL TECHNICAL ERROR
        ================================== */}

        {!loading && error && (
          <div
            style={{
              maxWidth: "700px",
              margin: "30px auto",
              padding: "20px",
              background: "#fff1f2",
              color: "#be123c",
              borderRadius: "14px",
              textAlign: "center",
            }}
          >
            ❌ {error}
          </div>
        )}

        {/* ==================================
            NO PDF AVAILABLE
        ================================== */}

        {!loading &&
          !error &&
          resources.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "65px 20px",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  margin: "0 auto 18px",
                  borderRadius: "20px",
                  background: "#eef5ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                }}
              >
                📂
              </div>

              <h3
                style={{
                  margin: 0,
                  color: "#111827",
                  fontSize: "22px",
                }}
              >
                No Study Material Available
              </h3>

              <p
                style={{
                  color: "#64748b",
                  marginTop: "9px",
                }}
              >
                Is subject ke liye study material
                abhi upload nahi kiya gaya hai.
              </p>

              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "13px",
                  marginTop: "5px",
                }}
              >
                PDFs will be uploaded soon.
              </p>
            </div>
          )}

        {/* ==================================
            PYQ
        ================================== */}

        {!loading &&
          !error &&
          resources.length > 0 &&
          type === "pyq" && (

            <div className="class12-pyq-grid">

              {resources.map((resource, index) => (

                <div
                  className="class12-pyq-card"
                  key={resource.id}
                >

                  <div className="resource-number-box">
                    {index + 1}
                  </div>

                  <div className="resource-card-content">

                    <span>
                      PREVIOUS YEAR QUESTIONS
                    </span>

                    <h3>
                      {resource.title}
                    </h3>

                    <p>
                      {resource.description ||
                        `Class 12 • ${streamName} • ${subjectName}`}
                    </p>

                  </div>

                  <div className="resource-actions">

                    <button
                      className="resource-action-button"
                      onClick={() =>
                        openPDF(
                          resource.file_url
                        )
                      }
                    >
                      View PDF →
                    </button>

                    <button
                      className="resource-download-button"
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

        {/* ==================================
            MODEL PAPERS
        ================================== */}

        {!loading &&
          !error &&
          resources.length > 0 &&
          type === "model-papers" && (

            <div className="class12-model-grid">

              {resources.map((resource, index) => (

                <div
                  className="class12-model-card"
                  key={resource.id}
                >

                  <div className="model-icon">
                    📝
                  </div>

                  <div className="resource-card-content">

                    <span>
                      MODEL PAPER
                    </span>

                    <h3>
                      {resource.title ||
                        `Model Paper ${index + 1}`}
                    </h3>

                    <p>
                      {resource.description ||
                        `Class 12 • ${streamName} • ${subjectName}`}
                    </p>

                  </div>

                  <div className="resource-actions">

                    <button
                      className="resource-action-button"
                      onClick={() =>
                        openPDF(
                          resource.file_url
                        )
                      }
                    >
                      View PDF →
                    </button>

                    <button
                      className="resource-download-button"
                      onClick={() =>
                        downloadPDF(
                          resource.file_url,
                          resource.title ||
                            `Model Paper ${index + 1}`
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

        {/* ==================================
            OBJECTIVE QUESTIONS
        ================================== */}

        {!loading &&
          !error &&
          resources.length > 0 &&
          type === "objective" && (

            <div className="class12-question-set-grid">

              {resources.map((resource, index) => (

                <div
                  className="class12-question-set-card objective-set"
                  key={resource.id}
                >

                  <div className="set-icon">
                    🎯
                  </div>

                  <div className="set-content">

                    <span>
                      OBJECTIVE QUESTIONS
                    </span>

                    <h3>
                      {resource.title ||
                        `Objective Set ${index + 1}`}
                    </h3>

                    <p>
                      {resource.description ||
                        `Class 12 • ${streamName} • ${subjectName}`}
                    </p>

                  </div>

                  <div className="resource-actions">

                    <button
                      onClick={() =>
                        openPDF(
                          resource.file_url
                        )
                      }
                    >
                      Open Set →
                    </button>

                    <button
                      className="resource-download-button"
                      onClick={() =>
                        downloadPDF(
                          resource.file_url,
                          resource.title ||
                            `Objective Set ${index + 1}`
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

        {/* ==================================
            SUBJECTIVE QUESTIONS
        ================================== */}

        {!loading &&
          !error &&
          resources.length > 0 &&
          type === "subjective" && (

            <div className="class12-question-set-grid">

              {resources.map((resource, index) => (

                <div
                  className="class12-question-set-card subjective-set"
                  key={resource.id}
                >

                  <div className="set-icon">
                    ✍️
                  </div>

                  <div className="set-content">

                    <span>
                      SUBJECTIVE QUESTIONS
                    </span>

                    <h3>
                      {resource.title ||
                        `Subjective Set ${index + 1}`}
                    </h3>

                    <p>
                      {resource.description ||
                        `Class 12 • ${streamName} • ${subjectName}`}
                    </p>

                  </div>

                  <div className="resource-actions">

                    <button
                      onClick={() =>
                        openPDF(
                          resource.file_url
                        )
                      }
                    >
                      Open Set →
                    </button>

                    <button
                      className="resource-download-button"
                      onClick={() =>
                        downloadPDF(
                          resource.file_url,
                          resource.title ||
                            `Subjective Set ${index + 1}`
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

      {/* ====================================
          TIP
      ==================================== */}

      <section className="class12-resource-tip">

        <div className="class12-tip-icon">
          💡
        </div>

        <div>

          <h3>
            Preparation Tip
          </h3>

          <p>
            Previous year papers aur model papers
            ko solve karke apni exam preparation
            aur strong karo.
          </p>

        </div>

      </section>

    </main>
  );
}

export default Class12Resource;