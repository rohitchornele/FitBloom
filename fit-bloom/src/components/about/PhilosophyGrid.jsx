
import React from "react";
import { CheckCircle2 } from "lucide-react";

const items = [
  {
    title: "Personalization",
    description:
      "Every body is unique. We create customized plans that fit your lifestyle, preferences, and goals.",
  },
  {
    title: "Science-Based",
    description:
      "Our recommendations are grounded in the latest nutritional research and evidence-based practices.",
  },
  {
    title: "Sustainability",
    description:
      "We focus on lasting lifestyle changes, not quick fixes. Real transformation takes time.",
  },
  {
    title: "Compassion",
    description:
      "We meet you where you are with understanding, patience, and zero judgment.",
  },
];

export default function PhilosophyGrid() {
  return (
    <section className="bg-[#fbfcf8] py-16">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
          Our Philosophy
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
          At FitBloom, optimal health comes from a holistic approach that
          nurtures both body and mind. We empower you to make informed choices
          that support your wellbeing for life.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-6 px-4 lg:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.title}
            className="rounded-3xl bg-white px-6 py-6 text-left shadow-sm ring-1 ring-emerald-50"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
