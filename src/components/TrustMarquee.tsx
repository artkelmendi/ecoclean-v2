"use client";

import { asset } from "@/lib/asset";

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l2.9 6.6 7.1.7-5.4 4.8 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.3l7.1-.7L12 2z" />
    </svg>
  );
}

function Items() {
  return (
    <>
      <div className="mx-8 flex items-center gap-3">
        <img src={asset("/logos/police.png")} alt="Kosovo Police" className="h-12 w-12 object-contain" />
        <div className="leading-tight">
          <p className="font-display text-sm font-bold text-ink">Kosovo Police</p>
          <p className="text-xs text-slate-500">Policia e Kosovës · uniform program</p>
        </div>
      </div>

      <span className="self-center text-slate-300">·</span>

      <div className="mx-8 flex items-center gap-3">
        <img src={asset("/logos/fsk.svg")} alt="Kosovo Security Force" className="h-12 w-12 object-contain" />
        <div className="leading-tight">
          <p className="font-display text-sm font-bold text-ink">Kosovo Security Force</p>
          <p className="text-xs text-slate-500">FSK · security textile services</p>
        </div>
      </div>

      <span className="self-center text-slate-300">·</span>

      <div className="mx-8 flex items-center gap-3">
        <span className="flex text-amber-400" aria-hidden>
          <Star /><Star /><Star /><Star /><Star />
        </span>
        <div className="leading-tight">
          <p className="font-display text-sm font-bold text-ink">Leading 5-star hotels</p>
          <p className="text-xs text-slate-500">linen &amp; guest textiles, nationwide</p>
        </div>
      </div>

      <span className="self-center text-slate-300">·</span>

      <div className="mx-8 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-acc-cyan/15 text-acc-cyan">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M12 4v16M4 12h16" strokeLinecap="round" />
          </svg>
        </span>
        <div className="leading-tight">
          <p className="font-display text-sm font-bold text-ink">Healthcare clinics</p>
          <p className="text-xs text-slate-500">medical-grade hygiene</p>
        </div>
      </div>

      <span className="self-center text-slate-300">·</span>

      <div className="mx-8 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-acc-orange/15 text-acc-orange">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M4 19h16M6 19V9a6 6 0 0 1 12 0v10M9 5.5V4m6 1.5V4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="leading-tight">
          <p className="font-display text-sm font-bold text-ink">Restaurants &amp; catering</p>
          <p className="text-xs text-slate-500">table linen &amp; chef wear</p>
        </div>
      </div>

      <span className="self-center text-slate-300">·</span>
    </>
  );
}

export default function TrustMarquee() {
  return (
    <section className="border-b border-slate-100 bg-white py-10">
      <p className="mb-8 text-center text-xs font-bold tracking-[0.28em] text-slate-400">
        TRUSTED WHERE HYGIENE IS NON-NEGOTIABLE
      </p>
      <div
        className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        aria-label="Clients: Kosovo Police, Kosovo Security Force, leading 5-star hotels, healthcare clinics, restaurants and catering"
      >
        <div className="marquee-track">
          <Items />
          <Items />
        </div>
      </div>
    </section>
  );
}
