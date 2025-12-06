import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Lock,
  Save,
} from "lucide-react";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function ProfileSettingsPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: "",
        dob: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await api.patch("/auth/me", {
        name: formData.name.trim(),
        email: formData.email.trim(),
      });
      
      // Update auth context with new user data
      localStorage.setItem("fitbloom_user", JSON.stringify(res.data));
      window.location.reload(); // Simple way to refresh navbar name
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-rose-50 pb-16">
      <div className="mx-auto max-w-5xl px-4 pt-10">
        {/* Page heading */}
        <header>
          <h1 className="text-3xl font-semibold text-slate-900">
            Profile Settings
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your account information and preferences.
          </p>
        </header>

        {/* Top profile summary card */}
        <section className="mt-8 rounded-3xl bg-white px-6 py-5 shadow-sm ring-1 ring-emerald-50 sm:px-8 sm:py-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
              <User className="h-8 w-8 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {formData.name || "Your Name"}
              </h2>
              <p className="text-sm text-slate-500">{formData.email}</p>
              <p className="mt-1 text-xs text-slate-400">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </section>

        {error && (
          <div className="mt-4 rounded-2xl bg-rose-50 border border-rose-200 p-4">
            <p className="text-sm text-rose-700">{error}</p>
          </div>
        )}

        {/* Personal information card */}
        <section className="mt-8 rounded-3xl bg-white px-6 py-6 shadow-sm ring-1 ring-emerald-50 sm:px-8 sm:py-7">
          <h3 className="text-lg font-semibold text-slate-900">
            Personal Information
          </h3>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Full name */}
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
                Full Name
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-emerald-50/40 px-3 py-3">
                <User className="h-4 w-4 text-slate-400" />
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
                Email
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Mail className="h-4 w-4 text-slate-400" />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm text-slate-500 outline-none"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-slate-400">
                We'll never share your email with anyone else.
              </p>
            </div>

            {/* Phone + DOB (future expansion) */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
                  Phone Number
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-emerald-50/40 px-3 py-3">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
                  Date of Birth
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-emerald-50/40 px-3 py-3">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <input
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Save button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                <span>{saving ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </form>
        </section>

        {/* Change password card (TODO: wire later) */}
        <section className="mt-8 rounded-3xl bg-white px-6 py-6 shadow-sm ring-1 ring-emerald-50 sm:px-8 sm:py-7">
          <h3 className="text-lg font-semibold text-slate-900">
            Change Password
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Password changes will be implemented in the next update.
          </p>
        </section>
      </div>
    </main>
  );
}

