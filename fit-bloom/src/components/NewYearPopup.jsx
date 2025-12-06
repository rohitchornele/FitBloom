import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "fitbloom_newyear_popup_closed_2026";

export default function NewYearPopup({ isOpen, onClose }) {
  const navigate = useNavigate();

  function setWithExpiry(key, value, ttl) {
  const now = new Date();

  const item = {
    value: value,
    expiry: now.getTime() + ttl, // ttl in milliseconds
  };

  localStorage.setItem(key, JSON.stringify(item));
}


  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  

  const handleClose = () => {
    setWithExpiry(STORAGE_KEY, true, 10 * 60 * 1000);
    // localStorage.setItem(STORAGE_KEY, "true");
    onClose();
  };

  const handlePrimary = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    onClose();
    navigate("/consultations"); // or /signup
  };

  // Stop click bubbling inside card
  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/55 px-4 opacity-0 animate-[fadeIn_180ms_ease-out_forwards]"
      onClick={handleClose}
    >
      <div
        onClick={stopPropagation}
        className="relative max-w-xl w-full md:max-w-2xl rounded-2xl bg-[#fdfcfb] shadow-xl px-6 py-6 md:px-8 md:py-7
                   opacity-0 scale-95 translate-y-2 animate-[popupIn_220ms_ease-out_forwards]"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-slate-700 hover:bg-slate-200"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content layout: stacks on mobile, 2-col on md+ */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          {/* Optional image / visual */}
          <div className="hidden md:block md:w-5/12">
            <div className="overflow-hidden rounded-2xl bg-emerald-100">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop"
                alt="Fresh healthy food"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Text + CTA */}
          <div className="w-full md:w-7/12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <span className="text-base">✨</span>
              <span>New Year 2026 Offer</span>
            </div>

            {/* Headline */}
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.75rem]">
              A Healthier, Happier You is Possible in 2026
            </h2>

            {/* Body */}
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Imagine feeling lighter, energized, and confident — with a way of
              eating that finally works for you. Our certified dietician will
              guide you step-by-step with science based nutrition and
              personalized meal planning.
            </p>

            {/* Offer pill */}
            <div className="mt-4 inline-flex items-start gap-2 rounded-2xl bg-[#e7f6f1] px-4 py-3 text-sm text-emerald-800">
              <span className="text-lg leading-none">🎉</span>
              <p>
                <span className="font-semibold">
                  New Year Bonus: Free goal‑setting consultation
                </span>{" "}
                to map out your 2026 wellness plan.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handlePrimary}
                className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition
                           hover:bg-emerald-600 hover:-translate-y-1px sm:w-auto"
              >
                I&apos;m Ready to Begin
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="text-xs font-medium text-slate-500 hover:text-slate-700 underline-offset-4 hover:underline sm:text-sm"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
