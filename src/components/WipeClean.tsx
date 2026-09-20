import NextImage from "next/image";
import { asset } from "@/lib/asset";

export default function WipeClean() {
  return (
    <section id="difference" className="textile-section">
      <div className="page-shell textile-layout">
        <div className="textile-visual"><NextImage src={asset("/catalog/catalog-06.webp")} width={776} height={1100} alt="Preparing fresh white hotel linen, from the Eco Clean catalog" /></div>
        <div className="textile-copy">
          <h2 className="section-title">First impressions.<br /><span className="text-brand-deep">Lasting care.</span></h2>
          <p>The cleanliness and presentation of sheets and towels shape the moment a guest walks into a room.</p>
          <p>Eco Clean collects used linen and returns it clean, while supplying textiles selected to balance quality, comfort and cost. Our service is built around your business&apos;s commercial and operational needs.</p>
          <a className="text-link" href={asset("/catalog/#page-7")}>Explore our hotel services <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
