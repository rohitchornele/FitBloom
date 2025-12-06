
import React from "react";

export default function AboutHero() {
  return (
    <section className="bg-linear-to-br from-emerald-50 via-white to-rose-50">
      <div className="mx-auto flex min-h-[260px] max-w-6xl items-center justify-center px-6 py-16 text-center lg:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-500">
            About
          </p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.6rem]">
            Meet Your Guide to{" "}
            <span className="text-emerald-500">Better Health</span>
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            Dedicated to helping you discover the power of nutrition and
            achieve lasting wellness.
          </p>
        </div>
      </div>
    </section>
  );
}
