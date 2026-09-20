"use client";

import NextImage from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { asset } from "@/lib/asset";

const STEPS = [
  { title: "Count", copy: "Count the clean stock on your shelves and send the figures once a week.", img: "/img/hotel-bed.jpg", alt: "Clean hotel bedding" },
  { title: "Calculate", copy: "Eco Clean calculates your next stock delivery using the previous week's delivery, recent usage and the stock you already hold.", img: "/catalog/catalog-12.webp", alt: "Stock management photograph from the Eco Clean catalog" },
  { title: "Review", copy: "Stock levels are reviewed so the quantities supplied continue to match your business needs.", img: "/img/shirts.jpg", alt: "Fresh shirts ready for service" },
  { title: "Deliver", copy: "Sufficient stock is delivered once a week. Express services are also available for emergencies.", img: "/img/hotel-bright.jpg", alt: "Hotel room prepared for guests" },
];

/** One drop follows one complete care cycle. Native scrolling drives the diagram. */
export default function Process() {
  const root = useRef<HTMLElement>(null);
  const drop = useRef<SVGGElement>(null);
  const trail = useRef<SVGCircleElement>(null);
  const number = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = root.current;
      if (!section || !drop.current) return;
      const rows = Array.from(section.querySelectorAll<HTMLElement>(".process-step"));
      let active = -1;
      const update = (progress: number) => {
        const angle = progress * Math.PI * 2 - Math.PI / 2;
        const x = 180 + 132 * Math.cos(angle);
        const y = 180 + 132 * Math.sin(angle);
        // A tiny scale change suggests the drop passing around the far side.
        const scale = 0.9 + 0.1 * Math.sin(angle);
        drop.current?.setAttribute("transform", `translate(${x} ${y}) rotate(${progress * 360}) scale(${scale})`);
        trail.current?.setAttribute("stroke-dashoffset", String(1 - progress));
        const next = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
        if (next === active) return;
        active = next;
        rows.forEach((row, i) => { row.dataset.active = String(i === next); });
        if (number.current) number.current.textContent = `0${next + 1}`;
        if (label.current) label.current.textContent = STEPS[next].title;
      };
      const motion = { progress: 0 };
      rows.forEach((row, i) => {
        ScrollTrigger.create({ trigger: row, start: "top 72%", once: true, onEnter: () => {
          gsap.to(motion, { progress: (i + .25) / STEPS.length, duration: .85, ease: "power3.out", overwrite: true, onUpdate: () => update(motion.progress) });
        } });
      });
      update(0);
      let alive = true;
      document.fonts.ready.then(() => { if (alive) ScrollTrigger.refresh(); });
      return () => {
        alive = false;
        rows.forEach(row => { delete row.dataset.active; });
        drop.current?.setAttribute("transform", "translate(180 48) scale(.8)");
        trail.current?.setAttribute("stroke-dashoffset", "1");
        if (number.current) number.current.textContent = "04";
        if (label.current) label.current.textContent = "The linen cycle";
      };
    }, root);
    return () => mm.revert();
  }, []);

  return (
    <section id="process" ref={root} className="process-section" aria-labelledby="process-title">
      <div className="process-layout page-shell">
        <div className="process-intro">
          <div className="process-heading">
            <h2 id="process-title" className="section-title text-white">The right linen.<br /><span className="text-[#7fb2ff]">Always in reach.</span></h2>
            <p className="process-description">The Streamline system.<br />Stock managed around your business.</p>
          </div>
          <div className="care-cycle" aria-hidden="true">
            <svg className="care-orbit" viewBox="0 0 360 360" fill="none">
              <defs>
                <linearGradient id="orbit-light" x1="60" y1="40" x2="300" y2="310" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a4caff" /><stop offset=".45" stopColor="#488df2" /><stop offset="1" stopColor="#297cf5" stopOpacity=".15" />
                </linearGradient>
                <radialGradient id="drop-body" cx=".28" cy=".22" r=".8">
                  <stop stopColor="#f4fbff" /><stop offset=".27" stopColor="#a3d6ff" /><stop offset=".6" stopColor="#378bef" /><stop offset=".87" stopColor="#12519f" /><stop offset="1" stopColor="#7ab9ff" />
                </radialGradient>
                <linearGradient id="drop-edge" x1="-12" y1="-20" x2="12" y2="14" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity=".9" /><stop offset=".5" stopColor="#8bc8ff" stopOpacity=".2" /><stop offset="1" stopColor="#d9f0ff" stopOpacity=".7" />
                </linearGradient>
              </defs>
              <circle cx="180" cy="180" r="151" stroke="white" strokeOpacity=".035" />
              <circle cx="180" cy="180" r="132" stroke="white" strokeOpacity=".14" strokeWidth=".8" />
              <circle ref={trail} cx="180" cy="180" r="132" pathLength="1" stroke="url(#orbit-light)" strokeWidth="1.5" strokeDasharray="1" strokeDashoffset="1" transform="rotate(-90 180 180)" />
              {STEPS.map((s, i) => {
                const a = (i / STEPS.length) * Math.PI * 2 - Math.PI / 2;
                return <circle key={s.title} cx={180 + 132 * Math.cos(a)} cy={180 + 132 * Math.sin(a)} r="3" fill="#8a9ebc" />;
              })}
              <g ref={drop} className="cycle-drop" transform="translate(180 48) scale(.8)">
                <ellipse cx="1" cy="9" rx="13" ry="14" fill="#020b1b" opacity=".4" />
                <path d="M0-22C-3-14-14-5-14 4a14 14 0 0 0 28 0C14-5 3-14 0-22Z" fill="url(#drop-body)" stroke="url(#drop-edge)" strokeWidth=".9" />
                <path d="M-3-10C-7-5-10 0-9 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity=".65" />
                <path d="M3 14c5-1 8-4 9-8" stroke="#c3e6ff" strokeWidth=".8" strokeLinecap="round" opacity=".8" />
              </g>
            </svg>
            <div className="cycle-center">
              <NextImage src={asset("/logos/ec-icon.svg")} width="34" height="34" alt="" />
              <span ref={number} className="cycle-number">04</span>
              <span ref={label} className="cycle-label">The linen cycle</span>
            </div>
          </div>
          <a href="#contact" className="process-link">Discuss your requirements <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg></a>
        </div>
        <div className="process-steps">
          {STEPS.map((step, i) => (
            <article className="process-step" key={step.title}>
              <div className="process-step-copy">
                <span className="process-number">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
              <div className="process-image">
                <NextImage src={asset(step.img)} alt={step.alt} width="480" height="600" loading="lazy" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
