import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustMarquee from "@/components/TrustMarquee";
import WipeClean from "@/components/WipeClean";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <TrustMarquee />
        <Services />
        <Process />
        <WipeClean />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
