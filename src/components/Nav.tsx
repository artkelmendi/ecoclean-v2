"use client";

import NextImage from "next/image";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "/catalog/", label: "Catalog" },
  { href: "#contact", label: "Contact" },
];

export default function Nav({ catalogPage = false }: { catalogPage?: boolean }) {
  const linkTo = (href: string) => href.startsWith("/") ? asset(href) : catalogPage ? asset("/" + href) : href;
  const [light, setLight] = useState(catalogPage); // solid navigation on the catalog page
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const toggleButton = toggle.current;
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    const previousOverflow = document.body.style.overflow;
    const previousMainInert = main?.inert ?? false;
    const previousFooterInert = footer?.inert ?? false;
    document.body.style.overflow = "hidden";
    if (main) main.inert = true;
    if (footer) footer.inert = true;
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const close = () => setOpen(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); close(); }
      if (event.key !== "Tab") return;
      const targets = [toggle.current, ...Array.from(menu.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [])].filter(Boolean) as HTMLElement[];
      const index = targets.indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey && index <= 0) { event.preventDefault(); targets[targets.length - 1]?.focus(); }
      else if (!event.shiftKey && index === targets.length - 1) { event.preventDefault(); targets[0]?.focus(); }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    desktop.addEventListener("change", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      if (main) main.inert = previousMainInert;
      if (footer) footer.inert = previousFooterInert;
      desktop.removeEventListener("change", close);
      document.removeEventListener("keydown", onKey);
      toggleButton?.focus();
    };
  }, [open]);

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
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav aria-label="Main navigation"
          className={`flex w-full max-w-5xl items-center justify-between rounded-full border py-2 pl-5 pr-2 backdrop-blur-xl transition-colors duration-300 ${
            (light || open)
              ? "border-black/[0.07] bg-white/95"
              : "border-white/15 bg-ink/40"
          }`}
        >
          <a href={linkTo("#hero")} className="flex items-center gap-2.5" aria-label="Eco Clean — home" onClick={() => setOpen(false)}>
            <NextImage src={asset("/logos/ec-icon.svg")} alt="" width={40} height={40} className="h-8 w-8" />
            <span
              className={`font-display text-lg font-semibold tracking-tight transition-colors ${
                (light || open) ? "text-ink" : "text-white"
              }`}
            >
              eco clean
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={linkTo(l.href)}
                aria-current={catalogPage && l.href === "/catalog/" ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  (light || open)
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
              href={linkTo("#contact")}
              className="hidden rounded-full bg-brand-deep px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-brand-deep lg:block"
            >
              Get a quote
            </a>
            <button ref={toggle} type="button"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-controls="mobile-menu"
              aria-expanded={open}
              className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-colors lg:hidden ${
                (light || open) ? "text-ink hover:bg-black/5" : "text-white hover:bg-white/10"
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
        <div id="mobile-menu" ref={menu} className="fixed inset-0 z-40 overflow-y-auto bg-ink lg:hidden" aria-label="Mobile navigation">
          <div className="flex min-h-full py-28 flex-col items-center justify-center gap-2">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={linkTo(l.href)}
                aria-current={catalogPage && l.href === "/catalog/" ? "page" : undefined}
                onClick={() => setOpen(false)}
                className="rounded-full px-6 py-3 font-display text-2xl font-semibold text-white/90 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href={linkTo("#contact")}
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-brand-deep px-8 py-4 font-display text-xl font-semibold text-white"
            >
              Get a quote
            </a>
          </div>
        </div>
      )}
    </>
  );
}
