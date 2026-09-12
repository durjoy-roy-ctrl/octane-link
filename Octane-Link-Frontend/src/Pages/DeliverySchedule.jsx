import { useState } from 'react'

const vehicleTypes = ['Tanker (5000L)', 'Tanker (10000L)', 'Truck']

export default function DeliverySchedule() {
  const [form, setForm] = useState({
    pickup: '',
    dropoff: '',
    vehicle: vehicleTypes[0],
    date: '',
    time: '',
  })
  const [scheduled, setScheduled] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setScheduled(true)
  }

  return (
    <main className="container fade-in">
      <section className="section">
        <p className="eyebrow">Wholesale delivery</p>
        <h2 className="section-title">Schedule tanker / truck delivery</h2>
        <p className="section-sub">Plan a route and pick a delivery slot for bulk orders.</p>

        {scheduled && (
          <div className="success-banner pop">
            Delivery scheduled: {form.vehicle} from {form.pickup} to {form.dropoff} on {form.date} at {form.time}.
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 28 }}>
          <form className="form-panel" onSubmit={handleSubmit} style={{ maxWidth: '100%' }}>
            <div className="field">
              <label htmlFor="pickup">Pickup depot</label>
              <input id="pickup" name="pickup" value={form.pickup} onChange={handleChange} placeholder="e.g. Rupganj Traders" required />
            </div>
            <div className="field">
              <label htmlFor="dropoff">Drop-off location</label>
              <input id="dropoff" name="dropoff" value={form.dropoff} onChange={handleChange} placeholder="e.g. Zaman Transport Ltd." required />
            </div>
            <div className="field">
              <label htmlFor="vehicle">Vehicle type</label>
              <select id="vehicle" name="vehicle" value={form.vehicle} onChange={handleChange}>
                {vehicleTypes.map((v) => <option key={v}>{v}</option>)}
              </select>
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="date">Delivery date</label>
                <input id="date" name="date" type="date" value={form.date} onChange={handleChange} required />
              </div>
              <div className="field">
                <label htmlFor="time">Time slot</label>
                <input id="time" name="time" type="time" value={form.time} onChange={handleChange} required />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Schedule Delivery</button>
          </form>
          <div>
            <div className="map-box">
              <div className="map-route" />
              <span className="map-pin" style={{ left: '8%' }}>🏭</span>
              <span className="map-pin" style={{ left: '82%' }}>🏢</span>
              <span className="map-courier">🚛</span>
            </div>
            <p className="section-sub" style={{ marginTop: 12, fontSize: 13 }}>
              Route preview — actual route planning would use a maps API in a full build.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
