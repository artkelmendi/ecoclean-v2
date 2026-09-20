"use client";

import { useLayoutEffect } from "react";
import { gsap } from "@/lib/gsap";

export default function HeroEntrance() {
  useLayoutEffect(() => {
    let timeline: gsap.core.Timeline | undefined;
    let played = false;
    const run = () => {
      if (played) return;
      played = true;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-hero-enter]", { opacity: 1, y: 0, x: 0, clipPath: "none", filter: "none" });
        gsap.set(".hero-video", { opacity: .68, filter: "none" });
        return;
      }
      timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .to(".hero-video", { opacity: .68, filter: "brightness(1)", duration: 1.1 }, 0)
        .to(".hero-location", { opacity: 1, y: 0, filter: "blur(0px)", duration: .48 }, .12)
        .to(".hero-title-line", { opacity: 1, clipPath: "inset(0 0 0% 0)", y: 0, duration: .8, stagger: .12 }, .12)
        .to(".hero-bottom", { opacity: 1, y: 0, duration: .55 }, .48)
        .fromTo(".hero-actions > *", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .38, stagger: .1 }, .62)
        .to(".hero-scroll", { opacity: 1, x: 0, duration: .4 }, .72);
    };
    window.addEventListener("ec:intro-complete", run, { once: true });
    const frame = !document.querySelector(".brand-intro") ? requestAnimationFrame(run) : 0;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const reduce = () => { if (preference.matches) timeline?.progress(1); };
    preference.addEventListener("change", reduce);
    return () => { cancelAnimationFrame(frame); preference.removeEventListener("change", reduce); window.removeEventListener("ec:intro-complete", run); timeline?.kill(); };
  }, []);
  return null;
}
