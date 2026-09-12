import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


import Buy from './Pages/Buy';
import BulkQuote from './Pages/BulkQuote';
import Checkout from './Pages/Checkout';

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: '#fff' }}>
        {}
        <nav style={navStyle}>
          <Link to="/" style={linkStyle}>⛽ Buy Fuel</Link>
          <Link to="/sell" style={linkStyle}>🏢 Sell Fuel</Link>
          <Link to="/checkout" style={linkStyle}>💳 Retail Payment</Link>
        </nav>

        {}
        <Routes>
          <Route path="/" element={<Buy />} />
          <Route path="/sell" element={<BulkQuote />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
}

const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  padding: '15px',
  background: '#1a1a1a',
  borderBottom: '1px solid #333'
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 'bold'
};

export default App;