"use client";

import ArrowIcon from "@/components/ArrowIcon";

import { useCallback, useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { asset } from "@/lib/asset";

export default function BrandIntro() {
  const [visible, setVisible] = useState(true);
  const completed = useRef(false);
  const finish = useCallback(() => {
    if (completed.current) return;
    completed.current = true;
    setVisible(false);
    window.dispatchEvent(new Event("ec:intro-complete"));
  }, []);
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("ec:intro:v2") === "seen"; } catch {}
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (seen || preference.matches || location.hash) { finish(); return; }
    try { sessionStorage.setItem("ec:intro:v2", "seen"); } catch {}
    const timer = window.setTimeout(finish, 1800);
    const skip = (event: KeyboardEvent) => { if (event.key === "Escape") finish(); };
    const reduce = () => { if (preference.matches) finish(); };
    window.addEventListener("keydown", skip);
    preference.addEventListener("change", reduce);
    return () => { clearTimeout(timer); window.removeEventListener("keydown", skip); preference.removeEventListener("change", reduce); };
  }, [finish]);
  useEffect(() => {
    if (!visible) return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("header, main, footer, .skip-link"));
    const previous = elements.map(el => el.inert);
    elements.forEach(el => { el.inert = true; });
    return () => { elements.forEach((el, i) => { el.inert = previous[i]; }); };
  }, [visible]);
  if (!visible) return null;
  return <div className="brand-intro" onAnimationEnd={e => { if (e.animationName === "intro-open") finish(); }}>
    <div className="intro-signature" aria-hidden="true"><NextImage className="intro-mark" src={asset("/logos/ec-icon.svg")} width={72} height={72} alt="" priority /><div className="intro-word">eco clean<span>eco with us.</span></div><span className="intro-seam" /></div>
    <button type="button" className="intro-skip" onClick={finish}>Skip intro <span aria-hidden="true"><ArrowIcon /></span></button>
  </div>;
}
