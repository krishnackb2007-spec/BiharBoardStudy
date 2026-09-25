import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useEffect } from "react";

import { AuthProvider } from "./context/AuthContext";
import AuthModal from "./components/AuthModal";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Class10 from "./pages/Class10";
import Class12 from "./pages/Class12";
import Science12 from "./pages/Science12";
import Class12Subject from "./pages/Class12Subject";
import Class12Resource from "./pages/Class12Resource";
import Arts12 from "./pages/Arts12";
import Arts12Subject from "./pages/Arts12Subject";
import Commerce12 from "./pages/Commerce12";
import Commerce12Subject from "./pages/Commerce12Subject";
import Subject from "./pages/Subject";
import Resource from "./pages/Resource";
import AuthPage from "./pages/AuthPage";

import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";



/* =====================================================
   SCROLL TO TOP ON EVERY PAGE
===================================================== */

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}


/* =====================================================
   UNIVERSAL PAGE NAVIGATION
===================================================== */

function UniversalNavigation() {
  const navigate = useNavigate();

  useEffect(() => {

    const handleNavigation = (event) => {

      const element = event.target.closest(
        "a, button, [data-page]"
      );

      if (!element) return;


      /* ================= LINKS ================= */

      const href = element.getAttribute("href");

      if (href) {

        const linkMap = {
          "#home": "/",
          "#class10": "/class-10",
          "#class12": "/class-12",
          "#pyq": "/pyq",
          "#notes": "/notes",
          "#about": "/about",
          "#login": "/login",
          "#signup": "/signup",
        };

        if (linkMap[href]) {

          event.preventDefault();

          navigate(linkMap[href]);

          return;
        }
      }


      /* ================= DATA PAGE ================= */

      const dataPage = element.getAttribute("data-page");

      if (dataPage) {

        event.preventDefault();

        navigate(dataPage);

        return;
      }


      /* ================= CLASS 10 ================= */

      const text = element.innerText?.trim().toLowerCase();

      if (
        text?.includes("explore class 10") ||
        text?.includes("class 10 →") ||
        text?.includes("class 10 >")
      ) {

        event.preventDefault();

        navigate("/class-10");

        return;
      }


      /* ================= CLASS 12 ================= */

      if (
        text?.includes("explore class 12") ||
        text?.includes("class 12 →") ||
        text?.includes("class 12 >")
      ) {

        event.preventDefault();

        navigate("/class-12");

        return;
      }

    };


    document.addEventListener(
      "click",
      handleNavigation
    );


    return () => {

      document.removeEventListener(
        "click",
        handleNavigation
      );

    };

  }, [navigate]);


  return null;
}


/* =====================================================
   APP CONTENT
===================================================== */

function AppContent() {

  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin");


  return (
    <>

      {/* ================= GLOBAL NAVIGATION ================= */}

      {!isAdminRoute && (
        <>
          <Navbar />

          <ScrollToTop />

          <UniversalNavigation />

          <AuthModal />
        </>
      )}


      {/* ================= ALL PAGES ================= */}

      <Routes>


        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* ================= CLASS 10 ================= */}

        <Route
          path="/class-10"
          element={<Class10 />}
        />


        {/* ================= CLASS 10 SUBJECT ================= */}

        <Route
          path="/class-10/:subject"
          element={<Subject />}
        />


        {/* ================= CLASS 10 RESOURCE ================= */}

        <Route
          path="/class-10/:subject/:type"
          element={<Resource />}
        />


        {/* ================= CLASS 12 ================= */}

        <Route
          path="/class-12"
          element={<Class12 />}
        />
        <Route
  path="/class-12/science"
  element={<Science12 />}
/>
{/* ================= CLASS 12 ================= */}

<Route
  path="/class-12"
  element={<Class12 />}
/>

{/* ================= CLASS 12 SCIENCE ================= */}

<Route
  path="/class-12/science"
  element={<Science12 />}
/>

{/* ================= CLASS 12 SCIENCE SUBJECT ================= */}

<Route
  path="/class-12/science/:subject"
  element={<Class12Subject />}
/>
<Route
  path="/class-12/science/:subject/:type"
  element={<Class12Resource />}
/>
<Route
  path="/class-12/arts"
  element={<Arts12 />}
/>

<Route
  path="/class-12/arts/:subject"
  element={<Arts12Subject />}
/>

<Route
  path="/class-12/arts/:subject/:type"
  element={<Class12Resource />}
/>
<Route path="/class-12/commerce" element={<Commerce12 />} />

<Route
  path="/class-12/commerce/:subject"
  element={<Commerce12Subject />}
/>

<Route
  path="/class-12/commerce/:subject/:type"
  element={<Class12Resource />}
/>

        {/* ================= AUTHENTICATION ================= */}

        <Route
          path="/login"
          element={
            <AuthPage
              key="login"
              initialMode="login"
            />
          }
        />

        <Route
          path="/signup"
          element={
            <AuthPage
              key="signup"
              initialMode="signup"
            />
          }
        />


        {/* ================= ADMIN DASHBOARD ================= */}

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />


        {/* ================= FUTURE PYQ PAGE ================= */}

        <Route
          path="/pyq"
          element={
            <div
              style={{
                padding: "100px",
                textAlign: "center",
              }}
            >
              <h1>
                Previous Year Questions
              </h1>

              <p>
                PYQ page coming soon...
              </p>
            </div>
          }
        />


        {/* ================= FUTURE NOTES PAGE ================= */}

        <Route
          path="/notes"
          element={
            <div
              style={{
                padding: "100px",
                textAlign: "center",
              }}
            >
              <h1>
                Notes
              </h1>

              <p>
                Notes page coming soon...
              </p>
            </div>
          }
        />


        {/* ================= ABOUT PAGE ================= */}

        <Route
          path="/about"
          element={
            <div
              style={{
                padding: "100px",
                textAlign: "center",
              }}
            >
              <h1>
                About BiharBoardStudy
              </h1>

              <p>
                About page coming soon...
              </p>
            </div>
          }
        />

      </Routes>

    </>
  );
}


/* =====================================================
   APP
===================================================== */

function App() {

  return (

    <BrowserRouter>

      <AuthProvider>

        <AppContent />

      </AuthProvider>

    </BrowserRouter>

  );
}


export default App;