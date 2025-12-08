

import { Video, Clock, Calendar, X } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import BookConsultationModal from "../components/BookConsultationModal";
import api from "../api/client";

function formatMeta(isoString) {
  const d = new Date(isoString);
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = d.getDate().toString();
  const datetimeLabel = `${d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })} at ${d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })}`;

  return { month, day, datetimeLabel };
}

export default function Consultations() {
  const [openBooking, setOpenBooking] = useState(false);
  const [consultations, setConsultations] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load consultations and doctor data on mount - SAME API AS DOCTOR PROFILE
  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setError("");

        // Fetch both consultations and doctor data in parallel
        const [consultationsRes, doctorRes] = await Promise.all([
          api.get("/consultations"),
          api.get("/doctor/public") // ✅ SAME ENDPOINT AS DOCTOR PROFILE
        ]);

        if (!cancelled) {
          setConsultations(consultationsRes.data);
          setDoctor(doctorRes.data);
        }
      } catch (err) {
        if (!cancelled) {
          const msg = err.response?.data?.message || "Failed to load data.";
          setError(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  // Call backend to create consultation
  const handleConfirmBooking = async (data) => {
    try {
      const res = await api.post("/consultations", data);
      const newConsultation = res.data;

      setConsultations((prev) => [...prev, newConsultation]);
      setOpenBooking(false);
    } catch (err) {
      console.error("Booking failed:", err.response?.data?.message || err.message);
    }
  };

  // Cancel consultation
  const handleCancelConsultation = async (id) => {
    try {
      await api.delete(`/consultations/${id}`);
      setConsultations((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Cancel failed:", err);
    }
  };

  // Derive upcoming vs past
  const { upcoming, past } = useMemo(() => {
    const now = new Date();
    const future = [];
    const history = [];

    for (const c of consultations) {
      if (new Date(c.dateTime) >= now) future.push(c);
      else history.push(c);
    }

    future.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    history.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

    return { upcoming: future, past: history };
  }, [consultations]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-rose-50 flex items-center justify-center">
        <p className="text-slate-500">Loading consultations...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-rose-50 pb-16">
      <div className="mx-auto max-w-6xl px-4 pt-10">
        {/* Page header */}
        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              Consultations
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Book and manage your sessions with {doctor?.name || "your doctor"}.
            </p>
          </div>
          <button
            onClick={() => setOpenBooking(true)}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-600"
          >
            <span className="text-lg leading-none">+</span>
            <span>Book Consultation</span>
          </button>
        </div>

        {error && (
          <p className="mb-6 text-sm text-red-500">{error}</p>
        )}

        {openBooking && doctor && (
          <BookConsultationModal
            isOpen={openBooking}
            onClose={() => setOpenBooking(false)}
            onConfirm={handleConfirmBooking}
            doctor={doctor}
          />
        )}

        {/* Doctor card - MATCHES DOCTOR PROFILE DATA STRUCTURE */}
        {doctor && (
          <section className="mb-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-emerald-50">
            <div className="flex justify-center items-center gap-6 flex-wrap">
              {/* Doctor Image - SAME LOGIC AS DOCTOR PROFILE */}
              <div className="h-40 w-40 overflow-hidden rounded-2xl bg-emerald-100 relative">
                {doctor.image ? (
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-52 w-40 object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) :
                  (<div className="absolute inset-0 items-center justify-center bg-linear-to-br from-emerald-200 to-emerald-300">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-1 rounded-full bg-white flex items-center justify-center shadow">
                        <span className="text-xl font-semibold text-emerald-600">
                          {doctor.name?.charAt(0)?.toUpperCase() || "Dr"}
                        </span>
                      </div>
                    </div>
                  </div>
                  )}
              </div>
              <div className="md:flex-1">
                {/* Doctor Title Badge - SAME AS DOCTOR PROFILE */}
                <div className="inline-flex items-center gap-2 mb-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
                  <span>{doctor.title || "Certified Specialist"}</span>
                </div>

                <h2 className="text-lg font-semibold text-slate-900">
                  {doctor.name || "Dr. [Name]"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {doctor.specialty || doctor.qualifications || "Nutrition Specialist"}
                </p>

                {/* Stats Badges - SAME FIELDS AS DOCTOR PROFILE */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                    <Video className="h-4 w-4" />
                    <span>Video Sessions</span>
                  </div>

                  {doctor.experience && (
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                      <span>{doctor.experience} yrs exp.</span>
                    </div>
                  )}

                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
                    <Clock className="h-4 w-4" />
                    <span>{doctor.availability || "Mon–Fri, 9am–5pm"}</span>
                  </div>

                  {doctor.clients && (
                    <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700">
                      <span>{doctor.clients}+ clients</span>
                    </div>
                  )}
                </div>

                {/* Short Bio Preview */}
                {/* {doctor.bio && (
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed max-w-prose">
                    {doctor.bio.replace(/\n/g, ' ').slice(0, 100)}...
                  </p>
                )} */}
              </div>
            </div>
          </section>
        )}

        {/* Upcoming consultations */}
        <section className="mb-10">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            Upcoming Consultations ({upcoming.length})
          </h3>
          <div className="space-y-4">
            {upcoming.map((item) => {
              const meta = formatMeta(item.dateTime);
              return (
                <article
                  key={item._id}
                  className="flex items-stretch rounded-3xl bg-white px-6 py-5 shadow-sm ring-1 ring-emerald-50"
                >
                  <div className="mr-6 flex flex-col items-center justify-center rounded-2xl bg-emerald-50 px-5 py-3 text-emerald-600">
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      {meta.month}
                    </span>
                    <span className="mt-1 text-2xl font-semibold">
                      {meta.day}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="text-sm font-semibold text-slate-900">
                        {item.sessionType}
                      </h4>
                      <button
                        onClick={() => handleCancelConsultation(item._id)}
                        className="rounded-full p-1 text-slate-300 hover:bg-slate-50 hover:text-rose-500"
                        title="Cancel consultation"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {meta.datetimeLabel}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {item.duration} min
                      </span>
                      {item.notes && (
                        <span>{item.notes.slice(0, 50)}...</span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Past consultations */}
        <section>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            Past Consultations ({past.length})
          </h3>
          <div className="space-y-4">
            {past.map((item) => {
              const meta = formatMeta(item.dateTime);
              return (
                <article
                  key={item._id}
                  className="flex items-stretch rounded-3xl bg-white px-6 py-5 shadow-sm ring-1 ring-emerald-50"
                >
                  <div className="mr-6 flex flex-col items-center justify-center rounded-2xl bg-slate-50 px-5 py-3 text-slate-500">
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      {meta.month}
                    </span>
                    <span className="mt-1 text-2xl font-semibold">
                      {meta.day}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <h4 className="text-sm font-semibold text-slate-900">
                      {item.sessionType}
                    </h4>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {meta.datetimeLabel}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {item.duration} min
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
