import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./AdminDashboard.css";

const ADMIN_EMAIL = "krishnackb2007@gmail.com";

const resourceTypes = [
  "10 Years PYQ",
  "5 Model Papers",
  "Notes",
  "Important Questions",
  "Objective Questions",
  "Subjective Questions",
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // ==========================================
  // MAIN TAB
  // ==========================================

  const [activeTab, setActiveTab] = useState("dashboard");

  // ==========================================
  // DATABASE DATA
  // ==========================================

  const [classes, setClasses] = useState([]);
  const [streams, setStreams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [resources, setResources] = useState([]);

  // ==========================================
  // UPLOAD FORM
  // ==========================================

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // ==========================================
  // MANAGE PDF FILTERS
  // ==========================================

  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterStream, setFilterStream] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterType, setFilterType] = useState("");

  // ==========================================
  // EDIT PDF
  // ==========================================

  const [editingResource, setEditingResource] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editResourceType, setEditResourceType] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  // ==========================================
  // REPLACE PDF
  // ==========================================

  const [replacingResource, setReplacingResource] = useState(null);
  const [replacementFile, setReplacementFile] = useState(null);
  const [replacing, setReplacing] = useState(false);

  // ==========================================
  // DELETE
  // ==========================================

  const [deletingId, setDeletingId] = useState(null);

  // ==========================================
  // LOAD CLASSES + STREAMS
  // ==========================================

  useEffect(() => {
    loadClasses();
    loadStreams();
    loadResources();
  }, []);

  const loadClasses = async () => {
    const { data, error } = await supabase
      .from("classes")
      .select("*")
      .order("id");

    if (!error) {
      setClasses(data || []);
    } else {
      console.error("Classes Error:", error);
    }
  };

  const loadStreams = async () => {
    const { data, error } = await supabase
      .from("streams")
      .select("*")
      .order("id");

    if (!error) {
      setStreams(data || []);
    } else {
      console.error("Streams Error:", error);
    }
  };

  // ==========================================
  // LOAD SUBJECTS FOR UPLOAD
  // ==========================================

  useEffect(() => {
    if (!selectedClass) {
      setSubjects([]);
      return;
    }

    loadSubjects();
  }, [selectedClass, selectedStream, classes]);

  const loadSubjects = async () => {
    let query = supabase
      .from("subjects")
      .select("*")
      .eq("class_id", selectedClass)
      .order("name");

    const selectedClassName = classes.find(
      (item) => String(item.id) === String(selectedClass)
    )?.name;

    // Class 10 has no stream
    if (selectedClassName === "Class 10") {
      query = query.is("stream_id", null);
    } else {
      if (selectedStream) {
        query = query.eq("stream_id", selectedStream);
      } else {
        setSubjects([]);
        return;
      }
    }

    const { data, error } = await query;

    if (!error) {
      setSubjects(data || []);
    } else {
      console.error("Subjects Error:", error);
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // ==========================================
  // PDF FILE SELECT
  // ==========================================

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      setMessage("❌ Please select a PDF file only.");
      event.target.value = "";
      setSelectedFile(null);
      return;
    }

    setMessage("");
    setSelectedFile(file);
  };

  // ==========================================
  // UPLOAD PDF
  // ==========================================

  const handleUpload = async (event) => {
    event.preventDefault();

    setMessage("");

    if (
      user?.email?.toLowerCase() !==
      ADMIN_EMAIL.toLowerCase()
    ) {
      setMessage("❌ You are not authorized to upload files.");
      return;
    }

    if (!selectedClass) {
      setMessage("❌ Please select a class.");
      return;
    }

    const class12Id = classes.find(
      (item) => item.name === "Class 12"
    )?.id;

    if (
      String(selectedClass) === String(class12Id) &&
      !selectedStream
    ) {
      setMessage("❌ Please select a stream.");
      return;
    }

    if (!selectedSubject) {
      setMessage("❌ Please select a subject.");
      return;
    }

    if (!resourceType) {
      setMessage("❌ Please select resource type.");
      return;
    }

    if (!title.trim()) {
      setMessage("❌ Please enter PDF title.");
      return;
    }

    if (!selectedFile) {
      setMessage("❌ Please select a PDF file.");
      return;
    }

    try {
      setUploading(true);

      const safeFileName = selectedFile.name.replace(
        /[^a-zA-Z0-9.-]/g,
        "_"
      );

      const filePath =
        `${selectedClass}/${selectedSubject}/${Date.now()}-${safeFileName}`;

      // Upload to Storage
      const { error: uploadError } = await supabase
        .storage
        .from("study-pdfs")
        .upload(filePath, selectedFile, {
          cacheControl: "3600",
          upsert: false,
          contentType: "application/pdf",
        });

      if (uploadError) {
        throw uploadError;
      }

      // Public URL
      const { data: publicUrlData } =
        supabase
          .storage
          .from("study-pdfs")
          .getPublicUrl(filePath);

      const fileUrl = publicUrlData.publicUrl;

      // Database
      const { error: databaseError } =
        await supabase
          .from("resources")
          .insert({
            subject_id: Number(selectedSubject),
            resource_type: resourceType,
            title: title.trim(),
            description: description.trim(),
            file_url: fileUrl,
          });

      if (databaseError) {
        await supabase
          .storage
          .from("study-pdfs")
          .remove([filePath]);

        throw databaseError;
      }

      setMessage("✅ PDF uploaded successfully!");

      // Reset
      setTitle("");
      setDescription("");
      setResourceType("");
      setSelectedFile(null);

      const fileInput =
        document.getElementById("admin-pdf-file");

      if (fileInput) {
        fileInput.value = "";
      }

      await loadResources();
    } catch (error) {
      console.error("Upload Error:", error);

      setMessage(
        "❌ Upload failed: " +
          (error.message || "Unknown error")
      );
    } finally {
      setUploading(false);
    }
  };

  // ==========================================
  // LOAD ALL RESOURCES
  // ==========================================

  const loadResources = async () => {
    const { data, error } = await supabase
      .from("resources")
      .select(`
        id,
        title,
        description,
        resource_type,
        file_url,
        created_at,
        subject_id,
        subjects (
          id,
          name,
          slug,
          class_id,
          stream_id,
          classes (
            id,
            name
          ),
          streams (
            id,
            name
          )
        )
      `)
      .order("created_at", {
        ascending: false,
      });

    if (!error) {
      setResources(data || []);
    } else {
      console.error("Resources Error:", error);
    }
  };

  // ==========================================
  // STORAGE PATH FROM PUBLIC URL
  // ==========================================

  const getStoragePath = (fileUrl) => {
    if (!fileUrl) return null;

    const marker =
      "/storage/v1/object/public/study-pdfs/";

    const index = fileUrl.indexOf(marker);

    if (index === -1) {
      return null;
    }

    const path = fileUrl.substring(
      index + marker.length
    );

    try {
      return decodeURIComponent(path);
    } catch {
      return path;
    }
  };

  // ==========================================
  // PREVIEW PDF
  // ==========================================

  const previewPDF = (url) => {
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

  // ==========================================
  // DOWNLOAD PDF
  // ==========================================

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

    const link =
      document.createElement("a");

    link.href = downloadUrl;
    link.download = fileName;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ==========================================
  // DELETE PDF
  // ==========================================

  const handleDelete = async (resource) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${resource.title}"?\n\nPDF Storage aur database dono se delete ho jayega.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(resource.id);

      const storagePath =
        getStoragePath(resource.file_url);

      // Delete database record first
      const { error: databaseError } =
        await supabase
          .from("resources")
          .delete()
          .eq("id", resource.id);

      if (databaseError) {
        throw databaseError;
      }

      // Delete actual PDF from Storage
      if (storagePath) {
        const { error: storageError } =
          await supabase
            .storage
            .from("study-pdfs")
            .remove([storagePath]);

        if (storageError) {
          console.error(
            "Storage Delete Error:",
            storageError
          );
        }
      }

      setMessage("✅ PDF deleted successfully.");

      await loadResources();
    } catch (error) {
      console.error("Delete Error:", error);

      setMessage(
        "❌ Delete failed: " +
          (error.message || "Unknown error")
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================
  // OPEN EDIT MODAL
  // ==========================================

  const openEditModal = (resource) => {
    setEditingResource(resource);

    setEditTitle(resource.title || "");
    setEditDescription(
      resource.description || ""
    );
    setEditResourceType(
      resource.resource_type || ""
    );
  };

  // ==========================================
  // SAVE EDIT
  // ==========================================

  const handleSaveEdit = async () => {
    if (!editingResource) {
      return;
    }

    if (!editTitle.trim()) {
      alert("Please enter PDF title.");
      return;
    }

    if (!editResourceType) {
      alert("Please select resource type.");
      return;
    }

    try {
      setSavingEdit(true);

      const { error } = await supabase
        .from("resources")
        .update({
          title: editTitle.trim(),
          description: editDescription.trim(),
          resource_type: editResourceType,
        })
        .eq("id", editingResource.id);

      if (error) {
        throw error;
      }

      setEditingResource(null);

      setMessage("✅ PDF details updated.");

      await loadResources();
    } catch (error) {
      console.error("Edit Error:", error);

      alert(
        "❌ Update failed: " +
          (error.message || "Unknown error")
      );
    } finally {
      setSavingEdit(false);
    }
  };

  // ==========================================
  // REPLACE FILE SELECT
  // ==========================================

  const handleReplacementFileChange = (
    event
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      setReplacementFile(null);
      return;
    }

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      alert("Please select PDF only.");
      event.target.value = "";
      setReplacementFile(null);
      return;
    }

    setReplacementFile(file);
  };

  // ==========================================
  // REPLACE PDF
  // ==========================================

  const handleReplacePDF = async () => {
    if (!replacingResource) {
      return;
    }

    if (!replacementFile) {
      alert("Please select new PDF.");
      return;
    }

    try {
      setReplacing(true);

      const oldStoragePath =
        getStoragePath(
          replacingResource.file_url
        );

      const safeFileName =
        replacementFile.name.replace(
          /[^a-zA-Z0-9.-]/g,
          "_"
        );

      const subjectId =
        replacingResource.subject_id;

      const newFilePath =
        `${replacingResource.subjects?.class_id || "unknown"}/${subjectId}/${Date.now()}-${safeFileName}`;

      // Upload new PDF
      const { error: uploadError } =
        await supabase
          .storage
          .from("study-pdfs")
          .upload(
            newFilePath,
            replacementFile,
            {
              cacheControl: "3600",
              upsert: false,
              contentType: "application/pdf",
            }
          );

      if (uploadError) {
        throw uploadError;
      }

      // Get new public URL
      const { data: publicUrlData } =
        supabase
          .storage
          .from("study-pdfs")
          .getPublicUrl(newFilePath);

      const newFileUrl =
        publicUrlData.publicUrl;

      // Update database
      const { error: updateError } =
        await supabase
          .from("resources")
          .update({
            file_url: newFileUrl,
          })
          .eq(
            "id",
            replacingResource.id
          );

      if (updateError) {
        // If database update fails,
        // remove newly uploaded PDF
        await supabase
          .storage
          .from("study-pdfs")
          .remove([newFilePath]);

        throw updateError;
      }

      // Delete old PDF
      if (oldStoragePath) {
        const { error: oldDeleteError } =
          await supabase
            .storage
            .from("study-pdfs")
            .remove([oldStoragePath]);

        if (oldDeleteError) {
          console.error(
            "Old PDF Delete Error:",
            oldDeleteError
          );
        }
      }

      setReplacingResource(null);
      setReplacementFile(null);

      setMessage(
        "✅ PDF replaced successfully."
      );

      const replaceInput =
        document.getElementById(
          "replacement-pdf-file"
        );

      if (replaceInput) {
        replaceInput.value = "";
      }

      await loadResources();
    } catch (error) {
      console.error(
        "Replace PDF Error:",
        error
      );

      alert(
        "❌ Replace failed: " +
          (error.message ||
            "Unknown error")
      );
    } finally {
      setReplacing(false);
    }
  };

  // ==========================================
  // FILTERED RESOURCES
  // ==========================================

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const subject = resource.subjects;

      const className =
        subject?.classes?.name || "";

      const streamName =
        subject?.streams?.name || "";

      const subjectName =
        subject?.name || "";

      const search =
        searchTerm.trim().toLowerCase();

      const matchesSearch =
        !search ||
        resource.title
          ?.toLowerCase()
          .includes(search) ||
        subjectName
          .toLowerCase()
          .includes(search);

      const matchesClass =
        !filterClass ||
        className === filterClass;

      const matchesStream =
        !filterStream ||
        streamName === filterStream;

      const matchesSubject =
        !filterSubject ||
        subjectName === filterSubject;

      const matchesType =
        !filterType ||
        resource.resource_type === filterType;

      return (
        matchesSearch &&
        matchesClass &&
        matchesStream &&
        matchesSubject &&
        matchesType
      );
    });
  }, [
    resources,
    searchTerm,
    filterClass,
    filterStream,
    filterSubject,
    filterType,
  ]);

  // ==========================================
  // FILTER SUBJECTS
  // ==========================================

  const filterSubjects = useMemo(() => {
    const map = new Map();

    resources.forEach((resource) => {
      const subject =
        resource.subjects;

      if (subject) {
        map.set(
          subject.id,
          subject
        );
      }
    });

    return Array.from(map.values()).sort(
      (a, b) =>
        (a.name || "").localeCompare(
          b.name || ""
        )
    );
  }, [resources]);

  const filteredSubjectOptions =
    filterSubjects.filter((subject) => {
      const className =
        subject.classes?.name || "";

      const streamName =
        subject.streams?.name || "";

      if (
        filterClass &&
        className !== filterClass
      ) {
        return false;
      }

      if (
        filterStream &&
        streamName !== filterStream
      ) {
        return false;
      }

      return true;
    });

  // ==========================================
  // RESET FILTERS
  // ==========================================

  const resetFilters = () => {
    setSearchTerm("");
    setFilterClass("");
    setFilterStream("");
    setFilterSubject("");
    setFilterType("");
  };

  // ==========================================
  // DASHBOARD
  // ==========================================

  const renderDashboard = () => {
    const class10Count =
      resources.filter(
        (item) =>
          item.subjects?.classes?.name ===
          "Class 10"
      ).length;

    const class12Count =
      resources.filter(
        (item) =>
          item.subjects?.classes?.name ===
          "Class 12"
      ).length;

    const subjectCount = new Set(
      resources
        .map(
          (item) =>
            item.subject_id
        )
        .filter(Boolean)
    ).size;

    return (
      <>
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              📄
            </div>

            <div className="admin-stat-info">
              <h3>Total PDFs</h3>
              <p>{resources.length}</p>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              🎓
            </div>

            <div className="admin-stat-info">
              <h3>Class 10 PDFs</h3>
              <p>{class10Count}</p>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              📚
            </div>

            <div className="admin-stat-info">
              <h3>Class 12 PDFs</h3>
              <p>{class12Count}</p>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              📖
            </div>

            <div className="admin-stat-info">
              <h3>Subjects With PDFs</h3>
              <p>{subjectCount}</p>
            </div>
          </div>
        </div>

        <div className="admin-panel-section">
          <div className="admin-panel-header">
            <h2>
              Recent Uploaded PDFs
            </h2>

            <button
              className="admin-btn-primary"
              onClick={() =>
                setActiveTab("upload")
              }
            >
              + Upload PDF
            </button>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Class</th>
                  <th>Type</th>
                  <th>PDF</th>
                </tr>
              </thead>

              <tbody>
                {resources.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      No PDFs uploaded yet.
                    </td>
                  </tr>
                ) : (
                  resources
                    .slice(0, 10)
                    .map((item) => (
                      <tr key={item.id}>
                        <td>
                          {item.title}
                        </td>

                        <td>
                          {item.subjects
                            ?.name || "-"}
                        </td>

                        <td>
                          {item.subjects
                            ?.classes
                            ?.name || "-"}
                        </td>

                        <td>
                          {item.resource_type}
                        </td>

                        <td>
                          {item.file_url ? (
                            <button
                              onClick={() =>
                                previewPDF(
                                  item.file_url
                                )
                              }
                              style={{
                                border: "none",
                                background:
                                  "transparent",
                                color:
                                  "#2563eb",
                                cursor:
                                  "pointer",
                                fontWeight:
                                  600,
                              }}
                            >
                              View PDF
                            </button>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  // ==========================================
  // UPLOAD PAGE
  // ==========================================

  const renderUpload = () => (
    <div className="admin-panel-section">
      <div className="admin-panel-header">
        <h2>Upload Study PDF</h2>

        <button
          className="admin-btn-primary"
          onClick={() =>
            setActiveTab("dashboard")
          }
        >
          ← Dashboard
        </button>
      </div>

      <form onSubmit={handleUpload}>
        {/* CLASS */}

        <div style={{ marginBottom: "18px" }}>
          <label>
            <strong>Class</strong>
          </label>

          <select
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(
                e.target.value
              );
              setSelectedStream("");
              setSelectedSubject("");
            }}
            style={inputStyle}
          >
            <option value="">
              Select Class
            </option>

            {classes.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* STREAM */}

        {classes.find(
          (item) =>
            String(item.id) ===
            String(selectedClass)
        )?.name === "Class 12" && (
          <div
            style={{
              marginBottom: "18px",
            }}
          >
            <label>
              <strong>Stream</strong>
            </label>

            <select
              value={selectedStream}
              onChange={(e) => {
                setSelectedStream(
                  e.target.value
                );
                setSelectedSubject("");
              }}
              style={inputStyle}
            >
              <option value="">
                Select Stream
              </option>

              {streams.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* SUBJECT */}

        <div style={{ marginBottom: "18px" }}>
          <label>
            <strong>Subject</strong>
          </label>

          <select
            value={selectedSubject}
            onChange={(e) =>
              setSelectedSubject(
                e.target.value
              )
            }
            style={inputStyle}
            disabled={!selectedClass}
          >
            <option value="">
              Select Subject
            </option>

            {subjects.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* RESOURCE TYPE */}

        <div style={{ marginBottom: "18px" }}>
          <label>
            <strong>
              Resource Type
            </strong>
          </label>

          <select
            value={resourceType}
            onChange={(e) =>
              setResourceType(
                e.target.value
              )
            }
            style={inputStyle}
          >
            <option value="">
              Select Resource Type
            </option>

            {resourceTypes.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* TITLE */}

        <div style={{ marginBottom: "18px" }}>
          <label>
            <strong>PDF Title</strong>
          </label>

          <input
            type="text"
            placeholder="Example: Mathematics PYQ 2025"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            style={inputStyle}
          />
        </div>

        {/* DESCRIPTION */}

        <div style={{ marginBottom: "18px" }}>
          <label>
            <strong>Description</strong>
          </label>

          <textarea
            placeholder="Short description..."
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            style={{
              ...inputStyle,
              minHeight: "100px",
              resize: "vertical",
            }}
          />
        </div>

        {/* PDF */}

        <div style={{ marginBottom: "18px" }}>
          <label>
            <strong>PDF File</strong>
          </label>

          <input
            id="admin-pdf-file"
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleFileChange}
            style={{
              display: "block",
              marginTop: "8px",
            }}
          />

          {selectedFile && (
            <p style={{ marginTop: "8px" }}>
              Selected:{" "}
              <strong>
                {selectedFile.name}
              </strong>
            </p>
          )}
        </div>

        {/* MESSAGE */}

        {message && (
          <div
            style={{
              marginBottom: "18px",
              padding: "12px",
              borderRadius: "8px",
              background:
                message.startsWith("✅")
                  ? "#ecfdf5"
                  : "#fef2f2",
              color:
                message.startsWith("✅")
                  ? "#047857"
                  : "#b91c1c",
            }}
          >
            {message}
          </div>
        )}

        {/* UPLOAD */}

        <button
          type="submit"
          className="admin-btn-primary"
          disabled={uploading}
          style={{
            padding: "12px 24px",
          }}
        >
          {uploading
            ? "Uploading..."
            : "🚀 Upload PDF"}
        </button>
      </form>
    </div>
  );

  // ==========================================
  // MANAGE PDFs
  // ==========================================

  const renderManagePDFs = () => (
    <div className="admin-panel-section">
      <div
        className="admin-panel-header"
        style={{
          alignItems: "flex-start",
          gap: "15px",
        }}
      >
        <div>
          <h2>Manage PDFs</h2>

          <p
            style={{
              margin:
                "6px 0 0",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Uploaded study materials
            ko manage karo.
          </p>
        </div>

        <button
          className="admin-btn-primary"
          onClick={() =>
            setActiveTab("upload")
          }
        >
          + Upload PDF
        </button>
      </div>

      {/* SUCCESS MESSAGE */}

      {message && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px 15px",
            borderRadius: "10px",
            background:
              message.startsWith("✅")
                ? "#ecfdf5"
                : "#fef2f2",
            color:
              message.startsWith("✅")
                ? "#047857"
                : "#b91c1c",
          }}
        >
          {message}
        </div>
      )}

      {/* SEARCH */}

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search PDF title or subject..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          style={inputStyle}
        />
      </div>

      {/* FILTERS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        {/* CLASS FILTER */}

        <select
          value={filterClass}
          onChange={(e) => {
            setFilterClass(
              e.target.value
            );
            setFilterStream("");
            setFilterSubject("");
          }}
          style={inputStyle}
        >
          <option value="">
            All Classes
          </option>

          {classes.map((item) => (
            <option
              key={item.id}
              value={item.name}
            >
              {item.name}
            </option>
          ))}
        </select>

        {/* STREAM FILTER */}

        <select
          value={filterStream}
          onChange={(e) => {
            setFilterStream(
              e.target.value
            );
            setFilterSubject("");
          }}
          style={inputStyle}
        >
          <option value="">
            All Streams
          </option>

          {streams.map((item) => (
            <option
              key={item.id}
              value={item.name}
            >
              {item.name}
            </option>
          ))}
        </select>

        {/* SUBJECT FILTER */}

        <select
          value={filterSubject}
          onChange={(e) =>
            setFilterSubject(
              e.target.value
            )
          }
          style={inputStyle}
        >
          <option value="">
            All Subjects
          </option>

          {filteredSubjectOptions.map(
            (item) => (
              <option
                key={item.id}
                value={item.name}
              >
                {item.name}
              </option>
            )
          )}
        </select>

        {/* TYPE FILTER */}

        <select
          value={filterType}
          onChange={(e) =>
            setFilterType(
              e.target.value
            )
          }
          style={inputStyle}
        >
          <option value="">
            All Resource Types
          </option>

          {resourceTypes.map(
            (type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            )
          )}
        </select>
      </div>

      {/* RESET */}

      <button
        onClick={resetFilters}
        style={{
          marginBottom: "20px",
          padding: "9px 15px",
          border:
            "1px solid #cbd5e1",
          borderRadius: "8px",
          background: "#ffffff",
          cursor: "pointer",
          color: "#475569",
          fontWeight: 600,
        }}
      >
        Reset Filters
      </button>

      {/* RESULT COUNT */}

      <div
        style={{
          marginBottom: "15px",
          color: "#64748b",
          fontSize: "14px",
        }}
      >
        Showing{" "}
        <strong>
          {filteredResources.length}
        </strong>{" "}
        of{" "}
        <strong>
          {resources.length}
        </strong>{" "}
        PDFs
      </div>

      {/* TABLE */}

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>PDF Title</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Stream</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredResources.length ===
            0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "40px",
                  }}
                >
                  📂 No PDFs found.
                </td>
              </tr>
            ) : (
              filteredResources.map(
                (resource) => (
                  <tr
                    key={
                      resource.id
                    }
                  >
                    <td>
                      <strong>
                        {resource.title}
                      </strong>

                      {resource.description && (
                        <div
                          style={{
                            color:
                              "#64748b",
                            fontSize:
                              "12px",
                            marginTop:
                              "4px",
                            maxWidth:
                              "250px",
                          }}
                        >
                          {
                            resource.description
                          }
                        </div>
                      )}
                    </td>

                    <td>
                      {resource
                        .subjects
                        ?.name || "-"}
                    </td>

                    <td>
                      {resource
                        .subjects
                        ?.classes
                        ?.name || "-"}
                    </td>

                    <td>
                      {resource
                        .subjects
                        ?.streams
                        ?.name || "-"}
                    </td>

                    <td>
                      {resource.resource_type}
                    </td>

                    <td>
                      <div
                        className="admin-action-btns"
                        style={{
                          flexWrap:
                            "wrap",
                        }}
                      >
                        {/* VIEW */}

                        <button
                          className="admin-btn-edit"
                          onClick={() =>
                            previewPDF(
                              resource.file_url
                            )
                          }
                          title="Preview PDF"
                        >
                          👁️
                        </button>

                        {/* DOWNLOAD */}

                        <button
                          className="admin-btn-edit"
                          onClick={() =>
                            downloadPDF(
                              resource.file_url,
                              resource.title
                            )
                          }
                          title="Download PDF"
                        >
                          ⬇️
                        </button>

                        {/* EDIT */}

                        <button
                          className="admin-btn-edit"
                          onClick={() =>
                            openEditModal(
                              resource
                            )
                          }
                          title="Edit PDF"
                        >
                          ✏️
                        </button>

                        {/* REPLACE */}

                        <button
                          className="admin-btn-edit"
                          onClick={() => {
                            setReplacingResource(
                              resource
                            );
                            setReplacementFile(
                              null
                            );
                          }}
                          title="Replace PDF"
                        >
                          🔄
                        </button>

                        {/* DELETE */}

                        <button
                          className="admin-btn-delete"
                          onClick={() =>
                            handleDelete(
                              resource
                            )
                          }
                          disabled={
                            deletingId ===
                            resource.id
                          }
                          title="Delete PDF"
                        >
                          {deletingId ===
                          resource.id
                            ? "..."
                            : "🗑️"}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ==========================================
  // EDIT MODAL
  // ==========================================

  const renderEditModal = () => {
    if (!editingResource) {
      return null;
    }

    return (
      <div style={modalOverlay}>
        <div style={modalBox}>
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              marginBottom:
                "20px",
            }}
          >
            <h2
              style={{
                margin: 0,
              }}
            >
              ✏️ Edit PDF
            </h2>

            <button
              onClick={() =>
                setEditingResource(
                  null
                )
              }
              style={closeButton}
            >
              ×
            </button>
          </div>

          <label>
            <strong>
              PDF Title
            </strong>
          </label>

          <input
            type="text"
            value={editTitle}
            onChange={(e) =>
              setEditTitle(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <label
            style={{
              display: "block",
              marginTop: "18px",
            }}
          >
            <strong>
              Resource Type
            </strong>
          </label>

          <select
            value={editResourceType}
            onChange={(e) =>
              setEditResourceType(
                e.target.value
              )
            }
            style={inputStyle}
          >
            {resourceTypes.map(
              (type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              )
            )}
          </select>

          <label
            style={{
              display: "block",
              marginTop: "18px",
            }}
          >
            <strong>
              Description
            </strong>
          </label>

          <textarea
            value={editDescription}
            onChange={(e) =>
              setEditDescription(
                e.target.value
              )
            }
            style={{
              ...inputStyle,
              minHeight:
                "110px",
              resize:
                "vertical",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent:
                "flex-end",
              marginTop:
                "22px",
            }}
          >
            <button
              onClick={() =>
                setEditingResource(
                  null
                )
              }
              style={
                secondaryButton
              }
            >
              Cancel
            </button>

            <button
              onClick={
                handleSaveEdit
              }
              className="admin-btn-primary"
              disabled={
                savingEdit
              }
            >
              {savingEdit
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // REPLACE MODAL
  // ==========================================

  const renderReplaceModal = () => {
    if (!replacingResource) {
      return null;
    }

    return (
      <div style={modalOverlay}>
        <div style={modalBox}>
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              marginBottom:
                "20px",
            }}
          >
            <h2
              style={{
                margin: 0,
              }}
            >
              🔄 Replace PDF
            </h2>

            <button
              onClick={() =>
                setReplacingResource(
                  null
                )
              }
              style={closeButton}
            >
              ×
            </button>
          </div>

          <div
            style={{
              padding: "12px",
              background:
                "#f8fafc",
              borderRadius:
                "10px",
              marginBottom:
                "18px",
            }}
          >
            <strong>
              Current PDF:
            </strong>

            <div
              style={{
                marginTop:
                  "5px",
                color:
                  "#475569",
              }}
            >
              {
                replacingResource.title
              }
            </div>
          </div>

          <label>
            <strong>
              New PDF File
            </strong>
          </label>

          <input
            id="replacement-pdf-file"
            type="file"
            accept="application/pdf,.pdf"
            onChange={
              handleReplacementFileChange
            }
            style={{
              display:
                "block",
              marginTop:
                "10px",
            }}
          />

          {replacementFile && (
            <p
              style={{
                marginTop:
                  "10px",
              }}
            >
              Selected:{" "}
              <strong>
                {
                  replacementFile.name
                }
              </strong>
            </p>
          )}

          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent:
                "flex-end",
              marginTop:
                "25px",
            }}
          >
            <button
              onClick={() =>
                setReplacingResource(
                  null
                )
              }
              style={
                secondaryButton
              }
            >
              Cancel
            </button>

            <button
              onClick={
                handleReplacePDF
              }
              className="admin-btn-primary"
              disabled={
                replacing
              }
            >
              {replacing
                ? "Replacing..."
                : "🔄 Replace PDF"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // MAIN RENDER
  // ==========================================

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}

      <aside className="admin-sidebar">
        <div className="admin-brand">
          🎓 BiharBoard
          <span>Study</span>
        </div>

        <nav className="admin-nav">
          {/* DASHBOARD */}

          <div
            className={`admin-nav-item ${
              activeTab === "dashboard"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveTab(
                "dashboard"
              )
            }
          >
            📊 Dashboard
          </div>

          {/* UPLOAD */}

          <div
            className={`admin-nav-item ${
              activeTab === "upload"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveTab("upload")
            }
          >
            📤 Upload PDF
          </div>

          {/* MANAGE */}

          <div
            className={`admin-nav-item ${
              activeTab === "manage"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveTab("manage")
            }
          >
            📚 Manage PDFs
          </div>
        </nav>

        <div className="admin-sidebar-footer">
          <button
            className="admin-logout-btn"
            onClick={handleLogout}
          >
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN */}

      <main className="admin-main">
        <header className="admin-header">
          <h1>
            {activeTab ===
            "upload"
              ? "Upload PDF"
              : activeTab ===
                "manage"
              ? "Manage PDFs"
              : "Dashboard"}
          </h1>

          <div className="admin-header-user">
            <span
              style={{
                fontWeight: 600,
              }}
            >
              {user?.email ||
                "Admin"}
            </span>

            <div className="admin-avatar">
              {(user?.email ||
                "A")
                .charAt(0)
                .toUpperCase()}
            </div>
          </div>
        </header>

        <div className="admin-content">
          {activeTab ===
          "upload"
            ? renderUpload()
            : activeTab ===
              "manage"
            ? renderManagePDFs()
            : renderDashboard()}
        </div>
      </main>

      {/* MODALS */}

      {renderEditModal()}

      {renderReplaceModal()}
    </div>
  );
}

// ==========================================
// INPUT STYLE
// ==========================================

const inputStyle = {
  width: "100%",
  marginTop: "8px",
  padding: "12px",
  border:
    "1px solid #cbd5e1",
  borderRadius: "8px",
  background: "#ffffff",
  fontSize: "14px",
  boxSizing: "border-box",
};

// ==========================================
// MODAL STYLES
// ==========================================

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background:
    "rgba(15, 23, 42, 0.55)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  zIndex: 9999,
};

const modalBox = {
  width: "100%",
  maxWidth: "560px",
  maxHeight: "90vh",
  overflowY: "auto",
  background: "#ffffff",
  borderRadius: "16px",
  padding: "24px",
  boxShadow:
    "0 25px 60px rgba(0,0,0,0.25)",
};

const closeButton = {
  width: "36px",
  height: "36px",
  border: "none",
  borderRadius: "8px",
  background: "#f1f5f9",
  color: "#475569",
  fontSize: "24px",
  cursor: "pointer",
};

const secondaryButton = {
  padding: "10px 16px",
  border:
    "1px solid #cbd5e1",
  borderRadius: "8px",
  background: "#ffffff",
  color: "#475569",
  cursor: "pointer",
  fontWeight: 600,
};