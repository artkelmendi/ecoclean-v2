import NextImage from "next/image";
import { asset } from "@/lib/asset";

export default function Footer() {
  return (
    <footer className="footer-links bg-ink py-16 text-white">
      <div className="page-shell">
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          <div>
            <a href={asset("/")} className="flex items-center gap-3" aria-label="Eco Clean home">
              <NextImage src={asset("/logos/ec-icon.svg")} alt="" width={40} height={40} />
              <span className="font-display text-2xl font-semibold tracking-tight">eco clean</span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">Textile supply and laundry services for hotels, restaurants, hospitals and businesses across Kosovo and the region.</p>
          </div>
          <div className="grid grid-cols-[auto_auto] gap-8 lg:gap-20">
            <div><p className="mb-4 text-xs font-bold tracking-[0.2em] text-white/60">EXPLORE</p>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href={asset("/#services")}>Services</a></li><li><a href={asset("/#process")}>Streamline system</a></li><li><a href={asset("/catalog/")}>Catalog</a></li><li><a href={asset("/#contact")}>Contact</a></li>
              </ul>
            </div>
            <div><p className="mb-4 text-xs font-bold tracking-[0.2em] text-white/60">CONTACT</p>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="tel:+38348886644">048 88 66 44</a></li>
                <li>Magjistralja Prishtinë–Gjilan<br />Hajvali, Prishtinë</li>
                <li><a href="https://www.ecc-usa.com" target="_blank" rel="noopener noreferrer">www.ecc-usa.com ↗</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-rule mt-14 flex flex-wrap justify-between gap-3 border-t border-white/15 pt-8 text-xs text-white/60"><p>© {new Date().getFullYear()} Eco Clean. All rights reserved.</p><p>eco with us.</p></div>
      </div>
    </footer>
  );
}
