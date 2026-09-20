const VALUES = [
  { title: "People", copy: "A safe workplace, motivated employees and a team dedicated to quality service." },
  { title: "Responsibility", copy: "Honesty, integrity and care for our people, customers, suppliers and the environment." },
  { title: "Improvement", copy: "A commitment to continuous improvement in cleaning services and ready-to-use textiles." },
];

export default function Stats() {
  return (
    <section id="responsibility" className="about-section">
      <div className="page-shell">
        <div className="about-heading">
          <h2 className="section-title">Quality is a<br /><span className="text-brand-deep">shared responsibility.</span></h2>
          <p>Eco Clean is a Kosovo-based company with American investors and experience in textile supply and laundry services. Our work is grounded in understanding our customers and delivering quality, speed and efficiency.</p>
        </div>
        <div className="values-grid">
          {VALUES.map(value => <article className="value-item" key={value.title}><span className="value-rule" aria-hidden="true" /><h3>{value.title}</h3><p>{value.copy}</p></article>)}
        </div>
      </div>
    </section>
  );
}
