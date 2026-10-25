import ArrowIcon from "@/components/ArrowIcon";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CatalogReader from "@/components/CatalogReader";
import CatalogMotion from "@/components/CatalogMotion";
import { asset } from "@/lib/asset";
import StructuredData from "@/components/StructuredData";
import { CATALOG_TITLE, CATALOG_DESCRIPTION, catalogStructuredData, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: CATALOG_TITLE, description: CATALOG_DESCRIPTION, path: "/catalog/", image: "/social/eco-clean-catalog-share.jpg",
});

export default function CatalogPage() {
  return <>
    <StructuredData data={catalogStructuredData} />
    <CatalogMotion />
    <Nav catalogPage />
    <main id="main-content" tabIndex={-1} className="catalog-page">
      <section className="page-shell catalog-page-heading">
        <a className="text-link" href={asset("/")}><ArrowIcon direction="left" /> Back to Eco Clean</a>
        <div className="catalog-heading-row"><h1>Care, in<br /><span>every detail.</span></h1><div><p>Our services, our approach, our company.<br />Read the original Eco Clean catalog in English or Shqip.</p><div className="catalog-downloads"><a href={asset("/catalog/ecoclean-catalog-english.pdf")} download className="text-link" hrefLang="en">English PDF <span aria-hidden="true"><ArrowIcon direction="down" /></span></a><a href={asset("/catalog/ecoclean-catalog-shqip.pdf")} download className="text-link" hrefLang="sq">Shqip PDF <span aria-hidden="true"><ArrowIcon direction="down" /></span></a></div><span className="catalog-language">Two editions · 15 pages each</span></div></div>
      </section>
      <CatalogReader />
    </main>
    <Footer />
  </>;
}
