"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { asset } from "@/lib/asset";
import { INTRO_DONE_EVENT } from "./Preloader";

const HEADLINE = ["The", "standard", "of", "clean."];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // lighter file on small screens
    const v = video.current;
    if (v && window.matchMedia("(max-width: 768px)").matches) {
      v.src = asset("/media/drum-mobile.mp4");
      v.load();
      v.play().catch(() => {});
    }
  }, []);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // capture real nodes once — content stays visible if any of this ever fails
    const words = Array.from(el.querySelectorAll<HTMLElement>(".word-mask > span"));
    const fades = Array.from(el.querySelectorAll<HTMLElement>(".hero-fade"));
    if (!words.length) return;

    gsap.set(words, { yPercent: 115 });
    gsap.set(fades, { opacity: 0, y: 24 });

    let revealed = false;
    let tl: gsap.core.Timeline | undefined;

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      tl = gsap
        .timeline()
        .to(words, { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.09 })
        .to(fades, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1 }, "-=0.5");
    };

    window.addEventListener(INTRO_DONE_EVENT, reveal, { once: true });
    const fallback = setTimeout(reveal, 4000);

    return () => {
      window.removeEventListener(INTRO_DONE_EVENT, reveal);
      clearTimeout(fallback);
      tl?.kill();
      gsap.set(words, { clearProps: "all" });
      gsap.set(fades, { clearProps: "all" });
    };
  }, []);

  return (
    <section id="hero" ref={root} className="relative min-h-[100svh] overflow-hidden bg-ink">
      <video
        ref={video}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        src={asset("/media/drum-hero.mp4")}
        poster={asset("/media/drum-poster.jpg")}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink" />
      <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-brand/25 blur-[140px]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-24 pt-40 md:px-10">
        <p className="hero-fade mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-bold tracking-[0.22em] text-white/85 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          INDUSTRIAL LAUNDRY · KOSOVO
        </p>

        <h1 className="max-w-5xl font-display text-[clamp(3.2rem,9.5vw,7.5rem)] font-bold leading-[0.98] tracking-[-0.03em] text-white">
          {HEADLINE.map((w) => (
            <span key={w} className="word-mask mr-[0.22em]">
              <span>{w}</span>
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="hero-fade max-w-md text-lg leading-relaxed text-white/70">
            Trusted every day by the <strong className="text-white">Kosovo Police</strong>, the{" "}
            <strong className="text-white">Kosovo Security Force</strong> and the country&apos;s
            finest hotels.
          </p>

          <div className="hero-fade flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="whitespace-nowrap rounded-full bg-brand px-7 py-4 text-center font-display text-base font-semibold text-white transition-colors duration-200 hover:bg-brand-deep"
            >
              Get a quote
            </a>
            <a
              href="#difference"
              className="whitespace-nowrap rounded-full border border-white/25 px-7 py-4 text-center font-display text-base font-semibold text-white/90 backdrop-blur-sm transition-colors duration-200 hover:bg-white/10"
            >
              See the difference
            </a>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block" aria-hidden>
        <div className="flex h-10 w-6 justify-center rounded-full border border-white/25 pt-2">
          <span className="scroll-drip h-2 w-1 rounded-full bg-white/70" />
        </div>
      </div>
    </section>
  );
}
