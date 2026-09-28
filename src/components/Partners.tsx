"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

const partners = [
  { name: "Hilton", file: "/logos/partners/hilton.png", style: "hilton", width: 1276, height: 591 },
  { name: "Four Points by Sheraton", file: "/logos/partners/four-points.png", style: "four-points", width: 600, height: 600 },
  { name: "Grand Hotel Belushi", file: "/logos/partners/belushi.png", style: "belushi", width: 300, height: 300 },
  { name: "Policia e Kosovës", file: "/logos/police.png", style: "institution", width: 80, height: 88 },
  { name: "Forca e Sigurisë së Kosovës — FSK", file: "/logos/fsk.svg", style: "institution", width: 80, height: 88 },
];

export default function Partners() {
  const section = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(false);
  useEffect(() => {
    let visible = false;
    const update = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    if (section.current) observer.observe(section.current);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  return (
    <section ref={section} id="partners" className="partners-section" aria-labelledby="partners-title" data-paused={paused || !active}>
      <div className="page-shell">
        <div className="partners-heading">
          <h2 id="partners-title" className="section-title">Our partners.</h2>
          <button className="partners-pause" type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Play partner carousel" : "Pause partner carousel"} aria-pressed={paused}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">{paused ? <path d="m4 2 8 5-8 5Z" /> : <path d="M3 2h2v10H3zm6 0h2v10H9z" />}</svg>
          </button>
        </div>
        <div className="partners-window">
        <div className="partners-track">
        {[0, 1].map(copy => <ul key={copy} className="partners-list" aria-label={copy === 0 ? "Our partners" : undefined} aria-hidden={copy === 1 ? true : undefined}>
          {[...partners, ...partners].map((partner, index) => (
            <li className="partner-entry" key={`${partner.name}-${index}`} aria-hidden={index >= partners.length ? true : undefined}>
              <div className={`partner-logo partner-logo--${partner.style}`}>
                <Image src={asset(partner.file)} alt={partner.name} width={partner.width} height={partner.height} />
              </div>
            </li>
          ))}
        </ul>)}
        </div>
        </div>
      </div>
    </section>
  );
}
