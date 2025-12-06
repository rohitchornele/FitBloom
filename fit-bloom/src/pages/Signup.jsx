import React, { useState } from "react";
import { User, Mail, Lock, CheckCircle, Leaf } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/register", form);
      const { token, user } = res.data;

      // Save token + user in auth context
      login(token, user);

      // Redirect to dashboard (or wherever you prefer)
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message || "Could not create account. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      {/* Left green panel */}
      <section className="hidden lg:flex lg:w-1/2 items-center justify-center bg-emerald-500 px-12">
        <div className="max-w-md text-left text-emerald-50">
          <h1 className="text-3xl font-semibold leading-tight">
            Start Your Journey to Better Health
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-emerald-100">
            Join hundreds of members who have transformed their lives with
            personalized nutrition guidance.
          </p>

          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 text-emerald-100" />
              <span>Personalized nutrition plans</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 text-emerald-100" />
              <span>Expert dietician consultations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 text-emerald-100" />
              <span>Goal tracking &amp; progress insights</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 text-emerald-100" />
              <span>Access to exclusive articles</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Right form area */}
      <section className="flex w-full items-center justify-center bg-linear-to-br from-emerald-50 via-white to-rose-50 px-4 py-10 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Logo + heading */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500">
                <span className="text-xl text-white">
                  <Leaf />
                </span>
              </div>
              <span className="text-xl font-semibold text-slate-900">
                FitBloom
              </span>
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-slate-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Start your free wellness journey today.
            </p>
          </div>

          {/* Card with form */}
          <div className="rounded-3xl bg-white px-6 py-6 shadow-lg shadow-emerald-100 ring-1 ring-emerald-50 sm:px-8 sm:py-7">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full name */}
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
                  Full Name
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-emerald-50/40 px-3 py-3">
                  <User className="h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
                  Email
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-emerald-50/40 px-3 py-3">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
                  Password
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-emerald-50/40 px-3 py-3">
                  <Lock className="h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    name="password"
                    required
                    minLength={6}
                    placeholder="Create a password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                  />
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  Must be at least 6 characters.
                </p>
              </div>

              {error && (
                <p className="text-xs text-red-500 mt-1">
                  {error}
                </p>
              )}

              {/* CTA */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 hover:-translate-y-1px disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>

              {/* Login link */}
              <p className="pt-1 text-center text-xs text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
