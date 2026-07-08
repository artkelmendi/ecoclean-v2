"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { asset } from "@/lib/asset";

type Service = {
  n: string;
  title: string;
  tag: string;
  points: string[];
  img: string;
  alt: string;
  accent: string;
  bg: string;
  dark?: boolean;
};

const SERVICES: Service[] = [
  {
    n: "01",
    title: "Accommodation",
    tag: "Five-star linen, every single night.",
    points: ["Bed linen, duvets & pillows", "Towels, bathrobes & spa textiles", "Rental linen programs for hotels"],
    img: "/img/hotel-bed.jpg",
    alt: "Crisp white hotel bedding",
    accent: "#56b64e",
    bg: "#ecf7ea",
  },
  {
    n: "02",
    title: "Restaurant & Catering",
    tag: "Tables that look as good as the food.",
    points: ["Tablecloths & napkins", "Chef whites & kitchen wear", "Event & banquet textiles"],
    img: "/img/chef.jpg",
    alt: "Chef plating a dish in a professional kitchen",
    accent: "#f49b4a",
    bg: "#fdf2e5",
  },
  {
    n: "03",
    title: "Health Care",
    tag: "Hygiene you can stake a diagnosis on.",
    points: ["Thermal & chemo-thermal disinfection", "Scrubs, gowns & patient linen", "Segregated clean/soiled logistics"],
    img: "/img/healthcare.jpg",
    alt: "Medical team in clean surgical scrubs",
    accent: "#23c1ef",
    bg: "#e6f7fd",
  },
  {
    n: "04",
    title: "Industrial & Uniforms",
    tag: "Uniform programs for institutions that never stop.",
    points: ["Kosovo Police & KSF uniform care", "Workwear & corporate uniforms", "Pressed, tagged & delivered per wearer"],
    img: "/img/shirts.jpg",
    alt: "Pressed white shirts on hangers",
    accent: "#8b95a5",
    bg: "#0d1526",
    dark: true,
  },
];

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.94,
          opacity: 0.85,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top+=15%",
            scrub: true,
          },
        });
      });
    }, root);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section id="services" ref={root} className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-16 text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-xs font-bold tracking-[0.22em] text-brand">
            WHAT WE CLEAN
          </p>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold tracking-tight text-ink md:text-6xl">
            Four industries. One standard.
          </h2>
        </div>

        <div>
          {SERVICES.map((s, i) => (
            <div key={s.n} className="sticky pb-8" style={{ top: `calc(9vh + ${i * 16}px)` }}>
              <article
                className="service-card grid min-h-[66vh] origin-top overflow-hidden rounded-[2rem] md:grid-cols-2 md:rounded-[2.5rem]"
                style={{ background: s.bg, willChange: "transform" }}
              >
                <div className={`flex flex-col justify-between p-8 md:p-12 ${s.dark ? "text-white" : "text-ink"}`}>
                  <div>
                    <span
                      className="font-display text-sm font-bold tracking-[0.3em]"
                      style={{ color: s.accent }}
                    >
                      {s.n}
                    </span>
                    <h3 className="mt-4 break-words font-display text-3xl font-bold tracking-tight lg:text-5xl">
                      {s.title}
                    </h3>
                    <p className={`mt-4 max-w-sm text-lg ${s.dark ? "text-white/60" : "text-slate-600"}`}>
                      {s.tag}
                    </p>
                  </div>

                  <ul className="mt-10 space-y-3.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                          style={{ background: `${s.accent}22`, color: s.accent }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" aria-hidden>
                            <path d="M4 12.5l5.5 5.5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className={`font-medium ${s.dark ? "text-white/85" : "text-slate-700"}`}>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative min-h-[260px]">
                  <img
                    src={asset(s.img)}
                    alt={s.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(135deg, ${s.accent}33 0%, transparent 45%)` }}
                  />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
