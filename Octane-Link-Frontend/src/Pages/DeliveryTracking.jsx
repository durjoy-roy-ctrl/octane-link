import { useState, useEffect } from 'react'

const steps = [
  { title: 'Order confirmed', desc: 'Seller accepted your order' },
  { title: 'Courier assigned', desc: 'Rahim Mia is on the way to pick up' },
  { title: 'Picked up', desc: 'Fuel collected from depot' },
  { title: 'On the way', desc: 'Heading to your delivery address' },
  { title: 'Delivered', desc: 'Order completed' },
]

export default function DeliveryTracking() {
  const [activeStep, setActiveStep] = useState(2)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="container fade-in">
      <section className="section">
        <p className="eyebrow">Retail delivery</p>
        <h2 className="section-title">Track your order</h2>
        <p className="section-sub">Order #A2914 — live bike courier tracking (demo).</p>

        <div className="map-box" style={{ marginBottom: 28 }}>
          <div className="map-route" />
          <span className="map-pin" style={{ left: '8%' }}>🏭</span>
          <span className="map-pin" style={{ left: '82%' }}>🏠</span>
          <span className="map-courier">🏍️</span>
        </div>

        <div className="timeline">
          {steps.map((step, index) => (
            <div className="timeline-step" key={step.title}>
              <div className="timeline-dot-col">
                <div className={`timeline-dot ${index <= activeStep ? 'done' : ''}`} />
                {index < steps.length - 1 && <div className="timeline-line" />}
              </div>
              <div className="timeline-content">
                <h4 style={{ color: index <= activeStep ? 'var(--text)' : 'var(--text-dim)' }}>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
