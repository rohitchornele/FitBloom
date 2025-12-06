
import React, { useEffect, useState } from "react";
import { X, Calendar } from "lucide-react";

const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

export default function BookConsultationModal({ isOpen, onClose, onConfirm }) {
  const [sessionType, setSessionType] = useState("Initial Consultation (60 min)");
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");

  const today = new Date().toISOString().split("T")[0];

  // reset when opened
  useEffect(() => {
    if (isOpen) {
      setSessionType("Initial Consultation (60 min)");
      setDate("");
      setSelectedTime("");
      setNotes("");
    }
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const stop = (e) => e.stopPropagation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !selectedTime) return;

    const bookingDateTime = new Date(`${date}T${selectedTime}:00`);
    const now = new Date();
    if (bookingDateTime <= now) {
      alert("Time must be in Future")
      return;
    }

    const payload = {
      sessionType,
      date,          // ISO string yyyy-mm-dd
      time: selectedTime,
      notes,
    };

    onConfirm?.(payload);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        onClick={stop}
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white px-6 py-6 shadow-2xl sm:px-8 sm:py-7"
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Book a Consultation
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Session type */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Session Type
            </label>
            <select
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-emerald-50/40 px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
            >
              <option>Initial Consultation (60 min)</option>
              <option>Follow-up Session (30 min)</option>
              <option>Meal Planning Session</option>
              <option>Progress Review</option>
            </select>
          </div>

          {/* Preferred date */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Preferred Date
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-emerald-50/40 px-4 py-3">
              <input
                type="date"
                value={date}
                min={today}           // <-- prevents picking earlier dates
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-900 outline-none"
              />
              <Calendar className="h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Preferred time slots */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Preferred Time
            </label>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {TIME_SLOTS.map((time) => {
                const active = selectedTime === time;
                return (
                  <button
                    type="button"
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={
                      active
                        ? "rounded-full bg-emerald-500 px-3 py-2 text-xs font-semibold text-white shadow-sm"
                        : "rounded-full bg-emerald-50 px-3 py-2 text-xs font-medium text-slate-700 ring-1 ring-emerald-100 hover:bg-emerald-100"
                    }
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Notes (optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any specific topics you'd like to discuss?"
              className="w-full rounded-2xl border border-slate-200 bg-emerald-50/40 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
            />
          </div>

          {/* Confirm button */}
          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 hover:-translate-y-1px"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
