import ArrowIcon from "@/components/ArrowIcon";

import NextImage from "next/image";
import { asset } from "@/lib/asset";

export default function CatalogTeaser() {
  return (
    <section className="catalog-teaser" aria-labelledby="catalog-teaser-title">
      <div className="page-shell catalog-teaser-layout">
        <div className="catalog-teaser-copy">
          <h2 id="catalog-teaser-title" className="section-title">The complete<br /><span className="text-brand-deep">Eco Clean story.</span></h2>
          <p>Get to know our services, our values and the Streamline system in our company catalog.</p>
          <a className="button-primary" href={asset("/catalog/")}>Explore the catalog <span aria-hidden="true"><ArrowIcon /></span></a>
          <span className="catalog-language">English + Shqip · 15 pages each</span>
        </div>
        <a className="catalog-cover-link" href={asset("/catalog/")} aria-label="Read the Eco Clean catalog">
          <div className="catalog-cover"><NextImage src={asset("/catalog/catalog-01.webp")} width={776} height={1100} alt="Eco Clean catalog cover" /></div>
          <span className="catalog-cover-caption">eco with us.</span>
        </a>
      </div>
    </section>
  );
}
