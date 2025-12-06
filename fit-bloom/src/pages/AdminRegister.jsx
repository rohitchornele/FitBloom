// pages/AdminRegister.jsx
import React, { useState } from "react";
import { User, Mail, Lock, Leaf, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import doctorApi from "../api/doctorClient";
import { useDoctorAuth } from "../context/DoctorAuthContext";

export default function AdminRegister() {

  const REGISTRATION_DISABLED = (import.meta.env.VITE_REGISTRATION_DISABLED === "true");
  console.log(REGISTRATION_DISABLED)

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    title: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useDoctorAuth();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (REGISTRATION_DISABLED) {
      alert("Doctor registration has been disabled for end users. Please contact the site administrator.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await doctorApi.post("/doctor/register", form);
      const { token, doctor } = res.data;

      // Auto-login after registration
      login(token, doctor);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-rose-50 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md">
        {/* Logo + heading */}
        <div className="flex flex-col items-center mb-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
              Doctor Portal
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Join as Doctor
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Create your account to manage profile & availability.
          </p>
          { REGISTRATION_DISABLED && 
           ( <p className="mt-2 text-sm text-red-700 text-center bg-red-200 py-1 px-3 rounded-md font-semibold">
              Doctor registration has been disabled for end users. <br /> Please contact the site administrator.
            </p>)
          }
        </div>

        {/* Registration card */}
        <div className="rounded-3xl bg-white px-8 py-8 shadow-2xl shadow-emerald-100 ring-1 ring-emerald-50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl">
                <p className="text-sm text-rose-700">{error}</p>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Full Name
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-emerald-50/40 px-4 py-3 focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-400">
                <User className="h-4 w-4 text-slate-400 shrink-0" />
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Dr. Emily Chen"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Title/Specialty */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Title/Specialty
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-emerald-50/40 px-4 py-3 focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-400">
                <User className="h-4 w-4 text-slate-400 shrink-0" />
                <input
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="Registered Dietitian Nutritionist"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Email
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-emerald-50/40 px-4 py-3 focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-400">
                <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="doctor@example.com"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Password
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-emerald-50/40 px-4 py-3 focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-400">
                <Lock className="h-4 w-4 text-slate-400 shrink-0" />
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  disabled={loading}
                />
              </div>
              <p className="mt-1 text-xs text-slate-400 ml-11">
                Must be at least 6 characters
              </p>
            </div>

            {/* Benefits list */}
            <ul className="space-y-3 text-sm text-slate-600 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                <span>Manage your profile & availability</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                <span>Update bio, photo, and schedule</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                <span>Professional doctor dashboard</span>
              </li>
            </ul>

            {/* CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-emerald-500 to-emerald-600 px-6 py-4 text-sm font-semibold text-white shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <User className="h-5 w-5" />
                  Create Doctor Account
                </>
              )}
            </button>
          </form>

          {/* Login link */}
          <p className="mt-8 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link
              to="/admin"
              className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
