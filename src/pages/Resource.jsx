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
  const [subjectName, setSubjectName] = useState("");

  // ==================================================
  // RESOURCE TYPES
  // ==================================================

  const resourceData = {
    pyq: {
      badge: "PREVIOUS YEAR QUESTIONS",
      title: "10 Years PYQ",
      description:
        "2015 se 2024 tak ke Bihar Board previous year question papers.",
      dbType: "10 Years PYQ",
    },

    "model-papers": {
      badge: "MODEL PAPERS",
      title: "5 Model Papers",
      description:
        "Bihar Board exam pattern ke according 5 important model papers.",
      dbType: "5 Model Papers",
    },

    objective: {
      badge: "OBJECTIVE QUESTIONS",
      title: "200 Objective Questions",
      description:
        "Exam preparation ke liye 200 carefully selected important objective questions.",
      dbType: "Objective Questions",
    },

    subjective: {
      badge: "SUBJECTIVE QUESTIONS",
      title: "50 Subjective Questions",
      description:
        "Bihar Board exam ke liye 50 important subjective questions with answers.",
      dbType: "Subjective Questions",
    },
  };

  const currentResource =
    resourceData[type] || resourceData.pyq;

  // ==================================================
  // LOAD RESOURCES
  // ==================================================

  useEffect(() => {
    const loadResources = async () => {
      setLoading(true);
      setError("");
      setResources([]);

      try {
        // ------------------------------------------------
        // URL SUBJECT KO DATABASE SLUG ME CONVERT KARNA
        //
        // English       -> english
        // Mathematics   -> mathematics
        // Social Science -> social-science
        // ------------------------------------------------

        const subjectSlug = subject
          ? subject.trim().toLowerCase().replace(/\s+/g, "-")
          : "";

        // ------------------------------------------------
        // CLASS 10
        // ------------------------------------------------

        const {
          data: classData,
          error: classError,
        } = await supabase
          .from("classes")
          .select("id, name")
          .eq("name", "Class 10")
          .limit(1)
          .maybeSingle();

        if (classError) {
          throw classError;
        }

        if (!classData) {
          throw new Error("Class 10 database me nahi mila.");
        }

        // ------------------------------------------------
        // SUBJECT
        // ------------------------------------------------

        const {
          data: subjectData,
          error: subjectError,
        } = await supabase
          .from("subjects")
          .select("id, name, slug")
          .eq("class_id", classData.id)
          .eq("slug", subjectSlug)
          .limit(1)
          .maybeSingle();

        if (subjectError) {
          throw subjectError;
        }

        if (!subjectData) {
          throw new Error(
            `Subject "${subject}" database me nahi mila.`
          );
        }

        setSubjectName(subjectData.name);

        // ------------------------------------------------
        // RESOURCES / PDFS
        // ------------------------------------------------

        const {
          data: resourceList,
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

        setResources(resourceList || []);
      } catch (err) {
        console.error(
          "Resource loading error:",
          err
        );

        setError(
          err?.message ||
            "Resources load nahi ho paaye."
        );
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, [subject, type, currentResource.dbType]);

  // ==================================================
  // OPEN PDF
  // ==================================================

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

  // ==================================================
  // DOWNLOAD PDF
  // ==================================================

  const downloadPDF = (url, title) => {
    if (!url) {
      alert("PDF URL available nahi hai.");
      return;
    }

    const safeTitle =
      (title || "BiharBoardStudy-PDF")
        .replace(/[<>:"/\\|?*]+/g, "-")
        .trim();

    const link = document.createElement("a");

    link.href = url;
    link.download = `${safeTitle}.pdf`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ==================================================
  // BACK BUTTON
  // ==================================================

  const handleBack = () => {
    navigate(-1);
  };

  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {
    return (
      <>
        <style>{`
          .bb-resource-loading {
            min-height: 100vh;
            background: #f5f9ff;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: #14213d;
            font-family: inherit;
          }

          .bb-resource-spinner {
            width: 42px;
            height: 42px;
            border: 4px solid #dbe9ff;
            border-top-color: #2864e8;
            border-radius: 50%;
            animation: bbSpin 0.8s linear infinite;
            margin-bottom: 18px;
          }

          @keyframes bbSpin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>

        <div className="bb-resource-loading">
          <div className="bb-resource-spinner"></div>
          <h3>Loading Resources...</h3>
        </div>
      </>
    );
  }

  // ==================================================
  // MAIN PAGE
  // ==================================================

  return (
    <>
      <style>{`

        /* ============================================
           MAIN PAGE
        ============================================ */

        .bb-resource-page {
          min-height: 100vh;
          background: #f5f9ff;
          color: #111827;
          font-family: inherit;
        }


        /* ============================================
           HERO
        ============================================ */

        .bb-resource-hero {
          min-height: 310px;
          padding: 32px 30px 65px;
          background: linear-gradient(
            180deg,
            #f4f9ff 0%,
            #edf5ff 100%
          );

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          text-align: center;
          box-sizing: border-box;
        }


        /* ============================================
           TOP BUTTONS
        ============================================ */

        .bb-resource-top {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 38px;
        }

        .bb-resource-back {
          border: none;
          background: white;
          color: #2864e8;

          padding: 14px 24px;

          border-radius: 16px;

          font-size: 14px;
          font-weight: 700;

          cursor: pointer;

          box-shadow:
            0 8px 25px rgba(30, 70, 130, 0.08);

          transition: 0.25s ease;
        }

        .bb-resource-back:hover {
          transform: translateY(-2px);
          box-shadow:
            0 12px 28px rgba(30, 70, 130, 0.13);
        }

        .bb-resource-badge {
          display: inline-flex;
          align-items: center;

          padding: 11px 18px;

          border-radius: 50px;

          background: #e8f1ff;

          color: #2864e8;

          font-size: 12px;
          font-weight: 800;

          letter-spacing: 0.5px;
        }


        /* ============================================
           TITLE
        ============================================ */

        .bb-resource-title {
          margin: 0;

          color: #111827;

          font-size: clamp(42px, 5vw, 68px);

          font-weight: 800;

          line-height: 1.05;

          letter-spacing: -2px;
        }

        .bb-resource-description {
          margin: 22px 0 0;

          color: #5e7696;

          font-size: 18px;

          line-height: 1.6;
        }


        /* ============================================
           CONTENT
        ============================================ */

        .bb-resource-content {
          max-width: 1390px;

          margin: 0 auto;

          padding: 0 35px 60px;

          box-sizing: border-box;
        }


        /* ============================================
           PDF GRID
        ============================================ */

        .bb-resource-grid {
          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 25px;

          margin-top: -1px;
        }


        /* ============================================
           PDF CARD
        ============================================ */

        .bb-resource-card {
          min-height: 165px;

          background: white;

          border: 1px solid #dfe8f3;

          border-radius: 25px;

          padding: 30px 27px;

          display: flex;
          align-items: center;

          gap: 22px;

          box-sizing: border-box;

          box-shadow:
            0 12px 35px rgba(35, 75, 125, 0.06);

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }

        .bb-resource-card:hover {
          transform: translateY(-4px);

          border-color: #c8dafa;

          box-shadow:
            0 18px 40px rgba(35, 75, 125, 0.11);
        }


        /* ============================================
           NUMBER
        ============================================ */

        .bb-resource-number {
          width: 100px;
          height: 100px;

          flex-shrink: 0;

          border-radius: 23px;

          background: #edf4ff;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #2864e8;

          font-size: 28px;
          font-weight: 800;
        }


        /* ============================================
           PDF INFORMATION
        ============================================ */

        .bb-resource-info {
          flex: 1;

          min-width: 0;
        }

        .bb-resource-info-badge {
          display: block;

          margin-bottom: 9px;

          color: #2864e8;

          font-size: 12px;

          font-weight: 800;

          letter-spacing: 0.4px;
        }

        .bb-resource-info h3 {
          margin: 0;

          color: #111827;

          font-size: 20px;

          font-weight: 800;

          line-height: 1.3;

          word-break: break-word;
        }

        .bb-resource-info p {
          margin: 8px 0 0;

          color: #7890ad;

          font-size: 13px;

          line-height: 1.4;
        }


        /* ============================================
           BUTTONS
        ============================================ */

        .bb-resource-actions {
          display: flex;

          align-items: center;

          gap: 10px;

          flex-shrink: 0;
        }

        .bb-resource-view,
        .bb-resource-download {
          height: 46px;

          padding: 0 18px;

          border-radius: 13px;

          font-size: 13px;

          font-weight: 800;

          cursor: pointer;

          transition: 0.25s ease;

          white-space: nowrap;
        }

        .bb-resource-view {
          border: none;

          background: #2864e8;

          color: white;

          box-shadow:
            0 8px 18px rgba(40, 100, 232, 0.18);
        }

        .bb-resource-view:hover {
          background: #1753d2;

          transform: translateY(-2px);
        }

        .bb-resource-download {
          border: 1.5px solid #2864e8;

          background: white;

          color: #2864e8;
        }

        .bb-resource-download:hover {
          background: #edf4ff;

          transform: translateY(-2px);
        }

        .bb-resource-view:disabled,
        .bb-resource-download:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }


        /* ============================================
           ERROR
        ============================================ */

        .bb-resource-error {
          max-width: 700px;

          margin: 40px auto;

          padding: 30px;

          text-align: center;

          background: white;

          border: 1px solid #ffd4d4;

          border-radius: 20px;

          color: #d32f2f;
        }

        .bb-resource-error h3 {
          margin: 0 0 8px;
        }

        .bb-resource-error p {
          margin: 0 0 18px;

          color: #777;
        }

        .bb-resource-error button {
          border: none;

          background: #2864e8;

          color: white;

          padding: 11px 20px;

          border-radius: 10px;

          font-weight: 700;

          cursor: pointer;
        }


        /* ============================================
           EMPTY
        ============================================ */

        .bb-resource-empty {
          max-width: 700px;

          margin: 50px auto;

          padding: 45px 25px;

          text-align: center;

          background: white;

          border-radius: 22px;

          border: 1px solid #e1e9f3;
        }

        .bb-resource-empty-icon {
          font-size: 45px;
          margin-bottom: 10px;
        }

        .bb-resource-empty h3 {
          margin: 0 0 8px;

          color: #14213d;
        }

        .bb-resource-empty p {
          margin: 0;

          color: #71839a;
        }


        /* ============================================
           MOBILE
        ============================================ */

        @media (max-width: 950px) {

          .bb-resource-grid {
            grid-template-columns: 1fr;
          }

          .bb-resource-card {
            min-height: auto;
          }

        }


        @media (max-width: 650px) {

          .bb-resource-hero {
            min-height: 270px;

            padding:
              25px
              18px
              50px;
          }

          .bb-resource-top {
            margin-bottom: 30px;

            flex-wrap: wrap;
          }

          .bb-resource-back {
            padding: 12px 18px;
          }

          .bb-resource-badge {
            padding: 10px 14px;

            font-size: 10px;
          }

          .bb-resource-title {
            font-size: 40px;

            letter-spacing: -1.2px;
          }

          .bb-resource-description {
            font-size: 14px;
          }

          .bb-resource-content {
            padding:
              0
              15px
              40px;
          }

          .bb-resource-card {
            padding: 20px;

            flex-wrap: wrap;

            gap: 17px;
          }

          .bb-resource-number {
            width: 65px;
            height: 65px;

            border-radius: 18px;

            font-size: 21px;
          }

          .bb-resource-info {
            width: calc(100% - 82px);
          }

          .bb-resource-info h3 {
            font-size: 17px;
          }

          .bb-resource-actions {
            width: 100%;
          }

          .bb-resource-view,
          .bb-resource-download {
            flex: 1;

            padding: 0 10px;
          }

        }

      `}</style>

      <main className="bb-resource-page">

        {/* ==========================================
            HERO
        ========================================== */}

        <section className="bb-resource-hero">

          <div className="bb-resource-top">

            <button
              className="bb-resource-back"
              onClick={handleBack}
            >
              ← Back to {subjectName || "Subject"}
            </button>

            <span className="bb-resource-badge">
              {currentResource.badge}
            </span>

          </div>

          <h1 className="bb-resource-title">
            {subjectName} {currentResource.title}
          </h1>

          <p className="bb-resource-description">
            {currentResource.description}
          </p>

        </section>


        {/* ==========================================
            PDF CONTENT
        ========================================== */}

        <section className="bb-resource-content">

          {/* ERROR */}

          {error && (
            <div className="bb-resource-error">

              <h3>
                Resources load nahi ho paaye
              </h3>

              <p>{error}</p>

              <button
                onClick={() =>
                  window.location.reload()
                }
              >
                Try Again
              </button>

            </div>
          )}


          {/* NO PDFs */}

          {!error && resources.length === 0 && (
            <div className="bb-resource-empty">

              <div className="bb-resource-empty-icon">
                📂
              </div>

              <h3>
                Abhi PDF available nahi hai
              </h3>

              <p>
                {subjectName} ke{" "}
                {currentResource.title} abhi
                upload nahi kiye gaye hain.
              </p>

            </div>
          )}


          {/* PDF GRID */}

          {!error && resources.length > 0 && (
            <div className="bb-resource-grid">

              {resources.map((resource, index) => (

                <article
                  className="bb-resource-card"
                  key={resource.id}
                >

                  {/* NUMBER */}

                  <div className="bb-resource-number">
                    {index + 1}
                  </div>


                  {/* INFORMATION */}

                  <div className="bb-resource-info">

                    <span className="bb-resource-info-badge">
                      {resource.resource_type ||
                        currentResource.badge}
                    </span>

                    <h3>
                      {resource.title ||
                        "Previous Year Question Paper"}
                    </h3>

                    <p>
                      {resource.description ||
                        "set 1"}
                    </p>

                  </div>


                  {/* BUTTONS */}

                  <div className="bb-resource-actions">

                    <button
                      className="bb-resource-view"
                      onClick={() =>
                        openPDF(
                          resource.file_url
                        )
                      }
                      disabled={!resource.file_url}
                    >
                      View PDF →
                    </button>

                    <button
                      className="bb-resource-download"
                      onClick={() =>
                        downloadPDF(
                          resource.file_url,
                          resource.title
                        )
                      }
                      disabled={!resource.file_url}
                    >
                      Download
                    </button>

                  </div>

                </article>

              ))}

            </div>
          )}

        </section>

      </main>
    </>
  );
}

export default Resource;