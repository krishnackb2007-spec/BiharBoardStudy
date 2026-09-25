import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const ADMIN_EMAIL = "krishnackb2007@gmail.com";

export default function ProtectedRoute({ children }) {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  // Login nahi hai
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Sirf admin email allowed
  if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    logout();
    return <Navigate to="/login" replace />;
  }

  return children;
}