import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AuthContext.jsx";
import NotificationBell from "./NotificationBell.jsx";

const Navbar = () => {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600"
      : "text-slate-600 hover:text-slate-900";

  return (
    <nav className="bg-white border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer font-bold text-lg"
        >
          GigFlow
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/")}
            className={isActive("/")}
          >
            Browse
          </button>

          {user ? (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className={isActive("/dashboard")}
              >
                Dashboard
              </button>

              {/* 🔔 Notification Bell */}
              <NotificationBell />

              <button
                onClick={() => navigate("/post")}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Post a Gig
              </button>

              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")}>
                Login
              </button>
              <button onClick={() => navigate("/register")}>
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
