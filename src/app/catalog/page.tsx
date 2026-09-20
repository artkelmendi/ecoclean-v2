import ArrowIcon from "@/components/ArrowIcon";

import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CatalogReader from "@/components/CatalogReader";
import CatalogMotion from "@/components/CatalogMotion";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Company Catalog — Eco Clean",
  description: "Read Eco Clean's original Albanian catalog: hotel, restaurant and hospital textile services, uniforms, and the Streamline stock management system.",
};

export default function CatalogPage() {
  return <>
    <CatalogMotion />
    <Nav catalogPage />
    <main id="main-content" tabIndex={-1} className="catalog-page">
      <section className="page-shell catalog-page-heading">
        <a className="text-link" href={asset("/")}><ArrowIcon direction="left" /> Back to Eco Clean</a>
        <div className="catalog-heading-row"><h1>Care, in<br /><span>every detail.</span></h1><div><p>Our services, our approach, our company.<br />Read the original Eco Clean catalog in English or Shqip.</p><a href={asset("/catalog/ecoclean-catalog-english.pdf")} download className="text-link">Download English PDF <span aria-hidden="true"><ArrowIcon direction="down" /></span></a><span className="catalog-language">Two editions · 15 pages each</span></div></div>
      </section>
      <CatalogReader />
    </main>
    <Footer />
  </>;
}
