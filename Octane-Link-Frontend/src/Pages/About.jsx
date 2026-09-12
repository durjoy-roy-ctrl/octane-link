const steps = [
  ['01', 'Choose retail or wholesale', 'Retail buyers use a cart. Wholesale buyers request a bulk quote.'],
  ['02', 'Compare prices', 'Filter listings by fuel type and location.'],
  ['03', 'Checkout or get an invoice', 'Retail pays instantly. Wholesale gets an invoice with credit terms.'],
  ['04', 'Fuel changes hands', 'Buyer and seller coordinate pickup or delivery.'],
]

export default function About() {
  return (
    <main className="container fade-in">
      <section className="section">
        <p className="eyebrow">How it works</p>
        <h2 className="section-title">A direct line between buyers and sellers</h2>

        <div className="about-grid">
          <p className="section-sub">
            OctaneLink was built to cut out unnecessary markup in local fuel
            trading. This is a class project (CSE2200) demonstrating a
            multi-page React app with retail and wholesale order flows,
            navigation, and simple state management.
          </p>
          <div>
            {steps.map(([n, title, desc]) => (
              <div className="step" key={n}>
                <div className="num">{n}</div>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
