"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const STATS = [
  { value: 300, suffix: "+", label: "tonnes of textiles washed monthly" },
  { value: 24, suffix: "h", label: "standard door-to-door turnaround" },
  { value: 4, suffix: "", label: "industries served to one hygiene standard" },
  { value: 365, suffix: "", label: "days a year — we never close" },
];

const ECO = [
  {
    title: "Biodegradable chemistry",
    copy: "Certified detergents that break down clean — tough on stains, gentle on rivers.",
    icon: (
      <path d="M12 3C7 8 4 11 4 15a8 8 0 0 0 16 0c0-4-3-7-8-12zM12 21v-8m0 0l-3-3m3 3l3-3" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Water recycling",
    copy: "Closed-loop systems reuse rinse water across cycles, cutting fresh water demand.",
    icon: (
      <path d="M4 14a8 8 0 0 1 14-5.3M20 10a8 8 0 0 1-14 5.3M18 4v5h-5M6 20v-5h5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Low-energy machines",
    copy: "Modern European drums that wash more with less heat, less power, less waste.",
    icon: (
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = Number(el.dataset.value ?? 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".eco-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-10 border-b border-slate-100 pb-16 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-5xl font-bold tracking-tight text-ink md:text-6xl">
                <span className="stat-num" data-value={s.value}>
                  0
                </span>
                <span className="text-brand">{s.suffix}</span>
              </p>
              <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
              The <span className="text-acc-green">eco</span> in Eco Clean is not decoration.
            </h2>
            <p className="max-w-sm text-slate-500">
              Industrial volume doesn&apos;t have to cost the planet. Ours doesn&apos;t.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {ECO.map((e) => (
              <div
                key={e.title}
                className="eco-card rounded-[1.75rem] border border-acc-green/15 bg-acc-green/[0.06] p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-acc-green/15 text-acc-green">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    {e.icon}
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">{e.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{e.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
