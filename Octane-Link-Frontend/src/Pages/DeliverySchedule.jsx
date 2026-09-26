import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const vehicleTypes = ['Tanker (5000L)', 'Tanker (10000L)', 'Truck']

function createEmojiIcon(emoji) {
  return L.divIcon({
    html: `<div style="font-size: 26px; line-height: 1;">${emoji}</div>`,
    className: 'emoji-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  })
}

export default function DeliverySchedule() {
  const [form, setForm] = useState({
    pickup: '',
    dropoff: '',
    vehicle: vehicleTypes[0],
    date: '',
    time: '',
  })
  const [scheduled, setScheduled] = useState(false)

  const [routePoints, setRoutePoints] = useState([])
  const [pickupLocation, setPickupLocation] = useState(null)
  const [dropoffLocation, setDropoffLocation] = useState(null)
  const [mapLoading, setMapLoading] = useState(false)
  const [mapMessage, setMapMessage] = useState('')

  const [truckIndex, setTruckIndex] = useState(0)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function geocodeAddress(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`
    const response = await fetch(url)
    const results = await response.json()
    if (results.length === 0) return null
    return { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setScheduled(true)
    setMapLoading(true)
    setMapMessage('')
    setRoutePoints([])
    setTruckIndex(0)

    try {
      const [pickupLoc, dropoffLoc] = await Promise.all([
        geocodeAddress(form.pickup),
        geocodeAddress(form.dropoff),
      ])

      if (!pickupLoc || !dropoffLoc) {
        setMapMessage('One or both addresses could not be found on the map. Try adding a city name (e.g. "Rupganj, Narayanganj").')
        setMapLoading(false)
        return
      }

      setPickupLocation(pickupLoc)
      setDropoffLocation(dropoffLoc)

      const routeUrl = `https://router.project-osrm.org/route/v1/driving/${pickupLoc.lng},${pickupLoc.lat};${dropoffLoc.lng},${dropoffLoc.lat}?overview=full&geometries=geojson`
      const routeResponse = await fetch(routeUrl)
      const routeData = await routeResponse.json()

      if (routeData.routes && routeData.routes.length > 0) {
        const roadPoints = routeData.routes[0].geometry.coordinates.map(
          ([lng, lat]) => ({ lat, lng })
        )
        setRoutePoints(roadPoints)
      } else {
        setRoutePoints([pickupLoc, dropoffLoc])
      }
    } catch (error) {
      console.error('Route loading error:', error)
      setMapMessage('Failed to load the map. Please check your internet connection.')
    } finally {
      setMapLoading(false)
    }
  }

  useEffect(() => {
    if (routePoints.length === 0) return

    const moveTimer = setInterval(() => {
      setTruckIndex((prevIndex) => {
        if (prevIndex >= routePoints.length - 1) {
          clearInterval(moveTimer)
          return prevIndex
        }
        return prevIndex + 1
      })
    }, 250)

    return () => clearInterval(moveTimer)
  }, [routePoints])

  const truckPosition = routePoints.length > 0 ? routePoints[truckIndex] : null

  const mapBounds =
    routePoints.length > 0
      ? L.latLngBounds(routePoints.map((p) => [p.lat, p.lng]))
      : null

  return (
    <main className="container fade-in">
      <section className="section">
        <p className="eyebrow">Wholesale delivery</p>
        <h2 className="section-title">Schedule tanker / truck delivery</h2>
        <p className="section-sub">Plan a route and pick a delivery slot for bulk orders.</p>

        {scheduled && !mapLoading && routePoints.length > 0 && (
          <div className="success-banner pop">
            Delivery scheduled: {form.vehicle} from {form.pickup} to {form.dropoff} on {form.date} at {form.time}.
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 28 }}>
          <form className="form-panel" onSubmit={handleSubmit} style={{ maxWidth: '100%' }}>
            <div className="field">
              <label htmlFor="pickup">Pickup depot</label>
              <input id="pickup" name="pickup" value={form.pickup} onChange={handleChange} placeholder="e.g. Rupganj Traders, Narayanganj" required />
            </div>
            <div className="field">
              <label htmlFor="dropoff">Drop-off location</label>
              <input id="dropoff" name="dropoff" value={form.dropoff} onChange={handleChange} placeholder="e.g. Zaman Transport Ltd., Gazipur" required />
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
            <div className="live-map-box">
              {!scheduled ? (
                <div className="map-status">Submit the form with pickup and drop-off to see the route here.</div>
              ) : mapLoading ? (
                <div className="map-status">Loading route...</div>
              ) : mapBounds ? (
                <MapContainer
                  bounds={mapBounds}
                  boundsOptions={{ padding: [40, 40] }}
                  scrollWheelZoom={false}
                  style={{ height: '260px', width: '100%', borderRadius: '14px' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                  />

                  <Marker position={[pickupLocation.lat, pickupLocation.lng]} icon={createEmojiIcon('🏭')} />

                  <Marker position={[dropoffLocation.lat, dropoffLocation.lng]} icon={createEmojiIcon('🏢')} />

                  <Polyline
                    positions={routePoints.map((p) => [p.lat, p.lng])}
                    pathOptions={{ color: '#ffc857', weight: 4 }}
                  />

                  {truckPosition && (
                    <Marker position={[truckPosition.lat, truckPosition.lng]} icon={createEmojiIcon('🚛')} />
                  )}
                </MapContainer>
              ) : (
                <div className="map-status">Map could not be displayed.</div>
              )}

              {mapMessage && <p className="map-status-text">{mapMessage}</p>}
            </div>

            <p className="section-sub" style={{ marginTop: 12, fontSize: 13 }}>
              Route preview — real road route via OpenStreetMap.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
