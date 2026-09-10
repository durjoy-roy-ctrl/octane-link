import React from 'react';

export default function Checkout() {
  return (
    <div style={{ padding: '30px', color: '#fff', maxWidth: '600px', margin: '0 auto' }}>
      <h2>💳 Retail Payment & Checkout</h2>
      
      <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '8px', border: '1px solid #333', marginTop: '20px' }}>
        <h3>Select Payment Method</h3>
        <div style={{ display: 'flex', gap: '15px', margin: '15px 0' }}>
          <button style={{ padding: '10px 20px', background: '#e91e63', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>bKash</button>
          <button style={{ padding: '10px 20px', background: '#f44336', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Nagad</button>
          <button style={{ padding: '10px 20px', background: '#2196f3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Card</button>
        </div>

        <h4>Delivery Details</h4>
        <input type="text" placeholder="Full Address" style={{ width: '100%', padding: '10px', margin: '10px 0', background: '#121212', color: '#fff', border: '1px solid #444', borderRadius: '4px' }} />
        
        <button 
          onClick={() => alert('Order Placed Successfully!')}
          style={{ width: '100%', background: '#00e676', color: '#000', border: 'none', padding: '12px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px' }}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}