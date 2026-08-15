import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


import CartCheckout from './pages/CartCheckout';
import WholesaleOrder from './pages/WholesaleOrder';


const products = [
  { id: 1, name: 'Octane 95', category: 'Fuel', price: 130, unit: 'Liter', icon: '⛽' },
  { id: 2, name: 'Diesel Bulk', category: 'Fuel', price: 105, unit: 'Liter', icon: '🚛' },
  { id: 3, name: 'Synthetic Engine Oil 5W-30', category: 'Lubricant', price: 3200, unit: '4L Can', icon: '🛢️' },
  { id: 4, name: 'Industrial Gear Oil 220', category: 'Lubricant', price: 12500, unit: '20L Drum', icon: '⚙️' },
  { id: 5, name: 'Premium Brake Fluid', category: 'Additives', price: 450, unit: '500ml', icon: '🧪' },
  { id: 6, name: 'CNG Compression Gas', category: 'Gas', price: 52, unit: 'm3', icon: '🔥' },
];


const ProductCatalog = () => (
  <div style={{ padding: '30px', maxWidth: '1100px', margin: '0 auto' }}>
    <h2 style={{ textAlign: 'center', color: '#fff' }}>⛽ Fuel & Lubricant System</h2>
    <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '30px' }}>Select your products and add them to cart.</p>
    
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
      {products.map((item) => (
        <div key={item.id} style={cardStyle}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>{item.icon}</div>
          <h3 style={{ margin: '10px 0 5px 0', color: '#fff' }}>{item.name}</h3>
          <span style={badgeStyle}>{item.category}</span>
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#00e676', margin: '15px 0' }}>
            ৳{item.price} <span style={{ fontSize: '12px', color: '#aaa' }}>/ {item.unit}</span>
          </p>
          <button style={buttonStyle}>Add to Cart 🛒</button>
        </div>
      ))}
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: '#fff' }}>
        {/* Navigation Bar */}
        <nav style={navStyle}>
          <Link to="/" style={linkStyle}>⛽ Products</Link>
          <Link to="/wholesale" style={linkStyle}>🏢 Wholesale & Invoicing</Link>
          <Link to="/checkout" style={linkStyle}>💳 Retail Payment</Link>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<ProductCatalog />} />
          <Route path="/wholesale" element={<WholesaleOrder />} />
          <Route path="/checkout" element={<CartCheckout />} />
        </Routes>
      </div>
    </Router>
  );
}


const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '30px',
  padding: '18px',
  background: '#1a1a1a',
  borderBottom: '1px solid #333'
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '16px'
};

const cardStyle = {
  background: '#1e1e1e',
  border: '1px solid #333',
  borderRadius: '10px',
  padding: '20px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const badgeStyle = {
  background: '#333',
  color: '#ff9800',
  fontSize: '12px',
  padding: '4px 8px',
  borderRadius: '4px',
  fontWeight: 'bold'
};

const buttonStyle = {
  background: '#ff9800',
  color: '#000',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer',
  width: '100%',
  marginTop: 'auto'
};

export default App;