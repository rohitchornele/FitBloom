import React, { useEffect, useState } from "react";
import { X, Calendar } from "lucide-react";

export default function CreateGoalModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("");
  const [category, setCategory] = useState("Other");
  const [targetDate, setTargetDate] = useState("");

  // reset when opened
  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setDescription("");
      setTarget("");
      setUnit("");
      setCategory("Other");
      setTargetDate("");
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

    if (!title || !target || !unit) {
      // you can add nicer validation / toasts
      return;
    }

    const data = {
      title: title.trim(),
      description: description.trim(),
      target: Number(target),
      unit: unit.trim(),
      category,
      targetDate,
    };

    onSubmit?.data ? onSubmit.data(data) : onSubmit?.(data);
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
            Create New Goal
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
          {/* Goal title */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Goal Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Drink 8 glasses of water daily"
              className="w-full rounded-2xl border border-slate-200 bg-emerald-50/40 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Why is this goal important to you?"
              className="w-full rounded-2xl border border-slate-200 bg-emerald-50/40 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
            />
          </div>

          {/* Target value + unit */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
                Target Value
              </label>
              <input
                type="number"
                min="0"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="e.g., 8"
                className="w-full rounded-2xl border border-slate-200 bg-emerald-50/40 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
                Unit
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="e.g., glasses, lbs, steps"
                className="w-full rounded-2xl border border-slate-200 bg-emerald-50/40 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              />
            </div>
          </div>

          {/* Category + date */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-emerald-50/40 px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              >
                <option>Other</option>
                <option>Nutrition</option>
                <option>Exercise</option>
                <option>Sleep</option>
                <option>Mindfulness</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
                Target Date
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-emerald-50/40 px-4 py-3">
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-900 outline-none"
                />
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 hover:-translate-y-px"
          >
            Create Goal
          </button>
        </form>
      </div>
    </div>
  );
}
