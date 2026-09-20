export default function TrustMarquee() {
  return (
    <section className="trust-section" aria-label="Our service sectors">
      <div className="page-shell trust-layout">
        <p className="trust-caption">Textile supply.<br />Professional laundry.</p>
        {[["Hotels", "Linen & towels"], ["Restaurants", "Table linen & textiles"], ["Hospitals", "Linen & uniforms"]].map(([title, copy]) => (
          <div className="trust-client" key={title}>
            <span className="sector-mark" aria-hidden="true"><svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="m4 12 12-6 12 6-12 6-12-6Zm0 6 12 6 12-6M4 24l12 6 12-6" /></svg></span>
            <div><strong>{title}</strong><span>{copy}</span></div>
          </div>
        ))}
      </div>
    </section>
  );
}
