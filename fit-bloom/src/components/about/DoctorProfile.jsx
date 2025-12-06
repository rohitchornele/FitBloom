
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  GraduationCap, 
  Award, 
  UserCheck, 
  HeartPulse,
  Loader2 
} from "lucide-react";
import api from "../../api/client.js"; // Regular client (public endpoint)

export default function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ FETCH DOCTOR ON MOUNT
  useEffect(() => {
    loadDoctorProfile();
  }, []);

  const loadDoctorProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/doctor/public");
      setDoctor(res.data);
    } catch (err) {
      console.error("Doctor profile load error:", err);
      setError("Failed to load doctor profile");
      setDoctor(null);
    } finally {
      setLoading(false);
    }
  };

  // LOADING STATE
  if (loading) {
    return (
      <section className="bg-[#fbfcf8] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
              <p className="text-slate-500">Loading doctor profile...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ERROR STATE
  if (error || !doctor) {
    return (
      <section className="bg-[#fbfcf8] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Doctor Profile Not Available
            </h2>
            <p className="text-slate-500 mb-6">{error || "No doctor found"}</p>
            <button
              onClick={loadDoctorProfile}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#fbfcf8] py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row lg:items-stretch">
        {/* Left image - DYNAMIC */}
        <div className="overflow-hidden rounded-[2.5rem] bg-emerald-100 shadow-[0_24px_60px_rgba(15,23,42,0.15)] lg:w-1/2">
          {doctor.image ? (
            <img
              src={doctor.image}
              alt={doctor.name}
              className="h-full w-full object-cover object-center"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className="h-full w-full flex items-center justify-center bg-linear-to-br from-emerald-200 to-emerald-300">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white flex items-center justify-center shadow-lg">
                <span className="text-3xl font-semibold text-emerald-600">
                  {doctor.name?.charAt(0)?.toUpperCase() || "Dr"}
                </span>
              </div>
              <p className="text-sm text-emerald-700 font-medium">No Photo</p>
            </div>
          </div>
        </div>

        {/* Right content - 100% DYNAMIC */}
        <div className="flex flex-1 flex-col justify-center lg:w-1/2">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
            <UserCheck className="h-4 w-4" />
            <span>{doctor.title || "Certified Specialist"}</span>
          </div>

          {/* Name & Title */}
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {doctor.name || "Dr. [Name]"}
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-500 sm:text-base">
            Registered Nutritionist & Wellness Coach
          </p>

          {/* Bio */}
          {/* <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600">
            <p>{doctor.bio || "Experienced healthcare professional dedicated to your wellness."}</p>
          </div> */}
          <div 
            className="mt-5 text-sm leading-relaxed text-slate-600"
            dangerouslySetInnerHTML={{ 
              __html: doctor.bio 
                ? doctor.bio.replace(/\n/g, '<br>') 
                : 'Experienced healthcare professional dedicated to your wellness.' 
            }}
          />

          {/* Stats badges - ALL FROM YOUR MODEL */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {/* Qualifications */}
            <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-emerald-50">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50">
                <GraduationCap className="h-4 w-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">
                  {doctor.qualifications || "Advanced Degree"}
                </p>
              </div>
            </div>

            {/* Certificates */}
            <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-emerald-50">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50">
                <Award className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="text-xs font-semibold text-slate-900">
                {doctor.certificates || "Board Certified"}
              </p>
            </div>

            {/* Experience */}
            <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-emerald-50">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50">
                <UserCheck className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="text-xs font-semibold text-slate-900">
                {doctor.experience || 0} {doctor.experience > 1 ? "Years" : "Year"} Experience
              </p>
            </div>

            {/* Clients */}
            <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-emerald-50">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50">
                <HeartPulse className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="text-xs font-semibold text-slate-900">
                {doctor.clients || 0}+ Clients Helped
              </p>
            </div>
          </div>

          {/* CTA button */}
          <div className="mt-8">
            <a 
              href="/consultations" 
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 transition-colors"
            >
              Book a Consultation
              <span className="text-lg leading-none">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
