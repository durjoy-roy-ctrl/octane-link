import React from 'react';
import { useNavigate } from 'react-router-dom';

const products = [
  { id: 1, name: 'Octane 95', price: 130, unit: 'Liter', category: 'Fuel', icon: '⛽' },
  { id: 2, name: 'Diesel', price: 105, unit: 'Liter', category: 'Fuel', icon: '🚛' },
  { id: 3, name: 'Synthetic Engine Oil 5W-30', price: 3200, unit: '4L Can', category: 'Lubricant', icon: '🛢️' },
  { id: 4, name: 'Industrial Gear Oil', price: 12500, unit: '20L Drum', category: 'Lubricant', icon: '⚙️' },
];

export default function Buy() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '30px', color: '#fff', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>⛽ Buy Fuel & Lubricants</h2>
      <p style={{ color: '#aaa' }}>Select your product and proceed to retail checkout.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {products.map((p) => (
          <div key={p.id} style={{ background: '#1e1e1e', padding: '20px', borderRadius: '8px', border: '1px solid #333', textAlign: 'center' }}>
            <div style={{ fontSize: '40px' }}>{p.icon}</div>
            <h3>{p.name}</h3>
            <p style={{ color: '#00e676', fontWeight: 'bold' }}>৳{p.price} / {p.unit}</p>
            <button 
              onClick={() => navigate('/checkout')}
              style={{ background: '#ff9800', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}
            >
              Buy Now 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}