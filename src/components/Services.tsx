import NextImage from "next/image";
import { asset } from "@/lib/asset";

type Service = {
  n: string;
  title: string;
  tag: string;
  points: string[];
  img: string;
  alt: string;
  accent: string;
  bg: string;
  dark?: boolean;
};

const SERVICES: Service[] = [
  {
    n: "01",
    title: "Hotels",
    tag: "A first impression your guests can feel.",
    points: ["Bed linen and towels", "Collection, cleaning and return", "Textile supply for your operational needs"],
    img: "/img/hotel-bed.jpg",
    alt: "Crisp white hotel bedding",
    accent: "#56b64e",
    bg: "#ecf7ea",
  },
  {
    n: "02",
    title: "Restaurants",
    tag: "Tables that look as good as the food.",
    points: ["Tablecloths and napkins in different designs", "Towels and microfiber textiles", "Textile provision and cleaning services"],
    img: "/img/chef.jpg",
    alt: "Chef plating a dish in a professional kitchen",
    accent: "#f49b4a",
    bg: "#fdf2e5",
  },
  {
    n: "03",
    title: "Hospitals",
    tag: "Care for the textiles your patients and staff rely on.",
    points: ["Hospital linen and uniforms", "Hygienically tested textile products", "A six-component cleaning system"],
    img: "/img/healthcare.jpg",
    alt: "Medical team in clean surgical scrubs",
    accent: "#23c1ef",
    bg: "#e6f7fd",
  },
  {
    n: "04",
    title: "Workwear & Uniforms",
    tag: "Individual attention for every uniform.",
    points: ["Individually barcoded uniforms", "Inspection and repairs before cleaning", "Thermal disinfection"],
    img: "/img/shirts.jpg",
    alt: "Pressed white shirts on hangers",
    accent: "#8b95a5",
    bg: "#0d1526",
    dark: true,
  },
];

export default function Services() {
  return (
    <section id="services" className="services-section bg-white">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="services-heading">
          <h2 className="section-title max-w-3xl text-ink">
            Your textiles.<br /><span className="text-brand-deep">One standard.</span>
          </h2>
        </div>

        <div>
          {SERVICES.map((s) => (
            <div key={s.n} className="service-wrap">
              <article
                className="service-card grid overflow-hidden md:grid-cols-2"
                style={{ background: s.bg }}
              >
                <div className={`service-copy flex flex-col justify-between ${s.dark ? "text-white" : "text-ink"}`}>
                  <div>
                    <span
                      className="font-display text-sm font-bold tracking-[0.3em]"
                      style={{ color: s.dark ? "#b5c2d5" : "#4a6270" }}
                    >
                      {s.n}
                    </span>
                    <h3 className="mt-4 break-words font-display text-3xl font-semibold tracking-tight lg:text-[2.65rem]">
                      {s.title}
                    </h3>
                    <p className={`mt-4 max-w-sm text-lg ${s.dark ? "text-white/70" : "text-slate-600"}`}>
                      {s.tag}
                    </p>
                  </div>

                  <ul className="mt-10 space-y-3.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                          style={{ background: `${s.accent}22`, color: s.accent }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" aria-hidden>
                            <path d="M4 12.5l5.5 5.5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className={`font-medium ${s.dark ? "text-white/85" : "text-slate-700"}`}>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="service-image relative min-h-[260px]">
                  <NextImage
                    src={asset(s.img)}
                    alt={s.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    width="720" height="640"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(135deg, ${s.accent}33 0%, transparent 45%)` }}
                  />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
