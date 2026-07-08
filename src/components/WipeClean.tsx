"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { asset } from "@/lib/asset";

const CLEAN_THRESHOLD = 0.62;
const IMG = "/img/hotel-bed.jpg";

type Bubble = { id: number; left: number; size: number; delay: number };

export default function WipeClean() {
  const frame = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const dragging = useRef(false);
  const strokes = useRef(0);
  const doneRef = useRef(false);

  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const paintDirty = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width: cw, height: ch } = canvas;
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, cw, ch);

    // the "before" state: same photo, dulled and stained
    ctx.filter = "grayscale(0.85) sepia(0.35) brightness(0.68) contrast(0.92)";
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    ctx.filter = "none";

    // grime speckles
    const rnd = (min: number, max: number) => min + Math.random() * (max - min);
    for (let i = 0; i < 90; i++) {
      ctx.beginPath();
      ctx.ellipse(rnd(0, cw), rnd(0, ch), rnd(4, 38), rnd(3, 22), rnd(0, Math.PI), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(58, 48, 36, ${rnd(0.04, 0.13)})`;
      ctx.fill();
    }

    // vignette
    const grad = ctx.createRadialGradient(cw / 2, ch / 2, ch / 3, cw / 2, ch / 2, cw / 1.1);
    grad.addColorStop(0, "rgba(20,16,10,0)");
    grad.addColorStop(1, "rgba(20,16,10,0.45)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, cw, ch);
  }, []);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const holder = frame.current;
    if (!canvas || !holder || doneRef.current) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = holder.clientWidth * dpr;
    canvas.height = holder.clientHeight * dpr;
    paintDirty();
    strokes.current = 0;
    setProgress(0);
  }, [paintDirty]);

  useEffect(() => {
    const img = new Image();
    img.src = asset(IMG);
    img.onload = () => {
      imgRef.current = img;
      setupCanvas();
    };
    const holder = frame.current;
    if (!holder) return;
    const ro = new ResizeObserver(() => setupCanvas());
    ro.observe(holder);
    return () => ro.disconnect();
  }, [setupCanvas]);

  const measure = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return 0;
    const sw = 48;
    const sh = 30;
    const off = document.createElement("canvas");
    off.width = sw;
    off.height = sh;
    const octx = off.getContext("2d");
    if (!octx) return 0;
    octx.drawImage(canvas, 0, 0, sw, sh);
    const data = octx.getImageData(0, 0, sw, sh).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] < 60) clear++;
    return clear / (sw * sh);
  }, []);

  const finish = useCallback(() => {
    doneRef.current = true;
    setDone(true);
    setProgress(1);
    const canvas = canvasRef.current;
    if (canvas) {
      gsap.to(canvas, { opacity: 0, duration: 0.9, ease: "power2.out" });
    }
    setBubbles(
      Array.from({ length: 14 }, (_, id) => ({
        id,
        left: 6 + Math.random() * 88,
        size: 8 + Math.random() * 26,
        delay: Math.random() * 0.5,
      })),
    );
  }, []);

  const wipeAt = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || doneRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = canvas.width / rect.width;
      const x = (clientX - rect.left) * dpr;
      const y = (clientY - rect.top) * dpr;
      const r = Math.max(44, canvas.width * 0.055);

      ctx.globalCompositeOperation = "destination-out";
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(0,0,0,0.95)");
      g.addColorStop(0.6, "rgba(0,0,0,0.6)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      strokes.current += 1;
      if (strokes.current % 10 === 0) {
        const p = measure();
        setProgress(p);
        if (p >= CLEAN_THRESHOLD) finish();
      }
    },
    [measure, finish],
  );

  const reset = useCallback(() => {
    doneRef.current = false;
    setDone(false);
    setBubbles([]);
    const canvas = canvasRef.current;
    if (canvas) gsap.set(canvas, { opacity: 1 });
    setupCanvas();
  }, [setupCanvas]);

  return (
    <section id="difference" className="bg-cloud py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-xs font-bold tracking-[0.22em] text-brand">
              THE DIFFERENCE
            </p>
            <h2 className="max-w-xl font-display text-4xl font-bold tracking-tight text-ink md:text-6xl">
              Don&apos;t take our word for it. <span className="text-brand">Wipe.</span>
            </h2>
          </div>
          <p className="max-w-sm text-slate-500">
            Run your cursor over the linen — this is what &ldquo;before Eco Clean&rdquo; and
            &ldquo;after Eco Clean&rdquo; feel like, every 24 hours.
          </p>
        </div>

        <div
          ref={frame}
          className="relative aspect-[16/10] w-full touch-pan-y select-none overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-32px_rgba(10,30,70,0.35)] md:rounded-[2.5rem]"
        >
          <img
            src={asset(IMG)}
            alt="Freshly laundered white hotel bedding, cleaned by Eco Clean"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />

          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full cursor-crosshair"
            onPointerDown={(e) => {
              dragging.current = true;
              wipeAt(e.clientX, e.clientY);
            }}
            onPointerUp={() => (dragging.current = false)}
            onPointerLeave={() => (dragging.current = false)}
            onPointerMove={(e) => {
              if (e.pointerType === "mouse" || dragging.current) wipeAt(e.clientX, e.clientY);
            }}
          />

          {/* hint */}
          {progress < 0.02 && !done && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="rounded-full bg-white/90 px-6 py-3 font-display text-sm font-semibold text-ink shadow-lg backdrop-blur">
                ✦ Move to clean
              </span>
            </div>
          )}

          {/* progress chip */}
          <div className="pointer-events-none absolute bottom-5 left-5 rounded-full bg-ink/70 px-4 py-2 text-xs font-bold text-white backdrop-blur">
            {done ? "Spotless — the Eco Clean standard" : `${Math.round(progress * 100)}% clean`}
          </div>

          {/* reset */}
          {done && (
            <button
              onClick={reset}
              className="absolute bottom-5 right-5 flex cursor-pointer items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 text-sm font-bold text-ink shadow-lg backdrop-blur transition-colors hover:bg-white"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Make it dirty again
            </button>
          )}

          {/* bubbles on finish */}
          {bubbles.map((b) => (
            <span
              key={b.id}
              className="bubble pointer-events-none absolute bottom-8 rounded-full border-2 border-white/70 bg-white/25"
              style={{
                left: `${b.left}%`,
                width: b.size,
                height: b.size,
                animationDelay: `${b.delay}s`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
