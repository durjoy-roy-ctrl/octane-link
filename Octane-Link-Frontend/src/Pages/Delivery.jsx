import { Link } from 'react-router-dom'

export default function Delivery() {
  return (
    <main className="container fade-in">
      <section className="section">
        <p className="eyebrow">Delivery System</p>
        <h2 className="section-title">Track or schedule a delivery</h2>
        <p className="section-sub">
          Retail orders use bike courier tracking. Wholesale orders use
          scheduled tanker/truck delivery with route planning.
        </p>

        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="card">
            <div className="fuel-type">Retail</div>
            <div className="price" style={{ fontSize: 22 }}>Live Bike Tracking</div>
            <p>Watch your bike courier move live on the map, step by step.</p>
            <Link to="/delivery/track" className="btn btn-primary btn-block">Track My Order</Link>
          </div>
          <div className="card">
            <div className="fuel-type">Wholesale</div>
            <div className="price" style={{ fontSize: 22 }}>Tanker / Truck Scheduling</div>
            <p>Plan a pickup and drop-off route for bulk fuel delivery.</p>
            <Link to="/delivery/schedule" className="btn btn-ghost btn-block">Schedule Delivery</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
