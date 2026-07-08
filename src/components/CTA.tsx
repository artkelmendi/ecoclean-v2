"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { asset } from "@/lib/asset";

export default function CTA() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-block",
        { y: 60, scale: 0.97 },
        {
          y: 0,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={root} className="bg-white px-4 pb-24 md:px-6">
      <div className="cta-block relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-brand px-6 py-20 md:rounded-[3rem] md:px-16 md:py-28">
        {/* decorative swirl */}
        <img
          src={asset("/logos/ec-icon.svg")}
          alt=""
          aria-hidden
          className="spin-slow absolute -right-20 -top-20 h-72 w-72 opacity-15 brightness-0 invert md:h-96 md:w-96"
        />

        <div className="relative z-10">
          <h2 className="max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-tight text-white md:text-7xl">
            Let&apos;s make it spotless.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/85">
            Tell us what you run — a hotel, a kitchen, a clinic, a force — and we&apos;ll build
            your textile program around it.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="mailto:info@ecoclean-ks.com"
              className="rounded-full bg-white px-8 py-4 text-center font-display text-lg font-semibold text-brand transition-transform duration-200 hover:scale-[1.03]"
            >
              info@ecoclean-ks.com
            </a>
            <a
              href="tel:+38344000000"
              className="rounded-full border-2 border-white/40 px-8 py-4 text-center font-display text-lg font-semibold text-white transition-colors duration-200 hover:bg-white/10"
            >
              +383 44 000 000
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-semibold text-white/75">
            <span className="flex items-center gap-2">
              <img src={asset("/logos/police.png")} alt="" className="h-7 w-7 rounded-full bg-white/90 object-contain p-0.5" aria-hidden />
              Kosovo Police
            </span>
            <span className="flex items-center gap-2">
              <img src={asset("/logos/fsk.svg")} alt="" className="h-7 w-7 object-contain" aria-hidden />
              Kosovo Security Force
            </span>
            <span>★★★★★ Leading hotels</span>
            <a
              href="https://www.instagram.com/ecoclean_corporation/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
              </svg>
              @ecoclean_corporation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
