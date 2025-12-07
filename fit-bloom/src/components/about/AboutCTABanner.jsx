
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AboutCtaBanner() {

  const navigate = useNavigate();
  return (
    <section className="bg-[#fbfcf8] py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-[2.5rem] bg-linear-to-r from-emerald-500 to-emerald-400 px-6 py-10 text-center text-white shadow-[0_24px_60px_rgba(4,120,87,0.35)] sm:px-10 lg:py-14">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to Transform Your Health?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-emerald-100 sm:text-base">
            Take the first step towards a healthier, happier you. Schedule your
            consultation today.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => navigate('/consultations')} className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-emerald-600 shadow-sm hover:bg-emerald-50">
              Get Started
              <span className="text-lg leading-none">→</span>
            </button>
            <button onClick={() => navigate('/contact')}  className="inline-flex items-center gap-2 rounded-full border border-emerald-100/70 bg-transparent px-7 py-3 text-sm font-semibold text-white hover:bg-emerald-500/40">
              Have Questions?
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
