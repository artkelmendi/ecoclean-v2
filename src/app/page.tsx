import BrandIntro from "@/components/BrandIntro";
import PageMotion from "@/components/PageMotion";
import CatalogTeaser from "@/components/CatalogTeaser";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustMarquee from "@/components/TrustMarquee";
import WipeClean from "@/components/WipeClean";
import Partners from "@/components/Partners";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { HOME_TITLE, HOME_DESCRIPTION, homeStructuredData, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: HOME_TITLE, description: HOME_DESCRIPTION, path: "/", image: "/social/eco-clean-share.jpg",
});

export default function Home() {
  return (
    <>
      <StructuredData data={homeStructuredData} />
      <BrandIntro />
      <PageMotion />
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <TrustMarquee />
        <Services />
        <Process />
        <WipeClean />
        <Partners />
        <Stats />
        <CatalogTeaser />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
