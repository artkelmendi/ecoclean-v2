"use client";

import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#difference", label: "The Difference" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [light, setLight] = useState(false); // true once past the dark hero
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setLight(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px" },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          className={`flex w-full max-w-5xl items-center justify-between rounded-full border py-2 pl-5 pr-2 backdrop-blur-xl transition-colors duration-300 ${
            light
              ? "border-black/[0.07] bg-white/80 shadow-[0_12px_40px_-12px_rgba(10,30,70,0.18)]"
              : "border-white/10 bg-white/[0.06]"
          }`}
        >
          <a href="#hero" className="flex items-center gap-2.5" aria-label="Eco Clean — home">
            <img src={asset("/logos/ec-icon.svg")} alt="" className="h-8 w-8" />
            <span
              className={`font-display text-lg font-semibold tracking-tight transition-colors ${
                light ? "text-ink" : "text-white"
              }`}
            >
              eco clean
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  light
                    ? "text-slate-600 hover:bg-black/5 hover:text-ink"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-brand-deep md:block"
            >
              Get a quote
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors md:hidden ${
                light ? "text-ink hover:bg-black/5" : "text-white hover:bg-white/10"
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                {open ? (
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-lg md:hidden">
          <div className="flex h-full flex-col items-center justify-center gap-2">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-full px-6 py-3 font-display text-2xl font-semibold text-white/90 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-brand px-8 py-4 font-display text-xl font-semibold text-white"
            >
              Get a quote
            </a>
          </div>
        </div>
      )}
    </>
  );
}
