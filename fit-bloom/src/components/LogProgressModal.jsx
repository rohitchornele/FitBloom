import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function LogProgressModal({
  isOpen,
  onClose,
  goalTitle = "Goal",
  unitLabel = "lbs",
  onSave,
}) {
  const [value, setValue] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setValue("");
      setNote("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const stop = (e) => e.stopPropagation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    onSave?.({ value: Number(value), note });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        onClick={stop}
        className="w-full max-w-lg rounded-3xl bg-white px-6 py-6 shadow-2xl sm:px-8 sm:py-7"
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Log Progress for {goalTitle}
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
          {/* Progress value */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Progress ({unitLabel})
            </label>
            <div className="flex items-stretch rounded-2xl border border-emerald-400 bg-emerald-50/40 focus-within:ring-1 focus-within:ring-emerald-400">
              <input
                type="number"
                min="0"
                step="0.1"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder=""
                className="w-full rounded-2xl bg-transparent px-4 py-3 text-sm text-slate-900 outline-none"
              />
              {/* simple dropdown caret for visual parity, non‑functional */}
              <div className="flex items-center px-3 text-slate-400 border-l border-emerald-200">
                <span className="text-xs">▼</span>
              </div>
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Note (optional)
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="How did it go?"
              className="w-full rounded-2xl border border-slate-200 bg-emerald-50/40 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 hover:-translate-y-1px"
          >
            Log Progress
          </button>
        </form>
      </div>
    </div>
  );
}
