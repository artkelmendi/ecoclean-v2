"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

const clients = [
  { name: "Kosovo Police", detail: "Policia e Kosovës", logo: "/logos/police.png" },
  { name: "Kosovo Security Force", detail: "FSK", logo: "/logos/fsk.svg" },
  { name: "Hotels", detail: "Linen & guest textiles", icon: "M4 25V8m24 17V14M4 21h24M4 14h24v7M8 14v-4h7v4M4 25v-4m24 4v-4" },
  { name: "Healthcare", detail: "Linen & uniforms", icon: "M12 4h8v8h8v8h-8v8h-8v-8H4v-8h8V4Z" },
  { name: "Restaurants & catering", detail: "Table linen & chefwear", icon: "M4 22h24M6 22a10 10 0 0 1 20 0M16 12V8m-2 0h4M3 26h26" },
];

export default function TrustMarquee() {
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
    <section ref={section} className="trust-section trust-tape" aria-label="Trusted by" data-paused={paused || !active}>
      <div className="page-shell trust-tape-heading">
        <p>Trusted where hygiene matters.</p>
        <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Play trust tape" : "Pause trust tape"} aria-pressed={paused}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">{paused ? <path d="m4 2 8 5-8 5Z" /> : <path d="M3 2h2v10H3zm6 0h2v10H9z" />}</svg>
        </button>
      </div>
      <div className="trust-tape-window">
        <div className="trust-tape-track">
          {[0, 1].map(copy => <div className="trust-tape-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {clients.map(client => <div className="trust-client" key={client.name}>
              {client.logo ? <Image src={asset(client.logo)} alt="" width={44} height={48} /> : <svg className="trust-line-mark" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={client.icon} /></svg>}
              <div><strong>{client.name}</strong><span>{client.detail}</span></div>
            </div>)}
          </div>)}
        </div>
      </div>
    </section>
  );
}
