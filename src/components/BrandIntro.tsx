"use client";

import ArrowIcon from "@/components/ArrowIcon";

import { useCallback, useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { asset } from "@/lib/asset";
import { INTRO_SESSION_KEY } from "@/lib/intro";

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
    try { seen = sessionStorage.getItem(INTRO_SESSION_KEY) === "seen"; } catch {}
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (document.documentElement.dataset.brandIntro === "skip" || seen || preference.matches || location.hash) { finish(); return; }
    try { sessionStorage.setItem(INTRO_SESSION_KEY, "seen"); } catch {}
    const dismissed = document.querySelector(".brand-intro")?.getAnimations().some(animation => animation instanceof CSSAnimation && animation.animationName === "intro-dismiss" && animation.playState === "finished");
    if (dismissed) { finish(); return; }
    const timer = window.setTimeout(finish, 2300);
    const skip = (event: KeyboardEvent) => { if (event.key === "Escape") finish(); };
    const reduce = () => { if (preference.matches) finish(); };
    window.addEventListener("keydown", skip);
    preference.addEventListener("change", reduce);
    return () => { clearTimeout(timer); window.removeEventListener("keydown", skip); preference.removeEventListener("change", reduce); };
  }, [finish]);
  useEffect(() => {
    if (!visible || document.documentElement.dataset.brandIntro === "skip") return;
    const previousRootOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    const elements = Array.from(document.querySelectorAll<HTMLElement>("header, main, footer, .skip-link"));
    const previous = elements.map(el => el.inert);
    elements.forEach(el => { el.inert = true; });
    return () => {
      document.documentElement.style.overflow = previousRootOverflow;
      document.body.style.overflow = previousBodyOverflow;
      elements.forEach((el, i) => { el.inert = previous[i]; });
    };
  }, [visible]);
  if (!visible) return null;
  return <div className="brand-intro"
    onAnimationStart={e => { if (e.animationName === "intro-panel-top") window.dispatchEvent(new Event("ec:intro-reveal")); }}
    onAnimationEnd={e => { if (e.animationName === "intro-dismiss") finish(); }}>
    <div className="intro-signature" aria-hidden="true">
      <NextImage className="intro-mark" src={asset("/logos/ec-icon.svg")} width={96} height={100} alt="" priority />
      <div className="intro-wordmark-frame"><NextImage className="intro-wordmark" src={asset("/logos/ec-wordmark.svg")} width={300} height={81} alt="" priority /></div>
      <span className="intro-seam" />
      <span className="intro-caption">Textile &amp; laundry care</span>
    </div>
    <button type="button" className="intro-skip" onClick={finish}>Skip intro <span aria-hidden="true"><ArrowIcon /></span></button>
  </div>;
}
