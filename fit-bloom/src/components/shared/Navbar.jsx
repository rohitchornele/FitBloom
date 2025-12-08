import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, UserCircle, LogOut, Leaf, Stethoscope, FileText } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useDoctorAuth } from "../../context/DoctorAuthContext";

const publicNavLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
  { label: "Contact", to: "/contact" },
];

const regularUserNavLinks = [
  ...publicNavLinks,
  { label: "Dashboard", to: "/dashboard" },
  { label: "Goals", to: "/goals" },
  { label: "Consultations", to: "/consultations" },
];

const doctorNavLinks = [
  ...publicNavLinks,
  { label: "Dashboard", to: "/admin/dashboard" },
  { label: "Appointments", to: "/doctor/appointments" },
];

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { doctor, doctorLogout } = useDoctorAuth(); // ✅ Doctor auth

  const isRegularUserLoggedIn = !!user && !doctor;
  const isDoctorLoggedIn = !!doctor;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ SELECT NAV LINKS BASED ON USER TYPE
  const navLinks = isDoctorLoggedIn 
    ? doctorNavLinks 
    : isRegularUserLoggedIn 
    ? regularUserNavLinks 
    : publicNavLinks;

  // ✅ USER INITIALS
  const getInitials = (name) => {
    if (!name) return "FB";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleDoctorLogout = () => {
    doctorLogout();
    setIsDropdownOpen(false);
    navigate("/admin");
  };

  const handleUserLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => navigate("/")}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Leaf />
          </div>
          <span className="text-lg font-semibold text-slate-900">FitBloom</span>
        </div>

        {/* Center nav links */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                isActive
                  ? "rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700"
                  : "px-1.5 py-1 text-sm font-medium text-slate-600 hover:text-slate-900"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right-side auth */}
        <div className="flex items-center gap-4">
          {isDoctorLoggedIn ? (
            /* ✅ DOCTOR DROPDOWN */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-slate-800 hover:bg-emerald-100"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-xs text-white">
                  <Stethoscope className="h-4 w-4" />
                </div>
                <span>Dr. {doctor?.name}</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-500 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-white py-2 text-sm shadow-lg ring-1 ring-slate-100">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/admin/dashboard");
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50"
                  >
                    <UserCircle className="h-4 w-4 text-emerald-500" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/articles");
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50"
                  >
                    <FileText className="h-4 w-4 text-emerald-500" />
                    <span>My Articles</span>
                  </button>
                  <button
                    onClick={handleDoctorLogout}
                    className="mt-1 flex w-full items-center gap-3 border-t border-slate-100 px-4 py-2.5 text-rose-500 hover:bg-rose-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Doctor Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : isRegularUserLoggedIn ? (
            /* ✅ REGULAR USER DROPDOWN */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-slate-800 hover:bg-emerald-100"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-xs text-white">
                  {getInitials(user?.name)}
                </span>
                <span>{user?.name}</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-500 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-white py-2 text-sm shadow-lg ring-1 ring-slate-100">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/profile");
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50"
                  >
                    <UserCircle className="h-4 w-4 text-emerald-500" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={handleUserLogout}
                    className="mt-1 flex w-full items-center gap-3 border-t border-slate-100 px-4 py-2.5 text-rose-500 hover:bg-rose-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ✅ PUBLIC - Not logged in */
            <>
              <button
                className="text-sm font-medium text-slate-700 hover:text-slate-900"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
              <button
                className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-600"
                onClick={() => navigate("/signup")}
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
