import React, { useState } from "react";
import { Mail, Lock, Leaf } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import doctorApi from "../api/doctorClient";
import { useDoctorAuth } from "../context/DoctorAuthContext";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useDoctorAuth();

  // const from = location.state?.from?.pathname || "/admin/dashboard";

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await doctorApi.post("/doctor/login", form);
      const { token, doctor } = res.data;
      login(token, doctor);
      // navigate(from, { replace: true });
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-rose-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
              Doctor Portal
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Doctor Login
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Access your dashboard to manage profile & availability.
          </p>
        </div>

        <div className="rounded-3xl bg-white px-8 py-8 shadow-2xl shadow-emerald-100 ring-1 ring-emerald-50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl">
                <p className="text-sm text-rose-700">{error}</p>
              </div>
            )}

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Email
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-emerald-50/40 px-4 py-3 focus-within:border-emerald-400">
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

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Password
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-emerald-50/40 px-4 py-3 focus-within:border-emerald-400">
                <Lock className="h-4 w-4 text-slate-400 shrink-0" />
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-emerald-500 to-emerald-600 px-6 py-4 text-sm font-semibold text-white shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            Don't have an account?{" "}
            <Link to="/admin/register" className="font-semibold text-emerald-600 hover:text-emerald-700">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
