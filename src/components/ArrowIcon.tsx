/** Drawn arrows stay monochrome on phones, unlike platform emoji glyphs. */
export default function ArrowIcon({ direction = "up-right" }: { direction?: "up-right" | "down" | "left" | "right" }) {
  const paths = { "up-right": "M4 12 12 4M4 4h8v8", down: "M8 2v12m-5-5 5 5 5-5", left: "M14 8H2m5-5L2 8l5 5", right: "M2 8h12m-5-5 5 5-5 5" };
  return <svg className="arrow-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[direction]} /></svg>;
}
