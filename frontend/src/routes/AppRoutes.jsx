import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Sweets from "../pages/Sweets";

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };

    window.addEventListener("storage", checkAuth);
    window.addEventListener("authchange", checkAuth);
    checkAuth();

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authchange", checkAuth);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landing isLoggedIn={isLoggedIn} />} />

      <Route
        path="/login"
        element={
          isLoggedIn ? <Navigate replace to="/dashboard" /> : <Login />
        }
      />

      <Route
        path="/dashboard"
        element={isLoggedIn ? <Sweets /> : <Navigate replace to="/login" />}
      />

      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
