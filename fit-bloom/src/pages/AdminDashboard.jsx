
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Edit3,
  Save,
  LogOut,
  Image as ImageIcon,
  GraduationCap,
  Award,
  UserCheck,
  HeartPulse
} from "lucide-react";
import api from "../api/doctorClient.js";
import { useDoctorAuth } from "../context/DoctorAuthContext";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { doctor, logout } = useDoctorAuth();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    bio: "",
    image: "",
    qualifications: "",
    certificates: "",
    experience: 0,
    clients: 0
  });
  const [showImageInput, setShowImageInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get("/doctor/me");
      
      setFormData({
        name: res.data.name || "",
        title: res.data.title || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        bio: res.data.bio || "",
        image: res.data.image || "",
        qualifications: res.data.qualifications || "",
        certificates: res.data.certificates || "",
        experience: res.data.experience || 0,
        clients: res.data.clients || 0
      });
    } catch (err) {
      console.error("❌ Load profile error:", err.response?.data);
      setError("Failed to load profile: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'experience' || name === 'clients' 
        ? parseInt(value) || 0 
        : value
    }));
  };

  const handleImageUrlChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await api.patch("/doctor/me", formData);
      await loadProfile();
      setError("");
    } catch (err) {
      console.error("❌ Save error:", err.response?.data);
      setError(err.response?.data?.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  if (!doctor && !loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Doctor Dashboard</h1>
          <p className="text-slate-500 mb-6">Please log in first</p>
          <button
            onClick={() => navigate("/admin")}
            className="px-6 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Doctor Dashboard
            </h1>
            <p className="text-slate-600 mt-2">Manage your profile & professional info</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={loadProfile}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-200 rounded-xl hover:bg-slate-300 transition disabled:opacity-50"
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-200 rounded-xl hover:bg-slate-300 transition"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl">
            <p className="text-sm text-rose-700">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl ring-1 ring-slate-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Profile Header - IMAGE URL INPUT */}
            <div className="flex items-start gap-6">
              <div className="shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-emerald-400 to-emerald-500 flex items-center justify-center overflow-hidden">
                  {formData.image ? (
                    <img 
                      src={formData.image} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <User className="w-12 h-12 text-white" />
                </div>
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setShowImageInput(!showImageInput)}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-xl cursor-pointer hover:bg-slate-200 transition w-full"
                  >
                    <ImageIcon className="h-4 w-4" />
                    {showImageInput ? "Cancel" : "Change Photo"}
                  </button>
                  {showImageInput && (
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleImageUrlChange}
                      placeholder="https://example.com/image.jpg"
                      className="mt-2 w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:border-emerald-400 outline-none"
                    />
                  )}
                </div>
              </div>

              <div className="flex-1 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <div className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 bg-slate-50">
                    <User className="h-5 w-5 text-slate-400 shrink-0" />
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-transparent text-lg font-semibold text-slate-900 outline-none flex-1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
                  <div className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 bg-slate-50">
                    <Edit3 className="h-5 w-5 text-slate-400 shrink-0" />
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Dr. Emily Chen, Nutritionist"
                      className="bg-transparent text-lg font-semibold text-slate-900 outline-none flex-1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-900 outline-none focus:border-emerald-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-900 outline-none focus:border-emerald-400"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={6}
                placeholder="Tell us about your expertise and approach... (line breaks preserved)"
                className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-900 outline-none focus:border-emerald-400 resize-vertical whitespace-pre-wrap"
              />
            </div>

            {/* Professional Information */}
            <div>
              <h4 className="text-xl font-semibold text-slate-900 mb-6 border-b border-slate-200 pb-4">
                Professional Information
              </h4>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Highest Qualification</label>
                  <div className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 bg-slate-50">
                    <GraduationCap className="h-5 w-5 text-slate-400 shrink-0" />
                    <input
                      name="qualifications"
                      value={formData.qualifications}
                      onChange={handleChange}
                      placeholder="Ph.D. in Nutritional Science"
                      className="bg-transparent text-lg font-semibold text-slate-900 outline-none flex-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Highest Certification</label>
                  <div className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 bg-slate-50">
                    <Award className="h-5 w-5 text-slate-400 shrink-0" />
                    <input
                      name="certificates"
                      value={formData.certificates}
                      onChange={handleChange}
                      placeholder="Board Certified Dietician"
                      className="bg-transparent text-lg font-semibold text-slate-900 outline-none flex-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Years of Experience</label>
                  <input
                    name="experience"
                    type="number"
                    min="0"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-900 outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Total Clients Helped</label>
                  <input
                    name="clients"
                    type="number"
                    min="0"
                    value={formData.clients}
                    onChange={handleChange}
                    className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-900 outline-none focus:border-emerald-400"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving || loading}
                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-5 w-5" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Link to={'/articles'} className="group bg-linear-to-r from-emerald-500 to-teal-600 text-white p-8 rounded-3xl hover:shadow-2xl transition-all text-center">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📝</div>
            <h3 className="text-xl font-bold mb-2">Manage Articles</h3>
            <p className="opacity-90">Add and manage your published articles</p>
          </Link>
          <a href="/doctor/appointments" className="group bg-linear-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-3xl hover:shadow-2xl transition-all text-center">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📅</div>
            <h3 className="text-xl font-bold mb-2">Appointments</h3>
            <p className="opacity-90">View and manage patient appointments</p>
          </a>
        </div>
      </div>
    </main>
  );
}
