import { asset } from "@/lib/asset";

export default function Footer() {
  return (
    <footer className="bg-ink py-16 text-white">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div>
            <div className="flex items-center gap-3">
              <img src={asset("/logos/ec-icon.svg")} alt="" className="h-10 w-10" />
              <div className="leading-none">
                <p className="font-display text-2xl font-semibold tracking-tight">eco clean</p>
                <p className="mt-1 text-[10px] font-bold tracking-[0.4em] text-white/40">WITH US</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              Industrial laundry &amp; textile care. Trusted by the Kosovo Police, the Kosovo
              Security Force and the country&apos;s finest hotels.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 md:gap-20">
            <div>
              <p className="mb-4 text-xs font-bold tracking-[0.25em] text-white/40">EXPLORE</p>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#services" className="text-white/75 transition-colors hover:text-white">Services</a></li>
                <li><a href="#process" className="text-white/75 transition-colors hover:text-white">Process</a></li>
                <li><a href="#difference" className="text-white/75 transition-colors hover:text-white">The Difference</a></li>
                <li><a href="#contact" className="text-white/75 transition-colors hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-xs font-bold tracking-[0.25em] text-white/40">CONTACT</p>
              <ul className="space-y-2.5 text-sm">
                <li><a href="mailto:info@ecoclean-ks.com" className="text-white/75 transition-colors hover:text-white">info@ecoclean-ks.com</a></li>
                <li><a href="tel:+38344000000" className="text-white/75 transition-colors hover:text-white">+383 44 000 000</a></li>
                <li><span className="text-white/75">Kosovo</span></li>
                <li>
                  <a
                    href="https://www.instagram.com/ecoclean_corporation/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/75 transition-colors hover:text-white"
                  >
                    Instagram ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-8 text-xs text-white/35 md:flex-row">
          <p>© {new Date().getFullYear()} Eco Clean L.L.C. — All rights reserved.</p>
          <p>eco clean, with us.</p>
        </div>
      </div>
    </footer>
  );
}
