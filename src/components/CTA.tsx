import NextImage from "next/image";
import { asset } from "@/lib/asset";

export default function CTA() {
  return (
    <section id="contact" className="bg-white px-4 pb-24 md:px-6">
      <div className="cta-block relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-brand-deep px-6 py-20 md:px-16 md:py-28">
        <NextImage src={asset("/logos/ec-icon.svg")} alt="" width={384} height={384} aria-hidden className="cta-mark absolute -right-20 -top-20 h-72 w-72 opacity-15 brightness-0 invert md:h-96 md:w-96" />
        <div className="relative z-10">
          <h2 className="max-w-3xl font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[1.02] tracking-tight text-white">Let&apos;s take care<br />of your textiles.</h2>
          <p className="mt-6 max-w-xl text-lg text-white/85">Tell us about your business and your textile requirements. Speak with Eco Clean about supply, laundry and stock management.</p>
          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <a href="tel:+38348886644" className="rounded-full bg-white px-7 py-4 font-display text-lg font-semibold text-brand-deep transition-colors hover:bg-cloud">048 88 66 44</a>
            <a href={asset("/catalog/")} className="contact-catalog">Browse the catalog <span aria-hidden="true">↗</span></a>
          </div>
          <div className="contact-details mt-12 border-t border-white/25 pt-8 text-sm text-white/85">
            <p>Magjistralja Prishtinë–Gjilan<br />Hajvali, Prishtinë</p>
            <a href="https://www.ecc-usa.com" target="_blank" rel="noopener noreferrer">www.ecc-usa.com <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
