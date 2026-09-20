"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Section-specific choreography. Content stays readable without JavaScript. */
export default function PageMotion() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add({ desktop: "(min-width: 768px)", motion: "(prefers-reduced-motion: no-preference)" }, context => {
      if (!context.conditions?.motion) return;
      const desktop = context.conditions.desktop;
      // Scroll only triggers an entrance; it never controls playback or reverses it.
      // Keep triggers registered until cleanup: killing passed triggers during
      // refresh can invalidate GSAP's iteration when restoring a deep scroll.
      const scroll = (trigger: Element | string, start = "top 88%", end?: string) => ({ trigger, start, end, toggleActions: "play none none none" });
      gsap.utils.toArray<HTMLElement>(".services-heading, .process-heading, .textile-copy, .about-heading, .catalog-teaser-copy").forEach(block => {
        gsap.fromTo(block, { opacity: 0, y: 26, clipPath: "inset(0 0 12% 0)" }, { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: .8, ease: "power3.out", scrollTrigger: scroll(block) });
      });
      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, i) => {
        const visual = card.querySelector(".service-image");
        const photo = visual?.querySelector("img");
        if (!visual || !photo) return;
        const timeline = gsap.timeline({ defaults: { duration: .85, ease: "power3.out" }, scrollTrigger: scroll(card, "top 86%") });
        timeline.fromTo(card.querySelector(".service-copy"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .65 }, .1);
        timeline.fromTo(visual, { clipPath: `inset(0 ${i % 2 ? 0 : 14}% 0 ${i % 2 ? 14 : 0}% round 16px)` }, { clipPath: "inset(0 0% 0 0% round 0px)", ease: "power2.out" }, 0)
          .fromTo(photo, { scale: 1.12, rotation: i % 2 ? 1.2 : -1.2 }, { scale: 1, rotation: 0, ease: "power2.out" }, 0)
          .fromTo(card.querySelectorAll("li"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .4, stagger: .07 }, .25);
      });
      gsap.utils.toArray<HTMLElement>(".process-image").forEach(frame => {
        gsap.fromTo(frame, { clipPath: "inset(6% 6% 6% 6% round 32px)" }, { clipPath: "inset(0% 0% 0% 0% round 8px)", ease: "none", scrollTrigger: scroll(frame) });
      });
      gsap.utils.toArray<HTMLElement>(".process-step-copy, .value-item, #contact .section-title").forEach(block => {
        gsap.fromTo(block, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .65, ease: "power3.out", scrollTrigger: scroll(block) });
      });
      gsap.fromTo(".textile-visual", { borderRadius: desktop ? "42% 42% 4% 4%" : "24% 24% 3% 3%" }, { borderRadius: "2% 2% 2% 2%", ease: "none", scrollTrigger: scroll(".textile-section", "top 90%", "center 55%") });
      gsap.fromTo(".textile-visual img", { scale: 1.08 }, { scale: 1, scrollTrigger: scroll(".textile-section", "top 90%", "center 50%") });
      gsap.fromTo(".value-rule", { scaleX: .08 }, { scaleX: 1, stagger: .18, ease: "power2.out", scrollTrigger: scroll(".values-grid", "top 90%", "bottom 70%") });
      gsap.fromTo(".value-item h3", { color: "#78879b" }, { color: "#1857c4", stagger: .18, scrollTrigger: scroll(".values-grid", "top 90%", "bottom 70%") });
      gsap.fromTo(".catalog-cover", { rotationY: desktop ? -18 : -8, rotationZ: -5, scale: .96, transformPerspective: 1000 }, { rotationY: 0, rotationZ: 0, scale: 1, ease: "none", scrollTrigger: scroll(".catalog-teaser", "top 95%", "center 50%") });
      gsap.fromTo(".cta-mark", { rotation: -38, scale: .82 }, { rotation: 0, scale: 1, ease: "none", scrollTrigger: scroll("#contact", "top 90%", "center 55%") });
      gsap.fromTo(".contact-details", { clipPath: "inset(0 12% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "none", scrollTrigger: scroll("#contact", "top 65%", "bottom 95%") });
      gsap.fromTo(".footer-rule", { borderTopColor: "rgba(255,255,255,0)" }, { borderTopColor: "rgba(255,255,255,.3)", scrollTrigger: scroll("footer", "top bottom", "bottom bottom") });
    });
    let alive = true;
    document.fonts.ready.then(() => { if (alive) ScrollTrigger.refresh(); });
    return () => { alive = false; mm.revert(); };
  }, []);
  return null;
}
