import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const navClass = (path) =>
    `relative px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
      isActive(path)
        ? "bg-white/70 text-gray-900 shadow-sm"
        : "text-gray-500 hover:bg-white/50 hover:text-gray-900"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/60 backdrop-blur-2xl backdrop-saturate-150">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white" />

      <div className="container mx-auto px-4">
        <div className="flex h-[68px] items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3 rounded-2xl transition-opacity hover:opacity-80">
            <div className="flex h-10 w-10 items-center justify-center rounded-[13px] border border-white/80 bg-gray-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_5px_15px_rgba(0,0,0,0.12)]">
              <span className="text-lg font-semibold text-white">S</span>
            </div>
            <span className="text-lg font-semibold tracking-tight text-gray-900">StudentMS</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link to="/" className={navClass("/")}>Home</Link>
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className={navClass("/dashboard")}>Dashboard</Link>
                <Link to="/students" className={navClass("/students")}>Students</Link>
              </>
            )}
          </nav>

          {/* User / Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="hidden items-center gap-2 rounded-2xl border border-white/70 bg-white/45 px-2 py-1.5 sm:flex">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="max-w-[120px] truncate px-1 text-sm font-medium text-gray-700">
                    {user?.name}
                  </span>
                </div>

                <button onClick={handleLogout} className="btn-secondary !py-2 !px-4">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="rounded-xl px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-white/50 hover:text-gray-900">
                  Login
                </Link>
                <Link to="/register" className="btn-primary !py-2 !px-4">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
