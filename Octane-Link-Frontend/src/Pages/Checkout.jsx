import React, { useState } from 'react';

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('bKash');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [trxId, setTrxId] = useState('');

  const handleConfirm = () => {
    if (!address) {
      alert('Please enter your full address!');
      return;
    }

    console.log({
      paymentMethod,
      phone: phone || 'N/A',
      trxId: trxId || 'N/A',
      address
    });

    alert('Order Placed Successfully!');
  };

  return (
    <div style={{ padding: '30px', color: '#fff', maxWidth: '600px', margin: '0 auto' }}>
      <h2>💳 Retail Payment & Checkout</h2>
      
      <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '8px', border: '1px solid #333', marginTop: '20px' }}>
        <h3>Select Payment Method</h3>
        <div style={{ display: 'flex', gap: '15px', margin: '15px 0' }}>
          <button 
            type="button"
            onClick={() => setPaymentMethod('bKash')}
            style={{ 
              padding: '10px 20px', 
              background: '#e91e63', 
              color: '#fff', 
              border: paymentMethod === 'bKash' ? '2px solid #fff' : 'none', 
              borderRadius: '5px', 
              cursor: 'pointer',
              opacity: paymentMethod === 'bKash' ? 1 : 0.6 
            }}
          >
            bKash
          </button>
          <button 
            type="button"
            onClick={() => setPaymentMethod('Nagad')}
            style={{ 
              padding: '10px 20px', 
              background: '#f44336', 
              color: '#fff', 
              border: paymentMethod === 'Nagad' ? '2px solid #fff' : 'none', 
              borderRadius: '5px', 
              cursor: 'pointer',
              opacity: paymentMethod === 'Nagad' ? 1 : 0.6 
            }}
          >
            Nagad
          </button>
          <button 
            type="button"
            onClick={() => setPaymentMethod('Card')}
            style={{ 
              padding: '10px 20px', 
              background: '#2196f3', 
              color: '#fff', 
              border: paymentMethod === 'Card' ? '2px solid #fff' : 'none', 
              borderRadius: '5px', 
              cursor: 'pointer',
              opacity: paymentMethod === 'Card' ? 1 : 0.6 
            }}
          >
            Card
          </button>
        </div>

        {/* Payment Details Section: Phone & TrxID */}
        <div style={{ background: '#121212', padding: '15px', borderRadius: '5px', marginBottom: '15px', border: '1px solid #333' }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#ffb74d' }}>
            Selected: <b>{paymentMethod}</b> | Send payment to: <b>01700000000</b>
          </p>

          <input 
            type="text" 
            placeholder="Enter Phone Number" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', background: '#252525', color: '#fff', border: '1px solid #555', borderRadius: '4px', boxSizing: 'border-box' }} 
          />

          <input 
            type="text" 
            placeholder={`Enter ${paymentMethod} Transaction ID (TrxID)`} 
            value={trxId}
            onChange={(e) => setTrxId(e.target.value)}
            style={{ width: '100%', padding: '10px', background: '#252525', color: '#fff', border: '1px solid #555', borderRadius: '4px', boxSizing: 'border-box' }} 
          />
        </div>

        <h4>Delivery Details</h4>
        <input 
          type="text" 
          placeholder="Full Address" 
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: '100%', padding: '10px', margin: '5px 0 15px 0', background: '#121212', color: '#fff', border: '1px solid #444', borderRadius: '4px', boxSizing: 'border-box' }} 
        />
        
        <button 
          type="button"
          onClick={handleConfirm}
          style={{ width: '100%', background: '#00e676', color: '#000', border: 'none', padding: '12px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px' }}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}