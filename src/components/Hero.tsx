import HeroVideo from "./HeroVideo";
import HeroEntrance from "./HeroEntrance";

export default function Hero() {
  return (
    <section id="hero" className="hero-section relative overflow-hidden bg-ink">
      <HeroEntrance />
      <noscript><style>{`.hero-entrance{opacity:1!important;transform:none!important;clip-path:none!important;filter:none!important}`}</style></noscript>
      <HeroVideo />
      <div className="hero-shade absolute inset-0" />
      <div className="hero-content page-shell relative z-10">
        <div className="hero-location hero-entrance" data-hero-enter><span>Industrial laundry &amp; textile care</span><span>Kosovo</span></div>
        <h1 className="hero-title"><span className="hero-title-line hero-entrance" data-hero-enter>The standard</span><span className="hero-title-line hero-entrance" data-hero-enter>of <span>clean.</span></span></h1>
        <div className="hero-bottom hero-entrance" data-hero-enter>
          <p>Textile supply and laundry services for <strong>hotels, restaurants and hospitals</strong> across Kosovo and the region. Quality, speed and efficiency, with us.</p>
          <div className="hero-actions">
            <a href="#contact" className="button-primary">Get a quote <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" /></svg></a>
            <a href="#difference" className="hero-secondary">Explore our care <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <a href="#services" className="hero-scroll hero-entrance" data-hero-enter><span className="hero-scroll-line" aria-hidden="true" />Explore Eco Clean</a>
      </div>
    </section>
  );
}
