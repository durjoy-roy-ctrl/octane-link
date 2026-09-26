import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// ডেলিভারির ধাপগুলো (আগের মতোই - শুধু তথ্যের জন্য, টাইমলাইনে দেখানো হয়)
const steps = [
  { title: 'Order confirmed', desc: 'Seller accepted your order' },
  { title: 'Courier assigned', desc: 'Rahim Mia is on the way to pick up' },
  { title: 'Picked up', desc: 'Fuel collected from depot' },
  { title: 'On the way', desc: 'Heading to your delivery address' },
  { title: 'Delivered', desc: 'Order completed' },
]

// ডিপো/গোডাউনের ফিক্সড লোকেশন - নারায়ণগঞ্জ (এখান থেকে ডেলিভারি শুরু হয়)
// চাইলে এই lat/lng বদলে অন্য কোনো এলাকা বসাতে পারবা
const DEPOT_LOCATION = { lat: 23.6238, lng: 90.5000 }

// ইমোজি দিয়ে কাস্টম মার্কার আইকন বানানোর হেল্পার ফাংশন
function createEmojiIcon(emoji) {
  return L.divIcon({
    html: `<div style="font-size: 26px; line-height: 1;">${emoji}</div>`,
    className: 'emoji-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  })
}

export default function DeliveryTracking() {
  const [activeStep, setActiveStep] = useState(2)

  // ডেলিভারি অ্যাড্রেসের lat/lng - geocoding করে বের করার পর এখানে সেট হবে
  const [deliveryLocation, setDeliveryLocation] = useState(null)
  const [addressText, setAddressText] = useState('')
  const [loadingMap, setLoadingMap] = useState(true)
  const [mapMessage, setMapMessage] = useState('')

  // আসল রাস্তার পয়েন্টগুলোর লিস্ট (OSRM থেকে পাওয়া) - বাইক এই পথ ধরেই এগোবে
  const [routePoints, setRoutePoints] = useState([])
  // বাইক এখন রাস্তার কোন পয়েন্টে আছে, তার ইনডেক্স
  const [courierIndex, setCourierIndex] = useState(0)

  // স্টেপ ধীরে ধীরে আগানোর টাইমার (টাইমলাইনের জন্য, আগের মতোই)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Checkout/Invoice এ সেভ করা অর্ডার থেকে ঠিকানা বের করে, geocode করে lat/lng বের করা হচ্ছে
  useEffect(() => {
    async function loadAddressOnMap() {
      try {
        const savedOrder = JSON.parse(localStorage.getItem('latestOrder') || 'null')
        const address = savedOrder?.address

        if (!address) {
          setMapMessage('কোনো ডেলিভারি ঠিকানা পাওয়া যায়নি, ডিফল্ট এরিয়া দেখানো হচ্ছে।')
          setLoadingMap(false)
          return
        }

        setAddressText(address)

        // Nominatim geocoding API - ঠিকানার টেক্সট থেকে lat/lng বের করা, ফ্রি, কোনো key লাগে না
        const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`
        const geoResponse = await fetch(geoUrl)
        const geoResults = await geoResponse.json()

        let finalLocation
        if (geoResults.length === 0) {
          setMapMessage('এই ঠিকানাটি ম্যাপে খুঁজে পাওয়া যায়নি, কাছাকাছি একটি ডিফল্ট পয়েন্ট দেখানো হচ্ছে।')
          finalLocation = { lat: DEPOT_LOCATION.lat + 0.05, lng: DEPOT_LOCATION.lng + 0.05 }
        } else {
          finalLocation = {
            lat: parseFloat(geoResults[0].lat),
            lng: parseFloat(geoResults[0].lon),
          }
        }
        setDeliveryLocation(finalLocation)

        // এখন OSRM রাউটিং API দিয়ে ডিপো থেকে ডেলিভারি পয়েন্ট পর্যন্ত আসল রাস্তার path বের করা হচ্ছে
        // (Google Maps যেমন রাস্তা ধরে route দেখায়, ঠিক সেভাবেই)
        const routeUrl = `https://router.project-osrm.org/route/v1/driving/${DEPOT_LOCATION.lng},${DEPOT_LOCATION.lat};${finalLocation.lng},${finalLocation.lat}?overview=full&geometries=geojson`
        const routeResponse = await fetch(routeUrl)
        const routeData = await routeResponse.json()

        if (routeData.routes && routeData.routes.length > 0) {
          // OSRM কোঅর্ডিনেট দেয় [lng, lat] ফরম্যাটে, আমরা {lat, lng} তে কনভার্ট করছি
          const roadPoints = routeData.routes[0].geometry.coordinates.map(
            ([lng, lat]) => ({ lat, lng })
          )
          setRoutePoints(roadPoints)
        } else {
          // রাউট না পাওয়া গেলে সোজা লাইন হিসেবে fallback রাখা হলো
          setRoutePoints([DEPOT_LOCATION, finalLocation])
        }
      } catch (error) {
        console.error('Map loading error:', error)
        setMapMessage('ম্যাপ লোড করতে সমস্যা হয়েছে, ইন্টারনেট কানেকশন চেক করো।')
      } finally {
        setLoadingMap(false)
      }
    }

    loadAddressOnMap()
  }, [])

  // বাইক আইকনটা রাস্তার পয়েন্ট ধরে ধরে আস্তে আস্তে এগিয়ে যাওয়ার এনিমেশন
  // routePoints পাওয়ার পর শুরু হবে, প্রতি ২০০ মিলিসেকেন্ডে একধাপ এগোবে
  useEffect(() => {
    if (routePoints.length === 0) return

    const moveTimer = setInterval(() => {
      setCourierIndex((prevIndex) => {
        if (prevIndex >= routePoints.length - 1) {
          clearInterval(moveTimer) // গন্তব্যে পৌঁছে গেলে থেমে যাবে
          return prevIndex
        }
        return prevIndex + 1
      })
    }, 200)

    return () => clearInterval(moveTimer)
  }, [routePoints])

  // বাইকের বর্তমান পজিশন - routePoints থেকে courierIndex অনুযায়ী বের করা
  const courierPosition = routePoints.length > 0 ? routePoints[courierIndex] : DEPOT_LOCATION

  // ম্যাপের bounds বের করা হচ্ছে যাতে পুরো রুটটা (ডিপো থেকে ডেলিভারি পয়েন্ট) ম্যাপে দেখা যায়
  const mapBounds =
    routePoints.length > 0
      ? L.latLngBounds(routePoints.map((p) => [p.lat, p.lng]))
      : L.latLngBounds([[DEPOT_LOCATION.lat, DEPOT_LOCATION.lng]])

  return (
    <main className="container fade-in">
      <section className="section">
        <p className="eyebrow">Retail delivery</p>
        <h2 className="section-title">Track your order</h2>
        <p className="section-sub">
          Order #A2914 — live bike courier tracking (demo).
          {addressText && (
            <>
              {' '}Delivering to: <b>{addressText}</b>
            </>
          )}
        </p>

        {/* --- লাইভ ম্যাপ সেকশন --- */}
        <div className="live-map-box" style={{ marginBottom: 28 }}>
          {loadingMap ? (
            <div className="map-status">ম্যাপ ও রাস্তা লোড হচ্ছে...</div>
          ) : (
            <MapContainer
              bounds={mapBounds}
              boundsOptions={{ padding: [40, 40] }}
              scrollWheelZoom={false}
              style={{ height: '320px', width: '100%', borderRadius: '14px' }}
            >
              {/* OpenStreetMap ফ্রি টাইল লেয়ার */}
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />

              {/* ডিপো মার্কার - নারায়ণগঞ্জ, এখান থেকে ডেলিভারি শুরু হয় */}
              <Marker position={[DEPOT_LOCATION.lat, DEPOT_LOCATION.lng]} icon={createEmojiIcon('🏭')} />

              {/* কাস্টমারের ডেলিভারি অ্যাড্রেস মার্কার */}
              {deliveryLocation && (
                <Marker
                  position={[deliveryLocation.lat, deliveryLocation.lng]}
                  icon={createEmojiIcon('🏠')}
                />
              )}

              {/* আসল রাস্তা ধরে রুট লাইন (OSRM থেকে পাওয়া, সোজা লাইন না) */}
              {routePoints.length > 0 && (
                <Polyline
                  positions={routePoints.map((p) => [p.lat, p.lng])}
                  pathOptions={{ color: '#ffc857', weight: 4 }}
                />
              )}

              {/* বাইক/কুরিয়ার - রাস্তা ধরে ধাপে ধাপে এগিয়ে যাচ্ছে */}
              <Marker position={[courierPosition.lat, courierPosition.lng]} icon={createEmojiIcon('🏍️')} />
            </MapContainer>
          )}

          {mapMessage && <p className="map-status-text">{mapMessage}</p>}
        </div>

        {/* --- টাইমলাইন (অপরিবর্তিত) --- */}
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
