import React from 'react';
import './App.css';
import CartCheckout from './pages/CartCheckout';
import WholesaleOrder from './pages/WholesaleOrder';

function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', color: 'var(--amber)', padding: '20px 0' }}>
        ⛽ Fuel & Lubricant System
      </h1>
      
      
      <CartCheckout />

      <hr style={{ borderColor: 'var(--line)', margin: '40px 0' }} />

      
      <WholesaleOrder />
    </div>
  );
}

export default App;