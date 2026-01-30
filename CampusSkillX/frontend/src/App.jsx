import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";

import Profile from "./pages/Profile";
import AuthPage from "./pages/AuthPage";
import EventsPage from "./pages/EventsPage"; // ✅ added

// ✅ Alumni is in components
import AlumniSection from "./components/Alumni";

// ✅ PrivateRoute
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/auth" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token);
      setLoading(false);
    };

    checkAuth();
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl font-semibold">Loading...</div>
    );
  }

  return (
    <Routes>
      {/* Auth */}
      <Route
        path="/auth"
        element={isAuthenticated ? <Navigate to="/" /> : <AuthPage />}
      />

      {/* Home */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <>
              <Navbar />
              <LandingPage />
            </>
          </PrivateRoute>
        }
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <>
              <Navbar />
              <Profile />
            </>
          </PrivateRoute>
        }
      />

      {/* Events */}
      <Route
        path="/events"
        element={
          <PrivateRoute>
            <>
              <Navbar />
              <EventsPage />
            </>
          </PrivateRoute>
        }
      />

      {/* Alumni */}
      <Route
        path="/alumni"
        element={
          <PrivateRoute>
            <>
              <Navbar />
              <AlumniSection />
            </>
          </PrivateRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
