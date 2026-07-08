"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { asset } from "@/lib/asset";

type Step = {
  n: string;
  title: string;
  copy: string;
  img?: string;
  alt?: string;
  video?: boolean;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Collect",
    copy: "Scheduled pick-up from your hotel, kitchen, clinic or base — sealed, logged and barcoded at your door.",
    img: "/img/hotel-night.jpg",
    alt: "Luxury hotel at night",
  },
  {
    n: "02",
    title: "Sort & Tag",
    copy: "Every batch is separated by fabric, colour and hygiene class. Nothing of yours ever mixes with anyone else's.",
    img: "/img/gloves-heart.jpg",
    alt: "Gloved hands forming a heart",
  },
  {
    n: "03",
    title: "Wash",
    copy: "Industrial drums, calibrated chemistry, thermal disinfection. This is the inside of one — in motion.",
    video: true,
  },
  {
    n: "04",
    title: "Press & Finish",
    copy: "Roller-ironed flatwork, hand-finished garments, crisp folds. Every piece inspected before it leaves.",
    img: "/img/shirts.jpg",
    alt: "Pressed white shirts on hangers",
  },
  {
    n: "05",
    title: "Deliver",
    copy: "Back to your shelves in 24 hours — wrapped, counted and ready for service.",
    img: "/img/hotel-bright.jpg",
    alt: "Bright, freshly made hotel room",
  },
];

export default function Process() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const t = track.current;
      if (!t) return;

      const getAmount = () => t.scrollWidth - window.innerWidth;

      gsap.to(t, {
        x: () => -getAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${getAmount()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.width = `${self.progress * 100}%`;
          },
        },
      });
    }, root);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section id="process" ref={root} className="relative overflow-hidden bg-ink text-white">
      <div className="flex h-[100svh] flex-col justify-center">
        <div className="mx-auto mb-10 w-full max-w-6xl px-6 md:px-10">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-bold tracking-[0.22em] text-white/85">
            THE 24-HOUR LOOP
          </p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
              Door to door in <span className="text-brand">24h.</span>
            </h2>
            <div className="hidden h-1.5 w-56 overflow-hidden rounded-full bg-white/10 md:block">
              <div ref={bar} className="h-full w-0 rounded-full bg-brand" />
            </div>
          </div>
        </div>

        <div ref={track} className="flex w-max gap-5 px-6 md:gap-8 md:px-10" style={{ willChange: "transform" }}>
          {STEPS.map((s) => (
            <article
              key={s.n}
              className="flex w-[82vw] max-w-[540px] shrink-0 flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-ink-soft md:w-[40vw]"
            >
              <div className="relative h-56 md:h-72">
                {s.video ? (
                  <>
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      src={asset("/media/drum-mobile.mp4")}
                      poster={asset("/media/drum-poster.jpg")}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                    <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-ink/70 px-3.5 py-1.5 text-[11px] font-bold tracking-widest text-white backdrop-blur">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                      INSIDE OUR DRUM
                    </span>
                  </>
                ) : (
                  <img
                    src={asset(s.img!)}
                    alt={s.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-soft via-transparent to-transparent" />
              </div>

              <div className="flex grow flex-col p-7 md:p-9">
                <span className="font-display text-5xl font-bold text-white/[0.13] md:text-6xl">{s.n}</span>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-white/60">{s.copy}</p>
              </div>
            </article>
          ))}

          {/* closing slide */}
          <article className="flex w-[82vw] max-w-[540px] shrink-0 items-center justify-center rounded-[1.75rem] bg-brand p-10 md:w-[40vw]">
            <div className="text-center">
              <p className="font-display text-6xl font-bold tracking-tight md:text-7xl">24h</p>
              <p className="mt-3 font-display text-2xl font-semibold text-white/90">
                Door to door. Every day.
              </p>
              <a
                href="#contact"
                className="mt-8 inline-block rounded-full bg-white px-7 py-3.5 font-display font-semibold text-brand transition-transform duration-200 hover:scale-[1.03]"
              >
                Schedule a pick-up
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
