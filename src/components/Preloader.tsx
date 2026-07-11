"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/** Center of the icon's viewBox — both halves rotate around this point. */
const ORIGIN = "998.47 612.41";

export const INTRO_DONE_EVENT = "ec:intro-done";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const finish = () => {
      window.dispatchEvent(new Event(INTRO_DONE_EVENT));
      setGone(true);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });

      tl.set(".pre-word", { yPercent: 120 })
        .fromTo(
          "#half-a",
          { svgOrigin: ORIGIN, rotation: -160, opacity: 0 },
          { rotation: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
        )
        .fromTo(
          "#half-b",
          { svgOrigin: ORIGIN, rotation: 160, opacity: 0 },
          { rotation: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
          "<0.12",
        )
        // one full drum spin once assembled
        .to("#pre-mark", {
          svgOrigin: ORIGIN,
          rotation: 360,
          duration: 0.9,
          ease: "power2.inOut",
        })
        .to(".pre-word", { yPercent: 0, duration: 0.5, ease: "power3.out", stagger: 0.07 }, "-=0.45")
        .to(root.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.8,
          ease: "power4.inOut",
          delay: 0.35,
        });
    }, root);

    return () => ctx.revert();
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-hidden
    >
      {/* The mark spins beyond its tight viewBox, so its overflow must remain visible. */}
      <svg
        viewBox="933.87 545.27 129.19 134.28"
        className="w-24 overflow-visible md:w-28"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="pre-mark">
          <path
            id="half-a"
            transform="matrix(1,0,0,-1,1029.8301,658.4111)"
            d="M0 0C-23.313 0-42.213 18.899-42.213 42.212-42.213 48.802-40.701 55.038-38.008 60.595H-89.517-94.509C-95.036 58.083-95.419 55.519-95.659 52.913-95.851 50.837-95.962 48.738-95.962 46.612-95.962 9.197-65.631-21.134-28.216-21.134-2.885-21.134 19.184-7.222 30.807 13.369 23.104 5.146 12.156 0 0 0"
            fill="#297cf5"
          />
          <path
            id="half-b"
            transform="matrix(1,0,0,-1,1002.0454,545.2686)"
            d="M0 0C-.042 0-.083 .003-.125 .003-.349 .003-.57-.011-.794-.014-1.405-.02-2.013-.035-2.62-.06-3.082-.078-3.542-.103-4.001-.131-4.606-.169-5.209-.213-5.81-.268-6.05-.289-6.291-.307-6.53-.331-29.221-2.563-48.621-15.993-59.14-35.02-57.245-33.235-55.171-31.64-52.953-30.255-48.365-27.391-43.149-25.439-37.555-24.664-35.77-24.416-33.949-24.282-32.096-24.282-18.487-24.282-6.488-31.17 .605-41.65 3.306-45.639 5.285-50.151 6.382-54.999 7.019-57.813 7.366-60.737 7.366-63.744 7.366-70.223 5.794-76.332 3.027-81.725H57.348C59.72-75.229 61.017-68.218 61.017-60.905 61.017-27.308 33.71-.067 0 0"
            fill="#297cf5"
          />
        </g>
      </svg>

      <div className="mt-6 flex items-baseline gap-2 overflow-hidden font-display text-3xl font-semibold tracking-tight text-neutral-400">
        <span className="pre-word inline-block">eco</span>
        <span className="pre-word inline-block">clean</span>
      </div>
      <div className="mt-1 overflow-hidden text-[11px] font-semibold tracking-[0.45em] text-neutral-300">
        <span className="pre-word inline-block">WITH&nbsp;US</span>
      </div>
    </div>
  );
}
