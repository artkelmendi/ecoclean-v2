"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

export default function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 768px)");
    let visible = false;
    const sync = () => {
      if (reduced.matches || userPaused.current || !visible || document.hidden) {
        el.pause();
        return;
      }
      const source = asset(mobile.matches ? "/media/drum-pingpong-mobile.mp4" : "/media/drum-pingpong.mp4");
      if (el.getAttribute("src") !== source) el.src = source;
      el.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(el);
    reduced.addEventListener("change", sync);
    mobile.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", sync);
      mobile.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      el.pause();
    };
  }, []);

  return (
    <>
      <video ref={video} className="hero-video" poster={asset("/media/drum-poster.jpg")} muted loop playsInline preload="none" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      <button type="button" className="video-toggle" aria-label={playing ? "Pause background video" : "Play background video"}
        onClick={() => {
          const el = video.current;
          if (!el) return;
          userPaused.current = !el.paused;
          if (userPaused.current) el.pause();
          else {
            if (!el.getAttribute("src")) el.src = asset(window.matchMedia("(max-width: 768px)").matches ? "/media/drum-pingpong-mobile.mp4" : "/media/drum-pingpong.mp4");
            el.play().catch(() => {});
          }
        }}>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          {playing ? <path d="M4 2h3v12H4zm5 0h3v12H9z" /> : <path d="m4 2 10 6-10 6z" />}
        </svg>
        <span>{playing ? "Pause film" : "Play film"}</span>
      </button>
    </>
  );
}
